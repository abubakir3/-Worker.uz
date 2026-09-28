import React, { useState } from 'react';
import { X, Eye, EyeOff, Building2, User, Lock, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { authModalOpen, authModalTab, closeAuthModal, setCurrentUser, showToast, navigateTo } = useApp();
  const [tab, setTab] = useState<'login' | 'register_seeker' | 'register_company'>(authModalTab);
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Job Seeker registration form state
  const [seekerForm, setSeekerForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    city: 'Toshkent',
    profession: '',
    experienceYears: '1-3 yil',
    skills: '',
  });

  // Company registration form state
  const [companyForm, setCompanyForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    address: '',
    city: 'Toshkent',
    description: '',
    logoUrl: '',
  });

  const [formError, setFormError] = useState<string | null>(null);

  // Sync tab with context if opened from external buttons
  React.useEffect(() => {
    setTab(authModalTab);
    setFormError(null);
  }, [authModalTab]);

  if (!authModalOpen) return null;

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setFormError('Iltimos, barcha majburiy maydonlarni to‘ldiring.');
      return;
    }
    if (!validateEmail(loginEmail)) {
      setFormError('Email manzili noto‘g‘ri.');
      return;
    }
    if (loginPassword.length < 8) {
      setFormError('Parol kamida 8 ta belgidan iborat bo‘lishi kerak.');
      return;
    }

    // Determine mock role by email or default to seeker
    const isComp = loginEmail.includes('hr') || loginEmail.includes('company');
    const userRole = isComp ? 'company' : 'jobseeker';

    setCurrentUser({
      id: `user-${Date.now()}`,
      email: loginEmail,
      name: isComp ? 'Kompaniya Vakili' : 'Foydalanuvchi',
      role: userRole,
      createdAt: new Date().toISOString()
    });

    showToast('Tizimga muvaffaqiyatli kirdingiz!', 'success');
    closeAuthModal();
    if (isComp) {
      navigateTo('dashboard');
    }
  };

  const handleSeekerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const { firstName, lastName, phone, email, password, city, profession } = seekerForm;

    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim() || !password.trim() || !profession.trim()) {
      setFormError('Iltimos, barcha majburiy maydonlarni to‘ldiring.');
      return;
    }
    if (!validateEmail(email)) {
      setFormError('Email manzili noto‘g‘ri.');
      return;
    }
    if (password.length < 8) {
      setFormError('Parol kamida 8 ta belgidan iborat bo‘lishi kerak.');
      return;
    }

    setCurrentUser({
      id: `user-${Date.now()}`,
      email,
      name: `${firstName} ${lastName}`,
      role: 'jobseeker',
      phone,
      avatarUrl: '/src/assets/images/avatar_jobseeker_uzbek_1790588684967.jpg',
      createdAt: new Date().toISOString()
    });

    showToast('Ish qidiruvchi sifatida ro‘yxatdan o‘tdingiz!', 'success');
    closeAuthModal();
    navigateTo('profile');
  };

  const handleCompanyRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const { name, phone, email, password, address, description } = companyForm;

    if (!name.trim() || !phone.trim() || !email.trim() || !password.trim() || !address.trim() || !description.trim()) {
      setFormError('Iltimos, barcha majburiy maydonlarni to‘ldiring.');
      return;
    }
    if (!validateEmail(email)) {
      setFormError('Email manzili noto‘g‘ri.');
      return;
    }
    if (password.length < 8) {
      setFormError('Parol kamida 8 ta belgidan iborat bo‘lishi kerak.');
      return;
    }

    setCurrentUser({
      id: `user-comp-${Date.now()}`,
      email,
      name,
      role: 'company',
      phone,
      createdAt: new Date().toISOString()
    });

    showToast('Kompaniya muvaffaqiyatli ro‘yxatdan o‘tkazildi!', 'success');
    closeAuthModal();
    navigateTo('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {tab === 'login' && 'Tizimga kirish'}
              {tab === 'register_seeker' && 'Ish qidiruvchi ro‘yxatdan o‘tishi'}
              {tab === 'register_company' && 'Kompaniya ro‘yxatdan o‘tishi'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ishchi.uz — O‘zbekistonning zamonaviy ish bozori
            </p>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Tab Controls */}
        <div className="p-3 bg-slate-50 border-b border-slate-100">
          <div className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => { setTab('login'); setFormError(null); }}
              className={`py-2 px-1 rounded-lg transition-all text-center ${
                tab === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kirish
            </button>
            <button
              onClick={() => { setTab('register_seeker'); setFormError(null); }}
              className={`py-2 px-1 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
                tab === 'register_seeker' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Ish qidiruvchi</span>
            </button>
            <button
              onClick={() => { setTab('register_company'); setFormError(null); }}
              className={`py-2 px-1 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
                tab === 'register_company' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Kompaniya</span>
            </button>
          </div>
        </div>

        {/* Error message */}
        {formError && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-medium text-rose-700">
            {formError}
          </div>
        )}

        {/* TAB 1: LOGIN */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Elektron pochta (Email)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="namuna@mail.uz"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Parol
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Kamida 8 ta belgi"
                  className="w-full pl-9 pr-10 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                Eslab qolish
              </label>
              <span className="text-blue-600 hover:underline cursor-pointer">
                Parolni unutdingizmi?
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors mt-2"
            >
              Tizimga kirish
            </button>

            <div className="text-center text-xs text-slate-500 pt-3 border-t border-slate-100">
              Hisobingiz yo‘qmi?{' '}
              <button
                type="button"
                onClick={() => setTab('register_seeker')}
                className="text-blue-600 font-semibold hover:underline"
              >
                Ro‘yxatdan o‘ting
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: REGISTER JOB SEEKER */}
        {tab === 'register_seeker' && (
          <form onSubmit={handleSeekerRegister} className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ism *
                </label>
                <input
                  type="text"
                  value={seekerForm.firstName}
                  onChange={(e) => setSeekerForm({ ...seekerForm, firstName: e.target.value })}
                  placeholder="Javohir"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Familiya *
                </label>
                <input
                  type="text"
                  value={seekerForm.lastName}
                  onChange={(e) => setSeekerForm({ ...seekerForm, lastName: e.target.value })}
                  placeholder="Alimov"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Telefon raqami *
                </label>
                <input
                  type="tel"
                  value={seekerForm.phone}
                  onChange={(e) => setSeekerForm({ ...seekerForm, phone: e.target.value })}
                  placeholder="+998 90 123-45-67"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Shahar *
                </label>
                <select
                  value={seekerForm.city}
                  onChange={(e) => setSeekerForm({ ...seekerForm, city: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
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
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Elektron pochta (Email) *
              </label>
              <input
                type="email"
                value={seekerForm.email}
                onChange={(e) => setSeekerForm({ ...seekerForm, email: e.target.value })}
                placeholder="javohir@namuna.uz"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Parol yarating *
              </label>
              <input
                type="password"
                value={seekerForm.password}
                onChange={(e) => setSeekerForm({ ...seekerForm, password: e.target.value })}
                placeholder="Kamida 8 ta belgi"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kasb yoki mutaxassislik *
                </label>
                <input
                  type="text"
                  value={seekerForm.profession}
                  onChange={(e) => setSeekerForm({ ...seekerForm, profession: e.target.value })}
                  placeholder="Masalan: Frontend Dasturchi"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ish tajribasi
                </label>
                <select
                  value={seekerForm.experienceYears}
                  onChange={(e) => setSeekerForm({ ...seekerForm, experienceYears: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="Tajribasiz">Tajribasiz (yangi boshlovchi)</option>
                  <option value="1-3 yil">1-3 yil</option>
                  <option value="3-5 yil">3-5 yil</option>
                  <option value="5+ yil">5 yildan ko‘p</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Asosiy ko‘nikmalar (vergul bilan ajrating)
              </label>
              <input
                type="text"
                value={seekerForm.skills}
                onChange={(e) => setSeekerForm({ ...seekerForm, skills: e.target.value })}
                placeholder="React, TypeScript, CSS, Git"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors mt-3"
            >
              Ro‘yxatdan o‘tish
            </button>
          </form>
        )}

        {/* TAB 3: REGISTER COMPANY */}
        {tab === 'register_company' && (
          <form onSubmit={handleCompanyRegister} className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kompaniya yoki tashkilot nomi *
              </label>
              <input
                type="text"
                value={companyForm.name}
                onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                placeholder="Masalan: Uzum Technologies MChJ"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Telefon raqami *
                </label>
                <input
                  type="tel"
                  value={companyForm.phone}
                  onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                  placeholder="+998 71 200-00-00"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Shahar *
                </label>
                <select
                  value={companyForm.city}
                  onChange={(e) => setCompanyForm({ ...companyForm, city: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="Toshkent">Toshkent</option>
                  <option value="Samarqand">Samarqand</option>
                  <option value="Buxoro">Buxoro</option>
                  <option value="Andijon">Andijon</option>
                  <option value="Farg‘ona">Farg‘ona</option>
                  <option value="Namangan">Namangan</option>
                  <option value="Qarshi">Qarshi</option>
                  <option value="Urganch">Urganch</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kompaniya manzili *
              </label>
              <input
                type="text"
                value={companyForm.address}
                onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                placeholder="Amir Temur shoh ko‘chasi, 107B"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Elektron pochta (Email) *
                </label>
                <input
                  type="email"
                  value={companyForm.email}
                  onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                  placeholder="hr@kompaniya.uz"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parol yarating *
                </label>
                <input
                  type="password"
                  value={companyForm.password}
                  onChange={(e) => setCompanyForm({ ...companyForm, password: e.target.value })}
                  placeholder="Kamida 8 ta belgi"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kompaniya haqida qisqacha ma’lumot *
              </label>
              <textarea
                rows={3}
                value={companyForm.description}
                onChange={(e) => setCompanyForm({ ...companyForm, description: e.target.value })}
                placeholder="Faoliyat sohasi, jamoa va yutuqlar haqida..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors mt-3"
            >
              Kompaniyani ro‘yxatdan o‘tkazish
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
