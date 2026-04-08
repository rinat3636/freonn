/*
 * FREONN OBJECTS SECTION — Bold Technical Expressionism
 * Three sub-sections: Industrial, Commercial, Premium
 * Alternating image/text layout with angled dividers
 */
import { motion } from "framer-motion";
import { Factory, Building2, Home, CheckCircle2 } from "lucide-react";

// Industrial: HVAC ductwork on factory/warehouse ceiling (blue pipes)
const INDUSTRIAL_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/industrial-ducts_c2b4961f.jpg";
// Commercial: Cassette AC installation in office ceiling
const COMMERCIAL_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/commercial-cassette_41446744.jpg";
// Premium: Underfloor heating pipes installation in premium apartment
const PREMIUM_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/premium-underfloor_14faa962.jpg";

export default function ObjectsSection() {
  return (
    <>
      {/* Industrial */}
      <section className="py-20 bg-[#F0F2FF]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-10 bg-[#ED1C24]" />
                <span className="text-[#ED1C24] font-heading font-semibold uppercase text-sm tracking-widest">
                  Промышленность
                </span>
              </div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340] mb-4 leading-tight">
                Реализуем инженерные системы на промышленных объектах от 500 м²
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                Специализируемся на создании инженерных систем для промышленных объектов: производственных цехов, складских комплексов, энергетических установок, химических заводов и пищевых производств.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {["Меньше расходов", "Стабильная работа", "Быстрая установка"].map(item => (
                  <div key={item} className="bg-white border-l-4 border-[#2D3092] p-4">
                    <Factory size={20} className="text-[#2D3092] mb-2" />
                    <p className="font-heading font-semibold text-[#0F1340] text-sm uppercase">{item}</p>
                  </div>
                ))}
              </div>
              <a href="#contacts" className="btn-primary inline-flex items-center gap-2">
                Обсудить проект
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={INDUSTRIAL_BG} alt="Промышленный объект" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#ED1C24] text-white p-4 w-32 text-center">
                <div className="font-display text-3xl">500+</div>
                <div className="font-body text-xs mt-1">объектов сдано</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commercial */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={COMMERCIAL_BG} alt="Коммерческий объект" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#2D3092] text-white p-4 w-32 text-center">
                <div className="font-display text-3xl">20%</div>
                <div className="font-body text-xs mt-1">экономия энергии</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-10 bg-[#ED1C24]" />
                <span className="text-[#ED1C24] font-heading font-semibold uppercase text-sm tracking-widest">
                  Коммерция
                </span>
              </div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340] mb-4 leading-tight">
                Инженерные системы для коммерческих объектов
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                Проектируем и устанавливаем инженерные системы, обеспечивая их длительную и стабильную работу. Предлагаем гарантии и поддержку после завершения проекта.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {["Рестораны, бары", "Государственные учреждения", "Торговые сети", "Офисные комплексы", "Образовательные учреждения", "Бизнес-центры"].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#2D3092] flex-shrink-0" />
                    <span className="text-gray-600 text-sm font-body">{item}</span>
                  </div>
                ))}
              </div>
              <a href="#contacts" className="btn-primary inline-flex items-center gap-2">
                Получить расчёт
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium */}
      <section className="py-20 bg-[#0F1340] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-10 bg-[#ED1C24]" />
                <span className="text-[#ED1C24] font-heading font-semibold uppercase text-sm tracking-widest">
                  Премиум недвижимость
                </span>
              </div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-4 leading-tight">
                Современные инженерные решения для PREMIUM недвижимости
              </h2>
              <p className="text-white/80 font-body leading-relaxed mb-6">
                Системы для умных домов, сочетающие передовые технологии, непревзойдённое качество и изысканный дизайн. Гарантируем комфорт, безопасность и статус вашей недвижимости.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Home, label: "Загородные дома", desc: "Интеллектуальное отопление и автоматизация" },
                  { icon: Building2, label: "Квартиры от 100 м²", desc: "Идеальный микроклимат и безопасность" },
                  { icon: Home, label: "Бассейны", desc: "Чистота воды и автоматизация параметров" },
                  { icon: Building2, label: "Умный дом", desc: "Полная автоматизация всех систем" },
                ].map(item => (
                  <div key={item.label} className="bg-white/10 border border-white/20 p-4">
                    <item.icon size={18} className="text-[#ED1C24] mb-2" />
                    <div className="font-heading font-semibold text-white text-sm mb-1">{item.label}</div>
                    <div className="text-white/60 text-xs font-body">{item.desc}</div>
                  </div>
                ))}
              </div>
              <a href="#contacts" className="btn-primary inline-flex items-center gap-2">
                Узнать стоимость
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden border border-white/20">
                <img src={PREMIUM_BG} alt="Премиум недвижимость" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
