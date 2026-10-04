import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, Sparkles, CheckCircle2, Pencil, Maximize2 } from 'lucide-react';
import { useAcademic } from '../context/AcademicContext';
import { useImageModal } from './ImageModal';
import { useCustomization } from '../context/CustomizationContext';

export const About: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const { scores, openEditModal } = useAcademic();
  const { openImage } = useImageModal();
  const { images, texts, colors } = useCustomization();

  const academicStats = [
    {
      label: 'Class 12 Percentage',
      score: scores.class12,
      subtitle: 'Senior Secondary Examination',
      detail: 'Commerce stream with focus on Business Studies, Accountancy & Economics',
      icon: Award,
    },
    {
      label: 'Class 10 Percentage',
      score: scores.class10,
      subtitle: 'Secondary School Board',
      detail: 'Solid academic foundation with strong problem-solving and analytical ability',
      icon: CheckCircle2,
    },
    {
      label: 'B.Com (Hons)',
      score: scores.bcom,
      subtitle: 'Bachelor of Commerce',
      detail: 'Core focus on financial principles, management, and commercial operations',
      icon: GraduationCap,
    },
    {
      label: 'Current Learning',
      score: 'Web & AI',
      subtitle: 'Modern Digital Skillsets',
      detail: 'Responsive frontend crafting, SEO strategy, and workflow automations',
      icon: BookOpen,
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white dark:bg-[#0B1020] border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Creative Workspace / Study Setup */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Clean Image Frame with taller aspect ratio, Blue-Purple border, and visual pop effect (NO modal) */}
              <div 
                className="group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border-2 border-blue-500/25 hover:border-purple-500/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 ease-out"
              >
                {!imageError ? (
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={images.aboutWorkspace}
                      alt="Creative workspace and study setup"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      onError={() => setImageError(true)}
                      referrerPolicy="no-referrer"
                    />

                    {/* Floating Yellow Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold shadow-md flex items-center gap-1 z-10">
                      <Sparkles className="w-3 h-3 text-slate-950" />
                      <span>Study & Work Desk</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-[3/4] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center p-8 text-center">
                    <BookOpen className="w-12 h-12 text-blue-600 mb-3" />
                    <span className="font-display font-semibold text-lg text-slate-900 dark:text-white">Academic & Creative Workspace</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Dhanbad, Jharkhand, India</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Introduction, Academic Cards */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            {/* Unboxed section kicker */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-blue-600 dark:text-blue-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{texts.aboutKicker || 'Background & Academic Track'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-5">
              {texts.aboutHeading || 'About Me'}
            </h2>

            <div className="space-y-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              <p>{texts.aboutParagraph1}</p>
              {texts.aboutParagraph2 && <p>{texts.aboutParagraph2}</p>}
            </div>

            {/* Academic Highlights Header & Edit Trigger */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Academic Milestones & Scores</span>
              </span>
              <button
                type="button"
                onClick={openEditModal}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-purple-600 hover:underline cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit Percentages</span>
              </button>
            </div>

            {/* Academic Highlight Cards with Yellow Highlighting on Scores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {academicStats.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/50 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        {item.label}
                      </span>
                      <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Important: Yellow Highlighted Score Badge */}
                    <div className="mb-2">
                      <span className="inline-block bg-amber-400 text-slate-950 font-extrabold text-xl font-display px-2.5 py-0.5 rounded-lg shadow-xs ring-1 ring-amber-500/40 tabular-nums">
                        {item.score}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {item.subtitle}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
