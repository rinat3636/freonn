/*
 * FREONN ABOUT — Bold Technical Expressionism
 * Dark navy section with stats and company description
 * Angled top cut, white text on dark background
 */
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

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
  { value: 10, suffix: "+", label: "лет на инженерном рынке" },
  { value: 500, suffix: "+", label: "инженерных систем введено в эксплуатацию" },
  { value: 25, suffix: "", label: "монтажных бригад" },
  { value: 100, suffix: "%", label: "гарантия на все виды работ" },
];

const advantages = [
  "Собственный проектный отдел",
  "Персональный ИТР для каждого проекта",
  "Прямые договорённости с производителями",
  "Соблюдение сроков и стандартов безопасности",
  "Сервисное обслуживание после сдачи объекта",
  "Работаем с юридическими лицами",
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-gradient-to-br from-[#0F1340] to-[#2D3092] text-white py-20 overflow-hidden"
      style={{
        clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
        marginTop: "-4rem",
        paddingTop: "8rem",
        paddingBottom: "8rem",
      }}
    >
      {/* Decorative dot grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: description */}
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
            <p className="text-white/80 font-body leading-relaxed mb-6">
              Freonn предоставляет полный комплекс услуг по проектированию, монтажу, пусконаладке и сервисному обслуживанию внутренних инженерных систем под ключ в Москве и Московской области.
            </p>
            <p className="text-white/70 font-body leading-relaxed mb-8">
              Выбирая нашу компанию, вы получаете надёжного партнёра, специализирующегося на сложных инженерных проектах для среднего и крупного бизнеса. Берём на себя все этапы работы — от планирования до реализации.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {advantages.map(adv => (
                <div key={adv} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#ED1C24] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm font-body">{adv}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} visible={visible} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, visible }: { stat: typeof stats[0]; visible: boolean }) {
  const count = useCountUp(stat.value, 2000, visible);
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
      <div className="stat-number text-5xl lg:text-6xl mb-2">
        {count}{stat.suffix}
      </div>
      <p className="text-white/70 text-sm font-body leading-snug">{stat.label}</p>
    </div>
  );
}
