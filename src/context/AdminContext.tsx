import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface SiteSettings {
  phone: string;
  email: string;
  location: string;
  availability: string;
  heroTagline: string;
  instagram: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  isAdminPanelOpen: boolean;
  isLoginModalOpen: boolean;
  loginError: string | null;
  inquiries: ContactInquiry[];
  siteSettings: SiteSettings;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openAdminPanel: () => void;
  closeAdminPanel: () => void;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  addInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'isRead'>) => void;
  deleteInquiry: (id: string) => void;
  markInquiryRead: (id: string) => void;
  updateSiteSettings: (newSettings: Partial<SiteSettings>) => void;
}

const DEFAULT_EMAIL = 'srishtidigital36@gmail.com';
const DEFAULT_PASSWORD = 'srishti1234';

const DEFAULT_SETTINGS: SiteSettings = {
  phone: '9110069692',
  email: 'srishtidigital36@gmail.com',
  location: 'Memco More, Dhanbad, Jharkhand, India',
  availability: 'Available for new website projects',
  heroTagline: 'Website Creator | Digital Marketing & AI Automation Learner',
  instagram: 'srishti.diaries_',
};

const DEFAULT_SAMPLE_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-1',
    name: 'Sample Client (Demo)',
    email: 'client@example.com',
    phone: '9876543210',
    projectType: 'Website Creation',
    message: 'Hello Srishti, I need a modern portfolio website for my local venture. Let us discuss the requirements!',
    createdAt: new Date(Date.now() - 3600000 * 5).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    isRead: false,
  },
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('srishti_admin_auth') === 'true';
  });

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Inquiries store
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem('srishti_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_SAMPLE_INQUIRIES;
      }
    }
    return DEFAULT_SAMPLE_INQUIRIES;
  });

  // Site settings store
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('srishti_site_settings');
    if (saved) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('srishti_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('srishti_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  const login = (email: string, pass: string): boolean => {
    const storedPass = localStorage.getItem('srishti_admin_pwd') || DEFAULT_PASSWORD;
    const cleanEmail = email.trim().toLowerCase();
    const cleanExpected = DEFAULT_EMAIL.toLowerCase();

    if (cleanEmail === cleanExpected && pass.trim() === storedPass) {
      setIsAuthenticated(true);
      localStorage.setItem('srishti_admin_auth', 'true');
      setLoginError(null);
      setIsLoginModalOpen(false);
      setIsAdminPanelOpen(true);
      return true;
    } else {
      setLoginError('Invalid Email or Password. Please check and try again.');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('srishti_admin_auth');
    setIsAdminPanelOpen(false);
  };

  const openLoginModal = () => {
    setLoginError(null);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginError(null);
    setIsLoginModalOpen(false);
  };

  const openAdminPanel = () => {
    if (isAuthenticated) {
      setIsAdminPanelOpen(true);
    } else {
      openLoginModal();
    }
  };

  const closeAdminPanel = () => {
    setIsAdminPanelOpen(false);
  };

  const addInquiry = (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'isRead'>) => {
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      isRead: false,
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const markInquiryRead = (id: string) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        isAdminPanelOpen,
        isLoginModalOpen,
        loginError,
        inquiries,
        siteSettings,
        openLoginModal,
        closeLoginModal,
        openAdminPanel,
        closeAdminPanel,
        login,
        logout,
        addInquiry,
        deleteInquiry,
        markInquiryRead,
        updateSiteSettings,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
