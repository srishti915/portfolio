import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

export const FloatingWhatsApp: React.FC = () => {
  const { texts } = useCustomization();
  const rawNumber = (texts.whatsapp || '9110069692').replace(/[^0-9]/g, '');
  const cleanNumber = rawNumber.length === 10 ? `91${rawNumber}` : rawNumber;
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    `Hello ${texts.heroName || 'Srishti'}, I visited your portfolio and would like to connect!`
  )}`;

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly on WhatsApp"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 font-semibold text-sm cursor-pointer"
      >
        {/* WhatsApp Icon */}
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
        </div>
        <span className="hidden sm:inline font-sans">Chat on WhatsApp</span>
      </a>
    </aside>
  );
};
