/*
 * FREONN FOOTER — Full ceds.ru navigation structure
 * Brand: Freonn — dark navy #0F1340, red accent #ED1C24
 */
import { Phone, Mail, MapPin, Clock, Youtube } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-logo_62401a1b.png";

const footerLinks = {
  "О компании": [
    "О нас",
    "Новости",
    "Лицензии и сертификаты",
    "Реквизиты",
    "Документы",
    "Оплата и доставка",
    "Вакансии",
    "Сотрудники",
    "Видео кейсы",
    "Полезные материалы",
    "Партнёрам",
    "Контакты",
  ],
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
    "Пескоструйная обработка",
    "Пусконаладочные работы",
    "Сервисное обслуживание",
  ],
  "Стоимость и прайсы": [
    "Цены на монтаж вентиляции",
    "Цены на монтаж кондиционирования",
    "Цены на монтаж дымоудаления",
    "Цены на монтаж инженерных систем",
    "Цены на пескоструй",
  ],
  "Блог": [
    "Кратность и расчёт воздухообмена",
    "Вентиляционное оборудование",
    "Рекуператор",
    "Кондиционирование воздуха",
    "Фильтры для вытяжек",
    "Канальные вентиляторы",
    "Монтаж вентиляции",
    "Автоматизация систем",
    "Технический аудит",
  ],
};

const cities = [
  "Москва",
  "Московская область",
  "Дзержинский",
  "Люберцы",
  "Мытищи",
  "Одинцово",
  "Подольск",
  "Зеленоград",
  "Раменское",
  "Долгопрудный",
  "Ногинск",
  "Истра",
  "Домодедово",
  "Клин",
  "Коломна",
  "Дмитров",
];

export default function Footer() {
  return (
    <footer className="bg-[#080D2E] text-white">
      <div className="container py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 sm:gap-8">
          {/* Logo & description */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <img src={LOGO_URL} alt="Freonn" className="h-10 w-auto mb-4 brightness-0 invert" />
            <p className="text-white/60 text-sm font-body leading-relaxed mb-6 max-w-xs">
              Инженерная компания Freonn — проектирование, монтаж и обслуживание инженерных систем для промышленности, бизнеса и премиум недвижимости в Москве и Московской области.
            </p>
            <div className="space-y-2.5 mb-6">
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
            {/* Social */}
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ED1C24] flex items-center justify-center transition-colors" title="YouTube">
                <Youtube size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ED1C24] flex items-center justify-center transition-colors text-xs font-bold" title="ВКонтакте">
                ВК
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ED1C24] flex items-center justify-center transition-colors text-xs font-bold" title="Яндекс Дзен">
                Дз
              </a>
              <a href="https://max.ru/id3604084591_biz" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ED1C24] flex items-center justify-center transition-colors" title="MAX — наши работы">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720" className="w-4 h-4">
                  <path fill="currentColor" d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-heading font-semibold text-white uppercase text-xs tracking-wider mb-4 pb-2 border-b border-white/10">
                {section}
              </h4>
              <ul className="space-y-1.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/50 hover:text-[#ED1C24] transition-colors text-xs font-body leading-relaxed">
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
            <ul className="space-y-1.5">
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
