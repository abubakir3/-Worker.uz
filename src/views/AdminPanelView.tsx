import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Building2, 
  Briefcase, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Star, 
  ExternalLink,
  Layers,
  TrendingUp,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminPanelView: React.FC = () => {
  const { 
    companies, 
    verifyCompany, 
    deleteCompany, 
    vacancies, 
    deleteVacancy, 
    categories, 
    reports, 
    resolveReport, 
    reviews, 
    navigateTo,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'companies' | 'vacancies' | 'reports' | 'categories'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Platform Metrics
  const totalVacancies = vacancies.length;
  const activeVacancies = vacancies.filter(v => v.isActive).length;
  const totalCompanies = companies.length;
  const verifiedCompanies = companies.filter(c => c.verified).length;
  const pendingReports = reports.filter(r => r.status === 'Kutilmoqda').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Ishchi.uz Boshqaruv Markazi
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Administrator boshqaruv paneli
          </h1>
          <p className="text-xs text-slate-400">
            Platforma xavfsizligi, kompaniyalar verifikatsiyasi va shikoyatlarni ko‘rib chiqish
          </p>
        </div>

        {/* Tab switcher buttons */}
        <div className="flex flex-wrap gap-1 bg-slate-800/80 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Ko‘rsatkichlar
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'companies' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Kompaniyalar ({totalCompanies})
          </button>
          <button
            onClick={() => setActiveTab('vacancies')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'vacancies' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Vakansiyalar ({totalVacancies})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'reports' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Shikoyatlar</span>
            {pendingReports > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px]">
                {pendingReports}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'categories' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Kategoriyalar
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
              <span className="text-xs text-slate-500 font-medium">Jami vakansiyalar</span>
              <div className="text-2xl font-extrabold text-blue-600 font-mono tabular-nums">
                {totalVacancies}
              </div>
              <span className="text-[11px] text-slate-400">Faol: {activeVacancies} ta</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
              <span className="text-xs text-slate-500 font-medium">Kompaniyalar</span>
              <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                {totalCompanies}
              </div>
              <span className="text-[11px] text-emerald-600 font-medium">
                Tasdiqlangan: {verifiedCompanies} ta
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
              <span className="text-xs text-slate-500 font-medium">Shikoyatlar</span>
              <div className="text-2xl font-extrabold text-rose-600 font-mono tabular-nums">
                {reports.length}
              </div>
              <span className="text-[11px] text-rose-500 font-medium">
                Kutilmoqda: {pendingReports} ta
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
              <span className="text-xs text-slate-500 font-medium">Tizim holati</span>
              <div className="text-2xl font-extrabold text-emerald-600 font-mono">
                Faol
              </div>
              <span className="text-[11px] text-slate-400">Ishchi.uz v2.4</span>
            </div>
          </div>

          {/* Quick Review of Pending Reports */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Tekshiruv kutilayotgan shikoyatlar</span>
              </h3>
              <button
                onClick={() => setActiveTab('reports')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                Barcha shikoyatlarga o‘tish
              </button>
            </div>

            {reports.length === 0 ? (
              <div className="text-xs text-slate-400 py-4 text-center">
                Hech qanday shikoyat kelib tushmagan.
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{rep.reason}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-600">{rep.targetTitle}</span>
                        <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-medium">
                          {rep.status}
                        </span>
                      </div>
                      <p className="text-slate-500 mt-1 leading-relaxed">
                        {rep.description}
                      </p>
                    </div>

                    {rep.status === 'Kutilmoqda' && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => resolveReport(rep.id, 'Hal qilindi')}
                          className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-100"
                        >
                          Hal qilindi
                        </button>
                        <button
                          onClick={() => resolveReport(rep.id, 'Rad etildi')}
                          className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200"
                        >
                          Rad etish
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: COMPANIES MANAGEMENT */}
      {activeTab === 'companies' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Kompaniyalarni boshqarish va verifikatsiya
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Kompaniyalar statusini tasdiqlash yoki soxta kompaniyalarni o‘chirish
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {companies.map((c) => (
              <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={c.logoUrl}
                    alt={c.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">
                        {c.name}
                      </h4>
                      {c.verified ? (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Tasdiqlangan
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          Tasdiqlanmagan
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {c.city} · {c.phone} · {c.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 text-xs">
                  {!c.verified && (
                    <button
                      onClick={() => verifyCompany(c.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Tasdiqlash</span>
                    </button>
                  )}
                  <button
                    onClick={() => navigateTo('company', { companyId: c.id })}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg"
                  >
                    Profil
                  </button>
                  <button
                    onClick={() => deleteCompany(c.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                    title="O‘chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VACANCIES MODERATION */}
      {activeTab === 'vacancies' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Vakansiyalarni moderatsiya qilish
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Qoidalarga zid yoki soxta e’lonlarni olib tashlash
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {vacancies.map((v) => (
              <div key={v.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {v.title}
                  </h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {v.companyName} · {v.city} · {v.jobType} · {v.category}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 text-xs">
                  <button
                    onClick={() => navigateTo('vacancy', { vacancyId: v.id })}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg"
                  >
                    Ko‘rish
                  </button>
                  <button
                    onClick={() => deleteVacancy(v.id)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Olib tashlash</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: REPORTS LIST */}
      {activeTab === 'reports' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Foydalanuvchilar shikoyatlari ({reports.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Firibgarlik, spam va noo‘rin kontent bo‘yicha tushgan arizalar
            </p>
          </div>

          <div className="space-y-3">
            {reports.map((rep) => (
              <div key={rep.id} className="border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{rep.reason}</span>
                    <span className="text-slate-500 block mt-0.5">
                      Obyekt: {rep.targetTitle} ({rep.targetType})
                    </span>
                    <span className="text-slate-400 text-[11px] font-mono">
                      Jo‘natuvchi: {rep.reportedBy} · {rep.createdAt}
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full font-semibold ${
                    rep.status === 'Hal qilindi' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {rep.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg leading-relaxed">
                  {rep.description}
                </p>

                {rep.status === 'Kutilmoqda' && (
                  <div className="flex items-center justify-end gap-2 text-xs pt-1">
                    <button
                      onClick={() => resolveReport(rep.id, 'Rad etildi')}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                    >
                      Asossiz deb topish
                    </button>
                    <button
                      onClick={() => resolveReport(rep.id, 'Hal qilindi')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg"
                    >
                      Qoidabuzarlikni bartaraf etish
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Kasb kategoriyalari ({categories.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Platformadagi asosiy ish sohalari
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((c) => (
              <div key={c.id} className="p-4 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{c.name}</h4>
                  <span className="text-[11px] text-slate-500 font-mono">{c.vacanciesCount} ta vakansiya</span>
                </div>
                <span className="text-xs font-semibold text-blue-600 font-mono">#{c.slug}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
