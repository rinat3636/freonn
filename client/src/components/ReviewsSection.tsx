/*
 * FREONN REVIEWS — Bold Technical Expressionism
 * Client testimonials + cooperation formats
 */
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Игорь Корнеев",
    role: "Управляющий бизнес-центром",
    text: "Установили 13 фанкойлов и подключили к чиллеру. Все работы выполнены согласно проекту. Ценю, что команда разбиралась в деталях системы и самостоятельно решала технические вопросы.",
    rating: 5,
  },
  {
    name: "Геннадий Романенко",
    role: "Директор складского комплекса",
    text: "Обратились для создания систем отопления и вентиляции на складе. Работой очень довольны: понимание задач, соблюдение сроков и высокое качество исполнения.",
    rating: 5,
  },
  {
    name: "Максим Карпов",
    role: "Застройщик коммерческой недвижимости",
    text: "Сотрудничали по проекту коммерческой недвижимости площадью около 2000 кв.м. Разработали и установили системы отопления и кондиционирования. Результатом очень довольны.",
    rating: 5,
  },
  {
    name: "Алексей Мотин",
    role: "Владелец производства",
    text: "Обратились для установки приточно-вытяжной вентиляции в покрасочной мастерской. Система функционирует идеально. Команда была очень внимательна к деталям, сроки и качество на высшем уровне.",
    rating: 5,
  },
];

const cooperationFormats = [
  "Реализация проекта «Под ключ»",
  "Монтажные работы по вашему проекту",
  "Только проектирование систем",
  "Только подбор и закупка оборудования",
  "Консультация по системам",
  "На иных условиях — всё обсуждаемо",
];

export default function ReviewsSection() {
  return (
    <>
      {/* Cooperation formats */}
      <section className="py-20 bg-[#0F1340] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-10 bg-[#ED1C24]" />
                <span className="text-[#ED1C24] font-heading font-semibold uppercase text-sm tracking-widest">
                  Форматы работы
                </span>
              </div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-4 leading-tight">
                Сотрудничаем в удобном для вас формате
              </h2>
              <p className="text-white/70 font-body leading-relaxed mb-8">
                Наши клиенты видят реальное сокращение затрат и улучшение работы своих предприятий. Делаем ваш бизнес более экономичным и приятным для каждого сотрудника.
              </p>
              <a href="#contacts" className="btn-primary inline-flex items-center gap-2">
                Связаться по проекту
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 gap-3"
            >
              {cooperationFormats.map((format, i) => (
                <div
                  key={format}
                  className="flex items-center gap-4 bg-white/10 border border-white/20 p-4 hover:border-[#ED1C24]/60 hover:bg-white/15 transition-all"
                >
                  <div className="w-8 h-8 bg-[#ED1C24] flex items-center justify-center flex-shrink-0 font-heading font-bold text-white text-sm">
                    {i + 1}
                  </div>
                  <span className="font-body text-white/90">{format}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-[#F0F2FF]">
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
                Отзывы
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340]">
              Отзывы клиентов о нас
            </h2>
          </motion.div>

          {/* AggregateRating schema.org для Яндекса */}
          <div itemScope itemType="https://schema.org/LocalBusiness" className="hidden">
            <span itemProp="name">Freonn</span>
            <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
              <meta itemProp="ratingValue" content="5.0" />
              <meta itemProp="reviewCount" content="4" />
              <meta itemProp="bestRating" content="5" />
              <meta itemProp="worstRating" content="1" />
            </div>
          </div>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            itemScope
            itemType="https://schema.org/LocalBusiness"
          >
            <meta itemProp="name" content="Freonn" />
            <meta itemProp="telephone" content="+78001012009" />
            <meta itemProp="url" content="https://freonn.ru" />
            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#2D3092]"
                itemProp="review"
                itemScope
                itemType="https://schema.org/Review"
              >
                <Quote size={24} className="text-[#2D3092]/20 mb-3" />
                <p
                  className="text-gray-600 text-sm font-body leading-relaxed mb-4 italic"
                  itemProp="reviewBody"
                >
                  "{review.text}"
                </p>
                <div
                  className="flex gap-0.5 mb-3"
                  itemProp="reviewRating"
                  itemScope
                  itemType="https://schema.org/Rating"
                >
                  <meta itemProp="ratingValue" content={String(review.rating)} />
                  <meta itemProp="bestRating" content="5" />
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-[#ED1C24] fill-[#ED1C24]" />
                  ))}
                </div>
                <div itemProp="author" itemScope itemType="https://schema.org/Person">
                  <div className="font-heading font-semibold text-[#0F1340] text-sm" itemProp="name">{review.name}</div>
                  <div className="text-gray-400 text-xs font-body">{review.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
