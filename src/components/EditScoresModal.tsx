import React, { useState, useEffect } from 'react';
import { X, Check, Award, GraduationCap, Percent } from 'lucide-react';
import { useAcademic } from '../context/AcademicContext';

export const EditScoresModal: React.FC = () => {
  const { scores, updateScores, isEditModalOpen, closeEditModal } = useAcademic();

  const [class12Input, setClass12Input] = useState(scores.class12);
  const [class10Input, setClass10Input] = useState(scores.class10);
  const [bcomInput, setBcomInput] = useState(scores.bcom);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isEditModalOpen) {
      setClass12Input(scores.class12);
      setClass10Input(scores.class10);
      setBcomInput(scores.bcom);
      setSavedSuccess(false);
    }
  }, [isEditModalOpen, scores]);

  if (!isEditModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format percentages nicely (ensure % symbol if not present)
    const formatted12 = class12Input.trim().endsWith('%') 
      ? class12Input.trim() 
      : `${class12Input.trim()}%`;
    const formatted10 = class10Input.trim().endsWith('%') 
      ? class10Input.trim() 
      : `${class10Input.trim()}%`;

    updateScores({
      class12: formatted12,
      class10: formatted10,
      bcom: bcomInput.trim() || 'Undergrad',
    });

    setSavedSuccess(true);
    setTimeout(() => {
      closeEditModal();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#E7E3DA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ECE7DD]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#F4EFFE] text-[#5B21B6]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#1C1825]">
                Update Academic Scores
              </h3>
              <p className="text-xs text-[#736B7F]">
                Changes will instantly reflect in the Hero and About Me sections
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeEditModal}
            className="p-1.5 rounded-lg text-[#7C7588] hover:text-[#1E1B24] hover:bg-[#F3EEFC] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E3847] mb-1.5">
              Class 12th Percentage
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={class12Input}
                onChange={(e) => setClass12Input(e.target.value)}
                placeholder="e.g. 82.5% or 82.5"
                className="w-full px-4 py-3 rounded-xl border border-[#DED9CE] bg-[#FAF9F6] text-sm text-[#1E1B24] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#5B21B6] focus:bg-white transition-all pr-10"
              />
              <Percent className="w-4 h-4 text-[#8C8497] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E3847] mb-1.5">
              Class 10th Percentage
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={class10Input}
                onChange={(e) => setClass10Input(e.target.value)}
                placeholder="e.g. 88% or 88"
                className="w-full px-4 py-3 rounded-xl border border-[#DED9CE] bg-[#FAF9F6] text-sm text-[#1E1B24] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#5B21B6] focus:bg-white transition-all pr-10"
              />
              <Percent className="w-4 h-4 text-[#8C8497] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3E3847] mb-1.5">
              B.Com (Hons) Status / Tag
            </label>
            <div className="relative">
              <input
                type="text"
                value={bcomInput}
                onChange={(e) => setBcomInput(e.target.value)}
                placeholder="e.g. Undergrad or Ongoing"
                className="w-full px-4 py-3 rounded-xl border border-[#DED9CE] bg-[#FAF9F6] text-sm text-[#1E1B24] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#5B21B6] focus:bg-white transition-all pr-10"
              />
              <GraduationCap className="w-4 h-4 text-[#8C8497] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#ECE7DD]">
            <button
              type="button"
              onClick={closeEditModal}
              className="px-4 py-2.5 rounded-xl border border-[#DDD8CD] text-xs font-semibold text-[#524B5C] hover:bg-[#F8F6F1] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Percentages</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
