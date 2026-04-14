/*
 * FREONN OBJECTS SECTION — Modern layout with full ceds.ru content
 * Three sub-sections: Industrial, Commercial, Premium
 * Modern alternating layout with feature lists
 * Brand: Freonn — dark navy #0F1340, red accent #B91C1C
 */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ymGoal } from "@/lib/ym";

// Industrial: HVAC ductwork on factory/warehouse ceiling
const INDUSTRIAL_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-industrial-hvac-CUToKRXqhd5NqVLbfLUTwL.webp";
// Commercial: Cassette AC installation in office ceiling
const COMMERCIAL_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-commercial-ac-25u7KoLKzpAUCxypUsYPv5.webp";
// Premium: Underfloor heating pipes installation
const PREMIUM_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-premium-home-kiMRuiEYR85DDtWXwESvdS.webp";

const industrialFeatures = [
  {
    title: "Меньше расходов и стабильная работа всех систем",
    desc: "Создаём системы, которые сокращают расходы и увеличивают производительность. Новейшие технологии и передовое оборудование напрямую снижают затраты на энергию, делая инвестиции более выгодными.",
  },
  {
    title: "Надёжность работы без сбоев",
    desc: "Анализируя нужды клиента, проектируем надёжные системы. Использование качественных компонентов и продуманная интеграция обеспечивают стабильную работу, избавляя от непредвиденных остановок.",
  },
  {
    title: "Быстрая установка и удобство обслуживания",
    desc: "Учитываем важность каждого рабочего дня для вашего бизнеса. Наш опыт гарантирует выполнение работ в строгие сроки, минимизируя любые возможные простои и неудобства.",
  },
];

const industrialObjects = [
  "Производственные цеха",
  "Складские комплексы",
  "Энергетические установки",
  "Химические заводы",
  "Пищевые производства",
  "Объекты тяжёлой промышленности",
];

const commercialFeatures = [
  {
    title: "Снижение затрат и улучшение эффективности",
    desc: "Установка современных инженерных систем позволяет сократить затраты на энергопотребление до 20%. При этом вы получаете нашу полную поддержку: от одногодичной гарантии на монтажные работы до оперативного устранения возможных недочётов.",
  },
  {
    title: "Долговечное оборудование для вашего бизнеса",
    desc: "Выбираем оборудование с гарантией до 5 лет — это обеспечивает его надёжную работу, делая жизнь проще как для вас, так и для ваших сотрудников.",
  },
  {
    title: "Гарантия надёжности и регулярное обслуживание",
    desc: "Проводим регулярное сервисное обслуживание: профилактические осмотры, чистку и настройку, что способствует предотвращению потенциальных проблем и продлению срока службы оборудования.",
  },
];

const commercialObjects = [
  "Рестораны, бары",
  "Государственные учреждения",
  "Торговые сети и ритейл",
  "Офисные комплексы",
  "Образовательные учреждения",
  "Бизнес-центры",
];

const premiumFeatures = [
  {
    title: "Загородные дома",
    desc: "Создаём системы, которые делают загородную жизнь ещё более комфортной и беззаботной. От интеллектуального отопления до автоматизации — ваш дом будет не только красивым, но и умным.",
  },
  {
    title: "Квартиры от 100 м²",
    desc: "В больших квартирах важна каждая деталь. Предлагаем решения, которые помогут вам создать идеальный микроклимат, безопасность и уют, соответствующие уровню вашей недвижимости.",
  },
  {
    title: "Бассейны",
    desc: "Наши инженерные системы гарантируют чистоту воды, идеальный микроклимат вокруг бассейна и автоматизацию управления параметрами воды и воздуха.",
  },
];

const premiumTags = ["Свежий и чистый воздух", "Контроль температуры и влажности", "Безопасность", "Лёгкость управления"];

