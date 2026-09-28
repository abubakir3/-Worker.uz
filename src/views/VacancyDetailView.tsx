import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Briefcase, 
  DollarSign, 
  Building2, 
  Bookmark, 
  Send, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  Video, 
  Play, 
  Share2, 
  Eye, 
  Calendar,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ApplicationModal } from '../components/ApplicationModal';
import { ReportModal } from '../components/ReportModal';
import { VideoPlayerModal } from '../components/VideoPlayerModal';
import { VacancyCard } from '../components/VacancyCard';

export const VacancyDetailView: React.FC = () => {
  const { 
    selectedVacancyId, 
    vacancies, 
    companies, 
    savedVacancyIds, 
    toggleSaveVacancy, 
    navigateTo, 
    startOrGetConversation, 
    showToast,
    currentUser 
  } = useApp();

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const vacancy = vacancies.find(v => v.id === selectedVacancyId) || vacancies[0];
  const company = companies.find(c => c.id === vacancy?.companyId);

  if (!vacancy) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Vakansiya topilmadi</h2>
        <button
          onClick={() => navigateTo('search')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
        >
          Ish qidirish sahifasiga qaytish
        </button>
      </div>
    );
  }

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

  const handleStartChat = () => {
    if (!currentUser) {
      showToast('Kompaniya bilan bog‘lanish uchun avval tizimga kiring', 'error');
      return;
    }
    const convId = startOrGetConversation(vacancy.companyId, vacancy.id);
    navigateTo('chat', { conversationId: convId });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Havola buferga nusxalandi!', 'success');
    }
  };

  // Other related vacancies from same category or company
  const relatedVacancies = vacancies
    .filter(v => v.id !== vacancy.id && (v.category === vacancy.category || v.companyId === vacancy.companyId))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('search')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Vakansiyalar ro‘yxatiga qaytish</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Vacancy Details */}
        <main className="lg:col-span-8 space-y-6">
          
          {/* Header Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={vacancy.companyLogo}
                  alt={vacancy.companyName}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-100 bg-slate-50 shrink-0 cursor-pointer"
                  onClick={() => navigateTo('company', { companyId: vacancy.companyId })}
                  referrerPolicy="no-referrer"
                />
                <div>
                  <button
                    onClick={() => navigateTo('company', { companyId: vacancy.companyId })}
                    className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 text-left"
                  >
                    <span>{vacancy.companyName}</span>
                    {company?.verified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                    )}
                  </button>

                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 leading-snug">
                    {vacancy.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {vacancy.city}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{vacancy.jobType}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {vacancy.createdAt}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono text-slate-400">
                      <Eye className="w-3.5 h-3.5" />
                      {vacancy.viewsCount} ko‘rildi
                    </span>
                  </div>
                </div>
              </div>

              {/* Bookmark & Share */}
              <div className="flex items-center gap-2 self-start">
                <button
                  onClick={handleShare}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Ulashish"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleSaveVacancy(vacancy.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    isSaved ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                  }`}
                  title={isSaved ? 'Saqlanganlardan o‘chirish' : 'Saqlash'}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Salary & Primary Actions */}
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Taklif etilayotgan oylik maosh:</span>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
                  {formatSalary()}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Ariza berish</span>
                </button>

                <button
                  onClick={handleStartChat}
                  className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  title="Kompaniya vakili bilan yozishish"
                >
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span className="hidden sm:inline">Bog‘lanish</span>
                </button>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 border-y border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Ish vaqti</span>
                <span className="font-semibold text-slate-800">{vacancy.workSchedule}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Tajriba talabi</span>
                <span className="font-semibold text-slate-800">{vacancy.experienceRequired}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Kategoriya</span>
                <span className="font-semibold text-slate-800">{vacancy.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Aniq manzil</span>
                <span className="font-semibold text-slate-800">{vacancy.address}</span>
              </div>
            </div>

            {/* Company Video Preview (if available) */}
            {company?.videoUrl && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Video className="w-4 h-4 text-blue-600" />
                    <span>Ish joyi va jamoa video lavhasi</span>
                  </h3>
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="text-xs text-blue-600 font-semibold hover:underline"
                  >
                    Katta ekranda ochish
                  </button>
                </div>

                <div 
                  onClick={() => setVideoModalOpen(true)}
                  className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 cursor-pointer group shadow-sm"
                >
                  <img
                    src="/src/assets/images/company_workplace_tech_1790588660374.jpg"
                    alt={company.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-blue-600 transition-all">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium">
                    {company.videoTitle || `${company.name} taqdimot videosini ko‘rish`}
                  </div>
                </div>
              </div>
            )}

            {/* Vazifalar (Duties) */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
                Asosiy vazifalar
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed list-disc list-inside">
                {vacancy.duties?.map((duty, idx) => (
                  <li key={idx} className="marker:text-blue-500">
                    <span className="text-slate-700">{duty}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Talablar (Requirements) */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
                Nomzodga qo‘yiladigan talablar
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed list-disc list-inside">
                {vacancy.requirements?.map((req, idx) => (
                  <li key={idx} className="marker:text-blue-500">
                    <span className="text-slate-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Qo'shimcha ma'lumot (Additional Info) */}
            {vacancy.additionalInfo && (
              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
                  Qo‘shimcha shart-sharoitlar va imtiyozlar
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {vacancy.additionalInfo}
                </p>
              </div>
            )}

            {/* Report Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                E’londa qoidabuzarlik sezdingizmi?
              </span>
              <button
                onClick={() => setReportModalOpen(true)}
                className="text-xs font-medium text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Shikoyat qilish</span>
              </button>
            </div>

          </div>

          {/* Related Vacancies */}
          {relatedVacancies.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-base font-bold text-slate-900">
                O‘xshash vakansiyalar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedVacancies.map(v => (
                  <VacancyCard key={v.id} vacancy={v} />
                ))}
              </div>
            </div>
          )}

        </main>

        {/* RIGHT COLUMN: Company Profile & Contacts Card */}
        <aside className="lg:col-span-4 space-y-6 sticky top-24">
          
          {/* Company Brief Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <img
                src={company?.logoUrl || vacancy.companyLogo}
                alt={company?.name || vacancy.companyName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-100 bg-slate-50 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <h4 className="font-bold text-sm text-slate-900 truncate">
                    {company?.name || vacancy.companyName}
                  </h4>
                  {company?.verified && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </div>
                <span className="text-xs text-slate-500">
                  {company?.city || vacancy.city}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
              {company?.description || 'Kompaniya haqida ma’lumot.'}
            </p>

            {/* Aloqa ma'lumotlari (Respecting privacy toggles) */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
              <div className="font-semibold text-slate-900">Aloqa ma’lumotlari:</div>

              {company?.isPhonePublic ? (
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="font-mono">{company.phone}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-400 italic">
                  <Phone className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <span>Telefon raqami yashiringan</span>
                </div>
              )}

              {company?.isEmailPublic ? (
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{company.email}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-400 italic">
                  <Mail className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <span>Email orqali murojaat faqat ariza orqali</span>
                </div>
              )}

              {company?.website && (
                <div className="flex items-center gap-2 text-blue-600">
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  <a href={company.website} target="_blank" rel="noreferrer" className="hover:underline truncate">
                    {company.website.replace('https://', '')}
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('company', { companyId: vacancy.companyId })}
              className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors text-center block"
            >
              Kompaniyaning barcha vakansiyalari
            </button>
          </div>

          {/* Quick Safety Reminder */}
          <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900 space-y-1.5">
            <span className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Xavfsiz bandlik kafolati
            </span>
            <p className="text-[11px] leading-relaxed text-blue-800/90">
              Ish beruvchi xodimdan ishga joylashish uchun hech qachon oldindan to‘lov talab qilmasligi kerak. Shubhali holat bo‘lsa, «Shikoyat qilish» orqali xabar bering.
            </p>
          </div>

        </aside>

      </div>

      {/* Modals */}
      {applyModalOpen && (
        <ApplicationModal
          vacancy={vacancy}
          onClose={() => setApplyModalOpen(false)}
        />
      )}

      {reportModalOpen && (
        <ReportModal
          targetType="vacancy"
          targetId={vacancy.id}
          targetTitle={vacancy.title}
          onClose={() => setReportModalOpen(false)}
        />
      )}

      {videoModalOpen && company?.videoUrl && (
        <VideoPlayerModal
          videoUrl={company.videoUrl}
          videoTitle={company.videoTitle}
          companyName={company.name}
          onClose={() => setVideoModalOpen(false)}
        />
      )}

    </div>
  );
};
