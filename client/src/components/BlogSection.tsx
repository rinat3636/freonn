/*
 * FREONN BLOG — Bold Technical Expressionism
 * White section with article cards
 */
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const articles = [
  {
    title: "Как правильно выбрать систему вентиляции для производственного цеха",
    category: "Вентиляция",
    date: "15 марта 2025",
    // Russian production facility with HVAC ventilation ducts
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/ru-hvac-production_2fc3fdd7.jpg",
    excerpt: "Разбираем ключевые параметры при выборе вентиляционной системы для промышленных объектов.",
  },
  {
    title: "VRF системы vs традиционное кондиционирование: что выбрать для офиса",
    category: "Кондиционирование",
    date: "28 февраля 2025",
    // Moscow modern office interior with air conditioning
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/ru-office-modern_634b4f4c.jpg",
    excerpt: "Сравниваем два подхода к климат-контролю офисных помещений по стоимости и эффективности.",
  },
  {
    title: "Система дымоудаления: требования нормативов и практика монтажа",
    category: "Дымоудаление",
    date: "10 февраля 2025",
    // Russian ventilation ducts ceiling installation
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/ru-industrial-ventilation_4939c0aa.jpg",
    excerpt: "Обзор актуальных требований к системам дымоудаления и типичные ошибки при проектировании.",
  },
];

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
          <div className="flex items-end justify-between">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340]">
              Полезные статьи
            </h2>
            <a href="#" className="hidden md:flex items-center gap-2 text-[#2D3092] font-heading font-semibold hover:text-[#ED1C24] transition-colors text-sm uppercase tracking-wide">
              Все статьи <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden aspect-[16/9] mb-4">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[#F0F2FF] text-[#2D3092] text-xs font-heading font-semibold uppercase px-2.5 py-1 tracking-wide">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-gray-400 text-xs font-body">
                  <Calendar size={11} /> {article.date}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-[#0F1340] text-base mb-2 group-hover:text-[#2D3092] transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm font-body leading-relaxed mb-3">{article.excerpt}</p>
              <span className="text-[#ED1C24] text-sm font-heading font-semibold group-hover:underline">
                Читать далее →
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
