import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl border text-xs font-semibold max-w-sm ${
        toast.type === 'success'
          ? 'bg-slate-900 text-white border-slate-800'
          : toast.type === 'error'
          ? 'bg-rose-600 text-white border-rose-700'
          : 'bg-blue-600 text-white border-blue-700'
      }`}>
        {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
        {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-white shrink-0" />}
        {toast.type === 'info' && <Info className="w-4 h-4 text-white shrink-0" />}
        <span className="leading-tight">{toast.message}</span>
      </div>
    </div>
  );
};
