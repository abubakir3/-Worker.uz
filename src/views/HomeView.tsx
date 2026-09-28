import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  HardHat, 
  Laptop, 
  ShoppingBag, 
  Truck, 
  Utensils, 
  Stethoscope, 
  GraduationCap, 
  Wrench,
  Building,
  TrendingUp,
  ShieldCheck,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VacancyCard } from '../components/VacancyCard';
import { CompanyCard } from '../components/CompanyCard';
import { ApplicationModal } from '../components/ApplicationModal';
import { Vacancy } from '../types';

export const HomeView: React.FC = () => {
  const { 
    categories, 
    vacancies, 
    companies, 
    navigateTo, 
    setSearchQuery, 
    setSelectedCity, 
    setSelectedCategory 
  } = useApp();

  const [inputJob, setInputJob] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [selectedVacancyForApply, setSelectedVacancyForApply] = useState<Vacancy | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'HardHat': return <HardHat className="w-5 h-5" />;
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      case 'Truck': return <Truck className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputJob.trim()) setSearchQuery(inputJob.trim());
    if (inputCity) setSelectedCity(inputCity);
    navigateTo('search', { query: inputJob, city: inputCity });
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    navigateTo('search', { category: categoryName });
  };

  const featuredVacancies = vacancies.filter(v => v.isActive).slice(0, 6);
  const featuredCompanies = companies.slice(0, 4);

  return (
    <div className="space-y-16 lg:space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        
        {/* Subtle background glow */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/80 text-blue-300 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>O‘zbekistondagi №1 ishonchli ish bozori platformasi</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Orzuingizdagi ishni toping yoki kerakli ishchini toping
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Ishchi.uz — ish beruvchilar va ish izlovchilarni birlashtiradigan zamonaviy platforma.
              </p>

              {/* SEARCH BOX */}
              <form 
                onSubmit={handleHeroSearch}
                className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl shadow-black/20 border border-slate-200/20 text-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4"
              >
                {/* Profession / Role */}
                <div className="sm:col-span-5 relative flex items-center">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type="text"
                    value={inputJob}
                    onChange={(e) => setInputJob(e.target.value)}
                    placeholder="Kasb yoki lavozim (masalan: dasturchi)"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-transparent border-0 outline-none text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div className="hidden sm:block w-[1px] bg-slate-200 my-1 self-stretch" />

                {/* City */}
                <div className="sm:col-span-4 relative flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3" />
                  <select
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-transparent border-0 outline-none text-slate-800 cursor-pointer"
                  >
                    <option value="">Barcha shaharlar</option>
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

                {/* Submit CTA */}
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full h-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <Search className="w-4 h-4" />
                    <span>Ish qidirish</span>
                  </button>
                </div>
              </form>

              {/* Popular quick searches (Text unboxed, no pill sandwich) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-slate-400">
                <span className="text-slate-500 font-medium">Ommabop:</span>
                {['Dasturchi', 'Buxgalter', 'Haydovchi', 'Oshpaz', 'Sotuvchi'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => { setInputJob(item); navigateTo('search', { query: item }); }}
                    className="hover:text-blue-400 underline decoration-slate-600 underline-offset-4 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 group">
                <img
                  src="/src/assets/images/hero_job_marketplace_1790588647350.jpg"
                  alt="Ishchi.uz jamoasi va ofisi"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    O‘zbekiston kompaniyalari
                  </span>
                  <p className="text-sm font-medium text-white mt-1">
                    «Top-kompaniyalar har kuni eng yaxshi mutaxassislarni Ishchi.uz orqali topmoqda»
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* POPULAR JOB CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Ommabop kasb kategoriyalari
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              O‘zingizga mos sohani tanlang va yangi vakansiyalarni ko‘ring
            </p>
          </div>
          <button
            onClick={() => navigateTo('search')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>Barcha yo‘nalishlar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 text-left hover:border-blue-500 hover:shadow-md transition-all duration-150 flex items-center gap-4 group"
            >
              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {getCategoryIcon(cat.iconName)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                  {cat.name}
                </h3>
                <span className="text-xs text-slate-500 font-mono tabular-nums">
                  {cat.vacanciesCount} ta bo‘sh ish o‘rni
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED VACANCIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Tavsiya etiladigan so‘nggi vakansiyalar
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Yetakchi ish beruvchilardan yangi va tasdiqlangan takliflar
            </p>
          </div>
          <button
            onClick={() => navigateTo('search')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>Barcha vakansiyalarni ko‘rish ({vacancies.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              vacancy={vacancy}
              onApplyClick={(v) => setSelectedVacancyForApply(v)}
            />
          ))}
        </div>
      </section>

      {/* FEATURED COMPANIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Top ish beruvchi kompaniyalar
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              O‘zbekistondagi eng nufuzli va rasmiy tasdiqlangan korxonalar
            </p>
          </div>
          <button
            onClick={() => navigateTo('companies')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>Barcha kompaniyalar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>

      {/* PLATFORM TRUST & METRICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono tabular-nums">
                1 240+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Faol ish o‘rinlari
              </div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                480+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Ishonchli kompaniyalar
              </div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tabular-nums">
                45 000+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Malakali mutaxassislar
              </div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tabular-nums">
                98%
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Muvaffaqiyatli bandlik
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EMPLOYER CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-blue-900/10">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Kompaniyangiz uchun xodim qidiryapsizmi?
            </h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              Vakansiyangizni bepul joylashtiring, kompaniya video lavhasini qo‘shing va birinchi kuniyoq saralangan rezyumelarni qabul qiling.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => navigateTo('dashboard', { query: 'tab:create' })}
              className="px-6 py-3 bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors text-center"
            >
              Vakansiya e’lon qilish
            </button>
            <button
              onClick={() => navigateTo('companies')}
              className="px-6 py-3 bg-blue-900/60 hover:bg-blue-900 text-white font-semibold text-xs sm:text-sm rounded-xl border border-blue-400/30 transition-colors text-center"
            >
              Kompaniyalar bilan tanishish
            </button>
          </div>
        </div>
      </section>

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
