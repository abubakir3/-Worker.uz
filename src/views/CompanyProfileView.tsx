import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle2, 
  Star, 
  Video, 
  Play, 
  Briefcase, 
  MessageSquare, 
  AlertTriangle,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VacancyCard } from '../components/VacancyCard';
import { VideoPlayerModal } from '../components/VideoPlayerModal';
import { ReviewModal } from '../components/ReviewModal';
import { ReportModal } from '../components/ReportModal';
import { ApplicationModal } from '../components/ApplicationModal';
import { Vacancy } from '../types';

export const CompanyProfileView: React.FC = () => {
  const { 
    selectedCompanyId, 
    companies, 
    vacancies, 
    reviews, 
    navigateTo, 
    startOrGetConversation, 
    currentUser, 
    showToast 
  } = useApp();

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedVacancyForApply, setSelectedVacancyForApply] = useState<Vacancy | null>(null);

  const company = companies.find(c => c.id === selectedCompanyId) || companies[0];

  if (!company) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Kompaniya topilmadi</h2>
        <button
          onClick={() => navigateTo('companies')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
        >
          Kompaniyalar ro‘yxatiga qaytish
        </button>
      </div>
    );
  }

  const companyVacancies = vacancies.filter(v => v.companyId === company.id && v.isActive);
  const companyReviews = reviews.filter(r => r.companyId === company.id);

  const handleStartChat = () => {
    if (!currentUser) {
      showToast('Kompaniya bilan bog‘lanish uchun avval tizimga kiring', 'error');
      return;
    }
    const convId = startOrGetConversation(company.id);
    navigateTo('chat', { conversationId: convId });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('companies')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Barcha kompaniyalarga qaytish</span>
        </button>
      </div>

      {/* Hero Header Profile Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-start sm:items-center gap-5">
            <img
              src={company.logoUrl}
              alt={company.name}
              className="w-20 h-20 rounded-2xl object-cover border border-slate-200 bg-slate-50 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {company.name}
                </h1>
                {company.verified && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                    <span>Tasdiqlangan kompaniya</span>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1 text-slate-700 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {company.city}, {company.address}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-amber-600 font-bold font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {company.rating.toFixed(1)} ({company.reviewCount} ta sharh)
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-blue-600 font-mono">
                  {companyVacancies.length} ta faol vakansiya
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={handleStartChat}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Bog‘lanish</span>
            </button>
            <button
              onClick={() => setReviewModalOpen(true)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Star className="w-4 h-4 text-amber-500" />
              <span>Baho berish</span>
            </button>
            <button
              onClick={() => setReportModalOpen(true)}
              className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition-colors"
              title="Shikoyat qilish"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Contact info grid respecting privacy toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <Phone className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Telefon:</span>
              <span className="font-mono font-medium">
                {company.isPhonePublic ? company.phone : 'Yashirilgan (faqat ariza orqali)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <Mail className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Elektron pochta:</span>
              <span className="font-mono font-medium truncate">
                {company.isEmailPublic ? company.email : 'Yashirilgan'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <Globe className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Rasmiy veb-sayt:</span>
              {company.website ? (
                <a href={company.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">
                  {company.website.replace('https://', '')}
                </a>
              ) : (
                <span className="text-slate-400">Mavjud emas</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Description + Video + Vacancies + Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): Description, Video showcase & Active Vacancies */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Company Description */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-slate-900">
              Kompaniya haqida
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {company.description}
            </p>
          </div>

          {/* Prominent Company Video Showcase */}
          {company.videoUrl && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Video className="w-5 h-5 text-blue-600" />
                    <span>Kompaniya va ish muhiti videolavhasi</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ofis sharoitlari, jamoaviy muhit va korporativ hayot bilan tanishing
                  </p>
                </div>
              </div>

              <div 
                onClick={() => setVideoModalOpen(true)}
                className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 cursor-pointer group shadow-md"
              >
                <img
                  src="/src/assets/images/company_workplace_tech_1790588660374.jpg"
                  alt={company.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-85"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold bg-black/60 backdrop-blur-xs p-2.5 rounded-lg">
                  {company.videoTitle || `${company.name} ish jarayoni`}
                </div>
              </div>
            </div>
          )}

          {/* Active Vacancies List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span>Kompaniyaning faol vakansiyalari ({companyVacancies.length})</span>
              </h2>
            </div>

            {companyVacancies.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-xs text-slate-500">
                Ushbu kompaniyada ayni paytda ochiq vakansiyalar mavjud emas.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {companyVacancies.map(v => (
                  <VacancyCard 
                    key={v.id} 
                    vacancy={v} 
                    onApplyClick={(vac) => setSelectedVacancyForApply(vac)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column (4 cols): Reviews & Rating breakdown */}
        <aside className="lg:col-span-4 space-y-6 sticky top-24">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                Xodimlar fikrlari
              </h3>
              <button
                onClick={() => setReviewModalOpen(true)}
                className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Fikr qoldirish</span>
              </button>
            </div>

            {/* Rating score header */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                {company.rating.toFixed(1)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= Math.round(company.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  {companyReviews.length} ta tasdiqlangan sharh
                </div>
              </div>
            </div>

            {/* Reviews list */}
            <div className="space-y-3 divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {companyReviews.length === 0 ? (
                <div className="text-xs text-slate-400 text-center py-4">
                  Hozircha sharhlar qoldirilmagan. Birinchi bo‘lib fikr bildiring!
                </div>
              ) : (
                companyReviews.map((rev) => (
                  <div key={rev.id} className="pt-3 first:pt-0 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{rev.authorName}</span>
                      <div className="flex items-center text-amber-400">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {rev.comment}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      {rev.createdAt}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </aside>

      </div>

      {/* Modals */}
      {videoModalOpen && company.videoUrl && (
        <VideoPlayerModal
          videoUrl={company.videoUrl}
          videoTitle={company.videoTitle}
          companyName={company.name}
          onClose={() => setVideoModalOpen(false)}
        />
      )}

      {reviewModalOpen && (
        <ReviewModal
          companyId={company.id}
          companyName={company.name}
          onClose={() => setReviewModalOpen(false)}
        />
      )}

      {reportModalOpen && (
        <ReportModal
          targetType="company"
          targetId={company.id}
          targetTitle={company.name}
          onClose={() => setReportModalOpen(false)}
        />
      )}

      {selectedVacancyForApply && (
        <ApplicationModal
          vacancy={selectedVacancyForApply}
          onClose={() => setSelectedVacancyForApply(null)}
        />
      )}

    </div>
  );
};
