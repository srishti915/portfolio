import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  Compass, 
  Upload, 
  Camera, 
  Sparkles, 
  Code2, 
  Globe, 
  Trash2,
  GraduationCap,
  Pencil
} from 'lucide-react';
import { useAcademic } from '../context/AcademicContext';
import { useImageModal } from './ImageModal';
import { useCustomization } from '../context/CustomizationContext';

export const Hero: React.FC = () => {
  const { scores, openEditModal } = useAcademic();
  const { openImage } = useImageModal();
  const { images, texts, colors, updateImage } = useCustomization();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateImage('heroProfile', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateImage('heroProfile', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  // Academic highlight row with vivid yellow highlights for the scores
  const AcademicHighlightsRow = ({ className = '' }: { className?: string }) => (
    <div className={`pt-6 border-t border-slate-200 dark:border-slate-800 ${className}`}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
          <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>B.Com (Hons)</span>
        </div>
        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
        {/* Important: Yellow Highlighted Score 1 */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 dark:text-slate-400">Class 12:</span>
          <span className="font-extrabold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md shadow-xs ring-1 ring-amber-500/50 tabular-nums">
            {scores.class12}
          </span>
        </div>
        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
        {/* Important: Yellow Highlighted Score 2 */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 dark:text-slate-400">Class 10:</span>
          <span className="font-extrabold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md shadow-xs ring-1 ring-amber-500/50 tabular-nums">
            {scores.class10}
          </span>
        </div>
        <button
          type="button"
          onClick={openEditModal}
          title="Edit percentages"
          className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:text-purple-600 hover:underline cursor-pointer"
        >
          <Pencil className="w-3 h-3" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-[calc(100vh-5rem)] flex items-center justify-center pt-8 pb-16 lg:py-20 overflow-hidden bg-white dark:bg-[#0A0F1D] transition-colors"
    >
      {/* ---------------- BLUE & PURPLE AMBIENT RADIAL GLOWS ---------------- */}
      <div
        className="absolute -top-16 -right-16 w-[520px] h-[520px] bg-gradient-to-br from-blue-500/20 via-purple-600/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-[480px] h-[480px] bg-gradient-to-tr from-purple-600/20 via-blue-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Subtle floating geometric elements */}
      <div
        className="hidden lg:block absolute top-24 left-[10%] w-2.5 h-2.5 rounded-full bg-blue-400/50 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="hidden lg:block absolute bottom-32 left-[44%] w-2.5 h-2.5 rotate-45 border border-purple-500/40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="hidden lg:block absolute top-32 right-[8%] w-3.5 h-3.5 rounded-xs border border-blue-500/35 rotate-12 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ===================== LEFT SIDE ===================== */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* 1. Small introductory label with Yellow Spark */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase font-display bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {texts.heroBadge || "COMMERCE • WEB CREATION • DIGITAL SKILLS"}
              </span>
            </div>

            {/* 2. Main heading: Blue to Purple gradient on Srishti Pathak */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display leading-[1.08] mb-4">
              <span className="text-slate-900 dark:text-white">Hi, I'm </span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {texts.heroName || 'Srishti Pathak'}
              </span>
            </h1>

            {/* 3. Professional positioning tagline */}
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-700 dark:text-slate-200 font-display mb-5 leading-snug">
              Website Creator <span className="text-amber-500 font-bold">|</span> Digital Marketing & AI Automation Learner
            </h2>

            {/* 4. Short introduction with important yellow highlights */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl leading-relaxed font-normal">
              I’m a <span className="bg-amber-300/40 dark:bg-amber-400/25 text-slate-900 dark:text-amber-200 px-1.5 py-0.5 rounded-sm font-semibold border-b-2 border-amber-400">B.Com (Hons) student</span> passionate about creating <span className="bg-amber-300/40 dark:bg-amber-400/25 text-slate-900 dark:text-amber-200 px-1.5 py-0.5 rounded-sm font-semibold border-b-2 border-amber-400">modern websites</span> and exploring how digital marketing and AI automation can help businesses grow.
            </p>

            {/* 5. CTA Buttons: Blue-to-Purple Gradient */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {/* PRIMARY CTA */}
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all active:scale-[0.99] whitespace-nowrap group cursor-pointer"
              >
                <span>{texts.heroCtaPrimary || "Let's Work Together"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-amber-300" />
              </a>

              {/* SECONDARY CTA */}
              <a
                href="#skills"
                onClick={(e) => handleScrollTo(e, '#skills')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-xl shadow-2xs transition-all active:scale-[0.99] whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{texts.heroCtaSecondary || 'Explore My Skills'}</span>
              </a>
            </div>

            {/* Desktop Academic Highlights (placed below CTAs) */}
            <AcademicHighlightsRow className="hidden lg:block max-w-lg" />
          </div>

          {/* ===================== RIGHT SIDE ===================== */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
              {/* Hidden file input for uploading custom portrait */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                aria-label="Upload custom portrait photograph"
              />

              {/* ================= PROFILE IMAGE CONTAINER (VISUAL POP ONLY, NO MODAL) ================= */}
              <div
                className="group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border-2 border-blue-500/30 hover:border-purple-500/60 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 ease-out"
              >
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={images.heroProfile}
                    alt={`${texts.heroName || 'Srishti Pathak'} - Portrait Photograph`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating Yellow Accent Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold shadow-md flex items-center gap-1 z-10">
                    <Sparkles className="w-3 h-3 text-slate-950" />
                    <span>Portfolio Creator</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Academic Highlights (placed below profile image as requested) */}
            <AcademicHighlightsRow className="block lg:hidden w-full mt-8 max-w-[380px]" />
          </div>

        </div>
      </div>
    </section>
  );
};
