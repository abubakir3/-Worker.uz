import React, { useState } from 'react';
import { Search, MapPin, Building2, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CompanyCard } from '../components/CompanyCard';

export const CompaniesView: React.FC = () => {
  const { companies, navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const filteredCompanies = companies.filter(comp => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = comp.name.toLowerCase().includes(q);
      const matchDesc = comp.description.toLowerCase().includes(q);
      if (!matchName && !matchDesc) return false;
    }
    if (cityFilter && comp.city !== cityFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Rasmiy ro‘yxatdan o‘tgan korxonalar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            O‘zbekiston ish beruvchi kompaniyalari
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Ishchi.uz platformasidagi barcha korxonalar, ularning ish muhiti, ochiq vakansiyalari va xodimlar fikrlari bilan tanishing.
          </p>
        </div>

        {/* Search bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Kompaniya nomi yoki faoliyat sohasi..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
            />
          </div>

          <div className="sm:col-span-4 relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none cursor-pointer"
            >
              <option value="">Barcha hududlar</option>
              <option value="Toshkent">Toshkent</option>
              <option value="Samarqand">Samarqand</option>
              <option value="Buxoro">Buxoro</option>
              <option value="Andijon">Andijon</option>
              <option value="Farg‘ona">Farg‘ona</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of companies */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500 font-medium">
          Topilgan kompaniyalar: <span className="font-bold text-slate-900 font-mono">{filteredCompanies.length}</span> ta
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-xs text-slate-500">
            Qidiruvingiz bo‘yicha kompaniyalar topilmadi.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
