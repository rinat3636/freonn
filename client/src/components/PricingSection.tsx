/*
 * FREONN PRICING — Bold Technical Expressionism
 * Light blue-tinted background, horizontal card row
 * Featured card: dark navy gradient
 */
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    title: "Разработка проекта",
    price: "от 200 000 ₽",
    features: [
      "Анализ особенностей объекта",
      "Формирование технического задания",
      "Проектирование инженерных систем",
      "Вся необходимая документация",
    ],
    featured: false,
  },
  {
    title: "Подбор и поставка оборудования",
    price: "от 2 000 000 ₽",
    features: [
      "Выбор оптимального оборудования",
      "Скидка до 20% от производителей",
      "Логистика и доставка до объекта",
      "Гарантия на оборудование до 5 лет",
    ],
    featured: false,
  },
  {
    title: "Монтажные работы",
    price: "от 2 000 000 ₽",
    features: [
      "Монтаж согласно проекту",
      "Пусконаладочные работы",
      "Тестирование системы",
      "Соблюдение норм безопасности",
    ],
    featured: false,
  },
  {
    title: "Комплексная реализация",
    price: "от 5 000 000 ₽",
    features: [
      "Реализация проекта «под ключ»",
      "Все этапы: проект → монтаж → пуск",
      "Обучение персонала",
      "Полная техническая документация",
    ],
    featured: true,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-[#F0F2FF]">
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
              Ценовая политика
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340] mb-3">
            Прозрачные цены на все услуги
          </h2>
          <p className="text-gray-500 font-body max-w-2xl">
            Фокусируемся на сотрудничестве с юридическими лицами и реализации крупных проектов. Тщательно прорабатываем каждую деталь.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`pricing-card p-6 flex flex-col ${plan.featured ? "featured" : "bg-white"}`}
            >
              <div className="mb-4">
                <h3 className={`font-heading font-semibold text-lg mb-3 ${plan.featured ? "text-white" : "text-[#0F1340]"}`}>
                  {plan.title}
                </h3>
                <div className={`font-display text-2xl ${plan.featured ? "text-[#ED1C24]" : "text-[#2D3092]"}`}>
                  {plan.price}
                </div>
              </div>
              <ul className="flex-1 space-y-2.5 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={14} className={`flex-shrink-0 mt-0.5 ${plan.featured ? "text-[#ED1C24]" : "text-[#2D3092]"}`} />
                    <span className={`text-sm font-body ${plan.featured ? "text-white/80" : "text-gray-600"}`}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contacts"
                className={`block text-center py-2.5 font-heading font-semibold uppercase text-sm tracking-wide transition-all ${
                  plan.featured
                    ? "bg-[#ED1C24] text-white hover:bg-red-700"
                    : "bg-[#2D3092] text-white hover:bg-[#0F1340]"
                }`}
              >
                Заказать
              </a>
            </motion.div>
          ))}
        </div>

        {/* Competitor offer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 bg-white border border-[#2D3092]/20 p-6 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-[#0F1340] text-xl mb-2">
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