export default function ObjectsSection() {
  return (
    <>
      {/* ── INDUSTRIAL ── */}
      <section data-theme="light" className="py-20 bg-[#F7F8FF]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-10 bg-[#B91C1C]" />
                <span className="text-[#B91C1C] font-heading font-semibold uppercase text-sm tracking-widest">
                  Промышленность
                </span>
              </div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340] mb-2 leading-tight">
                Реализуем инженерные системы
              </h2>
              <p className="text-[#2D3092] font-heading font-semibold text-xl mb-5">
                на промышленных объектах от 500 м²
              </p>
              <p className="text-gray-600 font-body leading-relaxed mb-8">
                Специализируемся на создании инженерных систем для промышленных объектов, начиная от производственных цехов и складских комплексов, до энергетических установок, объектов тяжёлой промышленности, химических заводов и пищевых производств.
              </p>

              {/* Feature list */}
              <div className="space-y-5 mb-8">
                {industrialFeatures.map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="w-1 bg-[#B91C1C] flex-shrink-0 self-stretch" />
                    <div>
                      <h4 className="font-heading font-semibold text-[#0F1340] text-sm mb-1">{f.title}</h4>
                      <p className="text-gray-500 text-sm font-body leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Object types */}
              <div className="flex flex-wrap gap-2 mb-8">
                {industrialObjects.map((obj) => (
                  <span key={obj} className="text-xs px-3 py-1.5 bg-[#0F1340] text-white font-body rounded-full">
                    {obj}
                  </span>
                ))}
              </div>

              <a href="/promyshlennye-obekty" onClick={() => ymGoal("objects_industrial_click")} className="btn-dark inline-flex items-center gap-2">
                Подробнее <ArrowRight size={16} />
              </a>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={INDUSTRIAL_BG} alt="Промышленный объект" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute bottom-4 left-4 bg-[#B91C1C] text-white p-4 shadow-xl rounded-xl">
                  <div className="font-display text-3xl font-bold leading-none">500+</div>
                  <div className="font-body text-xs mt-1 opacity-90">объектов сдано</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMMERCIAL ── */}
      <section data-theme="light" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image (left on desktop) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={COMMERCIAL_BG} alt="Коммерческий объект" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute bottom-4 right-4 bg-[#2D3092] text-white p-4 shadow-xl rounded-xl">
                  <div className="font-display text-3xl font-bold leading-none">20%</div>
                  <div className="font-body text-xs mt-1 opacity-90">экономия энергии</div>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-10 bg-[#B91C1C]" />
                <span className="text-[#B91C1C] font-heading font-semibold uppercase text-sm tracking-widest">
                  Коммерция
                </span>
              </div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340] mb-2 leading-tight">
                Установка инженерных систем
              </h2>
              <p className="text-[#2D3092] font-heading font-semibold text-xl mb-5">
                для коммерческих объектов
              </p>
              <p className="text-gray-600 font-body leading-relaxed mb-8">
                Проектируем и устанавливаем инженерные системы, обеспечивая их длительную и стабильную работу. Предлагаем гарантии и поддержку после завершения проекта: от обслуживания до быстрого решения проблем и советов по улучшению.
              </p>

              {/* Feature list */}
              <div className="space-y-5 mb-8">
                {commercialFeatures.map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="w-1 bg-[#2D3092] flex-shrink-0 self-stretch" />
                    <div>
                      <h4 className="font-heading font-semibold text-[#0F1340] text-sm mb-1">{f.title}</h4>
                      <p className="text-gray-500 text-sm font-body leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Object types */}
              <p className="text-xs text-gray-400 font-body uppercase tracking-wider mb-3">С какими объектами работаем:</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {commercialObjects.map((obj) => (
                  <span key={obj} className="text-xs px-3 py-1.5 border border-gray-200 text-gray-600 font-body hover:border-[#2D3092] hover:text-[#2D3092] transition-colors rounded-full">
                    {obj}
                  </span>
                ))}
              </div>

              <a href="/kommercheskie-obekty" onClick={() => ymGoal("objects_commercial_click")} className="btn-dark inline-flex items-center gap-2">
                Подробнее <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PREMIUM ── */}
      <section data-theme="dark" className="py-20 bg-[#0F1340] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-10 bg-[#B91C1C]" />
                <span className="text-[#B91C1C] font-heading font-semibold uppercase text-sm tracking-widest">
                  Премиум недвижимость
                </span>
              </div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-2 leading-tight">
                Современные инженерные решения
              </h2>
              <p className="text-[#B91C1C] font-heading font-semibold text-xl mb-5">
                для PREMIUM недвижимости
              </p>
              <p className="text-white/80 font-body leading-relaxed mb-6">
                Предлагаем системы для умных домов, которые сочетают в себе передовые технологии, непревзойдённое качество и изысканный дизайн. Решения специалистов компании Freonn гарантируют не только комфорт и безопасность, но и подчёркивают статус вашей недвижимости.
              </p>

              {/* Premium tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {premiumTags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 border border-white/20 text-white/70 font-body rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Feature list */}
              <div className="space-y-5 mb-8">
                {premiumFeatures.map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="w-1 bg-[#B91C1C] flex-shrink-0 self-stretch" />
                    <div>
                      <h4 className="font-heading font-semibold text-white text-sm mb-1">{f.title}</h4>
                      <p className="text-white/60 text-sm font-body leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="/premium-obekty" onClick={() => ymGoal("objects_premium_click")} className="btn-dark inline-flex items-center gap-2">
                Подробнее <ArrowRight size={16} />
              </a>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden border border-white/10 relative">
                <img src={PREMIUM_BG} alt="Премиум недвижимость" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute bottom-4 right-4 bg-[#B91C1C] text-white p-4 shadow-xl rounded-xl">
                  <div className="font-display text-3xl font-bold leading-none">5 лет</div>
                  <div className="font-body text-xs mt-1 opacity-90">гарантия на оборудование</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
