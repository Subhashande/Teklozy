/**
 * Small, dependency-free Supabase client for this landing page.
 * Uses Supabase Auth and PostgREST over HTTPS. Never put a service-role key here.
 */
export type UserRole = 'student' | 'teacher' | 'management';

export interface SupabaseUser {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}

export interface SupabaseSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  expires_in?: number;
  token_type?: string;
  user: SupabaseUser;
}

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const SESSION_KEY = 'teklozy_supabase_session';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

function ensureConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
  }
}

function getSession(): SupabaseSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY) || window.sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) as SupabaseSession : null;
  } catch {
    return null;
  }
}

function saveSession(session: SupabaseSession | null, remember = true) {
  if (typeof window === 'undefined') return;
  if (session) {
    const expiresAt = session.expires_at || (Date.now() / 1000 + (session.expires_in || 3600));
    const serialized = JSON.stringify({ ...session, expires_at: expiresAt });
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
    (remember ? window.localStorage : window.sessionStorage).setItem(SESSION_KEY, serialized);
  } else {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = body.msg || body.message || body.error_description || body.error || 'The request could not be completed.';
    throw new Error(String(message));
  }
  return body as T;
}

async function authRequest<T>(path: string, payload?: unknown): Promise<T> {
  ensureConfigured();
  const response = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload ?? {}),
  });
  return parseResponse<T>(response);
}

async function refreshSession(): Promise<SupabaseSession | null> {
  const current = getSession();
  if (!current?.refresh_token) return null;
  try {
    const refreshed = await authRequest<SupabaseSession>('/token?grant_type=refresh_token', {
      refresh_token: current.refresh_token,
    });
    saveSession(refreshed, Boolean(window.localStorage.getItem(SESSION_KEY)));
    return refreshed;
  } catch {
    saveSession(null);
    return null;
  }
}

export async function getValidSession(): Promise<SupabaseSession | null> {
  const current = getSession();
  if (!current) return null;
  if (current.expires_at && current.expires_at > Date.now() / 1000 + 60) return current;
  return refreshSession();
}

export async function signIn(email: string, password: string, remember = true) {
  const result = await authRequest<SupabaseSession>('/token?grant_type=password', {
    email: email.trim().toLowerCase(),
    password,
  });
  saveSession(result, remember);
  return result;
}

export async function getUserRole(userId: string, accessToken: string): Promise<UserRole> {
  ensureConfigured();
  const url = new URL(`${SUPABASE_URL}/rest/v1/profiles`);
  url.searchParams.set('select', 'role');
  url.searchParams.set('id', `eq.${userId}`);
  url.searchParams.set('limit', '1');
  const response = await fetch(url.toString(), {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${accessToken}` },
  });
  const rows = await parseResponse<Array<{ role: UserRole }>>(response);
  if (!rows[0]?.role) throw new Error('Your account profile is not ready yet. Please try again in a moment.');
  return rows[0].role;
}

export async function updatePassword(newPassword: string) {
  const session = await getValidSession();
  if (!session) throw new Error('Your password reset session has expired. Request a new reset email.');
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    method: 'PUT',
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: newPassword }),
  });
  return parseResponse<SupabaseUser>(response);
}

export async function requestPasswordReset(email: string) {
  const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/login` : undefined;
  return authRequest<{ message?: string }>(`/recover${redirectTo ? `?redirect_to=${encodeURIComponent(redirectTo)}` : ''}`, {
    email: email.trim().toLowerCase(),
  });
}

export function signInWithOAuth(provider: 'google' | 'github') {
  ensureConfigured();
  const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/login` : '';
  window.location.assign(
    `${SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=${encodeURIComponent(redirectTo)}`
  );
}


export async function completeOAuthCallback(): Promise<boolean> {
  if (typeof window === 'undefined' || !window.location.hash.includes('access_token=')) return false;
  const params = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  if (!accessToken || !refreshToken) return false;
  ensureConfigured();
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${accessToken}` },
  });
  const user = await parseResponse<SupabaseUser>(response);
  const session: SupabaseSession = {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: Number(params.get('expires_in') || 3600),
    token_type: params.get('token_type') || 'bearer',
    user,
  };
  saveSession(session);
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#login`);
  return true;
}

export async function signOut() {
  const session = await getValidSession();
  if (session) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${session.access_token}`,
      },
    }).catch(() => undefined);
  }
  saveSession(null);
}

export async function submitContactMessage(input: {
  fullName: string;
  email: string;
  topic: string;
  message: string;
}) {
  ensureConfigured();
  const session = await getValidSession();
  const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      full_name: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      topic: input.topic,
      message: input.message.trim(),
      source: 'landing_page',
    }),
  });
  await parseResponse<unknown>(response);
}
