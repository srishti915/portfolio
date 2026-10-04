import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, X, AlertCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login, loginError } = useAdmin();

  const [email, setEmail] = useState('srishtidigital36@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(email, password);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E7E2D6]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeLoginModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#8C8497] hover:text-[#1E1B24] hover:bg-[#F4EFFE] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Icon */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] text-[#5B21B6] flex items-center justify-center mx-auto mb-3 shadow-2xs">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-[#17141E] font-display">
            Srishti's Admin Portal
          </h3>
          <p className="text-xs sm:text-sm text-[#6C6578] mt-1">
            Restricted access. Only Srishti Pathak has control here.
          </p>
        </div>

        {/* Error Notification */}
        {loginError && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{loginError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#383242] mb-1.5">
              Admin Email / ID
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="srishtidigital36@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DDD7CD] bg-[#FAF9F6] text-sm text-[#1E1B24] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#5B21B6] focus:bg-white transition-all"
              />
              <Mail className="w-4 h-4 text-[#8C8497] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#383242] mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-11 py-3 rounded-xl border border-[#DDD7CD] bg-[#FAF9F6] text-sm text-[#1E1B24] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#5B21B6] focus:bg-white transition-all"
              />
              <Lock className="w-4 h-4 text-[#8C8497] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#8C8497] hover:text-[#2E2838] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-[#5B21B6] hover:bg-[#4C1D95] shadow-xs transition-all active:scale-[0.99] cursor-pointer disabled:opacity-70"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'Verifying...' : 'Login to Admin Panel'}</span>
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="mt-5 pt-4 border-t border-[#ECE7DD] text-center text-[11px] text-[#8C8497]">
          <span>Protected with email ID & password authorization</span>
        </div>
      </div>
    </div>
  );
};
