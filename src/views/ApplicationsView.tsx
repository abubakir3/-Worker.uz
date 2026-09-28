import React, { useState } from 'react';
import { 
  FileText, 
  Building2, 
  Calendar, 
  MessageSquare, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus } from '../types';

export const ApplicationsView: React.FC = () => {
  const { applications, currentJobSeeker, startOrGetConversation, navigateTo } = useApp();
  const [filter, setFilter] = useState<string>('all');

  // Filter only applications by current job seeker
  const myApps = applications.filter(a => a.jobSeekerId === currentJobSeeker.id);

  const filteredApps = myApps.filter(a => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Suhbatga taklif qilindi':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Suhbatga taklif qilindi</span>
          </span>
        );
      case 'Qabul qilindi':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Qabul qilindi</span>
          </span>
        );
      case 'Rad etildi':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Rad etildi</span>
          </span>
        );
      case 'Ko‘rib chiqilmoqda':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Ko‘rib chiqilmoqda</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Yuborildi</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Mening arizalarim
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Siz topshirgan barcha ish arizalari va ish beruvchilarning javoblari
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-xl text-xs font-medium">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filter === 'all' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Barchasi ({myApps.length})
          </button>
          <button
            onClick={() => setFilter('Suhbatga taklif qilindi')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filter === 'Suhbatga taklif qilindi' ? 'bg-white text-amber-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Suhbatlar
          </button>
          <button
            onClick={() => setFilter('Ko‘rib chiqilmoqda')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filter === 'Ko‘rib chiqilmoqda' ? 'bg-white text-blue-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Jarayonda
          </button>
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Hozircha arizalar mavjud emas
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Siz hali hech qaysi vakansiyaga ariza topshirmagansiz. Vakansiyalarni qidirib, o‘zingizga mos ish toping.
            </p>
          </div>
          <button
            onClick={() => navigateTo('search')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors inline-flex items-center gap-1.5"
          >
            <span>Vakansiyalarni ko‘rish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <span 
                    onClick={() => navigateTo('company', { companyId: app.companyId })}
                    className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{app.companyName}</span>
                  </span>
                  
                  <h3 
                    onClick={() => navigateTo('vacancy', { vacancyId: app.vacancyId })}
                    className="text-lg font-bold text-slate-900 hover:text-blue-600 cursor-pointer"
                  >
                    {app.vacancyTitle}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Ariza sanasi: {app.appliedDate}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-600">
                      Rezyume: {app.resumeFileName}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="self-start sm:self-auto shrink-0">
                  {getStatusBadge(app.status)}
                </div>
              </div>

              {/* Employer Feedback Note (if available) */}
              {app.companyFeedback && (
                <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-amber-900 block">
                    Kompaniyaning javob xati:
                  </span>
                  <p className="text-amber-800 leading-relaxed">
                    {app.companyFeedback}
                  </p>
                </div>
              )}

              {/* Cover Letter preview */}
              {app.coverLetter && (
                <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-700 block mb-0.5">Siz yozgan xabar:</span>
                  <p className="italic">{app.coverLetter}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => navigateTo('vacancy', { vacancyId: app.vacancyId })}
                  className="text-slate-600 hover:text-blue-600 font-semibold flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Vakansiya sahifasini ko‘rish</span>
                </button>

                <button
                  onClick={() => {
                    const convId = startOrGetConversation(app.companyId, app.vacancyId);
                    navigateTo('chat', { conversationId: convId });
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Kompaniya bilan chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
