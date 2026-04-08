/*
 * FREONN SERVICES — Bold Technical Expressionism
 * Each service card has a full background photo with dark overlay
 * Text and icon rendered on top of the image
 */
import { motion } from "framer-motion";
import { Wind, Thermometer, Flame, Droplets, Snowflake, Zap, Waves } from "lucide-react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW";

const services = [
  {
    icon: Wind,
    title: "Вентиляция",
    desc: "Проектирование и монтаж систем вентиляции: приточную, вытяжную или приточно-вытяжную. Подберём оборудование, произведём монтаж и пусконаладочные работы.",
    img: `${CDN}/svc-ventilation_36f1b1b1.jpg`,
  },
  {
    icon: Thermometer,
    title: "Кондиционирование",
    desc: "От многофункциональных бытовых систем до сложных промышленных решений. Монтаж настенных, кассетных, канальных, VRV и VRF систем.",
    img: `${CDN}/svc-aircon_4aaab199.jpg`,
  },
  {
    icon: Flame,
    title: "Дымоудаление",
    desc: "Проектирование и монтаж систем дымоудаления и противодымной вентиляции, обеспечивающих безопасные условия для эвакуации.",
    img: `${CDN}/svc-smoke_719c93e0.jpg`,
  },
  {
    icon: Droplets,
    title: "Отопление и теплоснабжение",
    desc: "Установка систем воздушного, водяного, парового и электрического отопления. Разработка проектов по всем нормам нормативной документации.",
    img: `${CDN}/svc-heating_a6873179.jpg`,
  },
  {
    icon: Snowflake,
    title: "Холодоснабжение",
    desc: "Монтаж промышленного охлаждения и подключение системы по всем нормам СанПиН и ГОСТ для производственных процессов.",
    img: `${CDN}/ru-warehouse-hvac_c17201cc.jpg`,
  },
  {
    icon: Waves,
    title: "Водоснабжение и канализация",
    desc: "Монтаж промышленного водоснабжения, водоотведения и канализации. Проверка производительности и пусконаладочные работы.",
    img: `${CDN}/svc-water_d43583cd.jpg`,
  },
  {
    icon: Zap,
    title: "Электроснабжение и освещение",
    desc: "Профессиональный промышленный электромонтаж. Проектирование и монтаж силового оборудования, освещения и электрощитовых.",
    img: `${CDN}/svc-electrical_fbc24b0d.jpg`,
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
    <section id="services" className="py-20 bg-[#F4F6FA]">
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
              className="relative overflow-hidden group cursor-pointer"
              style={{ minHeight: "260px" }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.img})` }}
              />
              {/* Dark overlay — darker on hover to keep text readable */}
              <div className="absolute inset-0 bg-[#0F1340]/70 group-hover:bg-[#0F1340]/80 transition-colors duration-300" />
              {/* Red accent bar on left */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ED1C24] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between" style={{ minHeight: "260px" }}>
                <div>
                  <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center mb-4 group-hover:bg-[#ED1C24] group-hover:border-[#ED1C24] transition-all duration-300">
                    <service.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-lg mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-white/75 text-sm font-body leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="text-[#ED1C24] text-sm font-heading font-semibold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Подробнее →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.a
            variants={cardVariants}
            href="#contacts"
            className="relative overflow-hidden bg-gradient-to-br from-[#ED1C24] to-[#b01018] p-6 flex flex-col justify-between group cursor-pointer"
            style={{ minHeight: "260px" }}
          >
            <div>
              <div className="w-12 h-12 bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <span className="text-white font-display text-2xl font-bold">+</span>
              </div>
              <h3 className="font-heading font-bold text-white text-lg mb-2">
                Не нашли нужную услугу?
              </h3>
              <p className="text-white/80 text-sm font-body leading-relaxed">
                Свяжитесь с нами — обсудим любой инженерный проект
              </p>
            </div>
            <div className="mt-4">
              <span className="text-white font-heading font-semibold uppercase text-sm tracking-wide group-hover:underline">
                Связаться →
              </span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
