import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Vacancy } from '../types';
import { useApp } from '../context/AppContext';

interface ApplicationModalProps {
  vacancy: Vacancy | null;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ vacancy, onClose }) => {
  const { currentJobSeeker, currentUser, openAuthModal, submitApplication, showToast } = useApp();
  
  const [coverLetter, setCoverLetter] = useState(
    `Assalomu alaykum! Men "${vacancy?.title}" lavozimiga qiziqish bildirmoqdaman. Mening tajribam va ko‘nikmalarim sizning talablaringizga mos keladi.`
  );
  const [selectedFileName, setSelectedFileName] = useState(
    currentJobSeeker?.resumeFileName || 'Javohir_Alimov_Rezyume_2026.pdf'
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  if (!vacancy) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError('Fayl hajmi juda katta (maksimal 5 MB ruxsat etilgan).');
      return;
    }

    // Check format
    const validExtensions = ['pdf', 'doc', 'docx'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !validExtensions.includes(extension)) {
      setFileError('Faqat PDF, DOC yoki DOCX formatdagi fayllar qabul qilinadi.');
      return;
    }

    setSelectedFileName(file.name);
    showToast(`Fayl muvaffaqiyatli biriktirildi: ${file.name}`, 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('Ariza topshirish uchun avval tizimga kiring', 'error');
      openAuthModal('login');
      return;
    }

    if (!coverLetter.trim()) {
      setFileError('Iltimos, ish beruvchiga qisqa xabar yozing.');
      return;
    }

    const success = submitApplication({
      vacancyId: vacancy.id,
      coverLetter,
      resumeFileName: selectedFileName
    });

    if (success) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Vakansiyaga ariza topshirish
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {vacancy.companyName} · {vacancy.city}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Arizangiz muvaffaqiyatli yuborildi!
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-sm mx-auto">
                Sizning arizangiz va rezyumeingiz <span className="font-semibold text-slate-900">{vacancy.companyName}</span> kadrlar bo‘limiga yetkazildi. Ariza holatini «Mening arizalarim» bo‘limida kuzatishingiz mumkin.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              Tushunarli, yopish
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Vacancy Summary Card */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-3">
              <img
                src={vacancy.companyLogo}
                alt={vacancy.companyName}
                className="w-10 h-10 rounded-lg object-cover bg-white border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-slate-900 truncate">
                  {vacancy.title}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  {vacancy.salaryMin && vacancy.salaryMax 
                    ? `${vacancy.salaryMin.toLocaleString('uz-UZ')} - ${vacancy.salaryMax.toLocaleString('uz-UZ')} ${vacancy.salaryCurrency}` 
                    : 'Kelishilgan holda'}
                </div>
              </div>
            </div>

            {/* Applicant Identity Info */}
            <div className="text-xs text-slate-600 bg-blue-50/60 p-3 rounded-xl border border-blue-100 flex items-center justify-between">
              <div>
                <span className="font-medium text-blue-900">Ariza beruvchi: </span>
                <span className="font-semibold text-slate-900">{currentJobSeeker?.firstName} {currentJobSeeker?.lastName}</span>
                <div className="text-[11px] text-slate-500">{currentJobSeeker?.profession} · {currentJobSeeker?.phone}</div>
              </div>
            </div>

            {/* Cover letter / note */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ish beruvchiga qo‘shimcha xabar / Qo‘shma xat
              </label>
              <textarea
                rows={4}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Nega aynan siz bu lavozimga eng munosib nomzodsiz? Tajribangiz haqida yozing..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
              />
            </div>

            {/* Resume Upload / Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rezyume (CV) biriktirish *
              </label>

              <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-blue-500 transition-colors bg-slate-50/50">
                <div className="flex items-center justify-center gap-2 text-slate-700 text-xs font-semibold mb-1">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>{selectedFileName}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  PDF, DOC yoki DOCX (maksimal 5 MB)
                </p>

                <label className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium cursor-pointer shadow-2xs transition-colors">
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Boshqa rezyume tanlash</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {fileError && (
                <div className="mt-2 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {fileError}
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
              >
                Arizani yuborish
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
