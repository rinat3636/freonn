/*
 * FREONN GROUP SECTION — Группа компаний
 * Brand: dark navy #0F1340, red accent #B91C1C, navy #2D3092
 * Links freonn.ru (this site) ↔ freonn.pro (metal buildings)
 */
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, CheckCircle2 } from "lucide-react";

const LOGO_RU = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-logo_62401a1b.png";
// freonn.pro uses an inline SVG logo — we use the same CDN logo for consistency
const LOGO_PRO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-logo_62401a1b.png";

const companies = [
  {
    domain: "freonn.ru",
    badge: "Этот сайт",
    badgeColor: "#B91C1C",
    badgeBg: "rgba(185,28,28,0.12)",
    badgeBorder: "rgba(185,28,28,0.3)",
    current: true,
    title: "Инженерные системы",
    subtitle: "FREONN ENGINEERING",
    description:
      "Проектирование, монтаж и обслуживание инженерных систем для промышленности, бизнеса и премиум недвижимости в Москве и МО. Более 1280 объектов, гарантия 3 года.",
    tags: ["Вентиляция", "Кондиционирование", "Дымоудаление", "Отопление", "Электрика"],
    stats: [
      { value: "1280+", label: "объектов" },
      { value: "15+", label: "лет опыта" },
      { value: "25", label: "бригад" },
    ],
    href: "https://www.freonn.ru",
    barColor: "linear-gradient(90deg, #B91C1C, #7f1d1d)",
    logo: LOGO_RU,
    accentColor: "#B91C1C",
  },
  {
    domain: "freonn.pro",
    badge: "Также занимаемся",
    badgeColor: "rgba(255,255,255,0.5)",
    badgeBg: "rgba(255,255,255,0.06)",
    badgeBorder: "rgba(255,255,255,0.12)",
    current: false,
    title: "Металлические здания",
    subtitle: "FREONN СТРОЙ",
    description:
      "Проектируем и строим промышленные здания из металлоконструкций под ключ по всей России. Ангары, склады, производственные цеха — от фундамента до сдачи объекта.",
    tags: ["Ангары", "Склады", "Производственные цеха", "С/х здания", "Торговые здания"],
    stats: [
      { value: "500+", label: "объектов" },
      { value: "15", label: "лет опыта" },
      { value: "47", label: "регионов" },
    ],
    href: "https://freonn.pro",
    barColor: "linear-gradient(90deg, #ED1C24, #c0392b)",
    logo: LOGO_PRO,
    accentColor: "#ED1C24",
  },
];

export default function GroupSection() {
  return (
    <section
      id="group"
      aria-label="Группа компаний Freonn"
      className="py-20 relative overflow-hidden"
      style={{ background: "#080D2E" }}
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#B91C1C 1px, transparent 1px), linear-gradient(90deg, #B91C1C 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B91C1C]/30 bg-[#B91C1C]/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#B91C1C] animate-pulse" />
            <span className="text-[#B91C1C] text-sm font-heading font-semibold tracking-widest uppercase">
              Группа компаний
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight mb-4 text-white">
            FREONN GROUP
          </h2>
          <p className="text-white/50 text-lg font-body max-w-2xl mx-auto">
            Строим здание и оснащаем его инженерными системами — всё в рамках
            одной группы компаний, без посредников.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {companies.map((company, idx) => (
            <motion.div
              key={company.domain}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <a
                href={company.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-2xl overflow-hidden border transition-all duration-300 group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: company.current
                    ? "rgba(185,28,28,0.35)"
                    : "rgba(255,255,255,0.08)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = company.current
                    ? "rgba(185,28,28,0.6)"
                    : "rgba(237,28,36,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = company.current
                    ? "rgba(185,28,28,0.35)"
                    : "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                {/* Top gradient bar */}
                <div className="h-1 w-full" style={{ background: company.barColor }} />

                <div className="p-8">
                  {/* Badge + external icon */}
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-semibold uppercase tracking-wider"
                      style={{
                        background: company.badgeBg,
                        color: company.badgeColor,
                        border: `1px solid ${company.badgeBorder}`,
                      }}
                    >
                      {company.current && (
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ background: company.accentColor }}
                        />
                      )}
                      {company.badge}
                    </span>
                    <ExternalLink
                      size={18}
                      className="transition-colors flex-shrink-0"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    />
                  </div>

                  {/* Logo + Title */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white flex-shrink-0 p-1.5">
                      <img
                        src={company.logo}
                        alt={company.subtitle}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-white/30 text-xs font-heading uppercase tracking-widest mb-0.5">
                        {company.subtitle}
                      </p>
                      <h3 className="text-xl font-heading font-bold text-white">
                        {company.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/50 text-sm font-body leading-relaxed mb-5">
                    {company.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {company.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-body"
                        style={{
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        <CheckCircle2 size={10} style={{ color: "rgba(255,255,255,0.2)" }} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div
                    className="grid grid-cols-3 gap-4 pt-5"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {company.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div
                          className="text-2xl font-heading font-black"
                          style={{ color: company.accentColor }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-white/30 text-xs font-body mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div
                    className="mt-5 flex items-center gap-2 text-sm font-heading font-medium transition-colors"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    <span>{company.current ? company.domain : "Перейти на сайт"}</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-white/30 text-sm font-body mt-8"
        >
          Единый телефон для обоих направлений:{" "}
          <a
            href="tel:88001012009"
            className="text-white/50 hover:text-white transition-colors"
          >
            8(800)101-2009
          </a>
        </motion.p>
      </div>
    </section>
  );
}
