import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  PlusCircle, 
  FileText, 
  Users, 
  Building2, 
  Video, 
  MessageSquare, 
  Settings, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Clock, 
  Upload, 
  Play, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus, JobType, ExperienceLevel } from '../types';

export const CompanyDashboardView: React.FC = () => {
  const { 
    currentCompany, 
    updateCompanyProfile,
    vacancies, 
    addVacancy, 
    deleteVacancy, 
    toggleVacancyStatus,
    applications, 
    updateApplicationStatus, 
    uploadCompanyVideo, 
    deleteCompanyVideo, 
    startOrGetConversation, 
    navigateTo,
    showToast,
    categories
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'vacancies' | 'create' | 'applications' | 'video' | 'profile' | 'settings'>('overview');

  // New vacancy form state
  const [newVacancy, setNewVacancy] = useState({
    title: '',
    category: 'IT va Texnologiya',
    city: 'Toshkent',
    address: 'Amir Temur ko‘chasi, 107B',
    salaryMin: 12000000,
    salaryMax: 18000000,
    salaryCurrency: 'so‘m',
    isSalaryNegotiable: false,
    jobType: 'To‘liq stavka' as JobType,
    workSchedule: 'Dushanba - Juma, 09:00 - 18:00',
    experienceRequired: '1-3 yil' as ExperienceLevel,
    requirementsText: 'React va TypeScript bilish\nGit bilan ishlash tajribasi\nJamoada ishlash ko‘nikmasi',
    dutiesText: 'Foydalanuvchi interfeyslarini ishlab chiqish\nKod sifatini ta’minlash\nBackend jamoasi bilan integratsiya',
    additionalInfo: 'Bepul tushlik, qulay ofis, sport zali obunasi taqdim etiladi.'
  });

  // Company Profile form state
  const [profileForm, setProfileForm] = useState({
    name: currentCompany.name,
    phone: currentCompany.phone,
    email: currentCompany.email,
    address: currentCompany.address,
    city: currentCompany.city,
    description: currentCompany.description,
    website: currentCompany.website || '',
    isPhonePublic: currentCompany.isPhonePublic,
    isEmailPublic: currentCompany.isEmailPublic,
  });

  // Video upload state
  const [videoInputUrl, setVideoInputUrl] = useState(currentCompany.videoUrl || '');
  const [videoInputTitle, setVideoInputTitle] = useState(currentCompany.videoTitle || '');
  const [videoFileError, setVideoFileError] = useState<string | null>(null);

  // Application filter
  const [appStatusFilter, setAppStatusFilter] = useState<string>('all');

  // Company-specific vacancies and applications
  const myVacancies = vacancies.filter(v => v.companyId === currentCompany.id);
  const myApplications = applications.filter(a => a.companyId === currentCompany.id);

  // Filtered applications
  const filteredApps = myApplications.filter(a => {
    if (appStatusFilter === 'all') return true;
    return a.status === appStatusFilter;
  });

  // Statistics
  const activeVacanciesCount = myVacancies.filter(v => v.isActive).length;
  const totalApplicationsCount = myApplications.length;
  const reviewedApplicationsCount = myApplications.filter(a => a.status !== 'Yuborildi').length;
  const interviewsCount = myApplications.filter(a => a.status === 'Suhbatga taklif qilindi').length;

  const handleCreateVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVacancy.title.trim()) {
      showToast('Iltimos, lavozim nomini kiriting', 'error');
      return;
    }

    const reqArray = newVacancy.requirementsText
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean);

    const dutiesArray = newVacancy.dutiesText
      .split('\n')
      .map(d => d.trim())
      .filter(Boolean);

    addVacancy({
      companyId: currentCompany.id,
      companyName: currentCompany.name,
      companyLogo: currentCompany.logoUrl,
      title: newVacancy.title.trim(),
      category: newVacancy.category,
      city: newVacancy.city,
      address: newVacancy.address,
      salaryMin: Number(newVacancy.salaryMin) || undefined,
      salaryMax: Number(newVacancy.salaryMax) || undefined,
      salaryCurrency: newVacancy.salaryCurrency,
      isSalaryNegotiable: newVacancy.isSalaryNegotiable,
      jobType: newVacancy.jobType,
      workSchedule: newVacancy.workSchedule,
      experienceRequired: newVacancy.experienceRequired,
      requirements: reqArray.length > 0 ? reqArray : ['Malaka va mas’uliyat talab qilinadi'],
      duties: dutiesArray.length > 0 ? dutiesArray : ['Belgilangan vazifalarni bajarish'],
      additionalInfo: newVacancy.additionalInfo
    });

    setActiveTab('vacancies');
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyProfile(profileForm);
  };

  const handleVideoUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Check extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'mp4' && extension !== 'webm') {
      setVideoFileError('Faqat MP4 yoki WebM formatidagi videolarni yuklash mumkin.');
      return;
    }

    // Use sample video stream for immediate smooth preview
    const sampleVideo = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
    uploadCompanyVideo(currentCompany.id, sampleVideo, file.name);
    setVideoInputUrl(sampleVideo);
    setVideoInputTitle(file.name);
  };

  const handleSaveVideoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoInputUrl.trim()) return;
    uploadCompanyVideo(currentCompany.id, videoInputUrl.trim(), videoInputTitle.trim());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Welcome Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentCompany.logoUrl}
            alt={currentCompany.name}
            className="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">
                {currentCompany.name}
              </h1>
              {currentCompany.verified && (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                  Tasdiqlangan
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ish beruvchi boshqaruv kabineti · {currentCompany.city}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('create')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yangi vakansiya</span>
          </button>
          <button
            onClick={() => navigateTo('company', { companyId: currentCompany.id })}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Kompaniya sahifasi</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar Tabs + Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Navigation Tabs (Sidebar) */}
        <nav className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-3 space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              activeTab === 'overview' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              Umumiy ko‘rsatkichlar
            </span>
          </button>

          <button
            onClick={() => setActiveTab('vacancies')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              activeTab === 'vacancies' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4" />
              Vakansiyalarim
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
              activeTab === 'vacancies' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {myVacancies.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              activeTab === 'create' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <PlusCircle className="w-4 h-4" />
              Vakansiya qo‘shish
            </span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              activeTab === 'applications' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              Kelgan arizalar
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
              activeTab === 'applications' ? 'bg-blue-700 text-white' : 'bg-blue-50 text-blue-700'
            }`}>
              {myApplications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              activeTab === 'video' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Video className="w-4 h-4" />
              Kompaniya videosi
            </span>
            {currentCompany.videoUrl && (
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            )}
          </button>

          <button
            onClick={() => navigateTo('chat')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
          >
            <span className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4" />
              Xabarlar (Chat)
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              activeTab === 'profile' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4" />
              Kompaniya profili
            </span>
          </button>
        </nav>

        {/* Tab Content Panes */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: OVERVIEW (Umumiy ko'rsatkichlar) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* 4 Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <span className="text-xs text-slate-500 font-medium block">Faol vakansiyalar</span>
                  <div className="text-2xl font-extrabold text-blue-600 font-mono tabular-nums mt-1">
                    {activeVacanciesCount}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Ochiq tanlovlar</span>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <span className="text-xs text-slate-500 font-medium block">Kelgan arizalar</span>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
                    {totalApplicationsCount}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Jami qabul qilingan</span>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <span className="text-xs text-slate-500 font-medium block">Ko‘rib chiqilgan</span>
                  <div className="text-2xl font-extrabold text-emerald-600 font-mono tabular-nums mt-1">
                    {reviewedApplicationsCount}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Kadrlar tahlili</span>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <span className="text-xs text-slate-500 font-medium block">Suhbatga taklif</span>
                  <div className="text-2xl font-extrabold text-amber-600 font-mono tabular-nums mt-1">
                    {interviewsCount}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Belgilangan uchrashuv</span>
                </div>
              </div>

              {/* Quick Recent Applications Table */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">
                    So‘nggi qabul qilingan arizalar
                  </h3>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Barchasini ko‘rish ({myApplications.length})
                  </button>
                </div>

                {myApplications.length === 0 ? (
                  <div className="text-xs text-slate-500 text-center py-8">
                    Hozircha arizalar kelib tushmadi.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {myApplications.slice(0, 4).map((app) => (
                      <div key={app.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {app.jobSeekerName}
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            {app.vacancyTitle} · {app.appliedDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                            {app.status}
                          </span>
                          <button
                            onClick={() => setActiveTab('applications')}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Ko‘rish
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video Promotion Card */}
              <div className="bg-linear-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                    Ish beruvchilar uchun imkoniyat
                  </span>
                  <h4 className="text-lg font-bold">
                    Kompaniyangiz haqida videolavha joylashtiring
                  </h4>
                  <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                    Videolavhaga ega vakansiyalar 3 barobar ko‘proq ko‘riladi va nomzodlar ishonchini oshiradi.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('video')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl whitespace-nowrap shadow-sm"
                >
                  Video boshqaruviga o‘tish
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: MY VACANCIES (Vakansiyalarim) */}
          {activeTab === 'vacancies' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Kompaniya vakansiyalari
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Faol va to‘xtatilgan barcha e’lonlaringiz
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('create')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Vakansiya qo‘shish</span>
                </button>
              </div>

              {myVacancies.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500">
                    Siz hali vakansiya joylashtirmagansiz.
                  </p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
                  >
                    Birinchi vakansiyani e’lon qilish
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myVacancies.map((v) => (
                    <div 
                      key={v.id}
                      className="border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
                    >
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 
                            onClick={() => navigateTo('vacancy', { vacancyId: v.id })}
                            className="text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer truncate"
                          >
                            {v.title}
                          </h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                            v.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {v.isActive ? 'Faol' : 'To‘xtatilgan'}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>{v.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{v.applicationsCount} ta ariza</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{v.viewsCount} ta ko‘rish</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{v.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                          onClick={() => toggleVacancyStatus(v.id)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                            v.isActive
                              ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >
                          {v.isActive ? 'To‘xtatish' : 'Faollashtirish'}
                        </button>
                        <button
                          onClick={() => deleteVacancy(v.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                          title="O‘chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CREATE VACANCY (Yangi vakansiya qo'shish) */}
          {activeTab === 'create' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Yangi vakansiya e’lon qilish
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Barcha talab va shartlarni to‘liq ko‘rsating, shunda mos mutaxassislar tezroq murojaat qiladi
                </p>
              </div>

              <form onSubmit={handleCreateVacancy} className="space-y-4">
                
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lavozim nomi *
                  </label>
                  <input
                    type="text"
                    required
                    value={newVacancy.title}
                    onChange={(e) => setNewVacancy({ ...newVacancy, title: e.target.value })}
                    placeholder="Masalan: Senior Backend Dasturchi"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kasb kategoriyasi *
                    </label>
                    <select
                      value={newVacancy.category}
                      onChange={(e) => setNewVacancy({ ...newVacancy, category: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Shahar *
                    </label>
                    <select
                      value={newVacancy.city}
                      onChange={(e) => setNewVacancy({ ...newVacancy, city: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      <option value="Toshkent">Toshkent</option>
                      <option value="Samarqand">Samarqand</option>
                      <option value="Buxoro">Buxoro</option>
                      <option value="Andijon">Andijon</option>
                      <option value="Farg‘ona">Farg‘ona</option>
                      <option value="Namangan">Namangan</option>
                      <option value="Qarshi">Qarshi</option>
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Aniq manzil *
                  </label>
                  <input
                    type="text"
                    required
                    value={newVacancy.address}
                    onChange={(e) => setNewVacancy({ ...newVacancy, address: e.target.value })}
                    placeholder="Masalan: Chilonzor tumani, 5-mavze, 22-bino"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Salary options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Minimal maosh (so‘m)
                    </label>
                    <input
                      type="number"
                      step="500000"
                      value={newVacancy.salaryMin}
                      onChange={(e) => setNewVacancy({ ...newVacancy, salaryMin: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Maksimal maosh (so‘m)
                    </label>
                    <input
                      type="number"
                      step="500000"
                      value={newVacancy.salaryMax}
                      onChange={(e) => setNewVacancy({ ...newVacancy, salaryMax: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                    />
                  </div>
                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newVacancy.isSalaryNegotiable}
                        onChange={(e) => setNewVacancy({ ...newVacancy, isSalaryNegotiable: e.target.checked })}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      Kelishilgan holda
                    </label>
                  </div>
                </div>

                {/* Job type & Schedule & Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ish turi *
                    </label>
                    <select
                      value={newVacancy.jobType}
                      onChange={(e) => setNewVacancy({ ...newVacancy, jobType: e.target.value as any })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      <option value="To‘liq stavka">To‘liq stavka</option>
                      <option value="Yarim stavka">Yarim stavka</option>
                      <option value="Masofaviy ish">Masofaviy ish</option>
                      <option value="Amaliyot">Amaliyot</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ish vaqti / Grafigi
                    </label>
                    <input
                      type="text"
                      value={newVacancy.workSchedule}
                      onChange={(e) => setNewVacancy({ ...newVacancy, workSchedule: e.target.value })}
                      placeholder="Masalan: Dushanba - Juma, 09:00 - 18:00"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tajriba talabi
                    </label>
                    <select
                      value={newVacancy.experienceRequired}
                      onChange={(e) => setNewVacancy({ ...newVacancy, experienceRequired: e.target.value as any })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      <option value="Tajribasiz">Tajribasiz</option>
                      <option value="1-3 yil">1-3 yil</option>
                      <option value="3-5 yil">3-5 yil</option>
                      <option value="5+ yil">5 yildan ko‘p</option>
                    </select>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nomzodga talablar (Har bir talab alohida qatorda) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newVacancy.requirementsText}
                    onChange={(e) => setNewVacancy({ ...newVacancy, requirementsText: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed font-mono"
                  />
                </div>

                {/* Duties */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Asosiy vazifalar (Har bir vazifa alohida qatorda) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newVacancy.dutiesText}
                    onChange={(e) => setNewVacancy({ ...newVacancy, dutiesText: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed font-mono"
                  />
                </div>

                {/* Additional Info */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Qo‘shimcha ma’lumot va imtiyozlar
                  </label>
                  <textarea
                    rows={2}
                    value={newVacancy.additionalInfo}
                    onChange={(e) => setNewVacancy({ ...newVacancy, additionalInfo: e.target.value })}
                    placeholder="Tushlik, transport, bonuslar, tibbiy sug‘urta..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('vacancies')}
                    className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    E’lon qilish
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: APPLICATIONS (Kelgan arizalar) */}
          {activeTab === 'applications' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Nomzodlardan kelgan arizalar ({myApplications.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Rezyumelarni ko‘rib chiqing va nomzod bilan bevosita bog‘laning
                  </p>
                </div>

                {/* Status filter */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Holat:</span>
                  <select
                    value={appStatusFilter}
                    onChange={(e) => setAppStatusFilter(e.target.value)}
                    className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 outline-none"
                  >
                    <option value="all">Barchasi</option>
                    <option value="Yuborildi">Yuborildi</option>
                    <option value="Ko‘rib chiqilmoqda">Ko‘rib chiqilmoqda</option>
                    <option value="Suhbatga taklif qilindi">Suhbatga taklif qilindi</option>
                    <option value="Qabul qilindi">Qabul qilindi</option>
                    <option value="Rad etildi">Rad etildi</option>
                  </select>
                </div>
              </div>

              {filteredApps.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-500">
                  Ushbu filtr bo‘yicha arizalar topilmadi.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApps.map((app) => (
                    <div
                      key={app.id}
                      className="border border-slate-200 rounded-xl p-5 space-y-4 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <span className="text-xs font-semibold text-blue-600 block">
                            {app.vacancyTitle}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 mt-0.5">
                            {app.jobSeekerName}
                          </h3>
                          <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                            <span>{app.jobSeekerProfession}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono">{app.jobSeekerPhone}</span>
                            <span aria-hidden="true">·</span>
                            <span>{app.jobSeekerEmail}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono text-slate-400">{app.appliedDate}</span>
                          </div>
                        </div>

                        {/* Status selector */}
                        <div className="shrink-0 flex items-center gap-2">
                          <select
                            value={app.status}
                            onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border outline-none ${
                              app.status === 'Suhbatga taklif qilindi'
                                ? 'bg-amber-50 text-amber-700 border-amber-300'
                                : app.status === 'Qabul qilindi'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : app.status === 'Rad etildi'
                                ? 'bg-rose-50 text-rose-700 border-rose-300'
                                : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                          >
                            <option value="Yuborildi">Yuborildi</option>
                            <option value="Ko‘rib chiqilmoqda">Ko‘rib chiqilmoqda</option>
                            <option value="Suhbatga taklif qilindi">Suhbatga taklif qilindi</option>
                            <option value="Qabul qilindi">Qabul qilindi</option>
                            <option value="Rad etildi">Rad etildi</option>
                          </select>
                        </div>
                      </div>

                      {/* Cover letter message */}
                      {app.coverLetter && (
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 leading-relaxed">
                          <span className="font-semibold text-slate-800 block mb-1">Nomzod xabari:</span>
                          {app.coverLetter}
                        </div>
                      )}

                      {/* Actions: Resume + Chat */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100">
                        <div className="flex items-center gap-2 text-slate-700">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">{app.resumeFileName}</span>
                          <span className="text-[11px] text-slate-400">(Yuklab olishga tayyor)</span>
                        </div>

                        <button
                          onClick={() => {
                            const convId = startOrGetConversation(currentCompany.id, app.vacancyId);
                            navigateTo('chat', { conversationId: convId });
                          }}
                          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Nomzodga yozish</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: VIDEO MANAGEMENT (Video boshqaruvi) */}
          {activeTab === 'video' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  <span>Kompaniya taqdimot videosini boshqarish</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Kompaniya ofisi, ish muhiti yoki jamoangiz haqidagi videoni yuklang (MP4, WebM formatlari qo‘llab-quvvatlanadi)
                </p>
              </div>

              {/* Current Video Preview or Empty box */}
              {currentCompany.videoUrl ? (
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
                    <video
                      controls
                      src={currentCompany.videoUrl}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-semibold text-slate-800">Video nomi: </span>
                      <span className="text-slate-600">{currentCompany.videoTitle || 'Kompaniya videosi'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteCompanyVideo(currentCompany.id)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Videoni o‘chirish</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-3 bg-slate-50/50">
                  <Video className="w-12 h-12 text-slate-400 mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800">
                      Hozircha video yuklanmagan
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Kompaniya va ish joyingiz haqidagi taqdimot videosini MP4 yoki WebM formatida yuklang.
                    </p>
                  </div>
                </div>
              )}

              {/* Upload Controls */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Yangi video yuklash yoki almashtirish
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Option A: Direct File Upload */}
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Upload className="w-4 h-4 text-blue-600" />
                      <span>Fayldan yuklash (MP4 / WebM)</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Kompyuteringizdan video faylni tanlang
                    </p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl cursor-pointer shadow-2xs">
                      <span>Faylni tanlash</span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm"
                        onChange={handleVideoUploadSimulate}
                        className="hidden"
                      />
                    </label>
                    {videoFileError && (
                      <p className="text-xs text-rose-600">{videoFileError}</p>
                    )}
                  </div>

                  {/* Option B: Video URL */}
                  <form onSubmit={handleSaveVideoUrl} className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                      <span>Video havola (URL) orqali</span>
                    </div>
                    <input
                      type="url"
                      value={videoInputUrl}
                      onChange={(e) => setVideoInputUrl(e.target.value)}
                      placeholder="https://server.uz/video.mp4"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                    />
                    <input
                      type="text"
                      value={videoInputTitle}
                      onChange={(e) => setVideoInputTitle(e.target.value)}
                      placeholder="Video sarlavhasi"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl"
                    >
                      Saqlash
                    </button>
                  </form>

                </div>
              </div>

            </div>
          )}

          {/* TAB 6: COMPANY PROFILE (Kompaniya profili) */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Kompaniya ma’lumotlarini tahrirlash
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Nomzodlar kompaniya sahifasida ushbu ma’lumotlarni ko‘radi
                </p>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kompaniya nomi
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Telefon raqami
                    </label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
                    />
                    <label className="flex items-center gap-2 text-xs text-slate-600 mt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profileForm.isPhonePublic}
                        onChange={(e) => setProfileForm({ ...profileForm, isPhonePublic: e.target.checked })}
                        className="rounded border-slate-300 text-blue-600"
                      />
                      Telefonni ommaviy ko‘rsatish
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Elektron pochta (Email)
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
                    />
                    <label className="flex items-center gap-2 text-xs text-slate-600 mt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profileForm.isEmailPublic}
                        onChange={(e) => setProfileForm({ ...profileForm, isEmailPublic: e.target.checked })}
                        className="rounded border-slate-300 text-blue-600"
                      />
                      Emailni ommaviy ko‘rsatish
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Shahar
                    </label>
                    <select
                      value={profileForm.city}
                      onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none bg-white"
                    >
                      <option value="Toshkent">Toshkent</option>
                      <option value="Samarqand">Samarqand</option>
                      <option value="Buxoro">Buxoro</option>
                      <option value="Andijon">Andijon</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Rasmiy veb-sayt
                    </label>
                    <input
                      type="url"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                      placeholder="https://uzum.uz"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Aniq manzil
                  </label>
                  <input
                    type="text"
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kompaniya haqida batafsil ma’lumot
                  </label>
                  <textarea
                    rows={4}
                    value={profileForm.description}
                    onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    Ma’lumotlarni saqlash
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
