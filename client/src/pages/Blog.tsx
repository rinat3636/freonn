/*
 * FREONN BLOG PAGE — /blog
 */
import { useSEO } from "@/hooks/useSEO";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW";

const articles = [
  {
    title: "Профессиональный монтаж тепловых пунктов (ИТП) в Москве",
    category: "Отопление",
    readTime: "7 минут",
    img: `${CDN}/equip-heating_49ba3696.jpg`,
    href: "/blog/montazh-teplovyh-punktov",
    excerpt: "Монтаж ИТП под ключ — это комплекс работ, выполняемый силами специализированной сертифицированной организации. Рассказываем о всех этапах и требованиях.",
  },
  {
    title: "Автоматизация инженерных систем",
    category: "Автоматизация",
    readTime: "7 минут",
    img: `${CDN}/equip-electrical_a91c8ffb.jpg`,
    href: "/blog/avtomatizaciya-sistem",
    excerpt: "Автоматизация и диспетчеризация инженерных систем — это методы управления и мониторинга различными техническими системами в помещениях.",
  },
  {
    title: "Технический аудит инженерных систем",
    category: "Обслуживание",
    readTime: "5 минут",
    img: `${CDN}/ru-hvac-production_2fc3fdd7.jpg`,
    href: "/blog/tekhnicheskij-audit",
    excerpt: "Аудит инженерных систем зданий и сооружений помогает определить их фактическое состояние, причины возникающих проблем и оценить эффективность.",
  },
  {
    title: "Монтаж вентиляции — этапы работы, нормативы и требования СНиП",
    category: "Вентиляция",
    readTime: "5 минут",
    img: `${CDN}/ru-industrial-ventilation_4939c0aa.jpg`,
    href: "/blog/montazh-ventilyacii",
    excerpt: "Монтаж системы вентиляции требует знания норм и требований, а также учёта специфики объекта — рассказываем подробно о всех нюансах.",
  },
  {
    title: "ККБ для приточной установки",
    category: "Кондиционирование",
    readTime: "7 минут",
    img: `${CDN}/equip-ac_decafa77.webp`,
    href: "/blog/kkb-dlya-pritochnoj-ustanovki",
    excerpt: "ККБ для приточной установки — это часть воздухораспределительной системы. Играет важную роль в обеспечении чистого и комфортного воздухообмена в зданиях.",
  },
  {
    title: "Вентиляция в школе — вытяжная, приточная, приточно-вытяжная",
    category: "Вентиляция",
    readTime: "9 минут",
    img: `${CDN}/equip-ventilation_25987b56.jpg`,
    href: "/blog/ventilyaciya-v-shkole",
    excerpt: "Вентиляция в школе — система, предназначенная для обеспечения циркуляции свежего воздуха внутри учебных классов и удаления загрязнённого воздуха.",
  },
  {
    title: "Кондиционирование кинотеатра",
    category: "Кондиционирование",
    readTime: "5 минут",
    img: `${CDN}/equip-ac_decafa77.webp`,
    href: "/blog/kondicionirovanie-kinoteatra",
    excerpt: "Кинотеатры предъявляют особые требования к системам кондиционирования: тихая работа, равномерное распределение воздуха, точный контроль температуры.",
  },
  {
    title: "Вентиляция медицинских учреждений",
    category: "Вентиляция",
    readTime: "7 минут",
    img: `${CDN}/ru-hvac-production_2fc3fdd7.jpg`,
    href: "/blog/ventilyaciya-medicinskih-uchrezhdenij",
    excerpt: "Медицинские учреждения требуют особых решений вентиляции: поддержание чистоты воздуха, зонирование давления, соответствие СанПиН.",
  },
  {
    title: "Кондиционирование серверной комнаты",
    category: "Кондиционирование",
    readTime: "7 минут",
    img: `${CDN}/equip-electrical_a91c8ffb.jpg`,
    href: "/blog/kondicionirovanie-servernoj-komnaty",
    excerpt: "Серверные комнаты требуют прецизионного охлаждения с точным контролем температуры и влажности. Рассматриваем все варианты решений.",
  },
  {
    title: "Воздушное отопление производственного помещения (цеха)",
    category: "Отопление",
    readTime: "5 минут",
    img: `${CDN}/equip-heating_49ba3696.jpg`,
    href: "/blog/vozdushnoe-otoplenie-ceha",
    excerpt: "Воздушное отопление — наиболее эффективный способ обогрева производственных помещений большого объёма. Разбираем схемы и оборудование.",
  },
  {
    title: "Вентиляция автостоянки (парковки, паркинга)",
    category: "Вентиляция",
    readTime: "5 минут",
    img: `${CDN}/ru-industrial-ventilation_4939c0aa.jpg`,
    href: "/blog/ventilyaciya-avtostoyankи",
    excerpt: "Вентиляция паркинга — обязательное требование пожарной безопасности. Рассматриваем нормативы, схемы и оборудование для подземных и надземных стоянок.",
  },
  {
    title: "Диспетчеризация систем вентиляции и кондиционирования",
    category: "Автоматизация",
    readTime: "8 минут",
    img: `${CDN}/equip-electrical_a91c8ffb.jpg`,
    href: "/blog/dispetcherizaciya-sistem",
    excerpt: "Диспетчеризация позволяет управлять всеми инженерными системами здания из единого центра, снижая затраты на обслуживание и повышая надёжность.",
  },
  {
    title: "Кратность и расчёт воздухообмена",
    category: "Вентиляция",
    readTime: "6 минут",
    img: `${CDN}/ru-industrial-ventilation_4939c0aa.jpg`,
    href: "/blog/kratnost-i-raschet-vozduhoobmena",
    excerpt: "Кратность воздухообмена — ключевой параметр при проектировании вентиляции. Рассказываем, как правильно рассчитать воздухообмен для различных типов помещений.",
  },
  {
    title: "Вентиляционное оборудование: виды и характеристики",
    category: "Вентиляция",
    readTime: "8 минут",
    img: `${CDN}/equip-ventilation_25987b56.jpg`,
    href: "/blog/ventilyacionnoe-oborudovanie",
    excerpt: "Обзор основных видов вентиляционного оборудования: приточные установки, вентиляторы, воздуховоды, фильтры и автоматика управления.",
  },
  {
    title: "Рекуператор: принцип работы и виды",
    category: "Вентиляция",
    readTime: "6 минут",
    img: `${CDN}/equip-ventilation_25987b56.jpg`,
    href: "/blog/rekuperator",
    excerpt: "Рекуператор позволяет экономить до 80% тепловой энергии при вентиляции. Разбираем принцип работы, виды и критерии выбора.",
  },
  {
    title: "Кондиционирование воздуха: системы и оборудование",
    category: "Кондиционирование",
    readTime: "7 минут",
    img: `${CDN}/equip-ac_decafa77.webp`,
    href: "/blog/kondicionirovanie-vozduha",
    excerpt: "Полный обзор систем кондиционирования воздуха: от бытовых сплит-систем до промышленных чиллеров и VRF-систем.",
  },
  {
    title: "Фильтры для вытяжек: виды и замена",
    category: "Вентиляция",
    readTime: "4 минуты",
    img: `${CDN}/equip-ventilation_25987b56.jpg`,
    href: "/blog/filtry-dlya-vytyazhek",
    excerpt: "Правильный выбор и своевременная замена фильтров — залог эффективной работы вентиляционной системы.",
  },
  {
    title: "Канальные вентиляторы: выбор и монтаж",
    category: "Вентиляция",
    readTime: "5 минут",
    img: `${CDN}/equip-ventilation_25987b56.jpg`,
    href: "/blog/kanalnye-ventilyatory",
    excerpt: "Канальные вентиляторы — основа приточно-вытяжных систем. Рассматриваем виды, характеристики и правила монтажа.",
  },
];

