/**
 * ServicesSection — "С какими системами работаем"
 * Design: ceds.ru style — white cards with equipment product photos (on light bg),
 * title + description below image. Clean, professional, technical.
 * Brand: Freonn — dark navy #0F1340, red accent #ED1C24
 */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW";

const services = [
  {
    title: "Вентиляция",
    description:
      "Выполним проектирование и монтаж систем вентиляции: приточную, вытяжную или приточно-вытяжную. Подберём оборудование, произведём монтаж и пусконаладочные работы.",
    image: `${CDN}/equip-ventilation_25987b56.jpg`,
    link: "#",
  },
  {
    title: "Кондиционирование",
    description:
      "Комфорт, которым можно управлять. От многофункциональных бытовых систем до сложных промышленных решений. Монтаж VRV и VRF систем, чиллеров, фанкойлов.",
    image: `${CDN}/equip-ac_decafa77.webp`,
    link: "#",
  },
  {
    title: "Дымоудаление",
    description:
      "Защита от дыма и огня — ключевая часть каждого проекта. Спроектируем и смонтируем систему дымоудаления и противодымной вентиляции.",
    image: `${CDN}/equip-smoke_77c22382.webp`,
    link: "#",
  },
  {
    title: "Отопление и теплоснабжение",
    description:
      "Установим систему воздушного отопления, а также водяного, парового или электрического. Разработаем проект по всем нормам нормативной документации.",
    image: `${CDN}/equip-heating_49ba3696.jpg`,
    link: "#",
  },
  {
    title: "Холодоснабжение",
    description:
      "Промышленные и коммерческие системы холодоснабжения. Проектируем и монтируем чиллерные установки и системы технологического охлаждения.",
    image: `${CDN}/equip-chiller_3043eb03.jpg`,
    link: "#",
  },
  {
    title: "Водоснабжение и канализация",
    description:
      "Проектирование и монтаж систем водоснабжения и водоотведения. Насосные станции, повысительные установки, системы водоподготовки.",
    image: `${CDN}/equip-water_0bb56318.jpg`,
    link: "#",
  },
  {
    title: "Электроснабжение",
    description:
      "Монтаж электрощитового оборудования, силовых кабельных линий, систем электроснабжения и автоматики для объектов любой сложности.",
    image: `${CDN}/equip-electrical_a91c8ffb.jpg`,
    link: "#",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-0.5 w-10 bg-[#ED1C24]" />
            <span className="text-[#ED1C24] font-semibold uppercase text-sm tracking-widest">
              Направления
            </span>
          </div>
          <h2 className="font-bold text-3xl lg:text-4xl text-[#0F1340] mb-3">
            С какими системами работаем
          </h2>
          <p className="text-gray-500 max-w-2xl text-base">
            Зарекомендовали себя как надёжного исполнителя сложнейших инженерных задач для лидеров рынка.
          </p>
        </motion.div>

        {/* Services grid — ceds.ru style: 4 columns, white cards, product image on top */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service) => (
            <motion.a
              key={service.title}
              href={service.link}
              variants={cardVariants}
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-[#ED1C24]/30 transition-all duration-300 flex flex-col"
            >
              {/* Equipment product image on light grey background */}
              <div className="bg-gray-50 flex items-center justify-center h-44 p-5 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-400 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Red top border on hover */}
              <div className="h-0.5 bg-[#ED1C24] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-bold text-[#0F1340] mb-2 group-hover:text-[#ED1C24] transition-colors leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[#ED1C24] text-sm font-semibold">
                  <span>Подробнее</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
