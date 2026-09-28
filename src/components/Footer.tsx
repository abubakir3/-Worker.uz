import React from 'react';
import { Briefcase, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCategory } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Ishchi<span className="text-blue-500">.uz</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Ishchi.uz — O‘zbekiston bo‘ylab ish beruvchilar va ish izlovchilarni birlashtiruvchi zamonaviy, tezkor va ishonchli milliy bandlik platformasi.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Toshkent shahri, Mirobod tumani, Afrosiyob ko‘chasi, 4A</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>+998 (71) 200-50-50</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>aloqa@ishchi.uz</span>
              </div>
            </div>
          </div>

          {/* Ish izlovchilar uchun */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Ish izlovchilar uchun
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => navigateTo('search')} 
                  className="hover:text-white transition-colors"
                >
                  Barcha vakansiyalar
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('IT va Texnologiya'); navigateTo('search'); }} 
                  className="hover:text-white transition-colors"
                >
                  IT sohasidagi ishlar
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('Qurilish'); navigateTo('search'); }} 
                  className="hover:text-white transition-colors"
                >
                  Qurilish vakansiyalari
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('companies')} 
                  className="hover:text-white transition-colors"
                >
                  Top kompaniyalar
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('profile')} 
                  className="hover:text-white transition-colors"
                >
                  Rezyume yaratish
                </button>
              </li>
            </ul>
          </div>

          {/* Ish beruvchilar uchun */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Ish beruvchilar uchun
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => navigateTo('dashboard', { query: 'tab:create' })} 
                  className="hover:text-white transition-colors"
                >
                  Vakansiya e’lon qilish
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('dashboard')} 
                  className="hover:text-white transition-colors"
                >
                  Kompaniya boshqaruv kabineti
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('dashboard', { query: 'tab:video' })} 
                  className="hover:text-white transition-colors"
                >
                  Kompaniya videosini yuklash
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('companies')} 
                  className="hover:text-white transition-colors"
                >
                  Kompaniyalar reytingi
                </button>
              </li>
            </ul>
          </div>

          {/* Ma'lumot va Huquqiy */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Platforma
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => navigateTo('about')} 
                  className="hover:text-white transition-colors"
                >
                  Biz haqimizda
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('faq')} 
                  className="hover:text-white transition-colors"
                >
                  Ko‘p so‘raladigan savollar (FAQ)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('terms')} 
                  className="hover:text-white transition-colors"
                >
                  Foydalanish shartlari
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('privacy')} 
                  className="hover:text-white transition-colors"
                >
                  Maxfiylik siyosati
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('contact')} 
                  className="hover:text-white transition-colors"
                >
                  Aloqa va qo‘llab-quvvatlash
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Ishchi.uz. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>O‘zbekiston Respublikasi bo‘yicha milliy bandlik portali</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              O‘zbek tili (Lotin)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
