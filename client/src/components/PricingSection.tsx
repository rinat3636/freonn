/*
 * FREONN PRICING — Modern layout with ceds.ru-style pricing categories
 * Horizontal cards, not square grid
 * Brand: Freonn — dark navy #0F1340, red accent #ED1C24
 */
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    title: "Только проектирование",
    subtitle: "Разработка проекта",
    price: "от 200 000 ₽",
    features: [
      "Анализ особенностей объекта",
      "Формирование технического задания",
      "Проектирование инженерных систем",
      "Вся необходимая документация",
      "Согласование с надзорными органами",
    ],
    featured: false,
    cta: "Заказать проект",
  },
  {
    title: "Подбор и поставка",
    subtitle: "Только оборудование",
    price: "от 2 000 000 ₽",
    features: [
      "Выбор оптимального оборудования",
      "Скидка до 20% от производителей",
      "Логистика и доставка до объекта",
      "Гарантия на оборудование до 5 лет",
      "Консультация по эксплуатации",
    ],
    featured: false,
    cta: "Получить КП",
  },
  {
    title: "Монтажные работы",
    subtitle: "По вашему проекту",
    price: "от 2 000 000 ₽",
    features: [
      "Монтаж согласно проекту заказчика",
      "Пусконаладочные работы",
      "Тестирование и балансировка систем",
      "Соблюдение норм безопасности",
      "Гарантия на монтажные работы 1 год",
    ],
    featured: false,
    cta: "Обсудить монтаж",
  },
  {
    title: "Комплексная реализация",
    subtitle: "Проект «Под ключ»",
    price: "от 5 000 000 ₽",
    features: [
      "Все этапы: проект → поставка → монтаж",
      "Пусконаладочные работы",
      "Обучение персонала заказчика",
      "Полная техническая документация",
      "Сервисное обслуживание после сдачи",
    ],
    featured: true,
    cta: "Обсудить проект",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-[#F7F8FF]">
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
              Цены на услуги
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340] mb-2">
                Прозрачные цены на все услуги
              </h2>
              <p className="text-gray-500 font-body text-sm max-w-2xl">
                Для вашего удобства прайс-лист разбит по категориям. Сотрудничаем в удобном для вас формате.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-1 rounded-2xl ${
                plan.featured
                  ? "bg-[#0F1340] text-white shadow-2xl"
                  : "bg-white border border-gray-200 hover:border-[#2D3092]/40 hover:shadow-lg"
              }`}
            >
              {plan.featured && (
                <div className="bg-[#ED1C24] text-white text-xs font-heading font-semibold uppercase tracking-wider text-center py-1.5 px-4">
                  Рекомендуем
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-5">
                  <p className={`text-xs font-body uppercase tracking-wider mb-1 ${plan.featured ? "text-white/50" : "text-gray-400"}`}>
                    {plan.subtitle}
                  </p>
                  <h3 className={`font-heading font-bold text-lg mb-3 leading-tight ${plan.featured ? "text-white" : "text-[#0F1340]"}`}>
                    {plan.title}
                  </h3>
                  <div className={`font-display text-2xl font-bold ${plan.featured ? "text-[#ED1C24]" : "text-[#2D3092]"}`}>
                    {plan.price}
                  </div>
                </div>

                <ul className="flex-1 space-y-2.5 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        className={`flex-shrink-0 mt-0.5 ${plan.featured ? "text-[#ED1C24]" : "text-[#2D3092]"}`}
                      />
                      <span className={`text-sm font-body leading-snug ${plan.featured ? "text-white/80" : "text-gray-600"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacts"
                  className={`flex items-center justify-center gap-2 py-3 font-heading font-semibold uppercase text-sm tracking-wide transition-all rounded-full ${
                    plan.featured
                      ? "bg-[#ED1C24] text-white hover:bg-red-700"
                      : "bg-[#0F1340] text-white hover:bg-[#2D3092]"
                  }`}
                >
                  {plan.cta} <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Competitor offer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-white border-l-4 border-[#2D3092] p-6 flex flex-col md:flex-row items-center gap-6 rounded-2xl"
        >
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-[#0F1340] text-lg mb-1">
              У вас уже есть предложение от другого исполнителя?
            </h3>
            <p className="text-gray-500 font-body text-sm">
              Отправьте его нам для пересчёта. Предложим вариант, который может оказаться не только выгоднее по цене, но и лучше соответствовать вашим потребностям.
            </p>
          </div>
          <a href="#contacts" className="btn-primary flex-shrink-0">
            Отправить на пересчёт
          </a>
        </motion.div>
      </div>
    </section>
  );
}
