import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Laptop, 
  Smartphone, 
  Megaphone, 
  Cpu, 
  Lightbulb, 
  LineChart, 
  Briefcase, 
  Building2, 
  User, 
  Layers, 
  Sparkles, 
  Code2, 
  Mail,
  Compass,
  ArrowUpRight
} from 'lucide-react';

export const Skills: React.FC = () => {
  const [mockupTab, setMockupTab] = useState<'desktop' | 'mobile'>('desktop');

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const contactElem = document.querySelector('#contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact');
    }
  };

  const mainServiceFeatures = [
    'Responsive design',
    'Mobile-friendly layouts',
    'Modern UI',
    'Clean and organized structure',
    'Landing pages',
    'Portfolio websites',
    'Business websites',
  ];

  const otherSkills = [
    {
      title: 'Digital Marketing',
      description: 'Learning how businesses can use digital platforms, content and online strategies to reach their audience.',
      status: 'Currently Learning',
      statusType: 'learning',
      icon: Megaphone,
    },
    {
      title: 'AI Automation',
      description: 'Exploring AI-powered tools and automation to simplify repetitive tasks and improve workflows.',
      status: 'Currently Learning',
      statusType: 'learning',
      icon: Cpu,
    },
    {
      title: 'Creative Thinking',
      description: 'Developing creative ideas and turning them into useful visual and digital experiences.',
      status: 'Active Practice',
      statusType: 'practice',
      icon: Lightbulb,
    },
    {
      title: 'Business & Commerce',
      description: 'Building a foundation in business and commerce through my B.Com (Hons) studies.',
      status: 'Academic Foundation',
      statusType: 'academic',
      icon: LineChart,
    },
  ];

  const approachSteps = [
    {
      number: '01',
      title: 'UNDERSTAND',
      description: 'First, understand the purpose, audience and requirements of the project.',
    },
    {
      number: '02',
      title: 'CREATE',
      description: 'Turn the idea into a clean, modern and user-friendly digital experience.',
    },
    {
      number: '03',
      title: 'IMPROVE',
      description: 'Learn, test and refine the work to make the final result better.',
    },
  ];

  const buildTypes = [
    {
      title: 'Portfolio Website',
      description: 'A professional online space to showcase your skills, work and personal brand.',
      icon: Briefcase,
    },
    {
      title: 'Business Website',
      description: 'A clean online presence for a business, service or local brand.',
      icon: Building2,
    },
    {
      title: 'Personal Website',
      description: 'A personalized website designed around your identity and goals.',
      icon: User,
    },
    {
      title: 'Landing Page',
      description: 'A focused page designed to present an offer, service or idea clearly.',
      icon: Layers,
    },
  ];

  return (
    <div id="skills" className="bg-[#FAF9F5] scroll-mt-20">
      {/* ========================================
          SECTION 1 — PAGE INTRO
      ======================================== */}
      <section className="pt-20 pb-14 sm:pt-28 sm:pb-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Small label: MY SKILLS */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B21B6]" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#5B21B6] uppercase font-display">
              MY SKILLS
            </span>
          </div>

          {/* Large heading: Skills That I'm Building. */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#17141E] font-display mb-5">
            Skills That I'm Building.
          </h2>

          {/* Supporting text */}
          <p className="text-base sm:text-lg lg:text-xl text-[#5F586C] max-w-2xl mx-auto leading-relaxed">
            I'm continuously learning, experimenting and turning new knowledge into practical digital skills.
          </p>
        </div>
      </section>

      {/* ========================================
          SECTION 2 — MAIN SERVICE: WEBSITE CREATION
      ======================================== */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-500/20 dark:border-blue-500/30 shadow-lg hover:shadow-xl transition-all overflow-hidden p-8 sm:p-10 lg:p-12">
            {/* Ambient subtle decorative Blue & Purple tint */}
            <div 
              className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-500/15 via-purple-600/15 to-transparent rounded-full blur-3xl pointer-events-none -z-0"
              aria-hidden="true" 
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Service Details */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left">
                {/* Small label: MY MAIN SERVICE with Yellow Dot */}
                <div className="inline-flex items-center gap-2 mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase font-display">
                    MY MAIN SERVICE
                  </span>
                </div>

                {/* Large heading: Website Creation */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-4">
                  Website Creation
                </h3>

                {/* Description */}
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  I create modern, responsive and visually appealing websites designed to give individuals and small businesses a professional online presence.
                </p>

                {/* List of features with checkmarks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                  {mainServiceFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm font-medium text-slate-800 dark:text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button: Blue & Purple Gradient */}
                <div>
                  <a
                    href="#contact"
                    onClick={handleScrollToContact}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] whitespace-nowrap cursor-pointer"
                  >
                    <span>Let's Build Your Website</span>
                    <ArrowRight className="w-4 h-4 ml-0.5 text-amber-300" />
                  </a>
                </div>
              </div>

              {/* Right Column: Abstract Website / Browser Mockup Illustration */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-[#DDD7CD] bg-[#FAF9F6] shadow-sm overflow-hidden">
                  {/* Browser Window Bar */}
                  <div className="px-4 py-3 bg-[#F0EDE6] border-b border-[#DDD7CD] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#E57373]/80" />
                      <span className="w-3 h-3 rounded-full bg-[#FFB74D]/80" />
                      <span className="w-3 h-3 rounded-full bg-[#81C784]/80" />
                    </div>

                    {/* URL bar */}
                    <div className="px-3 py-1 rounded-md bg-white border border-[#DDD7CD] text-xs font-mono text-[#6A6375] flex items-center gap-1.5 w-48 sm:w-64 truncate">
                      <span className="text-[#5B21B6]">https://</span>
                      <span className="truncate">your-brand.com</span>
                    </div>

                    {/* Device toggle controls */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setMockupTab('desktop')}
                        title="Desktop view"
                        className={`p-1.5 rounded-md text-xs transition-colors ${
                          mockupTab === 'desktop' ? 'bg-white text-[#5B21B6] shadow-2xs' : 'text-[#7D7689]'
                        }`}
                      >
                        <Laptop className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setMockupTab('mobile')}
                        title="Mobile view"
                        className={`p-1.5 rounded-md text-xs transition-colors ${
                          mockupTab === 'mobile' ? 'bg-white text-[#5B21B6] shadow-2xs' : 'text-[#7D7689]'
                        }`}
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Browser Viewport Content */}
                  <div className="p-5 sm:p-6 bg-white min-h-[290px] flex flex-col justify-between">
                    {mockupTab === 'desktop' ? (
                      /* Desktop Mockup Preview */
                      <div className="space-y-4">
                        {/* Mock header */}
                        <div className="flex items-center justify-between pb-3 border-b border-[#F0EDE6]">
                          <div className="w-20 h-3 rounded-md bg-[#5B21B6]/80" />
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-2 rounded-sm bg-[#DDD7CD]" />
                            <div className="w-10 h-2 rounded-sm bg-[#DDD7CD]" />
                            <div className="w-14 h-5 rounded-md bg-[#EDE9FE]" />
                          </div>
                        </div>

                        {/* Mock Hero content */}
                        <div className="grid grid-cols-12 gap-3 items-center py-2">
                          <div className="col-span-7 space-y-2">
                            <div className="w-16 h-2 rounded-sm bg-[#7C3AED]/50" />
                            <div className="w-full h-5 rounded-md bg-[#1E1B24]" />
                            <div className="w-4/5 h-3 rounded-sm bg-[#A09AAB]" />
                            <div className="w-3/5 h-3 rounded-sm bg-[#A09AAB]" />
                            <div className="pt-1 flex gap-2">
                              <div className="w-20 h-6 rounded-md bg-[#5B21B6]" />
                              <div className="w-16 h-6 rounded-md border border-[#DDD7CD]" />
                            </div>
                          </div>
                          <div className="col-span-5">
                            <div className="aspect-[4/3] rounded-xl bg-gradient-to-tr from-[#EDE9FE] to-[#FAF8F5] border border-[#DDD7CD] flex flex-col items-center justify-center p-3 text-center">
                              <Sparkles className="w-6 h-6 text-[#5B21B6] mb-1.5" />
                              <div className="w-12 h-2 rounded-xs bg-[#5B21B6]/30" />
                            </div>
                          </div>
                        </div>

                        {/* Mock cards row */}
                        <div className="grid grid-cols-3 gap-2.5 pt-1">
                          <div className="p-2.5 rounded-lg bg-[#FAF9F5] border border-[#EAE5DC] space-y-1.5">
                            <div className="w-5 h-5 rounded-md bg-[#EDE9FE]" />
                            <div className="w-12 h-2 rounded-xs bg-[#2E2838]" />
                            <div className="w-full h-1.5 rounded-xs bg-[#D0CAC0]" />
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#FAF9F5] border border-[#EAE5DC] space-y-1.5">
                            <div className="w-5 h-5 rounded-md bg-[#EDE9FE]" />
                            <div className="w-12 h-2 rounded-xs bg-[#2E2838]" />
                            <div className="w-full h-1.5 rounded-xs bg-[#D0CAC0]" />
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#FAF9F5] border border-[#EAE5DC] space-y-1.5">
                            <div className="w-5 h-5 rounded-md bg-[#EDE9FE]" />
                            <div className="w-12 h-2 rounded-xs bg-[#2E2838]" />
                            <div className="w-full h-1.5 rounded-xs bg-[#D0CAC0]" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Mobile Mockup Preview */
                      <div className="max-w-[210px] mx-auto py-2 px-3 border border-[#DDD7CD] rounded-2xl bg-[#FAF9F5] shadow-2xs space-y-3">
                        <div className="flex items-center justify-between pb-1.5 border-b border-[#ECE7DD]">
                          <div className="w-12 h-2 rounded-sm bg-[#5B21B6]" />
                          <div className="w-4 h-3 rounded-xs bg-[#DDD7CD]" />
                        </div>
                        <div className="space-y-1.5 text-center">
                          <div className="w-full h-4 rounded-md bg-[#1E1B24] mx-auto" />
                          <div className="w-3/4 h-2 rounded-xs bg-[#9B94A7] mx-auto" />
                          <div className="w-16 h-5 rounded-md bg-[#5B21B6] mx-auto mt-2" />
                        </div>
                        <div className="aspect-[16/9] rounded-lg bg-gradient-to-tr from-[#EDE9FE] to-white border border-[#DDD7CD] flex items-center justify-center">
                          <Code2 className="w-4 h-4 text-[#5B21B6]" />
                        </div>
                        <div className="p-2 rounded-md bg-white border border-[#EAE5DC] space-y-1">
                          <div className="w-10 h-2 rounded-xs bg-[#2E2838]" />
                          <div className="w-full h-1 rounded-xs bg-[#DDD7CD]" />
                        </div>
                      </div>
                    )}

                    {/* Bottom illustration label */}
                    <div className="pt-3 border-t border-[#F0EDE6] flex items-center justify-between text-[11px] text-[#787184]">
                      <span>Clean semantic code & responsive layouts</span>
                      <span className="font-mono text-[10px] text-[#5B21B6]">HTML · CSS · TAILWIND</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3 — OTHER SKILLS I'M DEVELOPING
      ======================================== */}
      <section className="py-20 lg:py-24 bg-slate-100/70 dark:bg-[#0B1020] border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-display mb-3">
              Other Skills I'm Developing
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Expanding my knowledge beyond web development to build well-rounded commercial and creative capabilities.
            </p>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherSkills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon & Yellow Highlight Status Label */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 shadow-xs ring-1 ring-amber-500/40">
                        {skill.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-2.5">
                      {skill.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  {/* Clean unboxed indicator */}
                  <div className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    <span>Focus Area · Practical Application</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4 — HOW I WORK (MY APPROACH)
      ======================================== */}
      <section className="py-20 lg:py-28 border-t border-[#ECE7DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#17141E] font-display mb-3">
              My Approach
            </h3>
            <p className="text-base text-[#5F586C]">
              A disciplined, three-step methodology for turning ideas into clean digital solutions.
            </p>
          </div>

          {/* 3-Step Process (Horizontal on Desktop, Vertical on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {approachSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-7 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs hover:shadow-xs hover:border-[#5B21B6]/30 transition-all"
              >
                {/* Number */}
                <div className="text-3xl sm:text-4xl font-bold text-[#5B21B6] font-display tabular-nums mb-3">
                  {step.number}
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-[#1C1825] font-display uppercase tracking-wide mb-2.5">
                  {step.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-[#5F586C] leading-relaxed">
                  {step.description}
                </p>

                {/* Connecting arrow indicator on desktop for steps 1 and 2 */}
                {idx < approachSteps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-[#DDD7CD] shadow-2xs items-center justify-center text-[#5B21B6]">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5 — WHAT I CAN CREATE
      ======================================== */}
      <section className="py-20 lg:py-24 bg-[#F6F4EE]/70 border-t border-[#ECE7DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#17141E] font-display mb-3">
              What Can I Build?
            </h3>
            <p className="text-base text-[#5F586C]">
              Tailored website solutions crafted with attention to visual hierarchy, performance, and audience clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {buildTypes.map((type, idx) => {
              const Icon = type.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs hover:shadow-md hover:border-[#5B21B6]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-[#F4EFFE] text-[#5B21B6] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-[#1C1825] font-display mb-2">
                      {type.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5F586C] leading-relaxed">
                      {type.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#EFECE4] flex items-center gap-1.5 text-xs font-semibold text-[#5B21B6]">
                    <span>Custom Built</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 6 — SKILL DEVELOPMENT (CURRENTLY LEARNING)
      ======================================== */}
      <section className="py-16 border-t border-[#ECE7DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5E0D6] shadow-2xs flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#5B21B6] animate-pulse" />
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5B21B6] font-display">
                  Currently Learning
                </h4>
              </div>
              <p className="text-sm sm:text-base text-[#5F586C] leading-relaxed">
                "Learning is an ongoing process, and I'm focused on turning knowledge into practical skills."
              </p>
            </div>

            {/* Subtle Learning Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-[#FAF9F6] border border-[#DDD7CD] flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                <span className="text-sm font-semibold text-[#2E2838]">Digital Marketing</span>
                <span className="text-[11px] font-medium text-[#6B21A8] bg-[#EDE9FE] px-2 py-0.5 rounded-md">
                  Learning
                </span>
              </div>

              <div className="px-4 py-2 rounded-xl bg-[#FAF9F6] border border-[#DDD7CD] flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                <span className="text-sm font-semibold text-[#2E2838]">AI Automation</span>
                <span className="text-[11px] font-medium text-[#6B21A8] bg-[#EDE9FE] px-2 py-0.5 rounded-md">
                  Learning
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 7 — CALL TO ACTION
      ======================================== */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-[#F6F4EE]/60 to-[#FAF9F5] border-t border-[#ECE7DD]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17141E] font-display mb-4">
            Have a Website Idea?
          </h3>
          <p className="text-base sm:text-lg text-[#5F586C] max-w-xl mx-auto leading-relaxed mb-8">
            Let's turn your idea into a clean and modern online presence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Primary button: Start a Conversation */}
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#5B21B6] hover:bg-[#4C1D95] rounded-xl shadow-xs hover:shadow-md transition-all active:scale-[0.99] whitespace-nowrap group"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>

            {/* Secondary button: Contact Me */}
            <a
              href="mailto:srishtidigital36@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-[#292333] bg-white hover:bg-[#F9F7F2] border border-[#DDD7CD] hover:border-[#5B21B6]/40 rounded-xl shadow-2xs transition-all active:scale-[0.99] whitespace-nowrap"
            >
              <Mail className="w-4 h-4 text-[#5B21B6]" />
              <span>Contact Me</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
