/*
 * FREONN PROMOTIONS PAGE — /akcii
 */
import { useSEO } from "@/hooks/useSEO";
import PageLayout from "@/components/PageLayout";
import ContactSection from "@/components/ContactSection";
import { motion } from "framer-motion";
import { ymGoal } from "@/lib/ym";
import { Tag, Clock, ArrowRight, CheckCircle } from "lucide-react";

const promotions = [
  {
    badge: "Горячее предложение",
    badgeColor: "#B91C1C",
    title: "Бесплатный выезд инженера",
    subtitle: "При заключении договора",
    desc: "Закажите обследование объекта и расчёт стоимости инженерных систем — выезд инженера бесплатно при последующем заключении договора на монтаж.",
    conditions: [
      "Объект от 500 м²",
      "Москва и Московская область",
      "При заключении договора в течение 14 дней",
    ],
    expires: "Бессрочно",
    cta: "Вызвать инженера",
  },
  {
    badge: "Скидка",
    badgeColor: "#2D3092",
    title: "Скидка 10% на монтаж вентиляции",
    subtitle: "При заказе до 31 мая 2025",
    desc: "Закажите монтаж системы вентиляции до конца мая и получите скидку 10% на стоимость монтажных работ. Акция распространяется на промышленные и коммерческие объекты.",
    conditions: [
      "Площадь объекта от 1000 м²",
      "Договор подписан до 31.05.2025",
      "Скидка на монтажные работы (не на оборудование)",
    ],
    expires: "до 31 мая 2025",
    cta: "Получить скидку",
  },
  {
    badge: "Комплект",
    badgeColor: "#2D3092",
    title: "Вентиляция + кондиционирование под ключ",
    subtitle: "Экономия до 15% при комплексном заказе",
    desc: "Закажите монтаж вентиляции и кондиционирования одновременно и сэкономьте до 15% на стоимости работ. Один договор, одна бригада, минимальные сроки.",
    conditions: [
      "Одновременный монтаж двух систем",
      "Площадь объекта от 500 м²",
      "Один объект",
    ],
    expires: "Бессрочно",
    cta: "Рассчитать стоимость",
  },
  {
    badge: "Сервис",
    badgeColor: "#16a34a",
    title: "Техническое обслуживание в подарок",
    subtitle: "При монтаже от 500 000 ₽",
    desc: "При заказе монтажа инженерных систем на сумму от 500 000 рублей — первое техническое обслуживание в подарок. Включает чистку, диагностику и регулировку оборудования.",
    conditions: [
      "Сумма договора от 500 000 ₽",
      "ТО в течение 6 месяцев после сдачи объекта",
      "Одно ТО на один объект",
    ],
    expires: "Бессрочно",
    cta: "Узнать подробнее",
  },
  {
    badge: "Рассрочка",
    badgeColor: "#7c3aed",
    title: "Рассрочка 0% на 3 месяца",
    subtitle: "Для юридических лиц",
    desc: "Предлагаем рассрочку платежа на 3 месяца без процентов для юридических лиц. Начните монтаж сейчас — оплачивайте по удобному графику.",
    conditions: [
      "Только для юридических лиц",
      "Сумма договора от 300 000 ₽",
      "Первый платёж — 50% при подписании договора",
    ],
    expires: "Бессрочно",
    cta: "Оформить рассрочку",
  },
  {
    badge: "Партнёрам",
    badgeColor: "#0F1340",
    title: "Скидка 5% для постоянных клиентов",
    subtitle: "Со второго заказа",
    desc: "Наши постоянные клиенты получают скидку 5% на все последующие заказы. Скидка суммируется с другими акциями.",
    conditions: [
      "Со второго заказа",
      "Скидка на монтажные работы",
      "Суммируется с другими акциями",
    ],
    expires: "Бессрочно",
    cta: "Стать клиентом",
  },
];

export default function PromotionsPage() {

  useSEO({
    title: "Акции и скидки — монтаж инженерных систем",
    description: "Актуальные акции и специальные предложения от Freonn: скидки на монтаж вентиляции, бесплатный выезд инженера, рассрочка на оборудование.",
    keywords: "акции монтаж вентиляции, скидки кондиционирование, спецпредложения инженерные системы",
    canonical: "/akcii",
    breadcrumbs: [{ name: "Акции и спецпредложения", url: "/akcii" }],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://freonn.ru/akcii#webpage",
      name: "Акции и скидки — монтаж инженерных систем",
      description: "Актуальные акции и специальные предложения от Freonn.",
      url: "https://freonn.ru/akcii",
      isPartOf: { "@id": "https://freonn.ru/#website" },
      publisher: { "@id": "https://freonn.ru/#organization" },
    },
  });
  return (
    <PageLayout
      title="Акции и спецпредложения"
      breadcrumb={[{ label: "Акции" }]}
    >
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white border border-gray-100 hover:shadow-lg transition-all rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs px-3 py-1 rounded-full font-body font-semibold text-white"
                      style={{ backgroundColor: promo.badgeColor }}
                    >
                      {promo.badge}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400 text-xs font-body">
                      <Clock size={11} /> {promo.expires}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-[#0F1340] text-base mb-1">{promo.title}</h3>
                  <p className="text-[#B91C1C] font-heading font-semibold text-sm mb-3">{promo.subtitle}</p>
                  <p className="text-gray-500 font-body text-sm leading-relaxed mb-4">{promo.desc}</p>
                  <div className="space-y-1.5">
                    {promo.conditions.map((cond, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle size={13} className="mt-0.5 flex-shrink-0" style={{ color: promo.badgeColor }} />
                        <span className="text-gray-600 font-body text-xs">{cond}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <a
                    href="/contacts"
                    onClick={() => ymGoal("promo_cta_click", { promo: promo.title })}
                    className="w-full btn-dark inline-flex items-center justify-center gap-2 text-sm"
                  >
                    {promo.cta} <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 bg-[#F7F8FF] rounded-2xl p-6 text-center">
            <Tag size={28} className="text-[#2D3092] mx-auto mb-3" />
            <h3 className="font-heading font-bold text-[#0F1340] text-lg mb-2">Нужна индивидуальная скидка?</h3>
            <p className="text-gray-500 font-body text-sm mb-4">
              Для крупных объектов и постоянных клиентов мы готовы рассмотреть индивидуальные условия. Свяжитесь с нами.
            </p>
            <a href="/contacts" onClick={() => ymGoal("promo_discuss_click")} className="btn-dark inline-flex items-center gap-2">
              Обсудить условия <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
      <ContactSection />
    </PageLayout>
  );
}
