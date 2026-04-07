/*
 * FREONN HERO — Bold Technical Expressionism
 * Full-width dark navy with hero image, diagonal bottom cut
 * Left: headline + CTAs | Right: quick-link cards
 */
import { motion } from "framer-motion";
import { ArrowRight, FolderOpen, Video, Tag } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/hero-bg-TSEFdwsLkkoBfLxyHqisJK.webp";

const quickLinks = [
  {
    icon: FolderOpen,
    title: "Выполненные объекты",
    desc: "Решённые кейсы в области проектирования и установки инженерных систем",
    href: "#projects",
  },
  {
    icon: Video,
    title: "Видео кейсы",
    desc: "В коротких видео делимся результатом работы на объектах от 500 до 6000 м²",
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
      className="relative min-h-[600px] lg:min-h-[680px] flex items-center overflow-hidden"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 92%, 0 100%)",
        paddingBottom: "6rem",
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1340]/95 via-[#0F1340]/80 to-[#0F1340]/50" />

      {/* Red accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ED1C24]" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: headline */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-12 bg-[#ED1C24]" />
                <span className="text-[#ED1C24] font-heading font-semibold uppercase text-sm tracking-widest">
                  Инженерная компания
                </span>
              </div>
              <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-4">
                FREONN
              </h1>
              <p className="text-white/80 text-lg lg:text-xl font-body leading-relaxed mb-8 max-w-lg">
                Ваш надёжный партнёр в проектировании, установке и обслуживании инженерных систем для промышленности, бизнеса и премиум недвижимости.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contacts" className="btn-primary flex items-center gap-2">
                  Вызвать инженера
                </a>
                <a href="#about" className="btn-outline flex items-center gap-2">
                  О компании <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: quick-link cards */}
          <div className="flex flex-col gap-3">
            {quickLinks.map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group flex items-start gap-4 bg-white/10 backdrop-blur-sm border border-white/20 p-4 hover:bg-white/20 hover:border-[#ED1C24]/60 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-[#ED1C24]/20 flex items-center justify-center group-hover:bg-[#ED1C24] transition-colors">
                  <item.icon size={20} className="text-[#ED1C24] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-white text-base mb-1 group-hover:text-[#ED1C24] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm font-body leading-snug">{item.desc}</p>
                </div>
                <ArrowRight size={16} className="text-white/30 group-hover:text-[#ED1C24] ml-auto flex-shrink-0 mt-1 transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
