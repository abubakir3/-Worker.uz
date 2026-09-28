import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ReportModalProps {
  targetType: 'vacancy' | 'company' | 'user' | 'message';
  targetId: string;
  targetTitle: string;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ targetType, targetId, targetTitle, onClose }) => {
  const { currentUser, submitReport } = useApp();
  const [reason, setReason] = useState<'Soxta kompaniya' | 'Soxta vakansiya' | 'Noo‘rin mazmun' | 'Spam' | 'Shubhali faoliyat' | 'Boshqa'>('Soxta vakansiya');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    submitReport({
      targetType,
      targetId,
      targetTitle,
      reason,
      description,
      reportedBy: currentUser ? currentUser.name : 'Anonim foydalanuvchi'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">
              Shikoyat qilish
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-800">Shikoyat obyekti: </span>
            <span className="text-slate-700">{targetTitle}</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Shikoyat sababi *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="Soxta vakansiya">Soxta yoki mavjud bo‘lmagan vakansiya</option>
              <option value="Soxta kompaniya">Soxta kompaniya / firibgarlik</option>
              <option value="Noo‘rin mazmun">Noo‘rin yoki haqoratli mazmun</option>
              <option value="Spam">Spam yoki takroriy e’lon</option>
              <option value="Shubhali faoliyat">Shubhali moliyaviy sxema / to‘lov talab qilish</option>
              <option value="Boshqa">Boshqa sabab</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Batafsil ma’lumot *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Qanday qoidabuzarlikni sezganingizni yozib qoldiring..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors"
            >
              Shikoyatni jo‘natish
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