const categoryColors: Record<string, string> = {
  "Вентиляция": "bg-[#2D3092]/10 text-[#2D3092]",
  "Кондиционирование": "bg-[#B91C1C]/10 text-[#B91C1C]",
  "Отопление": "bg-orange-100 text-orange-700",
  "Автоматизация": "bg-purple-100 text-purple-700",
  "Обслуживание": "bg-green-100 text-green-700",
};

export default function BlogPage() {

  useSEO({
    title: "Блог — статьи об инженерных системах",
    description: "Полезные статьи о вентиляции, кондиционировании, дымоудалении и отоплении. Советы по выбору оборудования, нормы проектирования, разбор реальных объектов.",
    keywords: "блог вентиляция, статьи кондиционирование, инженерные системы статьи, нормы вентиляции, проектирование вентиляции",
    canonical: "/blog",
    breadcrumbs: [{ name: "Блог", url: "/blog" }],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Блог Freonn — статьи об инженерных системах",
      description: "Полезные статьи о вентиляции, кондиционировании, дымоудалении и отоплении.",
      url: "https://freonn.ru/blog",
      publisher: {
        "@type": "Organization",
        name: "Freonn",
        url: "https://freonn.ru",
      },
    },
  });
  return (
    <PageLayout
      title="Блог — статьи об инженерных системах"
      breadcrumb={[{ label: "Блог" }]}
    >
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <motion.a
                key={article.href}
                href={article.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group block bg-white border border-gray-100 hover:border-[#2D3092]/30 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-body font-medium ${categoryColors[article.category] || "bg-gray-100 text-gray-600"}`}>
                      {article.category}
                    </span>

                  </div>
                  <h2 className="font-heading font-semibold text-[#0F1340] text-sm leading-snug mb-2 group-hover:text-[#2D3092] transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-500 text-xs font-body leading-relaxed line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[#B91C1C] text-xs font-heading font-semibold uppercase tracking-wide group-hover:gap-2 transition-all">
                    Читать <ArrowRight size={12} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
