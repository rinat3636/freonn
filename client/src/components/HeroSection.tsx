/*
 * FREONN HERO — Bold Technical Expressionism
 * Fully responsive: stacks on mobile, side-by-side on desktop
 * Brand: Freonn — dark navy #0F1340, red accent #ED1C24
 */
import { motion } from "framer-motion";
import { ArrowRight, FolderOpen, Tag, Phone } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/hero-bg-TSEFdwsLkkoBfLxyHqisJK.webp";

const services = [
  "Вентиляция", "Кондиционирование", "Дымоудаление",
  "Отопление", "Холодоснабжение", "Электроснабжение",
];

const quickLinks = [
  {
    icon: FolderOpen,
    title: "Выполненные объекты",
    desc: "Решённые кейсы в области проектирования и установки инженерных систем",
    href: "#projects",
  },
  {
    icon: Tag,
    title: "Цены на услуги",
    desc: "Прайс-лист разбит по категориям — стоимость основных и дополнительных работ",
    href: "#pricing",
  },
];

export default function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden bg-[#0F1340]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1340]/97 via-[#0F1340]/85 to-[#0F1340]/55" />
      {/* Red accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ED1C24]" />

      <div className="container relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* Left: headline */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-10 bg-[#ED1C24]" />
                <span className="text-[#ED1C24] font-heading font-semibold uppercase text-xs sm:text-sm tracking-widest">
                  Инженерная компания
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-none mb-4 tracking-tight">
                FREONN
              </h1>
              <p className="text-white/80 text-base sm:text-lg font-body leading-relaxed mb-5 max-w-xl">
                Проектирование, монтаж и обслуживание инженерных систем для промышленности, бизнеса и премиум недвижимости в Москве и МО.
              </p>

              {/* Service tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {services.map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 border border-white/20 text-white/70 font-body hover:border-[#ED1C24] hover:text-white transition-colors cursor-default rounded-full">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#contacts" className="btn-primary flex items-center gap-2 text-sm sm:text-base">
                  <Phone size={15} /> Вызвать инженера
                </a>
                <a href="#about" className="btn-outline flex items-center gap-2 text-sm sm:text-base border-white/40 text-white hover:bg-white hover:text-[#0F1340]">
                  О компании <ArrowRight size={15} />
                </a>
              </div>

              {/* Trust bar */}
              <div className="flex flex-wrap gap-5 sm:gap-8 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
                {[
                  { val: "15+", label: "лет опыта" },
                  { val: "1280", label: "объектов" },
                  { val: "25", label: "бригад" },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <div className="font-display text-xl sm:text-2xl text-white font-bold">{val}</div>
                    <div className="text-white/50 text-xs font-body">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: quick links — hidden on mobile, shown from lg */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-4">
            {quickLinks.map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                className="group flex items-start gap-4 bg-white/8 backdrop-blur-sm border border-white/15 p-5 hover:bg-white/15 hover:border-[#ED1C24]/50 transition-all duration-300 rounded-2xl"
              >
                <div className="w-10 h-10 bg-[#ED1C24]/15 flex items-center justify-center group-hover:bg-[#ED1C24] transition-colors rounded-full flex-shrink-0">
                  <item.icon size={18} className="text-[#ED1C24] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-white text-sm mb-1 group-hover:text-[#ED1C24] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/55 text-xs font-body leading-snug">{item.desc}</p>
                </div>
                <ArrowRight size={14} className="text-white/25 group-hover:text-[#ED1C24] flex-shrink-0 mt-1 transition-all group-hover:translate-x-1" />
              </motion.a>
            ))}

            {/* Phone block */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="bg-[#ED1C24] p-5 mt-2 rounded-2xl"
            >
              <div className="text-white/80 text-xs font-body mb-1 uppercase tracking-wider">Бесплатная консультация</div>
              <a href="tel:88001012009" className="font-heading font-bold text-white text-xl hover:text-white/90 transition-colors">
                8(800)101-2009
              </a>
              <div className="text-white/70 text-xs font-body mt-0.5">Бесплатно по России · Пн–Сб 9:00–19:00</div>
            </motion.div>
          </div>

          {/* Mobile: phone block below content */}
          <div className="lg:hidden col-span-full">
            <div className="bg-[#ED1C24] p-4 rounded-2xl">
              <div className="text-white/80 text-xs font-body mb-1 uppercase tracking-wider">Бесплатная консультация</div>
              <a href="tel:88001012009" className="font-heading font-bold text-white text-lg">
                8(800)101-2009
              </a>
              <div className="text-white/70 text-xs font-body mt-0.5">Бесплатно по России · Пн–Сб 9:00–19:00</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
