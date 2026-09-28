import React from 'react';
import { MapPin, DollarSign, Bookmark, ArrowRight, Building2, Clock } from 'lucide-react';
import { Vacancy } from '../types';
import { useApp } from '../context/AppContext';

interface VacancyCardProps {
  vacancy: Vacancy;
  onApplyClick?: (vacancy: Vacancy) => void;
}

export const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy, onApplyClick }) => {
  const { navigateTo, savedVacancyIds, toggleSaveVacancy } = useApp();
  const isSaved = savedVacancyIds.includes(vacancy.id);

  const formatSalary = () => {
    if (vacancy.isSalaryNegotiable && !vacancy.salaryMin) {
      return 'Kelishilgan holda';
    }
    if (vacancy.salaryMin && vacancy.salaryMax) {
      return `${vacancy.salaryMin.toLocaleString('uz-UZ')} – ${vacancy.salaryMax.toLocaleString('uz-UZ')} ${vacancy.salaryCurrency}`;
    }
    if (vacancy.salaryMin) {
      return `dan ${vacancy.salaryMin.toLocaleString('uz-UZ')} ${vacancy.salaryCurrency}`;
    }
    return 'Kelishilgan holda';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top row: Company Logo, Title, and Bookmark action */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={vacancy.companyLogo || 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=80&q=80'}
              alt={vacancy.companyName}
              className="w-12 h-12 rounded-lg object-cover border border-slate-100 shrink-0 bg-slate-50"
              referrerPolicy="no-referrer"
            />
            <div>
              <button
                onClick={() => navigateTo('company', { companyId: vacancy.companyId })}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors block text-left"
              >
                {vacancy.companyName}
              </button>
              <h3 
                onClick={() => navigateTo('vacancy', { vacancyId: vacancy.id })}
                className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer text-left leading-snug line-clamp-1"
              >
                {vacancy.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => toggleSaveVacancy(vacancy.id)}
            className={`p-2 rounded-lg transition-colors shrink-0 ${
              isSaved
                ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
            title={isSaved ? 'Saqlanganlardan o‘chirish' : 'Saqlab qo‘yish'}
            aria-label="Saqlash"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quiet, unboxed metadata row */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-2.5 text-xs text-slate-500 mt-3 pt-1 border-t border-slate-100">
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {vacancy.city}
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{vacancy.jobType}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{vacancy.experienceRequired} tajriba</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="font-mono text-slate-400">{vacancy.createdAt}</span>
        </div>

        {/* Salary Highlight with tabular numbers */}
        <div className="mt-3.5">
          <div className="text-sm font-bold text-slate-900 font-mono tabular-nums tracking-tight">
            {formatSalary()}
          </div>
        </div>

        {/* Short description / requirements sneak-peek */}
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {vacancy.requirements?.[0] || 'Vakansiya talablari va vazifalari bilan batafsil tanishing.'}
        </p>
      </div>

      {/* Footer Actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => navigateTo('vacancy', { vacancyId: vacancy.id })}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors py-1.5"
        >
          <span>Batafsil ma’lumot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {onApplyClick && (
          <button
            onClick={() => onApplyClick(vacancy)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-lg transition-colors whitespace-nowrap"
          >
            Ariza berish
          </button>
        )}
      </div>
    </div>
  );
};
