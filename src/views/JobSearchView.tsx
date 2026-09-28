import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  X, 
  Filter, 
  DollarSign, 
  Briefcase, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VacancyCard } from '../components/VacancyCard';
import { ApplicationModal } from '../components/ApplicationModal';
import { Vacancy, JobType, ExperienceLevel } from '../types';

export const JobSearchView: React.FC = () => {
  const { 
    vacancies, 
    categories, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    selectedCity, 
    setSelectedCity 
  } = useApp();

  // Local filter states
  const [keyword, setKeyword] = useState(searchQuery);
  const [city, setCity] = useState(selectedCity);
  const [category, setCategory] = useState(selectedCategory);
  const [selectedJobTypes, setSelectedJobTypes] = useState<JobType[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevel[]>([]);
  const [minSalary, setMinSalary] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'newest' | 'highest_salary' | 'views'>('newest');

  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedVacancyForApply, setSelectedVacancyForApply] = useState<Vacancy | null>(null);

  // Sync with global changes
  React.useEffect(() => {
    setKeyword(searchQuery);
  }, [searchQuery]);

  React.useEffect(() => {
    setCity(selectedCity);
  }, [selectedCity]);

  React.useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  const toggleJobType = (type: JobType) => {
    setSelectedJobTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleExperience = (exp: ExperienceLevel) => {
    setSelectedExperience(prev =>
      prev.includes(exp) ? prev.filter(e => e !== exp) : [...prev, exp]
    );
  };

  const resetAllFilters = () => {
    setKeyword('');
    setSearchQuery('');
    setCity('');
    setSelectedCity('');
    setCategory('');
    setSelectedCategory('');
    setSelectedJobTypes([]);
    setSelectedExperience([]);
    setMinSalary(0);
    setSortBy('newest');
  };

  // Filtered vacancies
  const filteredVacancies = useMemo(() => {
    return vacancies.filter(vac => {
      if (!vac.isActive) return false;

      // Keyword match
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const matchesTitle = vac.title.toLowerCase().includes(q);
        const matchesCompany = vac.companyName.toLowerCase().includes(q);
        const matchesRequirements = vac.requirements.some(r => r.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesRequirements) return false;
      }

      // City match
      if (city && vac.city.toLowerCase() !== city.toLowerCase()) {
        return false;
      }

      // Category match
      if (category && vac.category !== category) {
        return false;
      }

      // Job type filter
      if (selectedJobTypes.length > 0 && !selectedJobTypes.includes(vac.jobType)) {
        return false;
      }

      // Experience filter
      if (selectedExperience.length > 0 && !selectedExperience.includes(vac.experienceRequired)) {
        return false;
      }

      // Min salary filter
      if (minSalary > 0) {
        if (!vac.salaryMin || vac.salaryMin < minSalary) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'highest_salary') {
        const salA = a.salaryMax || a.salaryMin || 0;
        const salB = b.salaryMax || b.salaryMin || 0;
        return salB - salA;
      }
      if (sortBy === 'views') {
        return b.viewsCount - a.viewsCount;
      }
      // default newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [vacancies, keyword, city, category, selectedJobTypes, selectedExperience, minSalary, sortBy]);

  const jobTypeOptions: JobType[] = ['To‘liq stavka', 'Yarim stavka', 'Masofaviy ish', 'Amaliyot'];
  const experienceOptions: ExperienceLevel[] = ['Tajribasiz', '1-3 yil', '3-5 yil', '5+ yil'];

  const hasActiveFilters = Boolean(keyword || city || category || selectedJobTypes.length > 0 || selectedExperience.length > 0 || minSalary > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner & Search Input Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setSearchQuery(e.target.value);
              }}
              placeholder="Kasb, lavozim yoki kalit so‘z..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
            />
            {keyword && (
              <button 
                onClick={() => { setKeyword(''); setSearchQuery(''); }}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="relative w-full md:w-60">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setSelectedCity(e.target.value);
              }}
              className="w-full pl-10 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none cursor-pointer"
            >
              <option value="">Barcha hududlar</option>
              <option value="Toshkent">Toshkent</option>
              <option value="Samarqand">Samarqand</option>
              <option value="Buxoro">Buxoro</option>
              <option value="Andijon">Andijon</option>
              <option value="Farg‘ona">Farg‘ona</option>
              <option value="Namangan">Namangan</option>
              <option value="Qarshi">Qarshi</option>
              <option value="Urganch">Urganch</option>
              <option value="Nukus">Nukus</option>
            </select>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtrlar {hasActiveFilters && '(faol)'}</span>
          </button>

        </div>
      </div>

      {/* Main Layout: Left Filters (Desktop) + Right Results */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden md:block md:col-span-4 lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 space-y-6 sticky top-24">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filtrlar</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Tozalash
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Kasb sohasi / Kategoriya
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSelectedCategory(e.target.value);
              }}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Barcha sohalar</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.vacanciesCount})
                </option>
              ))}
            </select>
          </div>

          {/* Job Type Checkboxes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Ish turi
            </label>
            <div className="space-y-2">
              {jobTypeOptions.map((type) => (
                <label key={type} className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={selectedJobTypes.includes(type)}
                    onChange={() => toggleJobType(type)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Tajriba darajasi
            </label>
            <div className="space-y-2">
              {experienceOptions.map((exp) => (
                <label key={exp} className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={selectedExperience.includes(exp)}
                    onChange={() => toggleExperience(exp)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{exp}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Minimum Salary Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-700">Minimal oylik maosh:</span>
              <span className="font-mono tabular-nums font-bold text-blue-600">
                {minSalary === 0 ? 'Barchasi' : `${minSalary.toLocaleString('uz-UZ')} so‘m+`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25000000"
              step="1000000"
              value={minSalary}
              onChange={(e) => setMinSalary(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>0</span>
              <span>10 mln</span>
              <span>25 mln+</span>
            </div>
          </div>

        </aside>

        {/* RESULTS CONTENT AREA */}
        <main className="md:col-span-8 lg:col-span-9 space-y-4">
          
          {/* Controls Bar: Count & Sorting */}
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="text-slate-600">
              Topilgan vakansiyalar soni: <span className="font-bold text-slate-900 font-mono tabular-nums">{filteredVacancies.length}</span> ta
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Saralash:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 outline-none"
              >
                <option value="newest">Eng yangi e’lonlar</option>
                <option value="highest_salary">Eng yuqori maosh</option>
                <option value="views">Eng ko‘p ko‘rilgan</option>
              </select>
            </div>
          </div>

          {/* Vacancy Card Grid / Empty State */}
          {filteredVacancies.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Briefcase className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Hozircha vakansiyalar mavjud emas
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Belgilangan filtrlar bo‘yicha hozircha e’lonlar topilmadi. Qidiruv so‘zini o‘zgartiring yoki filtrlarni tozalang.
                </p>
              </div>
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Barcha filtrlarni tozalash</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredVacancies.map((vacancy) => (
                <VacancyCard
                  key={vacancy.id}
                  vacancy={vacancy}
                  onApplyClick={(v) => setSelectedVacancyForApply(v)}
                />
              ))}
            </div>
          )}

        </main>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Filtrlar</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kategoriya
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSelectedCategory(e.target.value);
                }}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="">Barcha sohalar</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Mobile Job Types */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Ish turi
              </label>
              <div className="grid grid-cols-2 gap-2">
                {jobTypeOptions.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleJobType(type)}
                    className={`py-2 px-3 text-xs rounded-lg border text-left ${
                      selectedJobTypes.includes(type)
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Experience */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tajriba
              </label>
              <div className="grid grid-cols-2 gap-2">
                {experienceOptions.map((exp) => (
                  <button
                    key={exp}
                    type="button"
                    onClick={() => toggleExperience(exp)}
                    className={`py-2 px-3 text-xs rounded-lg border text-left ${
                      selectedExperience.includes(exp)
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Salary */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">Minimal maosh:</span>
                <span className="font-mono font-bold text-blue-600">
                  {minSalary === 0 ? 'Barchasi' : `${minSalary.toLocaleString('uz-UZ')} so‘m+`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25000000"
                step="1000000"
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={resetAllFilters}
                className="w-1/2 py-2.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded-xl"
              >
                Tozalash
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-xl"
              >
                Natijalarni ko‘rish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {selectedVacancyForApply && (
        <ApplicationModal
          vacancy={selectedVacancyForApply}
          onClose={() => setSelectedVacancyForApply(null)}
        />
      )}

    </div>
  );
};
