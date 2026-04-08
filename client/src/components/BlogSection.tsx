/*
 * FREONN BLOG — Modern layout with real ceds.ru article topics
 * Clean article list with reading time
 * Brand: Freonn — dark navy #0F1340, red accent #ED1C24
 */
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW";

const articles = [
  {
    title: "Профессиональный монтаж тепловых пунктов (ИТП) в Москве",
    category: "Отопление",
    readTime: "5 минут",
    img: `${CDN}/equip-heating_49ba3696.jpg`,
    excerpt: "Монтаж ИТП под ключ — это комплекс работ, выполняемый силами специализированной сертифицированной организации.",
  },
  {
    title: "Автоматизация инженерных систем",
    category: "Автоматизация",
    readTime: "7 минут",
    img: `${CDN}/equip-electrical_a91c8ffb.jpg`,
    excerpt: "Автоматизация и диспетчеризация инженерных систем — это методы управления и мониторинга различными техническими системами в помещениях.",
  },
  {
    title: "Технический аудит инженерных систем",
    category: "Обслуживание",
    readTime: "5 минут",
    img: `${CDN}/ru-hvac-production_2fc3fdd7.jpg`,
    excerpt: "Аудит инженерных систем зданий и сооружений помогает определить их фактическое состояние, причины возникающих проблем и оценить эффективность.",
  },
  {
    title: "Монтаж вентиляции — этапы работы, нормативы и требования СНиП",
    category: "Вентиляция",
    readTime: "5 минут",
    img: `${CDN}/ru-industrial-ventilation_4939c0aa.jpg`,
    excerpt: "Монтаж системы вентиляции требует знания норм и требований, а также учёта специфики объекта — рассказываем подробно о всех нюансах.",
  },
  {
    title: "ККБ для приточной установки",
    category: "Кондиционирование",
    readTime: "7 минут",
    img: `${CDN}/equip-ac_decafa77.webp`,
    excerpt: "ККБ для приточной установки — это часть воздухораспределительной системы. Играет важную роль в обеспечении чистого и комфортного воздухообмена в зданиях.",
  },
  {
    title: "Вентиляция в школе — вытяжная, приточная, приточно-вытяжная",
    category: "Вентиляция",
    readTime: "9 минут",
    img: `${CDN}/equip-ventilation_25987b56.jpg`,
    excerpt: "Вентиляция в школе — система, предназначенная для обеспечения циркуляции свежего воздуха внутри учебных классов и удаления загрязнённого воздуха.",
  },
];

const categoryColors: Record<string, string> = {
  "Вентиляция": "bg-[#2D3092]/10 text-[#2D3092]",
  "Кондиционирование": "bg-[#ED1C24]/10 text-[#ED1C24]",
  "Отопление": "bg-orange-100 text-orange-700",
  "Автоматизация": "bg-purple-100 text-purple-700",
  "Обслуживание": "bg-green-100 text-green-700",
};

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-white">
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
              Блог
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340]">
              Новое в нашем блоге
            </h2>
            <a href="#" className="inline-flex items-center gap-2 text-[#2D3092] font-heading font-semibold hover:text-[#ED1C24] transition-colors text-sm uppercase tracking-wide">
              Все статьи <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        {/* Featured article (first) + grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured — spans 2 columns */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 group cursor-pointer"
          >
            <div className="overflow-hidden aspect-[16/8] mb-4 relative rounded-2xl">
              <img
                src={articles[0].img}
                alt={articles[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1340]/50 to-transparent" />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-heading font-semibold uppercase px-2.5 py-1 tracking-wide rounded-full ${categoryColors[articles[0].category] || "bg-gray-100 text-gray-600"}`}>
                {articles[0].category}
              </span>
              <span className="flex items-center gap-1 text-gray-400 text-xs font-body">
                <Clock size={11} /> {articles[0].readTime}
              </span>
            </div>
            <h3 className="font-heading font-bold text-[#0F1340] text-xl mb-2 group-hover:text-[#2D3092] transition-colors leading-snug">
              {articles[0].title}
            </h3>
            <p className="text-gray-500 text-sm font-body leading-relaxed mb-3">{articles[0].excerpt}</p>
            <span className="inline-flex items-center gap-1 text-[#ED1C24] text-sm font-heading font-semibold group-hover:gap-2 transition-all">
              Читать далее <ArrowRight size={14} />
            </span>
          </motion.article>

          {/* Right column — stacked articles */}
          <div className="space-y-6">
            {articles.slice(1, 4).map((article, i) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer flex gap-4 border-b border-gray-100 pb-5 last:border-0"
              >
                <div className="w-20 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-xs font-heading font-semibold uppercase px-2 py-0.5 tracking-wide rounded-full ${categoryColors[article.category] || "bg-gray-100 text-gray-600"}`}>
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400 text-xs font-body">
                      <Clock size={10} /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-[#0F1340] text-sm leading-snug group-hover:text-[#2D3092] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Bottom row — remaining articles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
          {articles.slice(3).map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden aspect-[16/9] mb-3 rounded-xl">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-heading font-semibold uppercase px-2.5 py-1 tracking-wide rounded-full ${categoryColors[article.category] || "bg-gray-100 text-gray-600"}`}>
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-gray-400 text-xs font-body">
                  <Clock size={11} /> {article.readTime}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-[#0F1340] text-sm mb-2 group-hover:text-[#2D3092] transition-colors leading-snug">
                {article.title}
              </h3>
              <span className="text-[#ED1C24] text-xs font-heading font-semibold group-hover:underline">
                Читать далее →
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
