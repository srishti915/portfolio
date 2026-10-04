import React, { createContext, useContext, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageModalContextType {
  openImage: (src: string, alt?: string, title?: string) => void;
  closeImage: () => void;
}

const ImageModalContext = createContext<ImageModalContextType | undefined>(undefined);

export const ImageModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeImage, setActiveImage] = useState<{ src: string; alt?: string; title?: string } | null>(null);

  const openImage = (src: string, alt?: string, title?: string) => {
    setActiveImage({ src, alt, title });
  };

  const closeImage = () => {
    setActiveImage(null);
  };

  return (
    <ImageModalContext.Provider value={{ openImage, closeImage }}>
      {children}

      {/* Pop-up Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-zoom-out"
          onClick={closeImage}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeImage}
              aria-label="Close preview"
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all hover:scale-110 cursor-pointer shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="relative overflow-hidden bg-[#FAF9F5] flex items-center justify-center">
              <img
                src={activeImage.src}
                alt={activeImage.alt || 'Full size preview'}
                className="max-h-[80vh] w-auto max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Optional Title Bar */}
            {activeImage.title && (
              <div className="px-6 py-3.5 bg-white border-t border-[#ECE7DD] flex items-center justify-between">
                <span className="font-display font-bold text-sm text-[#1C1825]">
                  {activeImage.title}
                </span>
                <span className="text-xs text-[#6F687D]">Click outside or ✕ to close</span>
              </div>
            )}
          </div>
        </div>
      )}
    </ImageModalContext.Provider>
  );
};

export const useImageModal = () => {
  const context = useContext(ImageModalContext);
  if (!context) {
    throw new Error('useImageModal must be used within an ImageModalProvider');
  }
  return context;
};
