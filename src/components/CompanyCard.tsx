import React from 'react';
import { CheckCircle2, Star, MapPin, Briefcase, Video } from 'lucide-react';
import { CompanyProfile } from '../types';
import { useApp } from '../context/AppContext';

interface CompanyCardProps {
  company: CompanyProfile;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const { navigateTo, vacancies } = useApp();
  const companyVacanciesCount = vacancies.filter(v => v.companyId === company.id && v.isActive).length;

  return (
    <div 
      onClick={() => navigateTo('company', { companyId: company.id })}
      className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <img
            src={company.logoUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=120&q=80'}
            alt={company.name}
            className="w-14 h-14 rounded-xl object-cover border border-slate-100 bg-slate-50 shrink-0"
            referrerPolicy="no-referrer"
          />
          {company.videoUrl && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              <Video className="w-3 h-3" />
              Video taqdimot
            </span>
          )}
        </div>

        <div className="mt-3.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {company.name}
            </h3>
            {company.verified && (
              <span 
                className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700" 
                title="Tasdiqlangan kompaniya"
              >
                <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-100 text-emerald-600" />
                <span>Tasdiqlangan</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {company.city}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-amber-600 font-semibold font-mono tabular-nums">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {company.rating.toFixed(1)}
              <span className="text-slate-400 font-normal">({company.reviewCount})</span>
            </span>
          </div>

          <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
            {company.description}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-700 flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-mono tabular-nums font-semibold">{companyVacanciesCount}</span> ta ochiq vakansiya
        </span>
        <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
          Profilni ko‘rish &rarr;
        </span>
      </div>
    </div>
  );
};
