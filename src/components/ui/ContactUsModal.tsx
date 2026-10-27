import React, { useState } from 'react';
import {
  X,
  Send,
  Mail,
  Phone,
  MessageSquare,
  Building2,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import logoPng from '../../assets/images/erasebg-teklozy.png';

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAudience?: 'student' | 'management';
}

export const ContactUsModal: React.FC<ContactUsModalProps> = ({
  isOpen,
  onClose,
  defaultAudience = 'student',
}) => {
  const [audience, setAudience] = useState<'student' | 'management'>(defaultAudience);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [interestTrack, setInterestTrack] = useState('fullstack-ai');
  const [partnershipType, setPartnershipType] = useState('campus-hub');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    setIsSubmitting(true);

    // Simulate instant secure submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#0088E0', '#00D2FF', '#10B981', '#6366F1'],
      });
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setOrganization('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060F1E]/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200/80 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#0B1528] via-[#0C2044] to-[#0088E0] text-white p-5 sm:p-7 flex items-center justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-1.5 flex items-center justify-center shrink-0">
              <img
                src={logoPng}
                alt="Teklozy Logo"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  Get in Touch with Teklozy
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
                  <Sparkles className="w-3 h-3" /> 24h Response
                </span>
              </div>
              <p className="text-xs sm:text-sm text-cyan-100/80 mt-0.5">
                Whether you’re a passionate student or college leadership, we’re ready to connect.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer relative z-10 shrink-0"
            aria-label="Close Contact Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          
          {/* Left / Main Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-white flex flex-col justify-between">
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-400 flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-slate-600 max-w-sm">
                  Thank you, <span className="font-semibold text-slate-900">{fullName}</span>. 
                  Our team has received your inquiry for{' '}
                  <span className="font-medium text-[#0088E0]">
                    {audience === 'student' ? 'Student Admissions & Roadmap' : 'College Management Partnership'}
                  </span>. We will reach back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                {/* Persona Switcher Tabs */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    I am reaching out as:
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setAudience('student')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        audience === 'student'
                          ? 'bg-white text-[#0088E0] shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Student / Learner</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAudience('management')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        audience === 'management'
                          ? 'bg-white text-[#0088E0] shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>College Management</span>
                    </button>
                  </div>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-[#0088E0]/15"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work / Student Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-[#0088E0]/15"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-[#0088E0]/15"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {audience === 'student' ? 'College / University Name' : 'Institution / College Name'}
                      </label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder={audience === 'student' ? 'e.g. NIT / RVCE' : 'e.g. BMS Institute of Tech'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-[#0088E0]/15"
                      />
                    </div>
                  </div>

                  {/* Topic Select depending on Audience */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {audience === 'student' ? 'Interested Career Path / Inquiry' : 'Partnership Interest'}
                    </label>
                    {audience === 'student' ? (
                      <select
                        value={interestTrack}
                        onChange={(e) => setInterestTrack(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-[#0088E0]/15 cursor-pointer"
                      >
                        <option value="fullstack-ai">Full-Stack & Generative AI (10-Level Career Path)</option>
                        <option value="cloud-devops">Cloud Engineering & DevOps Immersion</option>
                        <option value="data-ml">Data Science & Machine Learning Systems</option>
                        <option value="mentorship">1:1 Industry Mentorship & Portfolio Reviews</option>
                        <option value="placement-prep">Placement & Interview Prep Bootcamp</option>
                      </select>
                    ) : (
                      <select
                        value={partnershipType}
                        onChange={(e) => setPartnershipType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-[#0088E0]/15 cursor-pointer"
                      >
                        <option value="campus-hub">Establish On-Campus AI Innovation Hub & Lab</option>
                        <option value="curriculum">Integrate Teklozy Curriculum & 10 Levels into Syllabus</option>
                        <option value="recruitment">Host Exclusive Campus Placement & Hiring Drives</option>
                        <option value="faculty-dev">Faculty Development Programs (FDP) & AI Upskilling</option>
                        <option value="hackathon">Sponsor College Hackathons & Capstone Demo Days</option>
                      </select>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Message or Questions
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        audience === 'student'
                          ? 'Tell us what semester you are in, what you want to achieve, or ask anything...'
                          : 'Tell us about your student cohort size, preferred timeline, or MoU requirements...'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-[#0088E0]/15 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[11px] text-slate-400">
                      🔒 Your data is private and confidential.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 bg-[#0088E0] hover:bg-[#0077CC] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Submit Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Social Channels & Direct Reachout (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-blue-50/50 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0088E0] block mb-1">
                Direct Channels
              </span>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                Connect Directly
              </h3>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                Need immediate answers or want to discuss campus MoUs directly? Reach out through our direct communication hotlines.
              </p>

              {/* Contact Cards */}
              <div className="space-y-3 mb-6">
                <a
                  href="mailto:contact@teklozy.com"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0088E0]/50 hover:shadow-sm transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0088E0] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">Official Email</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">contact@teklozy.com</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0088E0] transition-colors shrink-0" />
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500/50 hover:shadow-sm transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">WhatsApp Admissions</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">+91 98765 43210</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
                </a>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">Institutional Relations</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">+91 98765 43211</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="pt-4 border-t border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
                Follow & Join the Community
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://linkedin.com/company/teklozy"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-[#0088E0] hover:text-[#0088E0] text-slate-700 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://twitter.com/teklozy"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-800 hover:text-slate-900 text-slate-700 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>X (Twitter)</span>
                </a>

                <a
                  href="https://instagram.com/teklozy"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-pink-500 hover:text-pink-600 text-slate-700 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>Instagram</span>
                </a>

                <a
                  href="https://discord.gg/teklozy"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Discord</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactUsModal;
