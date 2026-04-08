/*
 * FREONN FOOTER — Modern layout with full ceds.ru-style navigation
 * Brand: Freonn — dark navy #0F1340, red accent #ED1C24
 */
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-logo_62401a1b.png";

const footerLinks = {
  "Инженерные системы": [
    "Проектирование ОВиК",
    "Монтаж ОВиК",
    "Установка вентиляции",
    "Установка кондиционирования",
    "Установка дымоудаления",
    "Воздушное отопление",
    "Холодоснабжение",
    "Водоснабжение и канализация",
    "Электроснабжение и освещение",
  ],
  "Стоимость и прайсы": [
    "Цены на монтаж вентиляции",
    "Цены на монтаж кондиционирования",
    "Цены на монтаж дымоудаления",
    "Цены на монтаж инженерных систем",
  ],
  "Компания": [
    "О нас",
    "Выполненные объекты",
    "Лицензии и сертификаты",
    "Реквизиты",
    "Вакансии",
    "Блог",
    "Контакты",
  ],
};

const cities = [
  "Москва", "Московская область", "Дзержинский", "Люберцы",
  "Мытищи", "Одинцово", "Подольск", "Зеленоград",
];

export default function Footer() {
  return (
    <footer className="bg-[#080D2E] text-white">
      <div className="container py-14">
        <div className="grid lg:grid-cols-6 gap-10">
          {/* Logo & description */}
          <div className="lg:col-span-2">
            <img src={LOGO_URL} alt="Freonn" className="h-10 w-auto mb-4 brightness-0 invert" />
            <p className="text-white/60 text-sm font-body leading-relaxed mb-6 max-w-xs">
              Инженерная компания Freonn — проектирование, монтаж и обслуживание инженерных систем для промышленности, бизнеса и премиум недвижимости в Москве и Московской области.
            </p>
            <div className="space-y-2.5">
              <a href="tel:88001012009" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-body">
                <Phone size={14} className="text-[#ED1C24] flex-shrink-0" /> 8(800)101-2009
              </a>
              <a href="mailto:info@freonn.ru" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-body">
                <Mail size={14} className="text-[#ED1C24] flex-shrink-0" /> info@freonn.ru
              </a>
              <div className="flex items-start gap-2 text-white/60 text-sm font-body">
                <MapPin size={14} className="text-[#ED1C24] flex-shrink-0 mt-0.5" />
                Московская обл., г. Дзержинский, ул. Ленина 2Б
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm font-body">
                <Clock size={14} className="text-[#ED1C24] flex-shrink-0" />
                Пн–Сб: 9:00 – 19:00
              </div>
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-heading font-semibold text-white uppercase text-xs tracking-wider mb-4 pb-2 border-b border-white/10">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/50 hover:text-[#ED1C24] transition-colors text-xs font-body">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Cities */}
          <div>
            <h4 className="font-heading font-semibold text-white uppercase text-xs tracking-wider mb-4 pb-2 border-b border-white/10">
              Города
            </h4>
            <ul className="space-y-2">
              {cities.map(city => (
                <li key={city}>
                  <a href="#" className="text-white/50 hover:text-[#ED1C24] transition-colors text-xs font-body">
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30 font-body">
          <div>© {new Date().getFullYear()} ООО «Фреонн». Сайт носит исключительно информационный характер и не является публичной офертой.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/60 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white/60 transition-colors">Карта сайта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
