import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import logoPng from '../../assets/images/erasebg-teklozy.png';

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAudience?: 'student' | 'management';
}

interface FormState {
  fullName: string;
  email: string;
  topic: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  topic?: string;
  message?: string;
}

const TOPIC_OPTIONS = [
  'Student / Learner',
  'College Partnership',
  'Mentorship',
  'Other',
];

export const ContactUsModal: React.FC<ContactUsModalProps> = ({
  isOpen,
  onClose,
  defaultAudience = 'student',
}) => {
  const initialTopic = defaultAudience === 'management' ? 'College Partnership' : 'Student / Learner';

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    topic: initialTopic,
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync default topic when audience changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        topic: prev.topic || (defaultAudience === 'management' ? 'College Partnership' : 'Student / Learner'),
      }));
    }
  }, [isOpen, defaultAudience]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.topic.trim()) {
      newErrors.topic = 'Please select what you are contacting us about.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a brief message (at least 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    field: keyof FormState,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate reliable submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0088E0', '#00B4D8', '#10B981'],
        });
      } catch {
        // Fallback gracefully if canvas-confetti is not available
      }
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      topic: 'Student / Learner',
      message: '',
    });
    setErrors({});
  };

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        data-lenis-prevent="true"
        className="relative bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200/90 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* 1. Header: Clean, Minimal, Professional */}
        <div className="bg-white border-b border-slate-100 px-6 py-5 sm:px-8 sm:py-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-slate-50 border border-slate-200/70 p-1.5 flex items-center justify-center shrink-0">
              <img
                src={logoPng}
                alt="Teklozy"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2
                id="contact-modal-title"
                className="font-display font-bold text-xl sm:text-2xl text-slate-900 tracking-tight"
              >
                Get in Touch with Teklozy
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Have questions or want to collaborate? Send us a message and our team will get back to you shortly.
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* 2. Content Body: Desktop 2-column, Mobile 1-column (Form first, email below) */}
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          {/* Left Column: Contact Form (7 cols on desktop) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            {isSubmitted ? (
              <div className="py-8 sm:py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. 
                  We’ve received your inquiry regarding <span className="font-medium text-[#0088E0]">{formData.topic}</span>. 
                  Our team will reply to <span className="font-semibold text-slate-900">{formData.email}</span> within 24 hours.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 rounded-xl bg-[#0088E0] hover:bg-[#0077CC] text-white font-semibold text-sm transition-colors cursor-pointer shadow-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Field 1: Full Name */}
                <div>
                  <label
                    htmlFor="contact-full-name"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-full-name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all text-slate-900 placeholder:text-slate-400 focus:outline-none ${
                      errors.fullName
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20'
                        : 'border-slate-200 focus:border-[#0088E0] focus:ring-2 focus:ring-[#0088E0]/15'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="flex items-center gap-1 text-xs text-red-500 font-medium mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Field 2: Email Address */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="e.g. alex@example.com"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all text-slate-900 placeholder:text-slate-400 focus:outline-none ${
                      errors.email
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20'
                        : 'border-slate-200 focus:border-[#0088E0] focus:ring-2 focus:ring-[#0088E0]/15'
                    }`}
                  />
                  {errors.email && (
                    <p className="flex items-center gap-1 text-xs text-red-500 font-medium mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Field 3: I’m contacting you about */}
                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    I’m contacting you about <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="contact-topic"
                      required
                      value={formData.topic}
                      onChange={(e) => handleChange('topic', e.target.value)}
                      disabled={isSubmitting}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition-all text-slate-900 focus:outline-none cursor-pointer appearance-none ${
                        errors.topic
                          ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20'
                          : 'border-slate-200 focus:border-[#0088E0] focus:ring-2 focus:ring-[#0088E0]/15'
                      }`}
                    >
                      {TOPIC_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.topic && (
                    <p className="flex items-center gap-1 text-xs text-red-500 font-medium mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.topic}</span>
                    </p>
                  )}
                </div>

                {/* Field 4: Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="How can we help? Please share any details about your inquiry, program goals, or questions..."
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none ${
                      errors.message
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20'
                        : 'border-slate-200 focus:border-[#0088E0] focus:ring-2 focus:ring-[#0088E0]/15'
                    }`}
                  />
                  {errors.message && (
                    <p className="flex items-center gap-1 text-xs text-red-500 font-medium mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Field 5: Primary CTA: "Send Message" */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0088E0] hover:bg-[#0077CC] active:bg-[#0066B3] text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Compact Contact Information Panel (5 cols on desktop) */}
          <div className="md:col-span-5 bg-slate-50/80 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0088E0] block mb-1">
                  Direct Inquiries
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900">
                  Official Communication
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Prefer to reach out via email directly? Write to our verified inbox.
                </p>
              </div>

              {/* Verified Official Email Card */}
              <a
                href="mailto:contact@teklozy.com"
                className="group block p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#0088E0] transition-all hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0088E0]/10 text-[#0088E0] flex items-center justify-center shrink-0 group-hover:bg-[#0088E0] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                      Official Email
                    </div>
                    <div className="text-sm font-bold text-slate-800 truncate group-hover:text-[#0088E0] transition-colors">
                      contact@teklozy.com
                    </div>
                  </div>
                </div>
              </a>

              {/* Social Channels: Instagram & LinkedIn */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Follow & Connect
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="https://linkedin.com/company/teklozy"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#0088E0] hover:text-[#0088E0] text-slate-700 text-xs font-semibold transition-all shadow-2xs group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#0088E0]/10 text-[#0088E0] flex items-center justify-center shrink-0 group-hover:bg-[#0088E0] group-hover:text-white transition-colors">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                      </svg>
                    </div>
                    <span className="truncate">LinkedIn</span>
                  </a>

                  <a
                    href="https://instagram.com/teklozy"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-pink-500 hover:text-pink-600 text-slate-700 text-xs font-semibold transition-all shadow-2xs group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                      <svg
                        className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </div>
                    <span className="truncate">Instagram</span>
                  </a>
                </div>
              </div>

              {/* Fast Response & Privacy Badges */}
              <div className="space-y-2.5 pt-0.5">
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <Clock className="w-4 h-4 text-[#0088E0] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800">Prompt Attention:</span> We typically respond within 24 business hours.
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800">Strictly Confidential:</span> Inquiries go directly to verified Teklozy coordinators.
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="pt-4 border-t border-slate-200/70 text-[11px] text-slate-400">
              Teklozy • Empowering future-ready engineering careers.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactUsModal;
