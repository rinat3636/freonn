/*
 * FREONN SERVICE PAGE — /ventilyaciya, /kondicionirovanie, etc.
 * Generic service page using route params
 */
import PageLayout from "@/components/PageLayout";
import { useRoute } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Phone, Wind, Thermometer, Flame, Droplets, Zap, Snowflake, ShieldAlert, Hammer } from "lucide-react";
import ContactSection from "@/components/ContactSection";
import ProcessSection from "@/components/ProcessSection";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW";
const GEN_VENT = `${CDN}/freonn-ventilation-unit-5ebe3bmzqsCGdGpvbDz2zo.webp`;
const GEN_CHILLER = `${CDN}/freonn-chiller-E9FzvTdbvYDJ9o4F7zSQNh.webp`;
const GEN_SANDBLAST = `${CDN}/freonn-sandblasting-real_78a6f8d6.jpg`;

const serviceData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  image: string;
  items: string[];
  benefits: string[];
  color: string;
}> = {
  "ventilyaciya": {
    title: "Монтаж вентиляции",
    subtitle: "Проектирование и монтаж систем вентиляции",
    description: "Выполним проектирование и монтаж систем вентиляции: приточную, вытяжную или приточно-вытяжную вентиляцию. Подберём оборудование, произведём монтаж и пусконаладочные работы. Работаем с объектами от 500 м² в Москве и Московской области.",
    icon: Wind,
    image: GEN_VENT,
    items: ["Приточная вентиляция", "Вытяжная вентиляция", "Приточно-вытяжная", "Рекуперация тепла", "Автоматизация", "Пусконаладочные работы"],
    benefits: ["Проектирование по нормам СП 60.13330.2020", "Оборудование ведущих производителей", "Гарантия 1 год на монтажные работы", "Бесплатный выезд инженера", "Работаем с объектами от 500 м²"],
    color: "#2D3092",
  },
  "kondicionirovanie": {
    title: "Монтаж кондиционирования",
    subtitle: "Системы кондиционирования любой сложности",
    description: "Комфорт, которым можно управлять. От многофункциональных бытовых систем до сложных промышленных решений — сделаем ваше пространство действительно комфортным. Произведём монтаж систем кондиционирования различного типа.",
    icon: Thermometer,
    image: `${CDN}/equip-ac_decafa77.webp`,
    items: ["Настенные и кассетные", "Канальные системы", "Мульти-сплит", "Чиллеры и фанкойлы", "VRV и VRF системы", "Прецизионные кондиционеры"],
    benefits: ["Все типы систем кондиционирования", "Сертифицированные монтажники", "Гарантия на оборудование 3–5 лет", "Сервисное обслуживание", "Работаем по всей России"],
    color: "#ED1C24",
  },
  "dymoudalenie": {
    title: "Монтаж дымоудаления",
    subtitle: "Системы дымоудаления и противодымной вентиляции",
    description: "Защита от дыма и огня — ключевая часть каждого проекта. Спроектируем и смонтируем систему дымоудаления и противодымной вентиляции, которые обеспечивают безопасные условия для эвакуации и предотвращают распространение дыма.",
    icon: ShieldAlert,
    image: `${CDN}/equip-smoke_77c22382.webp`,
    items: ["Системы дымоудаления", "Противодымная вентиляция", "Клапаны дымоудаления", "Автоматика управления", "Лицензия МЧС", "Сдача в эксплуатацию"],
    benefits: ["Лицензия МЧС", "Соответствие СП 7.13130.2013", "Полный пакет документов", "Взаимодействие с пожарным надзором", "Гарантия 1 год"],
    color: "#2D3092",
  },
  "otoplenie": {
    title: "Монтаж отопления",
    subtitle: "Системы отопления и теплоснабжения",
    description: "Установим систему воздушного отопления, а также водяного, парового или электрического. Разработаем проект системы теплоснабжения по всем нормам и требованиям нормативной документации.",
    icon: Flame,
    image: `${CDN}/equip-heating_49ba3696.jpg`,
    items: ["Воздушное отопление", "Водяное отопление", "Паровое отопление", "Электрическое", "Тепловые пункты (ИТП)", "Тепловые завесы"],
    benefits: ["Проектирование по СП 60.13330.2020", "Монтаж ИТП под ключ", "Экономичные решения", "Гарантия 1 год", "Сервисное обслуживание"],
    color: "#ED1C24",
  },
  "holodosnabzhenie": {
    title: "Холодоснабжение",
    subtitle: "Промышленное холодоснабжение и охлаждение",
    description: "Холодильное оборудование необходимо для обеспечения искусственного охлаждения в производственных процессах. Произведём монтаж промышленного охлаждения и подключение системы по всем нормам СанПиН и ГОСТ.",
    icon: Snowflake,
    image: GEN_CHILLER,
    items: ["Промышленные чиллеры", "Технологическое охлаждение", "Холодильные камеры", "Прецизионное охлаждение", "Фреоновые системы", "Пусконаладка"],
    benefits: ["Соответствие ГОСТ и СанПиН", "Промышленное оборудование", "Технологическое сопровождение", "Гарантия 1 год", "Сервисное обслуживание"],
    color: "#2D3092",
  },
  "vodosnabzhenie": {
    title: "Водоснабжение и канализация",
    subtitle: "Промышленное водоснабжение и водоотведение",
    description: "Подготовим всю необходимую документацию перед установкой систем, произведём монтаж промышленного водоснабжения, водоотведения и канализации, включая необходимое оборудование.",
    icon: Droplets,
    image: `${CDN}/equip-water_0bb56318.jpg`,
    items: ["Промышленное водоснабжение", "Насосные станции", "Водоотведение", "Системы водоподготовки", "Пусконаладка", "Проектирование"],
    benefits: ["Полный пакет документов", "Монтаж под ключ", "Соответствие СНиП", "Гарантия 1 год", "Сервисное обслуживание"],
    color: "#ED1C24",
  },
  "peskostrujnaya-obrabotka": {
    title: "Пескоструйная обработка",
    subtitle: "Пескоструйная очистка металлических конструкций",
    description: "Выполняем пескоструйную обработку металлических конструкций и зданий. Удаляем ржавчину, старую краску, окалину и загрязнения. Подготавливаем поверхности под покраску и нанесение защитных покрытий.",
    icon: Hammer,
    image: GEN_SANDBLAST,
    items: ["Металлические конструкции", "Фасады зданий", "Резервуары и трубопроводы", "Балки и фермы", "Антикоррозийная обработка", "Подготовка под покраску"],
    benefits: ["Соответствие ГОСТ и международным стандартам", "Профессиональное оборудование", "Выезд на объект", "Гарантия качества", "Работаем по всей России"],
    color: "#ED1C24",
  },
  "elektrosnabzhenie": {
    title: "Электроснабжение и освещение",
    subtitle: "Промышленный электромонтаж",
    description: "Профессиональный промышленный электромонтаж (электроснабжение и освещение). Произведём проектирование и монтаж силового электрооборудования и внутреннего электрического освещения.",
    icon: Zap,
    image: `${CDN}/equip-electrical_a91c8ffb.jpg`,
    items: ["Силовые кабельные линии", "Электрощитовые", "Промышленное освещение", "Системы АВР", "Заземление и молниезащита", "Пусконаладка"],
    benefits: ["Допуск СРО", "Проектирование по ПУЭ", "Монтаж под ключ", "Гарантия 1 год", "Сервисное обслуживание"],
    color: "#2D3092",
  },
};

