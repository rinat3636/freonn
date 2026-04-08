/**
 * ServicesSection — "С какими системами работаем"
 * Modern layout: alternating horizontal service rows, NOT square cards
 * Full descriptions from ceds.ru
 * Brand: Freonn — dark navy #0F1340, red accent #ED1C24
 */
import { motion } from "framer-motion";
import { ArrowRight, Wind, Thermometer, Flame, Droplets, Zap, Snowflake, ShieldAlert, Hammer } from "lucide-react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW";
const GEN_VENT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-ventilation-unit-5ebe3bmzqsCGdGpvbDz2zo.webp";
const GEN_CHILLER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-chiller-E9FzvTdbvYDJ9o4F7zSQNh.webp";
const GEN_SANDBLAST = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-sandblasting-hbNQQVnnQzjyjyRKGHS8YY.webp";

const services = [
  {
    id: 1,
    icon: Wind,
    title: "Вентиляция",
    shortTitle: "Вентиляция",
    description:
      "Выполним проектирование и монтаж систем вентиляции: приточную, вытяжную или приточно-вытяжную вентиляцию. Подберём оборудование, произведём монтаж и пусконаладочные работы.",
    items: ["Приточная вентиляция", "Вытяжная вентиляция", "Приточно-вытяжная", "Рекуперация тепла", "Автоматизация"],
    image: GEN_VENT,
    color: "#2D3092",
  },
  {
    id: 2,
    icon: Thermometer,
    title: "Кондиционирование",
    shortTitle: "Кондиционирование",
    description:
      "Комфорт, которым можно управлять. От многофункциональных бытовых систем до сложных промышленных решений — сделаем ваше пространство действительно комфортным. Произведём монтаж систем кондиционирования различного типа: настенных, кассетных, канальных, напольно-потолочных, мульти-сплит, чиллеров, фанкойлов, мультизональных VRV и VRF систем.",
    items: ["Настенные и кассетные", "Канальные системы", "Мульти-сплит", "Чиллеры и фанкойлы", "VRV и VRF системы"],
    image: `${CDN}/equip-ac_decafa77.webp`,
    color: "#ED1C24",
  },
  {
    id: 3,
    icon: ShieldAlert,
    title: "Дымоудаление",
    shortTitle: "Дымоудаление",
    description:
      "Защита от дыма и огня — ключевая часть каждого проекта. Спроектируем и смонтируем систему дымоудаления и противодымной вентиляции, которые обеспечивают безопасные условия для эвакуации и предотвращают распространение дыма.",
    items: ["Системы дымоудаления", "Противодымная вентиляция", "Клапаны дымоудаления", "Автоматика управления", "Лицензия МЧС"],
    image: `${CDN}/equip-smoke_77c22382.webp`,
    color: "#2D3092",
  },
  {
    id: 4,
    icon: Flame,
    title: "Отопление и теплоснабжение",
    shortTitle: "Отопление",
    description:
      "Установим систему воздушного отопления, а также водяного, парового или электрического. Разработаем проект системы теплоснабжения по всем нормам и требованиям нормативной документации.",
    items: ["Воздушное отопление", "Водяное отопление", "Паровое отопление", "Электрическое", "Тепловые пункты (ИТП)"],
    image: `${CDN}/equip-heating_49ba3696.jpg`,
    color: "#ED1C24",
  },
  {
    id: 5,
    icon: Snowflake,
    title: "Холодоснабжение",
    shortTitle: "Холодоснабжение",
    description:
      "Холодильное оборудование необходимо для обеспечения искусственного охлаждения в производственных процессах. Произведём монтаж промышленного охлаждения и подключение системы по всем нормам СанПиН и ГОСТ.",
    items: ["Промышленные чиллеры", "Технологическое охлаждение", "Холодильные камеры", "Прецизионное охлаждение", "Фреоновые системы"],
    image: GEN_CHILLER,
    color: "#2D3092",
  },
  {
    id: 6,
    icon: Droplets,
    title: "Водоснабжение и канализация",
    shortTitle: "Водоснабжение",
    description:
      "Подготовим всю необходимую документацию перед установкой систем, произведём монтаж промышленного водоснабжения, водоотведения и канализации, включая необходимое оборудование. Проверим производительность и проведём пусконаладочные работы.",
    items: ["Промышленное водоснабжение", "Насосные станции", "Водоотведение", "Системы водоподготовки", "Пусконаладка"],
    image: `${CDN}/equip-water_0bb56318.jpg`,
    color: "#ED1C24",
  },
  {
    id: 7,
    icon: Hammer,
    title: "Пескоструйная обработка",
    shortTitle: "Пескоструй",
    description:
      "Выполняем пескоструйную обработку металлических конструкций и зданий. Удаляем ржавчину, старую краску, окалину и загрязнения с металлических балок, ферм, резервуаров, фасадов и других конструкций. Подготавливаем поверхности под покраску, нанесение защитных покрытий и антикоррозийной обработки в соответствии с ГОСТ и международными стандартами.",
    items: ["Металлические конструкции", "Фасады зданий", "Резервуары и трубопроводы", "Балки и фермы", "Антикоррозийная обработка", "Подготовка под покраску"],
    image: GEN_SANDBLAST,
    color: "#ED1C24",
  },
  {
    id: 8,
    icon: Zap,
    title: "Электроснабжение и освещение",
    shortTitle: "Электроснабжение",
    description:
      "Профессиональный промышленный электромонтаж (электроснабжение и освещение). Произведём проектирование и монтаж силового электрооборудования и внутреннего электрического освещения, выполним комплексный монтаж электрощитовых: от сбора щита до монтажа всей электрической системы.",
    items: ["Силовые кабельные линии", "Электрощитовые", "Промышленное освещение", "Системы АВР", "Заземление и молниезащита"],
    image: `${CDN}/equip-electrical_a91c8ffb.jpg`,
    color: "#2D3092",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white overflow-hidden">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-0.5 w-10 bg-[#ED1C24]" />
            <span className="text-[#ED1C24] font-semibold uppercase text-sm tracking-widest font-heading">
              Направления
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340] max-w-xl">
              С какими системами работаем
            </h2>
            <p className="text-gray-500 max-w-md text-sm leading-relaxed font-body">
              Зарекомендовали себя как надёжного исполнителя сложнейших инженерных задач для лидеров рынка.
            </p>
          </div>
        </motion.div>

        {/* Services list — horizontal rows, alternating layout */}
        <div className="space-y-0">
          {services.map((service, i) => {
            const isEven = i % 2 === 1;
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className={`group flex flex-col lg:flex-row ${isEven ? "lg:flex-row-reverse" : ""} border-b border-gray-100 last:border-0 hover:bg-gray-50/80 transition-colors duration-300`}
              >
                {/* Image side */}
                <div className="lg:w-64 xl:w-72 flex-shrink-0 overflow-hidden bg-gray-100">
                  <div className="h-44 sm:h-52 lg:h-full relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1340]/40 to-transparent" />
                  </div>
                </div>

                {/* Content side */}
                <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-start gap-4 mb-3">
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 rounded-full"
                      style={{ backgroundColor: `${service.color}15` }}
                    >
                      <Icon size={20} style={{ color: service.color }} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-[#0F1340] text-xl mb-1 group-hover:text-[#2D3092] transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 font-body max-w-2xl">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {service.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1 bg-gray-100 text-gray-600 font-body hover:bg-[#ED1C24] hover:text-white transition-colors cursor-default rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contacts"
                    className="inline-flex items-center gap-2 text-[#ED1C24] font-heading font-semibold text-sm uppercase tracking-wide hover:gap-3 transition-all duration-200 group/link"
                  >
                    Получить консультацию
                    <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
