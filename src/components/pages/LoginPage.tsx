import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  GraduationCap,
  BookOpen,
  Building2,
  Lock,
  Mail,
  User,
  CheckCircle2,
  Sparkles,
  Target,
  Box,
  Briefcase,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import logoPng from '../../assets/images/erasebg-teklozy.png';
import loginSideImg from '../../assets/images/loginsideimg2.png';

export type UserRole = 'student' | 'teacher' | 'management';

interface LoginPageProps {
  onNavigateHome: () => void;
  onOpenContact?: () => void;
  initialRole?: UserRole;
  initialMode?: 'signin' | 'signup';
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigateHome,
  onOpenContact,
  initialRole = 'student',
  initialMode = 'signin',
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [role, setRole] = useState<UserRole>(initialRole);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Submission / Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isSignUp = mode === 'signup';

  // Lock outer document body scroll so scrolling is contained inside the form
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#0088E0', '#00D2FF', '#10B981', '#6366F1'],
      });
      setTimeout(() => {
        onNavigateHome();
      }, 2000);
    }, 600);
  };

  const getRoleDetails = () => {
    switch (role) {
      case 'student':
        return {
          title: 'Student Portal',
          emailPlaceholder: 'student@college.edu or personal email',
          idLabel: 'Student Email / Roll ID',
        };
      case 'teacher':
        return {
          title: 'Mentor Portal',
          emailPlaceholder: 'faculty@institution.ac.in',
          idLabel: 'Faculty Work Email',
        };
      case 'management':
        return {
          title: 'Management Portal',
          emailPlaceholder: 'admin@campus.ac.in or director@university.edu',
          idLabel: 'Institutional Admin Email',
        };
    }
  };

  const roleDetails = getRoleDetails();

  return (
    <div 
      data-lenis-prevent="true"
      className="h-screen w-full max-h-screen bg-[#EEF2F6] text-[#131209] font-manrope flex items-center justify-center p-2 sm:p-4 lg:p-6 selection:bg-[#0088E0] selection:text-white relative overflow-hidden box-border"
    >
      {/* Background Subtle Dot Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Standard Centered Unified Card Model */}
      <div 
        data-lenis-prevent="true"
        className="relative z-10 w-full max-w-5xl xl:max-w-6xl h-full max-h-[96vh] sm:max-h-[92vh] lg:max-h-[760px] bg-white rounded-2xl sm:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200/90 p-3 sm:p-4 lg:p-5 flex flex-col lg:flex-row items-stretch gap-3 sm:gap-4 lg:gap-5 overflow-hidden"
      >
        
        {/* ================================================================= */}
        {/* LEFT PANEL: Form Column (Smooth Native Wheel Scroll Enabled)      */}
        {/* ================================================================= */}
        <div 
          data-lenis-prevent="true"
          tabIndex={0}
          className="w-full lg:w-[48%] h-full flex flex-col justify-between px-3 sm:px-6 py-2 overflow-y-auto overscroll-contain focus:outline-none"
          style={{ scrollbarWidth: 'thin' }}
        >
          {/* Top Bar: Brand Logo & Back to Home */}
          <div className="flex items-center justify-between w-full shrink-0">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 group cursor-pointer select-none"
            >
              <div className="h-8 w-8 sm:h-9 sm:w-9 overflow-hidden flex items-start justify-center shrink-0">
                <img
                  src={logoPng}
                  alt="Teklozy Emblem"
                  className="w-full h-[150%] object-contain filter drop-shadow-[0_2px_8px_rgba(0,136,224,0.4)] transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <span className="font-display font-extrabold text-xl sm:text-2xl text-[#0B1528] tracking-tight">
                Tek<span className="text-[#0088E0]">lozy</span>
              </span>
            </button>

            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Form Content Area (Scrolls naturally on mouse wheel without sticking) */}
          <div className="w-full max-w-[420px] mx-auto m-auto py-2 flex flex-col justify-center shrink-0">
            
            {/* 1. Mode Switcher Capsule: [Login] [Sign Up] */}
            <div className="flex justify-center mb-2.5">
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className={`flex items-center gap-1.5 px-5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    !isSignUp
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Lock className="w-3 h-3" />
                  <span>Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`flex items-center gap-1.5 px-5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSignUp
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-[#0088E0]" />
                  <span>Sign Up</span>
                </button>
              </div>
            </div>

            {/* 2. Welcome Title */}
            <div className="text-center mb-2.5">
              <h1 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-tight">
                {isSignUp ? 'Create your account' : 'Welcome Back'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isSignUp
                  ? 'Join thousands climbing the 10-level career roadmap.'
                  : 'Enter your email and password to access your account.'}
              </p>
            </div>

            {/* 3. 3-Way Role Selector: Student / Mentor / Management */}
            <div className="mb-2.5">
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-50 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    role === 'student'
                      ? 'bg-white text-[#0088E0] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                  <span>Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    role === 'teacher'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>Mentor</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('management')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    role === 'management'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Management</span>
                </button>
              </div>
            </div>

            {isSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900">
                  {isSignUp ? 'Registration Successful!' : 'Login Successful!'}
                </h3>
                <p className="text-xs text-slate-600">
                  Welcome to <span className="font-semibold text-slate-900">{roleDetails.title}</span>. Redirecting you...
                </p>
              </div>
            ) : (
              <>
                {/* 4. Credentials Form */}
                <form onSubmit={handleSubmit} className="space-y-2">
                  {isSignUp && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-0.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Alex Morgan"
                          className="w-full pl-9 pr-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0088E0] focus:ring-1 focus:ring-[#0088E0]/20"
                        />
                      </div>
                    </div>
                  )}

                  {isSignUp && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-0.5">
                        {role === 'student' ? 'College / University' : 'Institution / Organization'}
                      </label>
                      <div className="relative">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          value={institutionName}
                          onChange={(e) => setInstitutionName(e.target.value)}
                          placeholder="e.g. RV College of Engineering"
                          className="w-full pl-9 pr-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0088E0] focus:ring-1 focus:ring-[#0088E0]/20"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-0.5">
                      {roleDetails.idLabel}
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={roleDetails.emailPlaceholder}
                        className="w-full pl-9 pr-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0088E0] focus:ring-1 focus:ring-[#0088E0]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Password
                      </label>
                      {!isSignUp && (
                        <button
                          type="button"
                          onClick={() => alert('Password reset link will be sent to your email.')}
                          className="text-[11px] font-semibold text-[#0088E0] hover:underline transition-colors cursor-pointer"
                        >
                          Forgot Password ?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-9 pr-9 py-1.5 sm:py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0088E0] focus:ring-1 focus:ring-[#0088E0]/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {!isSignUp && (
                    <div className="flex items-center py-0.5">
                      <input
                        type="checkbox"
                        id="loginRememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 text-[#0088E0] rounded border-slate-300 focus:ring-[#0088E0]/25 cursor-pointer"
                      />
                      <label
                        htmlFor="loginRememberMe"
                        className="ml-2 text-xs text-slate-600 cursor-pointer select-none"
                      >
                        Remember me
                      </label>
                    </div>
                  )}

                  {/* Primary Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0088E0] hover:bg-[#0077CC] text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-60"
                  >
                    {isLoading ? 'Authenticating...' : isSignUp ? 'Sign Up' : 'Log In'}
                  </button>
                </form>

                {/* 5. Divider */}
                <div className="relative my-2 flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider relative">
                    Or login with
                  </span>
                </div>

                {/* 6. Social Sign In Buttons (Google, GitHub / Campus SSO) */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        setIsSuccess(true);
                      }, 600);
                    }}
                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-2xs cursor-pointer truncate"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.98 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Google</span>
                  </button>

                  {role === 'management' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          setIsSuccess(true);
                        }, 600);
                      }}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-50 text-indigo-900 font-semibold text-xs transition-all shadow-2xs cursor-pointer truncate"
                    >
                      <Building2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Campus SSO</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          setIsSuccess(true);
                        }, 600);
                      }}
                      className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-2xs cursor-pointer truncate"
                    >
                      <svg className="w-3.5 h-3.5 fill-slate-900 shrink-0" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>GitHub</span>
                    </button>
                  )}
                </div>

                {/* 7. Bottom Switcher */}
                <div className="mt-2 text-center">
                  <p className="text-xs text-slate-500">
                    {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
                    <button
                      type="button"
                      onClick={() => setMode(isSignUp ? 'signin' : 'signup')}
                      className="font-bold text-[#0088E0] hover:underline cursor-pointer"
                    >
                      {isSignUp ? 'Sign in' : 'Register Now.'}
                    </button>
                  </p>
                </div>
              </>
            )}

          </div>

          {/* Bottom Bar: Copyright & Help */}
          <div className="pt-2 flex items-center justify-between w-full text-[11px] text-slate-400 border-t border-slate-100 shrink-0">
            <span>© {new Date().getFullYear()} Teklozy Inc.</span>
            {onOpenContact && (
              <button
                type="button"
                onClick={onOpenContact}
                className="text-slate-500 hover:text-[#0088E0] font-semibold transition-colors cursor-pointer"
              >
                Need Help? Contact Us
              </button>
            )}
          </div>

        </div>

        {/* =================================================================== */}
        {/* RIGHT PANEL: Refined Frosted Glass Dock (Does NOT Cover Mascot)     */}
        {/* =================================================================== */}
        <div className="hidden lg:flex lg:w-[52%] h-full relative rounded-xl sm:rounded-[24px] overflow-hidden shadow-xs bg-slate-950 select-none">
          
          {/* Vertical Illustration positioned to showcase Telo at the desk */}
          <img
            src={loginSideImg}
            alt="Teklozy Fox Mascot and Journey"
            className="w-full h-full object-cover object-[center_35%] filter brightness-[0.98]"
          />

          {/* Top Subtle Watermark Badge */}
          <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Teklozy 10-Level Career Ecosystem</span>
          </div>

          {/* Truly Translucent Apple-Style Frosted Glass Dock at the Very Bottom */}
          <div className="absolute bottom-3 left-3 right-3 z-10 bg-slate-950/35 hover:bg-slate-950/45 backdrop-blur-xl border border-white/20 rounded-2xl p-3 sm:p-3.5 text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all">
            
            {/* Quote Headline with Cyan Accent */}
            <h2 className="font-display text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
              “Small steps today, a bigger career tomorrow.{' '}
              <span className="text-[#38bdf8] font-bold">
                Your journey starts here.”
              </span>
            </h2>

            {/* 3 Sleek Pill Badges in One Compact Horizontal Row */}
            <div className="mt-2 pt-2 border-t border-white/15 flex items-center justify-between gap-1.5 sm:gap-2">
              {/* 1. Learn */}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/10 border border-white/10 backdrop-blur-md">
                <div className="w-5 h-5 rounded-md bg-cyan-500/25 text-[#38bdf8] flex items-center justify-center shrink-0">
                  <Target className="w-3 h-3" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-white/90 whitespace-nowrap">
                  <strong className="text-white font-bold">Learn</strong> New Skills
                </span>
              </div>

              {/* 2. Build */}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/10 border border-white/10 backdrop-blur-md">
                <div className="w-5 h-5 rounded-md bg-indigo-500/25 text-[#818cf8] flex items-center justify-center shrink-0">
                  <Box className="w-3 h-3" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-white/90 whitespace-nowrap">
                  <strong className="text-white font-bold">Build</strong> Real Projects
                </span>
              </div>

              {/* 3. Get Hired */}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/10 border border-white/10 backdrop-blur-md">
                <div className="w-5 h-5 rounded-md bg-emerald-500/25 text-[#34d399] flex items-center justify-center shrink-0">
                  <Briefcase className="w-3 h-3" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-white/90 whitespace-nowrap">
                  <strong className="text-white font-bold">Get</strong> Hired
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;
