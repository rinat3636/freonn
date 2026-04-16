/*
 * FREONN GROUP SECTION — Группа компаний
 * На freonn.ru рекламируем только freonn.pro (промышленные здания)
 */
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, CheckCircle2 } from "lucide-react";

const LOGO_PRO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-logo_62401a1b.png";

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

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
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
            Мы монтируем инженерные системы и строим промышленные здания — всё
            в рамках одной группы компаний, без посредников.
          </p>
        </motion.div>

        {/* Single card — freonn.pro */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <a
            href="https://freonn.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-2xl overflow-hidden border transition-all duration-300 group hover:-translate-y-1"
            style={{
              background: "rgba(237,28,36,0.04)",
              borderColor: "rgba(237,28,36,0.2)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(237,28,36,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(237,28,36,0.2)";
            }}
          >
            {/* Top gradient bar */}
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #ED1C24, #c0392b)" }} />

            <div className="p-8 md:p-10">
              {/* Badge + external icon */}
              <div className="flex items-start justify-between mb-6">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-semibold uppercase tracking-wider"
                  style={{
                    background: "rgba(237,28,36,0.1)",
                    color: "#ED1C24",
                    border: "1px solid rgba(237,28,36,0.25)",
                  }}
                >
                  Также занимаемся
                </span>
                <ExternalLink size={18} className="text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
              </div>

              {/* Logo + Title */}
              <div className="flex items-center gap-5 mb-5">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white flex-shrink-0 p-2">
                  <img src={LOGO_PRO} alt="Freonn Строй" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-white/30 text-xs font-heading uppercase tracking-widest mb-1">
                    FREONN СТРОЙ
                  </p>
                  <h3 className="text-2xl font-heading font-black text-white">
                    Промышленные здания
                  </h3>
                  <p className="text-[#ED1C24]/60 text-sm mt-0.5">freonn.pro</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/50 text-sm font-body leading-relaxed mb-5">
                Проектируем и строим промышленные здания из металлоконструкций под ключ
                по всей России. Ангары, склады, производственные цеха — от геодезии
                и фундамента до сдачи объекта.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["Ангары", "Склады", "Производственные цеха", "С/х здания", "Торговые здания"].map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-body"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    <CheckCircle2 size={10} style={{ color: "rgba(237,28,36,0.4)" }} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div
                className="grid grid-cols-3 gap-4 pt-5 mb-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                {[
                  { value: "500+", label: "объектов" },
                  { value: "15", label: "лет опыта" },
                  { value: "47", label: "регионов" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-heading font-black" style={{ color: "#ED1C24" }}>
                      {stat.value}
                    </div>
                    <div className="text-white/30 text-xs font-body mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm font-heading font-semibold text-[#ED1C24]/50 group-hover:text-[#ED1C24] transition-colors">
                <span>Перейти на freonn.pro</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-white/30 text-sm font-body mt-8"
        >
          Единый телефон для обоих направлений:{" "}
          <a href="tel:88001012009" className="text-white/50 hover:text-white transition-colors">
            8(800)101-2009
          </a>
        </motion.p>
      </div>
    </section>
  );
}
