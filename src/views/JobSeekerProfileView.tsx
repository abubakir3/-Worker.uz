import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Edit3, 
  Shield, 
  Check, 
  Upload, 
  Lock, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const JobSeekerProfileView: React.FC = () => {
  const { currentJobSeeker, updateJobSeekerProfile, navigateTo, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    firstName: currentJobSeeker.firstName,
    lastName: currentJobSeeker.lastName,
    phone: currentJobSeeker.phone,
    email: currentJobSeeker.email,
    city: currentJobSeeker.city,
    profession: currentJobSeeker.profession,
    experienceYears: currentJobSeeker.experienceYears,
    education: currentJobSeeker.education,
    bio: currentJobSeeker.bio,
    skills: currentJobSeeker.skills.join(', '),
    isPhonePublic: currentJobSeeker.isPhonePublic,
    isEmailPublic: currentJobSeeker.isEmailPublic,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = form.skills.split(',').map(s => s.trim()).filter(Boolean);
    updateJobSeekerProfile({
      ...form,
      skills: skillsArray
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Profile Summary Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={currentJobSeeker.avatarUrl}
                alt={`${currentJobSeeker.firstName} ${currentJobSeeker.lastName}`}
                className="w-20 h-20 rounded-2xl object-cover border border-slate-200 bg-slate-50"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title="Onlayn"></span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-900">
                {currentJobSeeker.firstName} {currentJobSeeker.lastName}
              </h1>
              <p className="text-sm font-semibold text-blue-600">
                {currentJobSeeker.profession}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {currentJobSeeker.city}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-600">
                  {currentJobSeeker.experienceYears} tajriba
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Tahrirni bekor qilish' : 'Profilni tahrirlash'}</span>
            </button>
            <button
              onClick={() => navigateTo('applications')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors"
            >
              Arizalarim
            </button>
          </div>

        </div>

        {/* Privacy Notice Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Maxfiylik himoyasi:</span>
            <span className="font-medium text-slate-700">
              {currentJobSeeker.isPhonePublic ? 'Telefon ommaviy' : 'Telefon faqat ariza topshirilganda ko‘rinadi'}
            </span>
          </div>
          <span className="font-mono text-slate-400">Ishchi.uz ID: #8849-UZ</span>
        </div>
      </div>

      {/* Main Body: Display or Edit Form */}
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              Profil ma’lumotlarini yangilash
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              O‘zingiz haqingizda to‘liq ma’lumot berish ish beruvchi e’tiborini jalb qiladi
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ism
              </label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Familiya
              </label>
              <input
                type="text"
                required
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kasb yoki mutaxassislik
              </label>
              <input
                type="text"
                required
                value={form.profession}
                onChange={(e) => setForm({ ...form, profession: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Shahar
              </label>
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none bg-white"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Telefon raqami
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
              />
              <label className="flex items-center gap-2 text-xs text-slate-600 mt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isPhonePublic}
                  onChange={(e) => setForm({ ...form, isPhonePublic: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600"
                />
                Telefon raqamini ommaviy ko‘rsatish
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Elektron pochta (Email)
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
              />
              <label className="flex items-center gap-2 text-xs text-slate-600 mt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isEmailPublic}
                  onChange={(e) => setForm({ ...form, isEmailPublic: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600"
                />
                Emailni ommaviy ko‘rsatish
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ish tajribasi
              </label>
              <select
                value={form.experienceYears}
                onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none bg-white"
              >
                <option value="Tajribasiz">Tajribasiz</option>
                <option value="1-3 yil">1-3 yil</option>
                <option value="4 yil">4 yil</option>
                <option value="5+ yil">5 yildan ko‘p</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ta’lim
              </label>
              <input
                type="text"
                value={form.education}
                onChange={(e) => setForm({ ...form, education: e.target.value })}
                placeholder="Universitet, kollej yoki kurslar"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ko‘nikmalar (vergul bilan ajrating)
            </label>
            <input
              type="text"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              O‘zi haqida qisqacha (Bio)
            </label>
            <textarea
              rows={4}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors"
            >
              Saqlash
            </button>
          </div>
        </form>
      ) : (
        /* Read-only profile view */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            
            {/* O'zi haqida */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
                O‘zi haqida
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentJobSeeker.bio}
              </p>
            </div>

            {/* Ko'nikmalar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
                Kasbiy ko‘nikmalar
              </h2>
              <div className="flex flex-wrap gap-2">
                {currentJobSeeker.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Ta'lim va Tajriba */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
                Ta’lim va tajriba
              </h2>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Oliy ma’lumot
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {currentJobSeeker.education}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Umumiy ish staji
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {currentJobSeeker.experienceYears} sohada muvaffaqiyatli faoliyat
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Contacts & Resume file */}
          <div className="space-y-6">
            
            {/* Rezyume fayli */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Mening Rezyumeim (CV)
              </h3>
              
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-slate-900 block truncate">
                    {currentJobSeeker.resumeFileName || 'Rezyume.pdf'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    PDF hujjat (yangilangan)
                  </span>
                </div>
              </div>

              <button
                onClick={() => showToast('Rezyume yangilash oynasi ochildi', 'info')}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Yangi fayl yuklash</span>
              </button>
            </div>

            {/* Aloqa ma'lumotlari */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 text-xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Aloqa ma’lumotlari
              </h3>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-mono">{currentJobSeeker.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">{currentJobSeeker.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{currentJobSeeker.city}, O‘zbekiston</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <p>
                  Telefon va email faqat siz ariza topshirgan tasdiqlangan ish beruvchilarga taqdim etiladi.
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
