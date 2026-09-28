import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ReviewModalProps {
  companyId: string;
  companyName: string;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ companyId, companyName, onClose }) => {
  const { addReview, currentUser, openAuthModal, showToast } = useApp();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('Fikr qoldirish uchun tizimga kiring', 'error');
      openAuthModal('login');
      return;
    }
    if (!comment.trim()) {
      showToast('Iltimos, fikringizni yozib qoldiring', 'error');
      return;
    }

    addReview(companyId, rating, comment.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Kompaniyaga baho berish
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {companyName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2 text-center">
              Kompaniya haqida umumiy taassurotingiz (1 dan 5 gacha)
            </label>
            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform focus:outline-none"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating !== null ? star <= hoverRating : star <= rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-center text-xs font-medium text-slate-500 mt-1">
              {rating === 5 && 'A’lo darajada (5 / 5)'}
              {rating === 4 && 'Juda yaxshi (4 / 5)'}
              {rating === 3 && 'Qoniqarli (3 / 5)'}
              {rating === 2 && 'Yaxshi emas (2 / 5)'}
              {rating === 1 && 'Juda yomon (1 / 5)'}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Fikr va tavsiyangiz *
            </label>
            <textarea
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ish sharoitlari, jamoa, oylik maosh va suhbat jarayoni haqida qisqacha yozing..."
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
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              Baho qoldirish
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
