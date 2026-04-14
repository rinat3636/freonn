/**
 * ServicesSection — "С какими системами работаем"
 * Modern layout: alternating horizontal service rows, NOT square cards
 * Full descriptions from ceds.ru
 * Brand: Freonn — dark navy #0F1340, red accent #B91C1C
 */
import { motion } from "framer-motion";
import { ArrowRight, Wind, Thermometer, Flame, Droplets, Zap, Snowflake, ShieldAlert, Hammer } from "lucide-react";
import { ymGoal } from "@/lib/ym";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW";
const GEN_VENT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-ventilation-unit-5ebe3bmzqsCGdGpvbDz2zo.webp";
const GEN_CHILLER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-chiller-E9FzvTdbvYDJ9o4F7zSQNh.webp";
const GEN_SANDBLAST = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-sandblasting-real_78a6f8d6.jpg";

const services = [
  {
    id: 1,
    slug: "service-ventilation",
    href: "/ventilyaciya",
    icon: Wind,
    title: "Вентиляция",
    shortTitle: "Вентиляция",
    description:
      "Выполним проектирование и монтаж систем вентиляции: приточную, вытяжную или приточно-вытяжную вентиляцию. Подберём оборудование, произведём монтаж и пусконаладочные работы.",
    items: ["Приточная вентиляция", "Вытяжная вентиляция", "Приточно-вытяжная", "Рекуперация тепла", "Автоматизация"],
    image: GEN_VENT,
    color: "#2D3092",
    price: "от 500 руб/м²",
    priceHref: "/ceny-na-montazh-ventilyacii",
  },
  {
    id: 2,
    slug: "service-conditioning",
    href: "/kondicionirovanie",
    icon: Thermometer,
    title: "Кондиционирование",
    shortTitle: "Кондиционирование",
    description:
      "Комфорт, которым можно управлять. От многофункциональных бытовых систем до сложных промышленных решений — сделаем ваше пространство действительно комфортным. Произведём монтаж систем кондиционирования различного типа: настенных, кассетных, канальных, напольно-потолочных, мульти-сплит, чиллеров, фанкойлов, мультизональных VRV и VRF систем.",
    items: ["Настенные и кассетные", "Канальные системы", "Мульти-сплит", "Чиллеры и фанкойлы", "VRV и VRF системы"],
    image: `${CDN}/equip-ac_decafa77.webp`,
    color: "#B91C1C",
    price: "от 800 руб/м²",
    priceHref: "/ceny-na-montazh-kondicionirovaniya",
  },
  {
    id: 3,
    slug: "service-smoke",
    href: "/dymoudalenie",
    icon: ShieldAlert,
    title: "Дымоудаление",
    shortTitle: "Дымоудаление",
    description:
      "Защита от дыма и огня — ключевая часть каждого проекта. Спроектируем и смонтируем систему дымоудаления и противодымной вентиляции, которые обеспечивают безопасные условия для эвакуации и предотвращают распространение дыма.",
    items: ["Системы дымоудаления", "Противодымная вентиляция", "Клапаны дымоудаления", "Автоматика управления", "Лицензия МЧС"],
    image: `${CDN}/equip-smoke_77c22382.webp`,
    color: "#2D3092",
    price: "от 600 руб/м²",
    priceHref: "/ceny-na-montazh-dymoudaleniya",
  },
  {
    id: 4,
    slug: "service-heating",
    href: "/otoplenie",
    icon: Flame,
    title: "Отопление и теплоснабжение",
    shortTitle: "Отопление",
    description:
      "Установим систему воздушного отопления, а также водяного, парового или электрического. Разработаем проект системы теплоснабжения по всем нормам и требованиям нормативной документации.",
    items: ["Воздушное отопление", "Водяное отопление", "Паровое отопление", "Электрическое", "Тепловые пункты (ИТП)"],
    image: `${CDN}/equip-heating_49ba3696.jpg`,
    color: "#B91C1C",
    price: "от 600 руб/м²",
    priceHref: "/ceny-na-montazh-inzhenernyh-sistem",
  },
  {
    id: 5,
    slug: "service-cooling",
    href: "/holodosnabzhenie",
    icon: Snowflake,
    title: "Холодоснабжение",
    shortTitle: "Холодоснабжение",
    description:
      "Холодильное оборудование необходимо для обеспечения искусственного охлаждения в производственных процессах. Произведём монтаж промышленного охлаждения и подключение системы по всем нормам СанПиН и ГОСТ.",
    items: ["Промышленные чиллеры", "Технологическое охлаждение", "Холодильные камеры", "Прецизионное охлаждение", "Фреоновые системы"],
    image: GEN_CHILLER,
    color: "#2D3092",
    price: "по запросу",
    priceHref: "/ceny-na-montazh-inzhenernyh-sistem",
  },
  {
    id: 6,
    slug: "service-water",
    href: "/vodosnabzhenie",
    icon: Droplets,
    title: "Водоснабжение и канализация",
    shortTitle: "Водоснабжение",
    description:
      "Подготовим всю необходимую документацию перед установкой систем, произведём монтаж промышленного водоснабжения, водоотведения и канализации, включая необходимое оборудование. Проверим производительность и проведём пусконаладочные работы.",
    items: ["Промышленное водоснабжение", "Насосные станции", "Водоотведение", "Системы водоподготовки", "Пусконаладка"],
    image: `${CDN}/equip-water_0bb56318.jpg`,
    color: "#B91C1C",
    price: "по запросу",
    priceHref: "/ceny-na-montazh-inzhenernyh-sistem",
  },
  {
    id: 7,
    slug: "service-sandblast",
    href: "/peskostrujnaya-obrabotka",
    icon: Hammer,
    title: "Пескоструйная обработка",
    shortTitle: "Пескоструй",
    description:
      "Выполняем пескоструйную обработку металлических конструкций и зданий. Удаляем ржавчину, старую краску, окалину и загрязнения с металлических балок, ферм, резервуаров, фасадов и других конструкций. Подготавливаем поверхности под покраску, нанесение защитных покрытий и антикоррозийной обработки в соответствии с ГОСТ и международными стандартами.",
    items: ["Металлические конструкции", "Фасады зданий", "Резервуары и трубопроводы", "Балки и фермы", "Антикоррозийная обработка", "Подготовка под покраску"],
    image: GEN_SANDBLAST,
    color: "#B91C1C",
    price: "от 350 руб/м²",
    priceHref: "/ceny-na-peskostruj",
  },
  {
    id: 8,
    slug: "service-electrical",
    href: "/elektrosnabzhenie",
    icon: Zap,
    title: "Электроснабжение и освещение",
    shortTitle: "Электроснабжение",
    description:
      "Профессиональный промышленный электромонтаж (электроснабжение и освещение). Произведём проектирование и монтаж силового электрооборудования и внутреннего электрического освещения, выполним комплексный монтаж электрощитовых: от сбора щита до монтажа всей электрической системы.",
    items: ["Силовые кабельные линии", "Электрощитовые", "Промышленное освещение", "Системы АВР", "Заземление и молниезащита"],
    image: `${CDN}/equip-electrical_a91c8ffb.jpg`,
    color: "#2D3092",
    price: "от 400 руб/м²",
    priceHref: "/ceny-na-montazh-inzhenernyh-sistem",
  },
];

