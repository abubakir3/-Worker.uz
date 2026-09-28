import React, { useState, useRef, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  Building2, 
  PlusCircle, 
  Bell, 
  MessageSquare, 
  User, 
  Menu, 
  X, 
  CheckCircle, 
  LogOut, 
  Shield, 
  FileText, 
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    switchRole, 
    currentView, 
    navigateTo, 
    openAuthModal, 
    notifications, 
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    conversations
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setRoleSwitcherOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalUnreadMessages = conversations.reduce((acc, c) => {
    if (currentUser?.role === 'company') {
      return acc + (c.unreadCountCompany || 0);
    }
    return acc + (c.unreadCountJobSeeker || 0);
  }, 0);

  const getRoleBadgeLabel = (role: UserRole) => {
    switch (role) {
      case 'jobseeker': return 'Ish qidiruvchi';
      case 'company': return 'Ish beruvchi';
      case 'admin': return 'Administrator';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Role Demonstration Quick Bar (for easy testing without manual re-login) */}
      <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none">
          <span className="text-slate-400 font-medium whitespace-nowrap">Rolni sinash:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => switchRole('jobseeker')}
              className={`px-2.5 py-0.5 rounded text-xs transition-colors whitespace-nowrap ${
                currentUser?.role === 'jobseeker'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Ish qidiruvchi
            </button>
            <button
              onClick={() => switchRole('company')}
              className={`px-2.5 py-0.5 rounded text-xs transition-colors whitespace-nowrap ${
                currentUser?.role === 'company'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Kompaniya
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`px-2.5 py-0.5 rounded text-xs transition-colors whitespace-nowrap ${
                currentUser?.role === 'admin'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => switchRole('guest')}
              className={`px-2.5 py-0.5 rounded text-xs transition-colors whitespace-nowrap ${
                !currentUser
                  ? 'bg-slate-700 text-white font-medium'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Mehmon
            </button>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
          <span>O‘zbekiston bo‘ylab bo‘sh ish o‘rinlari</span>
          <span>·</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            1 240+ faol vakansiya
          </span>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Wordmark (Single text element) */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => navigateTo('home')} 
              className="flex items-center gap-2 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Ishchi<span className="text-blue-600">.uz</span>
              </span>
            </button>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
              <button
                onClick={() => navigateTo('home')}
                className={`hover:text-blue-600 transition-colors whitespace-nowrap ${currentView === 'home' ? 'text-blue-600 font-semibold' : ''}`}
              >
                Bosh sahifa
              </button>
              <button
                onClick={() => navigateTo('search')}
                className={`hover:text-blue-600 transition-colors whitespace-nowrap ${currentView === 'search' ? 'text-blue-600 font-semibold' : ''}`}
              >
                Ish qidirish
              </button>
              <button
                onClick={() => navigateTo('companies')}
                className={`hover:text-blue-600 transition-colors whitespace-nowrap ${currentView === 'companies' ? 'text-blue-600 font-semibold' : ''}`}
              >
                Kompaniyalar
              </button>

              {currentUser?.role === 'jobseeker' && (
                <button
                  onClick={() => navigateTo('applications')}
                  className={`hover:text-blue-600 transition-colors whitespace-nowrap flex items-center gap-1.5 ${currentView === 'applications' ? 'text-blue-600 font-semibold' : ''}`}
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  Mening arizalarim
                </button>
              )}

              {currentUser?.role === 'company' && (
                <button
                  onClick={() => navigateTo('dashboard')}
                  className={`hover:text-blue-600 transition-colors whitespace-nowrap flex items-center gap-1.5 ${currentView === 'dashboard' ? 'text-blue-600 font-semibold' : ''}`}
                >
                  <Building2 className="w-4 h-4 text-slate-400" />
                  Boshqaruv paneli
                </button>
              )}

              {currentUser?.role === 'admin' && (
                <button
                  onClick={() => navigateTo('admin')}
                  className={`hover:text-blue-600 transition-colors whitespace-nowrap flex items-center gap-1.5 ${currentView === 'admin' ? 'text-blue-600 font-semibold' : ''}`}
                >
                  <Shield className="w-4 h-4 text-slate-400" />
                  Admin panel
                </button>
              )}
            </nav>
          </div>

          {/* Zone 3: Actions & Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Primary Action Button: Post Vacancy */}
            <button
              onClick={() => {
                if (currentUser?.role === 'company') {
                  navigateTo('dashboard', { query: 'tab:create' });
                } else if (currentUser?.role === 'admin') {
                  navigateTo('create-vacancy');
                } else {
                  openAuthModal('register_company');
                }
              }}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-all whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Vakansiya joylashtirish</span>
            </button>

            {/* Authenticated user icons: Messages & Notifications */}
            {currentUser && (
              <>
                {/* Chat link */}
                <button
                  onClick={() => navigateTo('chat')}
                  className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Xabarlar"
                >
                  <MessageSquare className="w-5 h-5" />
                  {totalUnreadMessages > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {totalUnreadMessages}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Bildirishnomalar"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadNotificationsCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {unreadNotificationsCount}
                      </span>
                    )}
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 text-sm">Bildirishnomalar</span>
                          {unreadNotificationsCount > 0 && (
                            <span className="text-[11px] bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded">
                              {unreadNotificationsCount} yangi
                            </span>
                          )}
                        </div>
                        {unreadNotificationsCount > 0 && (
                          <button
                            onClick={markAllNotificationsAsRead}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Barchasini o‘qilgan qilish
                          </button>
                        )}
                      </div>

                      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-6 text-center text-sm text-slate-500">
                            Bildirishnomalar yo‘q
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div
                              key={notif.id}
                              onClick={() => {
                                markNotificationAsRead(notif.id);
                                if (notif.linkView) {
                                  navigateTo(notif.linkView, { vacancyId: notif.linkId });
                                  setNotificationsOpen(false);
                                }
                              }}
                              className={`px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${
                                !notif.read ? 'bg-blue-50/50' : ''
                              }`}
                            >
                              <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" style={{ opacity: notif.read ? 0 : 1 }} />
                              <div className="flex-1">
                                <div className="text-xs font-semibold text-slate-900">{notif.title}</div>
                                <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">{notif.message}</div>
                                <div className="text-[11px] text-slate-400 mt-1 font-mono">{notif.createdAt}</div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* User Profile or Guest Login/Register */}
            {currentUser ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-semibold text-slate-900 truncate max-w-[120px]">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {getRoleBadgeLabel(currentUser.role)}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in duration-100">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <div className="text-xs font-semibold text-slate-900">{currentUser.name}</div>
                      <div className="text-xs text-slate-500 truncate">{currentUser.email}</div>
                    </div>

                    {currentUser.role === 'jobseeker' && (
                      <>
                        <button
                          onClick={() => {
                            navigateTo('profile');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          Mening profilim
                        </button>
                        <button
                          onClick={() => {
                            navigateTo('applications');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4 text-slate-400" />
                          Mening arizalarim
                        </button>
                      </>
                    )}

                    {currentUser.role === 'company' && (
                      <>
                        <button
                          onClick={() => {
                            navigateTo('dashboard');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Building2 className="w-4 h-4 text-slate-400" />
                          Kompaniya boshqaruvi
                        </button>
                        <button
                          onClick={() => {
                            navigateTo('company', { companyId: 'comp-1' });
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          Kompaniya sahifasi
                        </button>
                      </>
                    )}

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          navigateTo('admin');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4 text-slate-400" />
                        Admin paneli
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        switchRole('guest');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Chiqish
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Kirish
                </button>
                <button
                  onClick={() => openAuthModal('register_seeker')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-sm"
                >
                  Ro‘yxatdan o‘tish
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            <button
              onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentView === 'home' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Bosh sahifa
            </button>
            <button
              onClick={() => { navigateTo('search'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentView === 'search' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Ish qidirish
            </button>
            <button
              onClick={() => { navigateTo('companies'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentView === 'companies' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Kompaniyalar
            </button>

            {currentUser?.role === 'jobseeker' && (
              <>
                <button
                  onClick={() => { navigateTo('applications'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>Mening arizalarim</span>
                  <FileText className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => { navigateTo('profile'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>Mening profilim</span>
                  <User className="w-4 h-4 text-slate-400" />
                </button>
              </>
            )}

            {currentUser?.role === 'company' && (
              <button
                onClick={() => { navigateTo('dashboard'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Kompaniya boshqaruvi</span>
                <Building2 className="w-4 h-4 text-slate-400" />
              </button>
            )}

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Admin paneli</span>
                <Shield className="w-4 h-4 text-slate-400" />
              </button>
            )}

            <button
              onClick={() => { navigateTo('chat'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Xabarlar</span>
              <MessageSquare className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                if (currentUser?.role === 'company') {
                  navigateTo('dashboard', { query: 'tab:create' });
                } else {
                  openAuthModal('register_company');
                }
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Vakansiya joylashtirish
            </button>

            {!currentUser && (
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-sm font-semibold text-slate-700 border border-slate-300 rounded-lg text-center"
                >
                  Kirish
                </button>
                <button
                  onClick={() => { openAuthModal('register_seeker'); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg text-center"
                >
                  Ro‘yxatdan o‘tish
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
