import React, { createContext, useContext, useState, useEffect } from 'react';

import defaultHeroPhoto from '../assets/images/srishti_profile_portrait_1791114548405.jpg';
import defaultAboutPhoto from '../assets/images/about_workspace_setup_1791114937933.jpg';
import defaultGuitarPhoto from '../assets/images/hobby_acoustic_guitar_1791101398615.jpg';
import defaultArtPhoto from '../assets/images/hobby_fine_art_sketch_1791101412959.jpg';
import defaultCraftPhoto from '../assets/images/hobby_creative_craft_1791101427479.jpg';

export interface SiteImages {
  heroProfile: string;
  aboutWorkspace: string;
  hobbyGuitar: string;
  hobbyArt: string;
  hobbyCraft: string;
}

export interface SiteTexts {
  // Hero
  heroName: string;
  heroBadge: string;
  heroHeadline: string;
  heroDescription: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;

  // About
  aboutKicker: string;
  aboutHeading: string;
  aboutParagraph1: string;
  aboutParagraph2: string;

  // Skills
  skillsKicker: string;
  skillsHeading: string;
  skillsSubtitle: string;
  skill1Title: string;
  skill1Desc: string;
  skill2Title: string;
  skill2Desc: string;
  skill3Title: string;
  skill3Desc: string;
  skill4Title: string;
  skill4Desc: string;

  // Hobbies
  hobbiesKicker: string;
  hobbiesHeading: string;
  hobbiesSubtitle: string;
  hobby1Title: string;
  hobby1Desc: string;
  hobby2Title: string;
  hobby2Desc: string;
  hobby3Title: string;
  hobby3Desc: string;

  // Contact
  contactHeading: string;
  contactSubtitle: string;
  contactPromise: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  instagram: string;
  availability: string;
}

export interface SiteColors {
  primaryBlue: string;   // e.g. #2563EB
  primaryPurple: string; // e.g. #7C3AED
  highlightYellow: string; // e.g. #F59E0B
  primaryAccent: string; // compatibility
  primaryHover: string;
  accentLight: string;
  bgBase: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
}

const DEFAULT_IMAGES: SiteImages = {
  heroProfile: defaultHeroPhoto,
  aboutWorkspace: defaultAboutPhoto,
  hobbyGuitar: defaultGuitarPhoto,
  hobbyArt: defaultArtPhoto,
  hobbyCraft: defaultCraftPhoto,
};

const DEFAULT_TEXTS: SiteTexts = {
  heroName: 'Srishti Pathak',
  heroBadge: 'COMMERCE • WEB CREATION • DIGITAL SKILLS',
  heroHeadline: 'Blending business understanding with modern digital tools to build thoughtful, clean web experiences.',
  heroDescription: 'I am a Commerce student with a growing passion for modern web creation, digital workflows, and practical business technology.',
  heroCtaPrimary: 'Start a Conversation',
  heroCtaSecondary: 'Explore My Skills',

  aboutKicker: 'Background & Academic Track',
  aboutHeading: 'About Me',
  aboutParagraph1: 'I am a passionate Commerce student exploring how business principles connect with modern technology. While my academic journey in Commerce develops critical analytical thinking, financial awareness, and organizational understanding, I am equally drawn to the creative and practical tools of modern digital creation — building modern websites, experimenting with visual design, and applying digital workflows.',
  aboutParagraph2: 'Rather than treating business and digital skills as separate, I see them as complementary. Whether organizing data, designing a layout, or automating tasks with AI, my goal is always to create clear, useful, and thoughtful work.',

  skillsKicker: 'PRACTICAL CAPABILITIES',
  skillsHeading: 'Skills & Focus Areas',
  skillsSubtitle: 'A balanced blend of analytical commerce studies and practical digital creative tools.',
  skill1Title: 'Website Creation',
  skill1Desc: 'Designing responsive, clean, and user-friendly web pages using modern HTML, CSS, JavaScript, and Tailwind CSS.',
  skill2Title: 'Digital Marketing & SEO',
  skill2Desc: 'Understanding audience engagement, keyword research, meta architecture, and organic discovery strategies.',
  skill3Title: 'Commerce & Business Logic',
  skill3Desc: 'Strong foundation in financial accounting, cost analysis, commercial law, and business organization.',
  skill4Title: 'AI Tools & Automation',
  skill4Desc: 'Leveraging AI workflows, generative prompts, and smart digital tools to optimize research and web creation.',

  hobbiesKicker: 'BEYOND WORK',
  hobbiesHeading: 'Things I Love Creating.',
  hobbiesSubtitle: 'Outside academics and digital work, I enjoy activities that allow me to slow down, experiment and express my creativity.',
  hobby1Title: 'Acoustic Guitar',
  hobby1Desc: 'Learning melodies and fingerpicking patterns. Music is my favorite way to reset and cultivate patient focus.',
  hobby2Title: 'Fine Art & Sketching',
  hobby2Desc: 'Pencil sketching, shading, and observational drawings that train my visual eye for composition and proportion.',
  hobby3Title: 'Creative Craft & Journaling',
  hobby3Desc: 'Handmade stationery, thoughtful papercrafts, and structured journaling for mindful reflection and planning.',

  contactHeading: "Let's Create Something Together.",
  contactSubtitle: "Have a website idea, collaboration, or want to discuss a project? I'd love to hear from you.",
  contactPromise: 'Available for new website projects · Dhanbad & Remote',
  phone: '9110069692',
  whatsapp: '9110069692',
  email: 'srishtidigital36@gmail.com',
  location: 'Memco More, Dhanbad, Jharkhand, India',
  instagram: 'srishti.diaries_',
  availability: 'Available for new website projects',
};

