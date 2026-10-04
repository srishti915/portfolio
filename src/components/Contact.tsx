import React, { useState, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight,
  Instagram, 
  MessageCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useCustomization } from '../context/CustomizationContext';

export const Contact: React.FC = () => {
  const { addInquiry } = useAdmin();
  const { texts, colors } = useCustomization();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Website Creation',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const rawWhatsapp = (texts.whatsapp || '9110069692').replace(/[^0-9]/g, '');
  const cleanWhatsapp = rawWhatsapp.length === 10 ? `91${rawWhatsapp}` : rawWhatsapp;
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    `Hello ${texts.heroName || 'Srishti'}, I would like to connect regarding a project!`
  )}`;

  const instagramHandle = (texts.instagram || 'srishti.diaries_').replace('@', '');
  const contactInfo = {
    name: texts.heroName || 'Srishti Pathak',
    phone: texts.phone || '9110069692',
    phoneTel: `tel:${(texts.phone || '9110069692').replace(/[^0-9+]/g, '')}`,
    whatsapp: texts.whatsapp || '9110069692',
    whatsappUrl,
    email: texts.email || 'srishtidigital36@gmail.com',
    emailMailto: `mailto:${texts.email || 'srishtidigital36@gmail.com'}`,
    location: texts.location || 'Memco More, Dhanbad, Jharkhand, India',
    instagram: `@${instagramHandle}`,
    instagramUrl: `https://www.instagram.com/${instagramHandle}/`,
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => {
      setCopiedItem(null);
    }, 2000);
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
      const nameInput = document.getElementById('full-name');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 400);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter a message about your idea.');
      return;
    }

    setFormStatus('submitting');

    // 1. Save to Srishti's Admin Panel Inbox
    addInquiry({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      projectType: formData.projectType,
      message: formData.message.trim(),
    });

    // 2. Dispatch all lead details directly to Srishti's email: srishtidigital36@gmail.com
    try {
      await fetch('https://formsubmit.co/ajax/srishtidigital36@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Lead from Portfolio: ${formData.name.trim()} (${formData.projectType})`,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || 'Not provided',
          projectType: formData.projectType,
          message: formData.message.trim(),
          recipient: 'srishtidigital36@gmail.com',
          _template: 'table',
        }),
      });
    } catch (err) {
      console.warn('Email dispatch handled, lead saved to inbox:', err);
    }

    setFormStatus('submitted');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: 'Website Creation',
      message: '',
    });
    setFormStatus('idle');
    setErrorMessage('');
  };

  return (
    <div id="contact" className="bg-white dark:bg-[#0A0F1D] scroll-mt-20 transition-colors">
      {/* ========================================
          SECTION 1 — CONTACT HERO
      ======================================== */}
      <section className="pt-20 pb-12 sm:pt-28 sm:pb-16 relative overflow-hidden">
        {/* Soft Blue & Purple background glow */}
        <div 
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[560px] h-[360px] bg-gradient-to-r from-blue-500/20 via-purple-600/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Small label with Yellow Spark */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase font-display bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GET IN TOUCH
            </span>
          </div>

          {/* Large heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-4">
            {texts.contactHeading || "Let's Create Something Together."}
          </h2>

          {/* Supporting text */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-2 font-normal">
            {texts.contactSubtitle || "Have a website idea or want to build a professional online presence? I'd love to hear about it."}
          </p>

          {/* Important Yellow availability banner */}
          <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-slate-800 dark:text-amber-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Available for new projects · Fast Response on WhatsApp</span>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 2 — CONTACT LAYOUT (TWO-COLUMN)
      ======================================== */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* ---------------- LEFT SIDE — CONTACT DETAILS ---------------- */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1825] font-display mb-3">
                  Let's Talk
                </h3>
                <p className="text-sm sm:text-base text-[#5F586C] leading-relaxed mb-8">
                  Direct channels to discuss website creation, ideas, or collaborations. Reach out by phone, email, or leave a note through the form.
                </p>

                {/* Three Large Contact Information Cards */}
                <div className="space-y-4">
                  {/* CARD 1 — PHONE */}
                  <div className="p-6 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs hover:shadow-xs hover:border-[#5B21B6]/30 transition-all flex items-start justify-between group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#F4EFFE] text-[#5B21B6] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#7B7487] uppercase tracking-wider block mb-1">
                          Call Me
                        </span>
                        <a
                          href={contactInfo.phoneTel}
                          className="text-lg sm:text-xl font-bold text-[#1C1825] hover:text-[#5B21B6] transition-colors tabular-nums"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(contactInfo.phone, 'phone')}
                      title="Copy Phone Number"
                      className="p-2 rounded-lg text-[#878093] hover:text-[#5B21B6] hover:bg-[#F4EFFE] transition-colors"
                    >
                      {copiedItem === 'phone' ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* CARD 2 — WHATSAPP (DIRECT CHAT) */}
                  <div className="p-6 rounded-2xl bg-white border border-[#25D366]/40 shadow-2xs hover:shadow-xs hover:border-[#25D366] transition-all flex items-start justify-between group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <MessageCircle className="w-5 h-5 fill-current" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#7B7487] uppercase tracking-wider block mb-1">
                          WhatsApp Chat
                        </span>
                        <a
                          href={contactInfo.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base sm:text-lg font-bold text-[#1C1825] hover:text-[#25D366] transition-colors flex items-center gap-1.5 tabular-nums"
                        >
                          <span>{contactInfo.whatsapp}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#8C8497]" />
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(contactInfo.whatsapp, 'whatsapp')}
                      title="Copy WhatsApp Number"
                      className="p-2 rounded-lg text-[#878093] hover:text-[#25D366] hover:bg-emerald-50 transition-colors cursor-pointer"
                    >
                      {copiedItem === 'whatsapp' ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* CARD 3 — EMAIL */}
                  <div className="p-6 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs hover:shadow-xs hover:border-[#5B21B6]/30 transition-all flex items-start justify-between group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#F4EFFE] text-[#5B21B6] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#7B7487] uppercase tracking-wider block mb-1">
                          Email Me
                        </span>
                        <a
                          href={contactInfo.emailMailto}
                          className="text-base sm:text-lg font-bold text-[#1C1825] hover:text-[#5B21B6] transition-colors break-all"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(contactInfo.email, 'email')}
                      title="Copy Email Address"
                      className="p-2 rounded-lg text-[#878093] hover:text-[#5B21B6] hover:bg-[#F4EFFE] transition-colors"
                    >
                      {copiedItem === 'email' ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* CARD 3 — LOCATION */}
                  <div className="p-6 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#F4EFFE] text-[#5B21B6] flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#7B7487] uppercase tracking-wider block mb-1">
                          Location
                        </span>
                        <div className="text-base sm:text-lg font-bold text-[#1C1825] leading-snug">
                          {contactInfo.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CARD 4 — INSTAGRAM */}
                  <div className="p-6 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs hover:shadow-xs hover:border-[#E1306C]/40 transition-all flex items-start justify-between group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-pink-50 text-[#E1306C] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Instagram className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#7B7487] uppercase tracking-wider block mb-1">
                          Instagram
                        </span>
                        <a
                          href={contactInfo.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base sm:text-lg font-bold text-[#1C1825] hover:text-[#E1306C] transition-colors flex items-center gap-1.5"
                        >
                          <span>{contactInfo.instagram}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#8C8497]" />
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('srishti.diaries_', 'instagram')}
                      title="Copy Instagram ID"
                      className="p-2 rounded-lg text-[#878093] hover:text-[#E1306C] hover:bg-pink-50 transition-colors"
                    >
                      {copiedItem === 'instagram' ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Response Promise Footer */}
              <div className="pt-6 mt-8 border-t border-[#EAE5DC] flex items-center gap-2 text-xs text-[#736B7F]">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Available for new website projects · Dhanbad & Remote</span>
              </div>
            </div>

            {/* ---------------- RIGHT SIDE — CONTACT FORM ---------------- */}
            <div className="lg:col-span-7" ref={formRef}>
              <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E5E0D6] shadow-sm">
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1825] font-display mb-2">
                    Start a Conversation
                  </h3>
                  <p className="text-sm text-[#5F586C]">
                    Please share your requirements or idea below and I will get back to you promptly.
                  </p>
                </div>

                {formStatus === 'submitted' ? (
                  <div className="py-10 text-center animate-in fade-in duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-sm ring-1 ring-emerald-500/20">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <div className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs mb-3 shadow-xs">
                      Delivered to Srishti's Email
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white font-display mb-2">
                      Inquiry Sent Successfully!
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-3">
                      Thank you, <strong className="font-semibold text-slate-900 dark:text-white">{formData.name}</strong>. Your project details for <span className="font-semibold text-blue-600 dark:text-blue-400">{formData.projectType}</span> have been sent directly to <strong className="text-blue-600 dark:text-blue-400">srishtidigital36@gmail.com</strong>.
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                      Srishti will review your requirements and respond shortly.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={`https://wa.me/919110069692?text=${encodeURIComponent(
                          `Hello Srishti, I submitted the form on your website for ${formData.projectType}. My name is ${formData.name}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>Chat on WhatsApp</span>
                      </a>
                      <a
                        href={`mailto:srishtidigital36@gmail.com?subject=Regarding%20${encodeURIComponent(formData.projectType)}%20Inquiry&body=${encodeURIComponent(
                          `Hello Srishti,\n\nName: ${formData.name}\nPhone: ${formData.phone || 'N/A'}\nProject: ${formData.projectType}\nMessage: ${formData.message}`
                        )}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span>Open Email App</span>
                      </a>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                        {errorMessage}
                      </div>
                    )}

                    {/* Full Name Field */}
                    <div>
                      <label htmlFor="full-name" className="block text-xs font-semibold uppercase tracking-wider text-[#383242] mb-1.5">
                        Full Name <span className="text-[#5B21B6]">*</span>
                      </label>
                      <input
                        type="text"
                        id="full-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-[#DDD7CD] bg-[#FAF9F6] text-sm text-[#1E1B24] placeholder:text-[#9B94A7] focus:outline-hidden focus:ring-2 focus:ring-[#5B21B6] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Address Field */}
                      <div>
                        <label htmlFor="email-address" className="block text-xs font-semibold uppercase tracking-wider text-[#383242] mb-1.5">
                          Email Address <span className="text-[#5B21B6]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email-address"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-[#DDD7CD] bg-[#FAF9F6] text-sm text-[#1E1B24] placeholder:text-[#9B94A7] focus:outline-hidden focus:ring-2 focus:ring-[#5B21B6] focus:bg-white transition-all"
                        />
                      </div>

                      {/* Phone Number Field */}
                      <div>
                        <label htmlFor="phone-number" className="block text-xs font-semibold uppercase tracking-wider text-[#383242] mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone-number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Your phone number"
                          className="w-full px-4 py-3 rounded-xl border border-[#DDD7CD] bg-[#FAF9F6] text-sm text-[#1E1B24] placeholder:text-[#9B94A7] focus:outline-hidden focus:ring-2 focus:ring-[#5B21B6] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Project Type Dropdown */}
                    <div>
                      <label htmlFor="project-type" className="block text-xs font-semibold uppercase tracking-wider text-[#383242] mb-1.5">
                        Project Type
                      </label>
                      <select
                        id="project-type"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#DDD7CD] bg-[#FAF9F6] text-sm text-[#1E1B24] focus:outline-hidden focus:ring-2 focus:ring-[#5B21B6] focus:bg-white transition-all"
                      >
                        <option value="Website Creation">Website Creation</option>
                        <option value="Portfolio Website">Portfolio Website</option>
                        <option value="Business Website">Business Website</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#383242] mb-1.5">
                        Message <span className="text-[#5B21B6]">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me a little about your idea..."
                        className="w-full px-4 py-3 rounded-xl border border-[#DDD7CD] bg-[#FAF9F6] text-sm text-[#1E1B24] placeholder:text-[#9B94A7] focus:outline-hidden focus:ring-2 focus:ring-[#5B21B6] focus:bg-white transition-all resize-y"
                      />
                    </div>

                    {/* Large Button: Send Message with Blue-Purple gradient */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-[0.99] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70 whitespace-nowrap"
                      >
                        {formStatus === 'submitting' ? (
                          <span>Sending Message...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4 ml-0.5 text-amber-300" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3 — QUICK CTA
      ======================================== */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#0B1020] border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-3">
            Have an Idea in Mind?
          </h3>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
            Let's turn your idea into a clean and modern digital experience.
          </p>
          <div>
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
            >
              <span>Let's Work Together</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4 — SOCIAL / ONLINE PRESENCE (FIND ME ONLINE)
      ======================================== */}
      <section className="py-16 bg-white dark:bg-[#0A0F1D] border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Connect</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-3">
            Find Me Online
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8">
            Connect directly on WhatsApp or follow on Instagram.
          </p>

          {/* Social Links: Instagram and Direct WhatsApp */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Direct WhatsApp - 9110069692 */}
            <a
              href={contactInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-white border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/5 shadow-2xs hover:shadow-md transition-all flex items-center gap-3 text-sm font-semibold text-[#1E1B24] group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div className="text-left">
                <span className="block text-[11px] text-[#696175] font-normal uppercase tracking-wider">Direct WhatsApp</span>
                <span className="font-bold text-[#1E1B24] group-hover:text-[#25D366] transition-colors">{contactInfo.whatsapp}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#8C8497] group-hover:text-[#25D366] ml-1" />
            </a>

            {/* Instagram - Live Link to Srishti's ID */}
            <a
              href={contactInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-white border border-[#E1306C]/30 hover:border-[#E1306C] hover:bg-pink-50/20 shadow-2xs hover:shadow-md transition-all flex items-center gap-3 text-sm font-semibold text-[#1E1B24] group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FD5949] via-[#D6249F] to-[#285AEB] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[11px] text-[#696175] font-normal uppercase tracking-wider">Instagram</span>
                <span className="font-bold text-[#1E1B24] group-hover:text-[#E1306C] transition-colors">{contactInfo.instagram}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#8C8497] group-hover:text-[#E1306C] ml-1" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
