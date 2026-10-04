import React, { useState } from 'react';
import { 
  X, 
  LogOut, 
  MessageSquare, 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Check, 
  Trash2, 
  ExternalLink, 
  ShieldCheck, 
  Key, 
  User, 
  Save, 
  RefreshCw,
  Clock,
  Sparkles,
  Inbox,
  Image as ImageIcon,
  Type,
  Palette,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useAcademic } from '../context/AcademicContext';
import { useCustomization } from '../context/CustomizationContext';

export const AdminPanel: React.FC = () => {
  const { 
    isAdminPanelOpen, 
    closeAdminPanel, 
    logout, 
    inquiries, 
    deleteInquiry, 
    markInquiryRead,
  } = useAdmin();

  const { scores, updateScores } = useAcademic();
  const { 
    images, 
    texts, 
    colors, 
    updateImage, 
    updateMultipleTexts, 
    updateColors, 
    resetImagesToDefault, 
    resetTextsToDefault, 
    resetColorsToDefault,
    resetAllToDefault 
  } = useCustomization();

  const [activeTab, setActiveTab] = useState<'inquiries' | 'images' | 'texts' | 'colors' | 'academics' | 'security'>('inquiries');

  // Academic inputs
  const [class12, setClass12] = useState(scores.class12);
  const [class10, setClass10] = useState(scores.class10);
  const [bcom, setBcom] = useState(scores.bcom);
  const [academicSaved, setAcademicSaved] = useState(false);

  // Text inputs local state
  const [localTexts, setLocalTexts] = useState(texts);
  const [textsSaved, setTextsSaved] = useState(false);

  // Color inputs local state
  const [localPrimary, setLocalPrimary] = useState(colors.primaryAccent);
  const [localBg, setLocalBg] = useState(colors.bgBase);
  const [colorsSaved, setColorsSaved] = useState(false);

  // Security password change
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [pwdMessage, setPwdMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isAdminPanelOpen) return null;

  const handleSaveAcademics = (e: React.FormEvent) => {
    e.preventDefault();
    updateScores({
      class12: class12.trim().endsWith('%') ? class12.trim() : `${class12.trim()}%`,
      class10: class10.trim().endsWith('%') ? class10.trim() : `${class10.trim()}%`,
      bcom: bcom.trim() || 'Undergrad',
    });
    setAcademicSaved(true);
    setTimeout(() => setAcademicSaved(false), 2000);
  };

  const handleSaveTexts = (e: React.FormEvent) => {
    e.preventDefault();
    updateMultipleTexts(localTexts);
    setTextsSaved(true);
    setTimeout(() => setTextsSaved(false), 2000);
  };

  const handleSaveColors = (e: React.FormEvent) => {
    e.preventDefault();
    updateColors({
      primaryAccent: localPrimary,
      primaryHover: localPrimary,
      bgBase: localBg,
    });
    setColorsSaved(true);
    setTimeout(() => setColorsSaved(false), 2000);
  };

  const handleImageFileChange = (key: keyof typeof images, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        updateImage(key, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMessage(null);

    const storedPass = localStorage.getItem('srishti_admin_password') || 'srishti1234';
    if (currentPwd !== storedPass) {
      setPwdMessage({ type: 'error', text: 'Current password is not correct.' });
      return;
    }
    if (newPwd.length < 6) {
      setPwdMessage({ type: 'error', text: 'New password must have at least 6 characters.' });
      return;
    }
    localStorage.setItem('srishti_admin_password', newPwd);
    setPwdMessage({ type: 'success', text: 'Password successfully updated!' });
    setCurrentPwd('');
    setNewPwd('');
  };

  const unreadCount = inquiries.filter((i) => !i.isRead).length;

  const colorPresets = [
    { name: 'Royal Violet (Default)', primary: '#5B21B6', bg: '#FAF9F5' },
    { name: 'Modern Indigo', primary: '#4338CA', bg: '#FAF9F5' },
    { name: 'Emerald Forest', primary: '#059669', bg: '#F5FAF7' },
    { name: 'Rose Crimson', primary: '#BE185D', bg: '#FAF5F5' },
    { name: 'Sunset Amber', primary: '#D97706', bg: '#FFFBEB' },
    { name: 'Midnight Dark', primary: '#8B5CF6', bg: '#13111C' },
    { name: 'Pure Minimalist Slate', primary: '#1E293B', bg: '#F8FAFC' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeAdminPanel}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-[#DDD8CD] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= MODAL HEADER ================= */}
        <header className="px-6 py-5 bg-[#FAF9F5] border-b border-[#ECE7DD] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5B21B6] text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-[#1C1825]">
                  Srishti's Complete Admin Dashboard
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  Full Control Mode
                </span>
              </div>
              <p className="text-xs text-[#6F687D]">
                Edit images, texts, colors, academics & view inquiries in real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <button
              type="button"
              onClick={closeAdminPanel}
              aria-label="Close Admin Panel"
              className="p-2 rounded-xl text-[#7A7387] hover:text-[#1C1825] hover:bg-[#EFECE6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* ================= TABS NAVIGATION ================= */}
        <nav className="flex items-center overflow-x-auto border-b border-[#ECE7DD] bg-white px-6 gap-2 text-xs font-semibold text-[#665F72]">
          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'inquiries'
                ? 'border-[#5B21B6] text-[#5B21B6]'
                : 'border-transparent hover:text-[#1C1825]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Inquiries</span>
            {unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#5B21B6] text-white text-[10px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('images')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'images'
                ? 'border-[#5B21B6] text-[#5B21B6]'
                : 'border-transparent hover:text-[#1C1825]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Manage All Images</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('texts')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'texts'
                ? 'border-[#5B21B6] text-[#5B21B6]'
                : 'border-transparent hover:text-[#1C1825]'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Edit All Texts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('colors')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'colors'
                ? 'border-[#5B21B6] text-[#5B21B6]'
                : 'border-transparent hover:text-[#1C1825]'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Theme & Colors</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('academics')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'academics'
                ? 'border-[#5B21B6] text-[#5B21B6]'
                : 'border-transparent hover:text-[#1C1825]'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Academic Scores</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'security'
                ? 'border-[#5B21B6] text-[#5B21B6]'
                : 'border-transparent hover:text-[#1C1825]'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Security & Pass</span>
          </button>
        </nav>

        {/* ================= TAB CONTENTS ================= */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#FAF9F6]">
          {/* ================= TAB 1: INQUIRIES ================= */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#1E1B24] font-display">
                    Received Messages ({inquiries.length})
                  </h4>
                  <p className="text-xs text-[#6C6578]">
                    Inquiries sent through your portfolio's contact form.
                  </p>
                </div>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-2xl border border-[#E5E0D6] p-8">
                  <Inbox className="w-12 h-12 text-[#9B94A7] mx-auto mb-3" />
                  <h5 className="font-semibold text-sm text-[#1E1B24]">No Inquiries Yet</h5>
                  <p className="text-xs text-[#6F687D] max-w-sm mx-auto mt-1">
                    When visitors fill out the "Start a Conversation" form, their messages will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className={`p-5 rounded-2xl bg-white border transition-all ${
                        inq.isRead ? 'border-[#E5E0D6] opacity-90' : 'border-[#5B21B6]/50 shadow-xs ring-1 ring-[#5B21B6]/20'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ECE7DD]">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-base text-[#1E1B24]">{inq.name}</span>
                            {!inq.isRead && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#5B21B6] text-white">
                                NEW
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#F4EFFE] text-[#5B21B6]">
                              {inq.projectType}
                            </span>
                          </div>
                          <span className="text-xs text-[#7B7487] flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {inq.createdAt}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {!inq.isRead && (
                            <button
                              type="button"
                              onClick={() => markInquiryRead(inq.id)}
                              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#F4EFFE] text-[#5B21B6] hover:bg-[#DDD6FE] transition-colors cursor-pointer"
                            >
                              Mark Read
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteInquiry(inq.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="py-3 text-sm text-[#3E3847] leading-relaxed whitespace-pre-wrap">
                        {inq.message}
                      </div>

                      <div className="pt-3 border-t border-[#ECE7DD] flex flex-wrap items-center gap-4 text-xs font-medium text-[#5B21B6]">
                        <a
                          href={`mailto:${inq.email}?subject=Regarding%20your%20project%20inquiry`}
                          className="flex items-center gap-1.5 hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply to {inq.email}</span>
                        </a>
                        {inq.phone && (
                          <a
                            href={`https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-emerald-600 hover:underline"
                          >
                            <span>WhatsApp: {inq.phone}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 2: MANAGE ALL IMAGES ================= */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-[#1E1B24] font-display">
                    Website Images Manager
                  </h4>
                  <p className="text-xs text-[#6C6578]">
                    Upload your photos directly from your phone/computer or paste image URLs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetImagesToDefault}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DDD8CD] bg-white hover:bg-stone-50 text-xs font-semibold text-[#4B4456] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Images</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Hero Profile Photo */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-sm text-[#1E1B24]">1. Hero Profile Portrait</h5>
                      <span className="text-[11px] text-[#6F687D]">Main photo shown at the top of the website</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src={images.heroProfile}
                      alt="Hero Preview"
                      className="w-20 h-24 rounded-xl object-cover border border-[#DDD8CD] shadow-2xs"
                    />
                    <div className="flex-1 space-y-2">
                      <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-semibold cursor-pointer transition-colors shadow-2xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload New Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileChange('heroProfile', e.target.files?.[0] || null)}
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Or paste image URL"
                        value={images.heroProfile.startsWith('data:') ? '' : images.heroProfile}
                        onChange={(e) => updateImage('heroProfile', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6] text-[#1E1B24]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. About Workspace Photo */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-sm text-[#1E1B24]">2. About Me Workspace Photo</h5>
                      <span className="text-[11px] text-[#6F687D]">Desk setup photograph in About Me section</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src={images.aboutWorkspace}
                      alt="About Preview"
                      className="w-20 h-24 rounded-xl object-cover border border-[#DDD8CD] shadow-2xs"
                    />
                    <div className="flex-1 space-y-2">
                      <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-semibold cursor-pointer transition-colors shadow-2xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload New Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileChange('aboutWorkspace', e.target.files?.[0] || null)}
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Or paste image URL"
                        value={images.aboutWorkspace.startsWith('data:') ? '' : images.aboutWorkspace}
                        onChange={(e) => updateImage('aboutWorkspace', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6] text-[#1E1B24]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Hobby Guitar */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs space-y-4">
                  <div>
                    <h5 className="font-bold text-sm text-[#1E1B24]">3. Hobby: Acoustic Guitar Photo</h5>
                    <span className="text-[11px] text-[#6F687D]">Photo for first hobby card</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src={images.hobbyGuitar}
                      alt="Guitar Preview"
                      className="w-20 h-20 rounded-xl object-cover border border-[#DDD8CD]"
                    />
                    <div className="flex-1 space-y-2">
                      <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-semibold cursor-pointer transition-colors shadow-2xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileChange('hobbyGuitar', e.target.files?.[0] || null)}
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Or paste image URL"
                        value={images.hobbyGuitar.startsWith('data:') ? '' : images.hobbyGuitar}
                        onChange={(e) => updateImage('hobbyGuitar', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6] text-[#1E1B24]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Hobby Art */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs space-y-4">
                  <div>
                    <h5 className="font-bold text-sm text-[#1E1B24]">4. Hobby: Fine Art & Sketching Photo</h5>
                    <span className="text-[11px] text-[#6F687D]">Photo for second hobby card</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src={images.hobbyArt}
                      alt="Art Preview"
                      className="w-20 h-20 rounded-xl object-cover border border-[#DDD8CD]"
                    />
                    <div className="flex-1 space-y-2">
                      <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-semibold cursor-pointer transition-colors shadow-2xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileChange('hobbyArt', e.target.files?.[0] || null)}
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Or paste image URL"
                        value={images.hobbyArt.startsWith('data:') ? '' : images.hobbyArt}
                        onChange={(e) => updateImage('hobbyArt', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6] text-[#1E1B24]"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Hobby Craft */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs space-y-4 md:col-span-2">
                  <div>
                    <h5 className="font-bold text-sm text-[#1E1B24]">5. Hobby: Creative Craft Photo</h5>
                    <span className="text-[11px] text-[#6F687D]">Photo for third hobby card</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src={images.hobbyCraft}
                      alt="Craft Preview"
                      className="w-20 h-20 rounded-xl object-cover border border-[#DDD8CD]"
                    />
                    <div className="flex-1 space-y-2">
                      <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-semibold cursor-pointer transition-colors shadow-2xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileChange('hobbyCraft', e.target.files?.[0] || null)}
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Or paste image URL"
                        value={images.hobbyCraft.startsWith('data:') ? '' : images.hobbyCraft}
                        onChange={(e) => updateImage('hobbyCraft', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6] text-[#1E1B24]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: EDIT ALL TEXTS ================= */}
          {activeTab === 'texts' && (
            <form onSubmit={handleSaveTexts} className="space-y-6 max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-[#1E1B24] font-display">
                    Edit All Website Texts & Content
                  </h4>
                  <p className="text-xs text-[#6C6578]">
                    Modify any headline, paragraph, bio, or contact information.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={resetTextsToDefault}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DDD8CD] bg-white hover:bg-stone-50 text-xs font-semibold text-[#4B4456] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Default Texts</span>
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{textsSaved ? 'Saved!' : 'Save All Changes'}</span>
                  </button>
                </div>
              </div>

              {/* 1. Hero Section Texts */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs space-y-4">
                <h5 className="font-bold text-sm text-[#5B21B6] border-b border-[#ECE7DD] pb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Hero / Home Section</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#383242] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      value={localTexts.heroName}
                      onChange={(e) => setLocalTexts({ ...localTexts, heroName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#383242] mb-1">Top Badge Kicker</label>
                    <input
                      type="text"
                      value={localTexts.heroBadge}
                      onChange={(e) => setLocalTexts({ ...localTexts, heroBadge: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#383242] mb-1">Positioning Headline</label>
                  <input
                    type="text"
                    value={localTexts.heroHeadline}
                    onChange={(e) => setLocalTexts({ ...localTexts, heroHeadline: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#383242] mb-1">Short Introduction Bio</label>
                  <textarea
                    rows={2}
                    value={localTexts.heroDescription}
                    onChange={(e) => setLocalTexts({ ...localTexts, heroDescription: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6]"
                  />
                </div>
              </div>

              {/* 2. About Me Section Texts */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs space-y-4">
                <h5 className="font-bold text-sm text-[#5B21B6] border-b border-[#ECE7DD] pb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>About Me Section</span>
                </h5>
                <div>
                  <label className="block text-xs font-semibold text-[#383242] mb-1">About Heading</label>
                  <input
                    type="text"
                    value={localTexts.aboutHeading}
                    onChange={(e) => setLocalTexts({ ...localTexts, aboutHeading: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#383242] mb-1">Story Paragraph 1</label>
                  <textarea
                    rows={3}
                    value={localTexts.aboutParagraph1}
                    onChange={(e) => setLocalTexts({ ...localTexts, aboutParagraph1: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#383242] mb-1">Story Paragraph 2</label>
                  <textarea
                    rows={3}
                    value={localTexts.aboutParagraph2}
                    onChange={(e) => setLocalTexts({ ...localTexts, aboutParagraph2: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6]"
                  />
                </div>
              </div>

              {/* 3. Direct Contact Details */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs space-y-4">
                <h5 className="font-bold text-sm text-[#5B21B6] border-b border-[#ECE7DD] pb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Direct Contact Numbers & IDs</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#383242] mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={localTexts.whatsapp}
                      onChange={(e) => setLocalTexts({ ...localTexts, whatsapp: e.target.value })}
                      placeholder="9110069692"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#383242] mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={localTexts.phone}
                      onChange={(e) => setLocalTexts({ ...localTexts, phone: e.target.value })}
                      placeholder="9110069692"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#383242] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={localTexts.email}
                      onChange={(e) => setLocalTexts({ ...localTexts, email: e.target.value })}
                      placeholder="srishtidigital36@gmail.com"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#383242] mb-1">Instagram Handle</label>
                    <input
                      type="text"
                      value={localTexts.instagram}
                      onChange={(e) => setLocalTexts({ ...localTexts, instagram: e.target.value })}
                      placeholder="srishti.diaries_"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#383242] mb-1">Location</label>
                  <input
                    type="text"
                    value={localTexts.location}
                    onChange={(e) => setLocalTexts({ ...localTexts, location: e.target.value })}
                    placeholder="Memco More, Dhanbad, Jharkhand, India"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD8CD] bg-[#FAF9F6]"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{textsSaved ? 'Saved Successfully!' : 'Save All Website Texts'}</span>
                </button>
              </div>
            </form>
          )}

          {/* ================= TAB 4: THEME & COLORS ================= */}
          {activeTab === 'colors' && (
            <form onSubmit={handleSaveColors} className="space-y-6 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-[#1E1B24] font-display">
                    Theme & Color Palette
                  </h4>
                  <p className="text-xs text-[#6C6578]">
                    Instantly change the primary brand color and page background.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={resetColorsToDefault}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DDD8CD] bg-white hover:bg-stone-50 text-xs font-semibold text-[#4B4456] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Colors</span>
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{colorsSaved ? 'Colors Applied!' : 'Apply Theme'}</span>
                  </button>
                </div>
              </div>

              {/* Preset Palettes */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs space-y-4">
                <h5 className="font-bold text-sm text-[#1E1B24]">Curated Color Presets</h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setLocalPrimary(preset.primary);
                        setLocalBg(preset.bg);
                        updateColors({ primaryAccent: preset.primary, bgBase: preset.bg });
                      }}
                      className="p-3 rounded-xl border border-[#DDD8CD] hover:border-[#5B21B6] text-left transition-all hover:scale-102 flex items-center gap-2.5 cursor-pointer bg-white"
                    >
                      <div
                        className="w-5 h-5 rounded-full shadow-xs shrink-0"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span className="text-xs font-medium text-[#2E2838] truncate">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Color Pickers */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs space-y-5">
                <h5 className="font-bold text-sm text-[#1E1B24]">Custom Hex Color Pickers</h5>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF9F5] border border-[#DDD8CD]">
                  <div>
                    <span className="block text-xs font-bold text-[#1E1B24]">Primary Accent Color</span>
                    <span className="text-[11px] text-[#6F687D]">Used for main buttons, highlights, badges, and icons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={localPrimary}
                      onChange={(e) => {
                        setLocalPrimary(e.target.value);
                        updateColors({ primaryAccent: e.target.value });
                      }}
                      className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0"
                    />
                    <input
                      type="text"
                      value={localPrimary}
                      onChange={(e) => {
                        setLocalPrimary(e.target.value);
                        updateColors({ primaryAccent: e.target.value });
                      }}
                      className="w-24 px-2 py-1.5 text-xs font-mono rounded-lg border border-[#DDD8CD] text-center"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF9F5] border border-[#DDD8CD]">
                  <div>
                    <span className="block text-xs font-bold text-[#1E1B24]">Page Background Color</span>
                    <span className="text-[11px] text-[#6F687D]">Base background color across the entire website</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={localBg}
                      onChange={(e) => {
                        setLocalBg(e.target.value);
                        updateColors({ bgBase: e.target.value });
                      }}
                      className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0"
                    />
                    <input
                      type="text"
                      value={localBg}
                      onChange={(e) => {
                        setLocalBg(e.target.value);
                        updateColors({ bgBase: e.target.value });
                      }}
                      className="w-24 px-2 py-1.5 text-xs font-mono rounded-lg border border-[#DDD8CD] text-center"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* ================= TAB 5: ACADEMIC SCORES ================= */}
          {activeTab === 'academics' && (
            <div className="max-w-xl mx-auto space-y-5">
              <div>
                <h4 className="text-base font-bold text-[#1E1B24] font-display">
                  Update Academic Milestone Scores
                </h4>
                <p className="text-xs text-[#6C6578]">
                  These percentages sync live with both your Hero and About Me sections.
                </p>
              </div>

              <form onSubmit={handleSaveAcademics} className="p-6 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs space-y-4">
                {academicSaved && (
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Academic scores successfully updated on the website!</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#383242] mb-1.5">
                    Class 12 Percentage
                  </label>
                  <input
                    type="text"
                    required
                    value={class12}
                    onChange={(e) => setClass12(e.target.value)}
                    placeholder="79%"
                    className="w-full px-4 py-3 rounded-xl border border-[#DDD7CD] bg-[#FAF9F6] text-sm text-[#1E1B24] font-bold focus:ring-2 focus:ring-[#5B21B6] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#383242] mb-1.5">
                    Class 10 Percentage
                  </label>
                  <input
                    type="text"
                    required
                    value={class10}
                    onChange={(e) => setClass10(e.target.value)}
                    placeholder="84%"
                    className="w-full px-4 py-3 rounded-xl border border-[#DDD7CD] bg-[#FAF9F6] text-sm text-[#1E1B24] font-bold focus:ring-2 focus:ring-[#5B21B6] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#383242] mb-1.5">
                    B.Com (Hons) Degree Status
                  </label>
                  <input
                    type="text"
                    required
                    value={bcom}
                    onChange={(e) => setBcom(e.target.value)}
                    placeholder="Undergraduate"
                    className="w-full px-4 py-3 rounded-xl border border-[#DDD7CD] bg-[#FAF9F6] text-sm text-[#1E1B24] font-bold focus:ring-2 focus:ring-[#5B21B6] focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Academic Percentages</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= TAB 6: SECURITY & PASSWORD ================= */}
          {activeTab === 'security' && (
            <div className="max-w-xl mx-auto space-y-5">
              <div>
                <h4 className="text-base font-bold text-[#1E1B24] font-display">
                  Admin Credentials & Security
                </h4>
                <p className="text-xs text-[#6C6578]">
                  Change your admin password or view verified credentials.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E5E0D6] shadow-2xs space-y-4">
                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#DDD7CD] flex items-center justify-between text-xs">
                  <div>
                    <span className="block font-semibold text-[#1E1B24]">Verified Admin ID / Email</span>
                    <span className="text-[#655E71]">srishtidigital36@gmail.com</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4 pt-2">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#383242]">
                    Change Admin Password
                  </h5>

                  {pwdMessage && (
                    <div
                      className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                        pwdMessage.type === 'success'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-rose-50 text-rose-800'
                      }`}
                    >
                      {pwdMessage.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                      )}
                      <span>{pwdMessage.text}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#383242] mb-1.5">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      value={currentPwd}
                      onChange={(e) => setCurrentPwd(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-4 py-3 rounded-xl border border-[#DDD7CD] bg-[#FAF9F6] text-sm text-[#1E1B24] focus:ring-2 focus:ring-[#5B21B6] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#383242] mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPwd}
                      onChange={(e) => setNewPwd(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full px-4 py-3 rounded-xl border border-[#DDD7CD] bg-[#FAF9F6] text-sm text-[#1E1B24] focus:ring-2 focus:ring-[#5B21B6] focus:bg-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-semibold shadow-xs cursor-pointer"
                    >
                      <Key className="w-4 h-4" />
                      <span>Update Password</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
