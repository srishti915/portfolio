import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, Lock, ShieldCheck, Instagram, MessageCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useCustomization } from '../context/CustomizationContext';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { isAuthenticated, openAdminPanel, openLoginModal } = useAdmin();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { texts } = useCustomization();
  const rawWhatsapp = (texts.whatsapp || '9110069692').replace(/[^0-9]/g, '');
  const cleanWhatsapp = rawWhatsapp.length === 10 ? `91${rawWhatsapp}` : rawWhatsapp;
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    `Hello ${texts.heroName || 'Srishti'}, I would like to connect!`
  )}`;

  return (
    <footer className="bg-white dark:bg-[#070B16] border-t border-slate-200 dark:border-slate-800 py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-10 border-b border-slate-200 dark:border-slate-800">
          {/* Brand & Brief Identity */}
          <div>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400 font-display hover:text-purple-600 transition-colors inline-block mb-2"
            >
              {texts.heroName || 'Srishti Pathak'}
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              B.Com (Hons) Student • Website Creator • Digital Skills Learner
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="hover:text-[#5B21B6] transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="hover:text-[#5B21B6] transition-colors"
            >
              About Me
            </a>
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, '#skills')}
              className="hover:text-[#5B21B6] transition-colors"
            >
              Skills & Services
            </a>
            <a
              href="#hobbies"
              onClick={(e) => handleNavClick(e, '#hobbies')}
              className="hover:text-[#5B21B6] transition-colors"
            >
              Hobbies & Interests
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hover:text-[#5B21B6] transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Lower Row: Direct Contact Links, Location & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#6F697C]">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
            <a
              href={`mailto:${texts.email || 'srishtidigital36@gmail.com'}`}
              className="hover:text-[#5B21B6] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#5B21B6]" />
              <span>{texts.email || 'srishtidigital36@gmail.com'}</span>
            </a>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <a
              href={`tel:${(texts.phone || '9110069692').replace(/[^0-9+]/g, '')}`}
              className="hover:text-[#5B21B6] transition-colors flex items-center gap-1.5 tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-[#5B21B6]" />
              <span>{texts.phone || '9110069692'}</span>
            </a>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25D366] transition-colors flex items-center gap-1.5 tabular-nums font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-current" />
              <span>WhatsApp: {texts.whatsapp || '9110069692'}</span>
            </a>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <a
              href={`https://www.instagram.com/${(texts.instagram || 'srishti.diaries_').replace('@', '')}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E1306C] transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>@{(texts.instagram || 'srishti.diaries_').replace('@', '')}</span>
            </a>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#5B21B6]" />
              <span>{texts.location || 'Memco More, Dhanbad, Jharkhand, India'}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 Srishti Pathak. All Rights Reserved.</span>

            {/* Subtle Admin Access Button */}
            <span aria-hidden="true" className="text-stone-300">·</span>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={openAdminPanel}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EDE9FE] text-[#5B21B6] hover:bg-[#DDD6FE] text-[11px] font-semibold transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Admin Panel</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={openLoginModal}
                className="inline-flex items-center gap-1 text-[#8C8497] hover:text-[#5B21B6] text-[11px] font-medium transition-colors cursor-pointer"
                title="Srishti's Admin Login"
              >
                <Lock className="w-3 h-3" />
                <span>Admin</span>
              </button>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-1.5 rounded-lg border border-[#DDD8CD] bg-white text-[#524B5C] hover:text-[#5B21B6] hover:border-[#5B21B6]/40 transition-colors shadow-2xs ml-1"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
