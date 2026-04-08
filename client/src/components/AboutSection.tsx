/*
 * FREONN ABOUT — Modern layout with ceds.ru content
 * Dark navy section with stats, description, advantages
 * Brand: Freonn — dark navy #0F1340, red accent #ED1C24
 */
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const stats = [
  { value: 15, suffix: "", label: "лет на инженерном рынке" },
  { value: 1280, suffix: "", label: "инженерных систем введено в эксплуатацию" },
  { value: 25, suffix: "", label: "монтажных бригад" },
  { value: 5, suffix: " лет", label: "гарантия на оборудование" },
];

const cooperationFormats = [
  "Реализация проекта «Под ключ»",
  "Монтажные работы по вашему проекту",
  "Только проектирование систем",
  "Только подбор и закупка оборудования",
  "Консультация по системам",
  "На иных условиях — всё обсуждаемо",
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-[#0F1340] text-white py-20 overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10">
        {/* Top: heading + description */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-0.5 w-10 bg-[#ED1C24]" />
              <span className="text-[#ED1C24] font-heading font-semibold uppercase text-sm tracking-widest">
                О нас
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-6 leading-tight">
              Инженерная компания Freonn
            </h2>
            <p className="text-white/80 font-body leading-relaxed mb-4">
              Freonn предоставляет полный комплекс услуг по проектированию, монтажу, пусконаладке и сервисному обслуживанию внутренних инженерных систем (вентиляция и кондиционирование) под ключ в Москве и Московской области.
            </p>
            <p className="text-white/70 font-body leading-relaxed mb-4">
              Выбирая нашу компанию, вы получаете надёжного партнёра, специализирующегося на сложных инженерных проектах для среднего и крупного бизнеса. С нами вы можете забыть о сложностях управления большими техническими проектами.
            </p>
            <p className="text-white/70 font-body leading-relaxed">
              Берём на себя все этапы работы — от планирования до реализации, позволяя вам фокусироваться на том, что действительно важно.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-0.5 w-10 bg-[#ED1C24]" />
              <span className="text-[#ED1C24] font-heading font-semibold uppercase text-sm tracking-widest">
                Форматы сотрудничества
              </span>
            </div>
            <div className="space-y-3">
              {cooperationFormats.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-1.5 h-1.5 bg-[#ED1C24] flex-shrink-0 group-hover:scale-150 transition-transform rounded-full" />
                  <span className="text-white/80 font-body text-sm group-hover:text-white transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8">
              <a href="#contacts" className="btn-primary inline-flex items-center gap-2">
                Связаться по проекту
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, visible }: { stat: typeof stats[0]; visible: boolean }) {
  const count = useCountUp(stat.value, 2000, visible);
  return (
    <div className="bg-[#0F1340] p-8 text-center hover:bg-[#1a2060] transition-colors duration-300">
      <div className="stat-number text-5xl lg:text-6xl mb-3">
        {count}{stat.suffix}
      </div>
      <p className="text-white/60 text-sm font-body leading-snug">{stat.label}</p>
    </div>
  );
}