// Royal Blue & Rich Purple palette with Yellow highlights
const LIGHT_COLORS: SiteColors = {
  primaryBlue: '#2563EB',     // Royal Blue
  primaryPurple: '#7C3AED',   // Rich Purple
  highlightYellow: '#F59E0B', // Sunshine Amber Yellow
  primaryAccent: '#2563EB',
  primaryHover: '#1D4ED8',
  accentLight: '#EFF6FF',
  bgBase: '#FFFFFF',          // Pure White for Light Mode
  cardBg: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
};

const DARK_COLORS: SiteColors = {
  primaryBlue: '#3B82F6',     // Bright Electric Blue
  primaryPurple: '#A855F7',   // Bright Violet Purple
  highlightYellow: '#FBBF24', // Bright Gold/Yellow
  primaryAccent: '#3B82F6',
  primaryHover: '#2563EB',
  accentLight: '#1E293B',
  bgBase: '#0A0F1D',         // Midnight Sapphire / Obsidian
  cardBg: '#111827',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
};

interface CustomizationContextType {
  themeMode: 'light' | 'dark';
  toggleThemeMode: () => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
  images: SiteImages;
  texts: SiteTexts;
  colors: SiteColors;
  updateImage: (key: keyof SiteImages, value: string) => void;
  updateText: (key: keyof SiteTexts, value: string) => void;
  updateMultipleTexts: (updated: Partial<SiteTexts>) => void;
  updateColors: (updated: Partial<SiteColors>) => void;
  resetImagesToDefault: () => void;
  resetTextsToDefault: () => void;
  resetColorsToDefault: () => void;
  resetAllToDefault: () => void;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

const STORAGE_KEYS = {
  THEME_MODE: 'srishti_theme_mode',
  IMAGES: 'srishti_portfolio_custom_images',
  TEXTS: 'srishti_portfolio_custom_texts',
  COLORS: 'srishti_portfolio_custom_colors',
};

export const CustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME_MODE);
      if (saved === 'dark' || saved === 'light') return saved;
      return 'light';
    } catch {
      return 'light';
    }
  });

  const [images, setImages] = useState<SiteImages>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.IMAGES);
      return saved ? { ...DEFAULT_IMAGES, ...JSON.parse(saved) } : DEFAULT_IMAGES;
    } catch {
      return DEFAULT_IMAGES;
    }
  });

  const [texts, setTexts] = useState<SiteTexts>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEXTS);
      return saved ? { ...DEFAULT_TEXTS, ...JSON.parse(saved) } : DEFAULT_TEXTS;
    } catch {
      return DEFAULT_TEXTS;
    }
  });

  const baseDefaultColors = themeMode === 'dark' ? DARK_COLORS : LIGHT_COLORS;

  const [colors, setColors] = useState<SiteColors>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COLORS);
      return saved ? { ...baseDefaultColors, ...JSON.parse(saved) } : baseDefaultColors;
    } catch {
      return baseDefaultColors;
    }
  });

  // Keep colors synced when themeMode toggles if not custom-overridden
  const setThemeMode = (mode: 'light' | 'dark') => {
    setThemeModeState(mode);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
    } catch {}
    const newDefaults = mode === 'dark' ? DARK_COLORS : LIGHT_COLORS;
    setColors((prev) => ({
      ...prev,
      bgBase: newDefaults.bgBase,
      cardBg: newDefaults.cardBg,
      textPrimary: newDefaults.textPrimary,
      textSecondary: newDefaults.textSecondary,
      primaryBlue: newDefaults.primaryBlue,
      primaryPurple: newDefaults.primaryPurple,
      highlightYellow: newDefaults.highlightYellow,
      primaryAccent: newDefaults.primaryAccent,
    }));
  };

  const toggleThemeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  // Apply dark mode class and CSS custom variables to :root
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    root.style.setProperty('--color-primary-blue', colors.primaryBlue);
    root.style.setProperty('--color-primary-purple', colors.primaryPurple);
    root.style.setProperty('--color-highlight-yellow', colors.highlightYellow);
    root.style.setProperty('--color-primary', colors.primaryAccent);
    root.style.setProperty('--color-primary-hover', colors.primaryHover);
    root.style.setProperty('--color-bg-base', colors.bgBase);
    root.style.setProperty('--color-card-bg', colors.cardBg);
    root.style.setProperty('--color-text-primary', colors.textPrimary);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
  }, [themeMode, colors]);

  const updateImage = (key: keyof SiteImages, value: string) => {
    setImages((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage quota limit reached for images', err);
      }
      return updated;
    });
  };

  const updateText = (key: keyof SiteTexts, value: string) => {
    setTexts((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEYS.TEXTS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateMultipleTexts = (updatedPartial: Partial<SiteTexts>) => {
    setTexts((prev) => {
      const updated = { ...prev, ...updatedPartial };
      try {
        localStorage.setItem(STORAGE_KEYS.TEXTS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateColors = (updatedPartial: Partial<SiteColors>) => {
    setColors((prev) => {
      const updated = { ...prev, ...updatedPartial };
      try {
        localStorage.setItem(STORAGE_KEYS.COLORS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const resetImagesToDefault = () => {
    setImages(DEFAULT_IMAGES);
    try {
      localStorage.removeItem(STORAGE_KEYS.IMAGES);
    } catch {}
  };

  const resetTextsToDefault = () => {
    setTexts(DEFAULT_TEXTS);
    try {
      localStorage.removeItem(STORAGE_KEYS.TEXTS);
    } catch {}
  };

  const resetColorsToDefault = () => {
    const defaults = themeMode === 'dark' ? DARK_COLORS : LIGHT_COLORS;
    setColors(defaults);
    try {
      localStorage.removeItem(STORAGE_KEYS.COLORS);
    } catch {}
  };

  const resetAllToDefault = () => {
    resetImagesToDefault();
    resetTextsToDefault();
    resetColorsToDefault();
  };

  return (
    <CustomizationContext.Provider
      value={{
        themeMode,
        toggleThemeMode,
        setThemeMode,
        images,
        texts,
        colors,
        updateImage,
        updateText,
        updateMultipleTexts,
        updateColors,
        resetImagesToDefault,
        resetTextsToDefault,
        resetColorsToDefault,
        resetAllToDefault,
      }}
    >
      <div 
        className={themeMode === 'dark' ? 'dark' : ''}
        style={{ 
          backgroundColor: colors.bgBase,
          color: colors.textPrimary,
          minHeight: '100vh',
          transition: 'background-color 0.3s ease, color 0.3s ease'
        }}
      >
        {children}
      </div>
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within CustomizationProvider');
  }
  return context;
};
