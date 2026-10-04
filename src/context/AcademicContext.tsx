import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AcademicScores {
  class12: string;
  class10: string;
  bcom: string;
}

interface AcademicContextType {
  scores: AcademicScores;
  updateScores: (newScores: Partial<AcademicScores>) => void;
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
}

const defaultScores: AcademicScores = {
  class12: '79%',
  class10: '84%',
  bcom: 'Undergrad',
};

const AcademicContext = createContext<AcademicContextType | undefined>(undefined);

const STORAGE_KEY = 'srishti_academic_scores';

export const AcademicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scores, setScores] = useState<AcademicScores>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return { ...defaultScores, ...JSON.parse(saved) };
        } catch {
          // ignore error
        }
      }
    }
    return defaultScores;
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  }, [scores]);

  const updateScores = (newScores: Partial<AcademicScores>) => {
    setScores((prev) => ({ ...prev, ...newScores }));
  };

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  return (
    <AcademicContext.Provider
      value={{
        scores,
        updateScores,
        isEditModalOpen,
        openEditModal,
        closeEditModal,
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
};

export const useAcademic = () => {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error('useAcademic must be used within an AcademicProvider');
  }
  return context;
};
