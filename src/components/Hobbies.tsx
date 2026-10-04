import React, { useState } from 'react';
import { 
  Music, 
  Palette, 
  Scissors, 
  Sparkles, 
  Heart, 
  Compass, 
  Clock, 
  Feather, 
  Volume2, 
  Brush, 
  Layers, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import guitarImg from '../assets/images/hobby_acoustic_guitar_1791101398615.jpg';
import artImg from '../assets/images/hobby_fine_art_sketch_1791101412959.jpg';
import craftImg from '../assets/images/hobby_creative_craft_1791101427479.jpg';
import { useImageModal } from './ImageModal';
import { useCustomization } from '../context/CustomizationContext';

export const Hobbies: React.FC = () => {
  const { openImage } = useImageModal();
  const { images, texts, colors } = useCustomization();
  const [guitarErr, setGuitarErr] = useState(false);
  const [artErr, setArtErr] = useState(false);
  const [craftErr, setCraftErr] = useState(false);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  const showcaseCards = [
    {
      id: 'guitar',
      title: texts.hobby1Title || 'Acoustic Guitar',
      description: texts.hobby1Desc || 'Learning melodies and fingerpicking patterns. Music is my favorite way to reset and cultivate patient focus.',
      image: images.hobbyGuitar,
      icon: Music,
      error: guitarErr,
      setError: setGuitarErr,
      subtleDetail: 'Acoustic melodies · Rhythm & cadence',
      decorativeTag: 'Sound & Balance',
    },
    {
      id: 'art',
      title: texts.hobby2Title || 'Fine Art & Sketching',
      description: texts.hobby2Desc || 'Pencil sketching, shading, and observational drawings that train my visual eye for composition and proportion.',
      image: images.hobbyArt,
      icon: Palette,
      error: artErr,
      setError: setArtErr,
      subtleDetail: 'Graphite & freehand sketches · Light & shade',
      decorativeTag: 'Form & Observation',
    },
    {
      id: 'craft',
      title: texts.hobby3Title || 'Creative Craft & Journaling',
      description: texts.hobby3Desc || 'Handmade stationery, thoughtful papercrafts, and structured journaling for mindful reflection and planning.',
      image: images.hobbyCraft,
      icon: Scissors,
      error: craftErr,
      setError: setCraftErr,
      subtleDetail: 'Origami & paper models · Tactile assembly',
      decorativeTag: 'Precision & Texture',
    },
  ];

  const whyIEnjoy = [
    {
      title: 'CREATIVITY',
      description: 'Exploring ideas through different forms of expression.',
      icon: Sparkles,
    },
    {
      title: 'PATIENCE',
      description: 'Creating something by hand teaches me to slow down and pay attention to details.',
      icon: Clock,
    },
    {
      title: 'EXPRESSION',
      description: 'Music and art give me different ways to express ideas and emotions.',
      icon: Feather,
    },
  ];

  return (
    <div id="hobbies" className="bg-white dark:bg-[#0A0F1D] scroll-mt-20 transition-colors">
      {/* ========================================
          SECTION 1 — PAGE INTRO
      ======================================== */}
      <section className="pt-20 pb-12 sm:pt-28 sm:pb-16 relative overflow-hidden">
        {/* Blue and Purple ambient glow */}
        <div 
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[560px] h-[340px] bg-gradient-to-r from-blue-500/20 via-purple-600/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Small label with Yellow Dot */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase font-display bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {texts.hobbiesKicker || 'BEYOND WORK'}
            </span>
          </div>

          {/* Large heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-5">
            {texts.hobbiesHeading || 'Things I Love Creating.'}
          </h2>

          {/* Supporting text */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {texts.hobbiesSubtitle}
          </p>
        </div>
      </section>

      {/* ========================================
          SECTION 2 — HOBBY SHOWCASE (THREE-CARD LAYOUT)
      ======================================== */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2.5 hover:scale-[1.02] transition-all duration-300 ease-out flex flex-col justify-between"
                >
                  <div>
                    {/* Large Visual Area */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF8F5]">
                      {!card.error ? (
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          onError={() => card.setError(true)}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#EDE9FE]/50">
                          <Icon className="w-10 h-10 text-[#5B21B6] mb-2" />
                          <span className="font-semibold text-sm text-[#1E1B24]">{card.title}</span>
                        </div>
                      )}

                      {/* Gentle gradient scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                      {/* Minimal floating icon badge */}
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md text-[#5B21B6] shadow-xs flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all">
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Tap to zoom hint on hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="px-3.5 py-1.5 rounded-xl bg-white/95 text-[#1E1B24] text-xs font-semibold flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Maximize2 className="w-3.5 h-3.5 text-[#5B21B6]" />
                          <span>Tap to pop open</span>
                        </div>
                      </div>

                      {/* Bottom image subtitle tag */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-xs font-medium text-white/95 drop-shadow-xs">
                          {card.decorativeTag}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-7">
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1825] font-display mb-3 group-hover:text-[#5B21B6] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#5F586C] leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {/* Subtle lower detail row */}
                  <div className="px-6 pb-6 pt-2">
                    <div className="pt-3 border-t border-[#EFECE4] text-xs text-[#7B7487] flex items-center justify-between">
                      <span>{card.subtleDetail}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B21B6]/60" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3 — WHY I ENJOY THEM
      ======================================== */}
      <section className="py-20 lg:py-24 bg-[#F6F4EE]/70 border-t border-[#ECE7DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#17141E] font-display mb-3">
              Creativity Outside the Screen
            </h3>
            <p className="text-base text-[#5F586C]">
              Analog practices that nurture mental clarity, patience, and intentional focus.
            </p>
          </div>

          {/* Three Small Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyIEnjoy.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs hover:shadow-xs hover:border-[#5B21B6]/30 transition-all text-center flex flex-col items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F4EFFE] text-[#5B21B6] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-[#1C1825] font-display tracking-wider uppercase mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#5F586C] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4 — CREATIVE COLLAGE (ASYMMETRICAL MOODBOARD)
      ======================================== */}
      <section className="py-20 lg:py-28 border-t border-[#ECE7DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 text-left">
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-semibold text-[#5B21B6] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Creative Moodboard</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#17141E] font-display">
              A Glimpse Into the Process
            </h3>
            <p className="text-sm sm:text-base text-[#5F586C] mt-2">
              An editorial composition of musical chords, pencil textures, and tactile paper folds.
            </p>
          </div>

          {/* Asymmetrical Editorial Collage Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Collage Tile 1: Large Acoustic Guitar Feature */}
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-white border border-[#E5E0D6] shadow-2xs min-h-[340px] group flex flex-col justify-end p-7">
              <img
                src={guitarImg}
                alt="Acoustic Guitar process"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
              <div className="relative z-10 text-white">
                <div className="flex items-center gap-2 text-xs text-[#DDD6FE] font-mono tracking-wide uppercase mb-1.5">
                  <Music className="w-3.5 h-3.5" />
                  <span>Acoustic Cadence · Melodic Flow</span>
                </div>
                <h4 className="text-2xl font-bold font-display leading-snug">
                  The warmth of wooden acoustic chords
                </h4>
                <p className="text-xs sm:text-sm text-stone-200 mt-1.5 max-w-md">
                  Learning guitar trains an internal sense of tempo, listening closely, and appreciating the rhythm between notes.
                </p>
              </div>
            </div>

            {/* Right Column: Stacked Art & Craft Mosaic */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {/* Collage Tile 2: Fine Art Sketching */}
              <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E5E0D6] shadow-2xs p-6 flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] text-[#5B21B6] flex items-center justify-center">
                      <Brush className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#1C1825] font-display">Graphite & Form</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#878093]">SKETCHPAD</span>
                </div>

                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3">
                  <img
                    src={artImg}
                    alt="Pencil drawing materials"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                <p className="text-xs text-[#5F586C] leading-relaxed">
                  Observing negative space and line weight on paper sharpens how I design balanced web layouts.
                </p>
              </div>

              {/* Collage Tile 3: Handmade Papercraft */}
              <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E5E0D6] shadow-2xs p-6 flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] text-[#5B21B6] flex items-center justify-center">
                      <Scissors className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#1C1825] font-display">Craft & Geometry</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#878093]">PAPERWORK</span>
                </div>

                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3">
                  <img
                    src={craftImg}
                    alt="Handmade craft design"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                <p className="text-xs text-[#5F586C] leading-relaxed">
                  Working with paper origami teaches precise alignment, step-by-step assembly, and spatial awareness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5 — PERSONAL QUOTE
      ======================================== */}
      <section className="py-20 lg:py-28 bg-[#EDE9FE]/30 border-t border-[#ECE7DD] relative overflow-hidden">
        <div 
          className="absolute -top-24 right-1/4 w-80 h-80 bg-[#DDD6FE]/40 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true" 
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtle Decorative Quote Icon */}
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#DDD7CD] text-[#5B21B6] flex items-center justify-center mx-auto mb-6 shadow-xs">
            <Heart className="w-6 h-6 fill-[#5B21B6]/15 text-[#5B21B6]" />
          </div>

          {/* Main Large Quote */}
          <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17141E] font-display leading-[1.2] mb-6">
            "Creativity doesn't always need a screen."
          </blockquote>

          {/* Secondary Quote Line */}
          <p className="text-lg sm:text-xl lg:text-2xl font-medium text-[#5B21B6] max-w-2xl mx-auto leading-relaxed">
            "Sometimes it's a guitar, a pencil, a piece of paper, or simply the freedom to make something with your own hands."
          </p>
        </div>
      </section>

      {/* ========================================
          SECTION 6 — CONNECT IT TO MY WORK
      ======================================== */}
      <section className="py-20 lg:py-24 bg-white border-t border-[#ECE7DD]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B21B6]" />
            <span className="text-xs font-semibold tracking-wider text-[#5B21B6] uppercase font-display">
              Creative Harmony
            </span>
          </div>

          {/* Heading */}
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#17141E] font-display mb-4">
            Creativity Finds Its Way Into My Work.
          </h3>

          {/* Text */}
          <p className="text-base sm:text-lg text-[#5F586C] leading-relaxed mb-8 max-w-xl mx-auto">
            The things I enjoy outside digital work also influence how I think about design, visuals and creating experiences.
          </p>

          {/* Button: Explore My Skills */}
          <div>
            <a
              href="#skills"
              onClick={(e) => handleScrollTo(e, '#skills')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#5B21B6] hover:bg-[#4C1D95] rounded-xl shadow-xs hover:shadow-md transition-all active:scale-[0.99] whitespace-nowrap group"
            >
              <Compass className="w-4 h-4 text-[#DDD6FE]" />
              <span>Explore My Skills</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 ml-0.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
