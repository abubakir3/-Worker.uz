import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, HelpCircle, FileText, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface StaticPagesProps {
  page: 'about' | 'faq' | 'terms' | 'privacy' | 'contact';
}

export const StaticPagesView: React.FC<StaticPagesProps> = ({ page }) => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* ABOUT US */}
      {page === 'about' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Ishchi.uz haqida
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              O‘zbekistonning zamonaviy bandlik platformasi
            </h1>
          </div>

          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              <strong>Ishchi.uz</strong> — mamlakatimizdagi yetakchi korxonalar va ish qidirayotgan malakali mutaxassislarni o‘zaro samarali bog‘laydigan innovatsion milliy platformadir.
            </p>
            <p>
              Bizning asosiy maqsadimiz — ish qidirish va xodimlarni tanlash jarayonini maksimal darajada shaffof, tezkor va xavfsiz qilish. Kompaniyalar o‘z ish muhiti va jamoasi haqidagi videolavhalarni joylashtirish imkoniyatiga ega bo‘lib, bu nomzodlarda to‘liq ishonch uyg‘otadi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm">Shaffoflik</h4>
              <p className="text-xs text-slate-500 mt-1">Har bir vakansiyada aniq maosh va ish sharoitlari ko‘rsatiladi.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm">Verifikatsiya</h4>
              <p className="text-xs text-slate-500 mt-1">Kompaniyalar rasmiy hujjatlari orqali tekshirilib tasdiqlanadi.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm">Tezkor aloqa</h4>
              <p className="text-xs text-slate-500 mt-1">Nomzod va ish beruvchi o‘rtasida to‘g‘ridan-to‘g‘ri ichki chat tizimi.</p>
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {page === 'faq' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Savol-Javob
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Ko‘p beriladigan savollar (FAQ)
            </h1>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm">
                1. Ishchi.uz platformasidan foydalanish bepulmi?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ha, barcha ish qidiruvchilar uchun rezyume yaratish, vakansiyalarga ariza topshirish va ish beruvchilar bilan yozishish mutlaqo bepul.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm">
                2. Kompaniya qanday qilib tasdiqlangan (verified) nishonini oladi?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kompaniya ro‘yxatdan o‘tgandan so‘ng, administratorlarimiz korxona STIR (INN) va yuridik ma’lumotlarini tekshiradi va "Tasdiqlangan kompaniya" nishoni beriladi.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm">
                3. Mening telefon raqamim hammaga ko‘rinadimi?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yo‘q. Maxfiylik sozlamalarida siz telefoningiz va emailingizni yashirib qo‘yishingiz mumkin. Bu holda ular faqat siz ariza topshirgan kompaniyagagina ochiladi.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm">
                4. Qanday qilib kompaniya videosini yuklash mumkin?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ish beruvchi shaxsiy kabinetidagi «Kompaniya videosi» bo‘limi orqali MP4 yoki WebM formatidagi faylni yuklashi yoki havolasini kiritishi mumkin.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TERMS */}
      {page === 'terms' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Huquqiy
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Foydalanish shartlari
            </h1>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              1. <strong>Umumiy qoidalar:</strong> Ishchi.uz xizmatidan foydalanish orqali siz mazkur shartlarga to‘liq rozilik bildirasiz.
            </p>
            <p>
              2. <strong>Ish beruvchilar majburiyati:</strong> Joylashtirilayotgan barcha vakansiyalar O‘zbekiston Respublikasi Mehnat qonunchiligiga to‘liq mos kelishi, kamsitishlarga yo‘l qo‘ymasligi va haqiqiy ish o‘rnini ifoda etishi shart.
            </p>
            <p>
              3. <strong>Taqiqlangan harakatlar:</strong> Nomzoddan ishga kirish uchun oldindan to‘lov talab qilish, moliyaviy piramidalar yoki noqonuniy xizmatlarni targ‘ib qilish qat’iyan man etiladi.
            </p>
          </div>
        </div>
      )}

      {/* PRIVACY */}
      {page === 'privacy' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Xavfsizlik
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Maxfiylik siyosati
            </h1>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              Biz sizning shaxsiy ma’lumotlaringiz xavfsizligini kafolatlaymiz. Foydalanuvchilarning parollari shifrlangan holda saqlanadi va uchinchi shaxslarga berilmaydi.
            </p>
            <p>
              Rezyumedagi aloqa ma’lumotlari faqat foydalanuvchi roziligi bilan va faqat u tanlagan vakansiyalarga yo‘naltiriladi.
            </p>
          </div>
        </div>
      )}

      {/* CONTACT */}
      {page === 'contact' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Biz bilan bog‘lanish
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Murojaat va qo‘llab-quvvatlash
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Bosh ofis</h4>
                  <p>Toshkent shahri, Mirobod tumani, Afrosiyob ko‘chasi, 4A</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Qo‘llab-quvvatlash markazi</h4>
                  <p className="font-mono">+998 (71) 200-50-50</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Elektron pochta</h4>
                  <p>aloqa@ishchi.uz / support@ishchi.uz</p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
              <h4 className="font-bold text-slate-900 text-xs">
                Bizga xabar qoldiring
              </h4>
              <input
                type="text"
                placeholder="Ismingiz"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none"
              />
              <input
                type="email"
                placeholder="Elektron pochtangiz"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none"
              />
              <textarea
                rows={3}
                placeholder="Xabaringiz..."
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none"
              />
              <button
                type="button"
                onClick={() => alert('Xabaringiz qabul qilindi!')}
                className="w-full py-2 bg-blue-600 text-white font-semibold text-xs rounded-lg shadow-sm"
              >
                Xabarni jo‘natish
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-2 text-center">
        <button
          onClick={() => navigateTo('home')}
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          &larr; Bosh sahifaga qaytish
        </button>
      </div>

    </div>
  );
};
