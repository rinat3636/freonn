/*
 * FREONN HERO — Bold Technical Expressionism
 * Full-width dark navy with hero image, diagonal bottom cut
 * Left: headline + CTAs | Right: quick-link links (non-square)
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
    <section
      className="relative min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 93%, 0 100%)",
        paddingBottom: "5rem",
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1340]/97 via-[#0F1340]/85 to-[#0F1340]/55" />

      {/* Red accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ED1C24]" />

      <div className="container relative z-10 py-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-center">
          {/* Left: headline — 3 cols */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-0.5 w-12 bg-[#ED1C24]" />
                <span className="text-[#ED1C24] font-heading font-semibold uppercase text-sm tracking-widest">
                  Инженерная компания
                </span>
              </div>
              <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl text-white leading-none mb-4 tracking-tight">
                FREONN
              </h1>
              <p className="text-white/80 text-lg font-body leading-relaxed mb-6 max-w-xl">
                Проектирование, монтаж и обслуживание инженерных систем для промышленности, бизнеса и премиум недвижимости в Москве и МО.
              </p>

              {/* Service tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {services.map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 border border-white/20 text-white/70 font-body hover:border-[#ED1C24] hover:text-white transition-colors cursor-default rounded-full">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#contacts" className="btn-primary flex items-center gap-2">
                  <Phone size={16} /> Вызвать инженера
                </a>
                <a href="#about" className="btn-outline flex items-center gap-2">
                  О компании <ArrowRight size={16} />
                </a>
              </div>

              {/* Trust bar */}
              <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/10">
                {[
                  { val: "15+", label: "лет опыта" },
                  { val: "1280", label: "объектов" },
                  { val: "25", label: "бригад" },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <div className="font-display text-2xl text-white font-bold">{val}</div>
                    <div className="text-white/50 text-xs font-body">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: quick links — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {quickLinks.map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                className="group flex items-start gap-4 bg-white/8 backdrop-blur-sm border border-white/15 p-5 hover:bg-white/15 hover:border-[#ED1C24]/50 transition-all duration-300 rounded-2xl"
              >
                <div className="w-10 h-10 bg-[#ED1C24]/15 flex items-center justify-center group-hover:bg-[#ED1C24] transition-colors rounded-full">
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
              initial={{ opacity: 0, x: 40 }}
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
        </div>
      </div>
    </section>
  );
}