// Also handle footer service URLs
const slugAliases: Record<string, string> = {
  "ustanovka-ventilyacii": "ventilyaciya",
  "ustanovka-kondicionirovaniya": "kondicionirovanie",
  "ustanovka-dymoudaleniya": "dymoudalenie",
  "vozdushnoe-otoplenie": "otoplenie",
  "vodosnabzhenie-i-kanalizaciya": "vodosnabzhenie",
  "elektrosnabzhenie-i-osveshchenie": "elektrosnabzhenie",
  "proektirovanie-ovik": "ventilyaciya",
  "montazh-ovik": "ventilyaciya",
  "puskonaladochnye-raboty": "ventilyaciya",
  "servisnoe-obsluzhivanie": "ventilyaciya",
};

export default function ServicePageComponent({ slug: propSlug }: { slug?: string }) {
  const [matchVent] = useRoute("/ventilyaciya");
  const [matchAC] = useRoute("/kondicionirovanie");
  const [matchSmoke] = useRoute("/dymoudalenie");
  const [matchHeat] = useRoute("/otoplenie");
  const [matchCool] = useRoute("/holodosnabzhenie");
  const [matchWater] = useRoute("/vodosnabzhenie");
  const [matchSand] = useRoute("/peskostrujnaya-obrabotka");
  const [matchElec] = useRoute("/elektrosnabzhenie");

  let slug = propSlug || "";
  if (matchVent) slug = "ventilyaciya";
  else if (matchAC) slug = "kondicionirovanie";
  else if (matchSmoke) slug = "dymoudalenie";
  else if (matchHeat) slug = "otoplenie";
  else if (matchCool) slug = "holodosnabzhenie";
  else if (matchWater) slug = "vodosnabzhenie";
  else if (matchSand) slug = "peskostrujnaya-obrabotka";
  else if (matchElec) slug = "elektrosnabzhenie";

  // Resolve aliases
  const resolvedSlug = slugAliases[slug] || slug;
  const service = serviceData[resolvedSlug];

  if (!service) {
    return (
      <PageLayout title="Услуга не найдена" breadcrumb={[{ label: "Услуги", href: "/uslugi" }, { label: "Не найдено" }]}>
        <div className="container py-20 text-center">
          <p className="text-gray-500 font-body mb-6">Запрашиваемая услуга не найдена.</p>
          <a href="/uslugi" className="btn-primary inline-flex items-center gap-2">
            Все услуги <ArrowRight size={16} />
          </a>
        </div>
      </PageLayout>
    );
  }

  const Icon = service.icon;

  useSEO({
    title: `${service.title} в Москве и МО — цены, проектирование, монтаж`,
    description: `${service.description.slice(0, 160)}`,
    keywords: `${service.title.toLowerCase()} Москва, монтаж ${service.title.toLowerCase()} цена, ${service.title.toLowerCase()} МО`,
    canonical: `/${resolvedSlug}`,
  });

  return (
    <PageLayout
      title={service.title}
      breadcrumb={[{ label: "Услуги", href: "/uslugi" }, { label: service.title }]}
    >
      {/* Hero */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${service.color}15` }}>
                  <Icon size={24} style={{ color: service.color }} />
                </div>
                <span className="text-sm font-body text-gray-500">{service.subtitle}</span>
              </div>
              <p className="text-gray-600 font-body text-lg leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {service.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-body text-gray-700">
                    <CheckCircle size={16} className="text-[#ED1C24] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/contacts" className="btn-primary inline-flex items-center gap-2 justify-center">
                  <Phone size={16} /> Получить расчёт
                </a>
                <a href="tel:88001012009" className="btn-outline inline-flex items-center gap-2 justify-center border-[#0F1340] text-[#0F1340]">
                  8(800)101-2009
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-[#F7F8FF]">
        <div className="container">
          <h2 className="font-heading font-bold text-[#0F1340] text-2xl mb-8">Почему выбирают Freonn</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white p-5 rounded-xl border border-gray-100"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${service.color}15` }}>
                  <span className="font-heading font-bold text-sm" style={{ color: service.color }}>{i + 1}</span>
                </div>
                <p className="font-body text-gray-700 text-sm">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />
      <ContactSection />
    </PageLayout>
  );
}
