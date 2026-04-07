/*
 * FREONN SERVICES — Bold Technical Expressionism
 * White section with navy-accented service cards
 * 3-column grid on desktop, 2 on tablet, 1 on mobile
 */
import { motion } from "framer-motion";
import { Wind, Thermometer, Flame, Droplets, Snowflake, Zap, Waves } from "lucide-react";

const services = [
  {
    icon: Wind,
    title: "Вентиляция",
    desc: "Проектирование и монтаж систем вентиляции: приточную, вытяжную или приточно-вытяжную. Подберём оборудование, произведём монтаж и пусконаладочные работы.",
  },
  {
    icon: Thermometer,
    title: "Кондиционирование",
    desc: "От многофункциональных бытовых систем до сложных промышленных решений. Монтаж настенных, кассетных, канальных, VRV и VRF систем.",
  },
  {
    icon: Flame,
    title: "Дымоудаление",
    desc: "Проектирование и монтаж систем дымоудаления и противодымной вентиляции, обеспечивающих безопасные условия для эвакуации.",
  },
  {
    icon: Droplets,
    title: "Отопление и теплоснабжение",
    desc: "Установка систем воздушного, водяного, парового и электрического отопления. Разработка проектов по всем нормам нормативной документации.",
  },
  {
    icon: Snowflake,
    title: "Холодоснабжение",
    desc: "Монтаж промышленного охлаждения и подключение системы по всем нормам СанПиН и ГОСТ для производственных процессов.",
  },
  {
    icon: Waves,
    title: "Водоснабжение и канализация",
    desc: "Монтаж промышленного водоснабжения, водоотведения и канализации. Проверка производительности и пусконаладочные работы.",
  },
  {
    icon: Zap,
    title: "Электроснабжение и освещение",
    desc: "Профессиональный промышленный электромонтаж. Проектирование и монтаж силового оборудования, освещения и электрощитовых.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container">
        {/* Section header */}
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
              Наши услуги
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340] mb-3">
            С какими системами работаем
          </h2>
          <p className="text-gray-500 font-body max-w-2xl">
            Зарекомендовали себя как надёжного исполнителя сложнейших инженерных задач для лидеров рынка.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="service-card p-6 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-[#F0F2FF] flex items-center justify-center mb-4 group-hover:bg-[#2D3092] transition-colors duration-300">
                <service.icon size={22} className="text-[#2D3092] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-heading font-semibold text-[#0F1340] text-lg mb-2 group-hover:text-[#2D3092] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm font-body leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.a
            variants={cardVariants}
            href="#contacts"
            className="bg-gradient-to-br from-[#0F1340] to-[#2D3092] p-6 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 bg-[#ED1C24] flex items-center justify-center mb-4">
                <span className="text-white font-display text-xl">+</span>
              </div>
              <h3 className="font-heading font-semibold text-white text-lg mb-2">
                Не нашли нужную услугу?
              </h3>
              <p className="text-white/60 text-sm font-body">
                Свяжитесь с нами — обсудим любой инженерный проект
              </p>
            </div>
            <div className="mt-4">
              <span className="text-[#ED1C24] font-heading font-semibold uppercase text-sm tracking-wide group-hover:underline">
                Связаться →
              </span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