export default function ServicesSection() {
  return (
    <section data-theme="light" id="services" className="py-20 bg-white overflow-hidden">
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
            <div className="h-0.5 w-10 bg-[#B91C1C]" />
            <span className="text-[#B91C1C] font-semibold uppercase text-sm tracking-widest font-heading">
              Направления
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340] max-w-xl">
              Монтаж инженерных систем в Москве и МО под ключ
            </h2>
            {/* hidden subtitle */}
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
                id={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className={`group flex flex-col lg:flex-row border-b border-gray-100 last:border-0 hover:bg-gray-50/80 transition-colors duration-300`}
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1 bg-gray-100 text-gray-600 font-body hover:bg-[#B91C1C] hover:text-white transition-colors cursor-default rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Price button */}
                  <div className="flex items-center gap-2 mb-4">
                    <a
                      href={service.priceHref}
                      onClick={() => ymGoal("service_price_click", { service: service.title })}
                      className="inline-flex items-center gap-1.5 text-[#B91C1C] font-heading font-bold text-sm bg-[#B91C1C]/8 border border-[#B91C1C]/20 px-3 py-1 rounded-full hover:bg-[#B91C1C] hover:text-white transition-colors duration-200"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="currentColor"/>
                      </svg>
                      ЦЕНЫ
                    </a>
                  </div>

                  <a
                    href={service.href}
                    onClick={() => ymGoal("service_detail_click", { service: service.title })}
                    className="inline-flex items-center gap-2 text-[#B91C1C] font-heading font-semibold text-sm uppercase tracking-wide hover:gap-3 transition-all duration-200 group/link"
                  >
                    Подробнее
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
