import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sun, Moon, Sparkles } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { themeMode, toggleThemeMode, texts } = useCustomization();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About Me', href: '#about', id: 'about' },
    { name: 'Skills & Services', href: '#skills', id: 'skills' },
    { name: 'Hobbies & Interests', href: '#hobbies', id: 'hobbies' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-[#0A0F1D]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs'
          : 'bg-transparent backdrop-blur-xs border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Authentic Modern Brand Logo in Blue with Yellow Spark Accent */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Srishti Pathak - Home"
            className="flex items-center gap-3 group cursor-pointer"
          >
            {/* Logo Geometric Mark */}
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-display font-extrabold text-base shadow-md ring-2 ring-blue-500/25 group-hover:scale-105 group-hover:shadow-blue-500/25 transition-all">
              <span className="tracking-tighter">SP</span>
              {/* Important yellow spark accent */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            </div>

            {/* Logo Wordmark in Blue */}
            <div className="flex flex-col text-left">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                {texts.heroName || 'Srishti Pathak'}
              </span>
              <span className="text-[9px] tracking-widest font-semibold uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span>PORTFOLIO</span>
                <span className="w-1 h-1 rounded-full bg-amber-400" />
                <span className="text-purple-600 dark:text-purple-400">CREATOR</span>
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1.5 transition-colors whitespace-nowrap ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Dark/Light Mode Switch + Primary CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Dark / Light Mode Switch */}
            <button
              type="button"
              onClick={toggleThemeMode}
              aria-label={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              {themeMode === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold hidden lg:inline text-amber-300">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-blue-600 fill-blue-600" />
                  <span className="text-xs font-semibold hidden lg:inline text-blue-700">Dark</span>
                </>
              )}
            </button>

            {/* CTA Button: Blue & Purple Gradient */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98 whitespace-nowrap"
            >
              <span>Let's Work Together</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0A0F1D]/95 backdrop-blur-md px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-xs"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
