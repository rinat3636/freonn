/*
 * FREONN ADVANTAGES — Modern layout
 * What companies get from working with us (ceds.ru style)
 * Brand: Freonn — dark navy #0F1340, red accent #ED1C24
 */
import { motion } from "framer-motion";
import { Users, Wrench, Shield, Award, FileCheck, HardHat, TrendingDown, Clock, Star } from "lucide-react";

const advantages = [
  {
    icon: Users,
    title: "Собственный проектный отдел",
    desc: "Инженеры-проектировщики создают решения, точно соответствующие вашим нуждам. Тесная интеграция проектного и монтажного отделов гарантирует гибкость.",
  },
  {
    icon: HardHat,
    title: "25 монтажных бригад",
    desc: "Наша команда способна масштабировать работы до 25 монтажных бригад для выполнения проектов любой сложности.",
  },
  {
    icon: Wrench,
    title: "Персональный ИТР",
    desc: "За успехом каждого проекта стоит персональный инженерно-технический работник, доступный на объекте 24/7.",
  },
  {
    icon: Shield,
    title: "Гарантия на работы",
    desc: "Предоставляем гарантию на все виды монтажных работ. Оборудование с гарантией производителя до 5 лет.",
  },
  {
    icon: Award,
    title: "Прямые договорённости с производителями",
    desc: "Прямые договорённости с производителями обеспечивают скидку до 20% на оборудование и комплектующие.",
  },
  {
    icon: FileCheck,
    title: "Все лицензии и допуски СРО",
    desc: "Обладаем всеми лицензиями и сертификатами, включая лицензию МЧС, допуски СРО на монтаж и проектирование.",
  },
];

const results = [
  {
    icon: TrendingDown,
    title: "Эффективность на каждом шагу",
    desc: "Наши клиенты видят реальное сокращение затрат и улучшение работы своих предприятий. Делаем ваш бизнес более экономичным и приятным для каждого сотрудника.",
  },
  {
    icon: Clock,
    title: "Долгосрочную выгоду без забот",
    desc: "Обеспечиваем ваше спокойствие благодаря продуманным решениям, которые работают год за годом, минимизируя необходимость в ваших вмешательствах и поддержке.",
  },
  {
    icon: Star,
    title: "Надёжного партнёра на годы",
    desc: "Нам доверяют монтаж инженерных систем отечественные НИИ, предприятия группы РОСАТОМ, крупные торговые сети и бизнес-центры.",
  },
];

export default function AdvantagesSection() {
  return (
    <>
      {/* What clients get */}
      <section className="py-20 bg-[#0F1340] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-0.5 w-10 bg-[#ED1C24]" />
              <span className="text-[#ED1C24] font-heading font-semibold uppercase text-sm tracking-widest">
                Результаты
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl">
              Что уже получили компании, которые обратились к нам
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {results.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-t border-white/20 pt-6"
              >
                <item.icon size={28} className="text-[#ED1C24] mb-4" />
                <h3 className="font-heading font-semibold text-white text-lg mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm font-body leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-0.5 w-10 bg-[#ED1C24]" />
              <span className="text-[#ED1C24] font-heading font-semibold uppercase text-sm tracking-widest">
                Преимущества
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340]">
              Ключевые преимущества сотрудничества
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-100">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4 p-6 border-b border-r border-gray-100 hover:bg-[#F7F8FF] transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-[#F7F8FF] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2D3092] transition-colors duration-300">
                  <adv.icon size={20} className="text-[#2D3092] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[#0F1340] text-sm mb-1.5 leading-snug">{adv.title}</h3>
                  <p className="text-gray-500 text-xs font-body leading-relaxed">{adv.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
