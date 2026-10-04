/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AcademicProvider } from './context/AcademicContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { CustomizationProvider } from './context/CustomizationContext';
import { ImageModalProvider } from './components/ImageModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { EditScoresModal } from './components/EditScoresModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/AdminPanel';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Hobbies } from './components/Hobbies';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ShieldCheck, LogOut } from 'lucide-react';

const AdminTopBar: React.FC = () => {
  const { isAuthenticated, openAdminPanel, logout } = useAdmin();
  if (!isAuthenticated) return null;

  return (
    <aside aria-label="Admin bar" className="bg-[#1C1825] text-white py-1.5 px-4 text-xs z-50 relative border-b border-[#352F44] flex items-center justify-between">
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium">
            Admin Logged In: <strong className="font-bold text-[#DDD6FE]">srishtidigital36@gmail.com</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openAdminPanel}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#5B21B6] hover:bg-[#6D28D9] text-white font-semibold transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Open Admin Dashboard</span>
          </button>
          <button
            type="button"
            onClick={logout}
            className="text-stone-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'hobbies', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AcademicProvider>
      <AdminProvider>
        <CustomizationProvider>
          <ImageModalProvider>
            <div className="min-h-screen flex flex-col font-body selection:bg-[#DDD6FE] selection:text-[#3B0764]">
              {/* Admin top notification bar if logged in */}
              <AdminTopBar />

              {/* Sticky Navigation Bar */}
              <Navbar activeSection={activeSection} />

              {/* Main Single-Page Portfolio Content */}
              <main className="flex-1">
                {/* 1. HOME SECTION */}
                <Hero />

                {/* 2. ABOUT ME SECTION */}
                <About />

                {/* 3. SKILLS SECTION */}
                <Skills />

                {/* 4. HOBBIES SECTION ("Beyond Work") */}
                <Hobbies />

                {/* 5. CONTACT & 6. CONTACT DETAILS SECTIONS */}
                <Contact />
              </main>

              {/* Minimal Footer */}
              <Footer />

              {/* Floating WhatsApp Quick Action Button */}
              <FloatingWhatsApp />

              {/* Interactive Modal to Update Academic Percentages */}
              <EditScoresModal />

              {/* Dedicated Srishti Admin Portal & Modals */}
              <AdminLoginModal />
              <AdminPanel />
            </div>
          </ImageModalProvider>
        </CustomizationProvider>
      </AdminProvider>
    </AcademicProvider>
  );
}
