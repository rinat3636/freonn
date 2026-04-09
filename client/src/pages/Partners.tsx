/*
 * FREONN PARTNERS PAGE — /partnery
 */
import { useSEO } from "@/hooks/useSEO";
import PageLayout from "@/components/PageLayout";
import ContactSection from "@/components/ContactSection";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Handshake } from "lucide-react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW";

const equipmentPartners = [
  { name: "Daikin", category: "Кондиционирование", desc: "Авторизованный дилер и монтажная организация. Кондиционеры, VRF/VRV системы, чиллеры." },
  { name: "Mitsubishi Electric", category: "Кондиционирование", desc: "Сплит-системы, мульти-сплит, VRF системы, вентиляционные установки." },
  { name: "Carrier", category: "Климат", desc: "Чиллеры, фанкойлы, центральные кондиционеры, системы автоматизации." },
  { name: "Systemair", category: "Вентиляция", desc: "Приточно-вытяжные установки, вентиляторы, воздуховоды, клапаны." },
  { name: "Zehnder", category: "Вентиляция", desc: "Рекуператоры, приточно-вытяжные установки с рекуперацией тепла." },
  { name: "Danfoss", category: "Автоматизация", desc: "Регуляторы, клапаны, приводы, системы автоматизации инженерных систем." },
  { name: "Belimo", category: "Автоматизация", desc: "Приводы для клапанов, регулирующие клапаны, датчики." },
  { name: "Grundfos", category: "Насосы", desc: "Циркуляционные насосы для систем отопления и водоснабжения." },
];

const constructionPartners = [
  { name: "ГК «Самолёт»", category: "Девелопер", desc: "Монтаж инженерных систем в жилых комплексах." },
  { name: "ПИК", category: "Девелопер", desc: "Вентиляция и кондиционирование в жилых и коммерческих объектах." },
  { name: "Группа ЛСР", category: "Девелопер", desc: "Инженерные системы для жилых комплексов Московского региона." },
  { name: "Arida Home", category: "Промышленность", desc: "Монтаж вентиляции и отопления на производстве аромадиффузоров." },
  { name: "ГК «Электронинвест»", category: "Промышленность", desc: "Вентиляция и кондиционирование в производственно-исследовательском корпусе." },
  { name: "Отель Доброград", category: "Гостиничный бизнес", desc: "Полный комплекс инженерных систем для гостиничного комплекса." },
];

const partnerBenefits = [
  "Приоритетное рассмотрение заявок",
  "Специальные цены на оборудование",
  "Персональный менеджер",
  "Совместные маркетинговые активности",
  "Обучение технических специалистов",
  "Совместное участие в тендерах",
];

export default function PartnersPage() {

  useSEO({
    title: "Партнёры — Freonn инженерная компания",
    description: "Официальные партнёры Freonn: производители оборудования, поставщики материалов, проектные организации. Сотрудничество и дилерские программы.",
    keywords: "партнёры инженерная компания, дилер вентиляция, поставщик кондиционеры Москва",
    canonical: "/partnery",
  });
  return (
    <PageLayout
      title="Партнёры"
      breadcrumb={[{ label: "Партнёры" }]}
    >
      {/* Equipment partners */}
      <section className="py-14 bg-white">
        <div className="container">
          <h2 className="font-heading font-bold text-[#0F1340] text-2xl mb-2">Поставщики оборудования</h2>
          <p className="text-gray-500 font-body mb-8">Работаем только с проверенными производителями</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {equipmentPartners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-[#F7F8FF] rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-[#0F1340] rounded-xl flex items-center justify-center mb-3">
                  <span className="text-white font-heading font-black text-sm">{partner.name.charAt(0)}</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#2D3092]/10 text-[#2D3092] font-body font-medium mb-2 inline-block">
                  {partner.category}
                </span>
                <h3 className="font-heading font-bold text-[#0F1340] text-sm mb-1.5">{partner.name}</h3>
                <p className="text-gray-500 font-body text-xs leading-relaxed">{partner.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction partners */}
      <section className="py-14 bg-[#F7F8FF]">
        <div className="container">
          <h2 className="font-heading font-bold text-[#0F1340] text-2xl mb-2">Наши клиенты и партнёры</h2>
          <p className="text-gray-500 font-body mb-8">Компании, которые доверяют нам свои объекты</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {constructionPartners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#B91C1C]/10 text-[#B91C1C] font-body font-medium mb-3 inline-block">
                  {partner.category}
                </span>
                <h3 className="font-heading font-bold text-[#0F1340] text-base mb-1.5">{partner.name}</h3>
                <p className="text-gray-500 font-body text-sm">{partner.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a partner */}
      <section className="py-14 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Handshake size={20} className="text-[#B91C1C]" />
                <span className="text-[#B91C1C] font-heading font-semibold text-sm uppercase tracking-wider">
                  Стать партнёром
                </span>
              </div>
              <h2 className="font-heading font-bold text-[#0F1340] text-2xl mb-4">
                Предлагаем взаимовыгодное сотрудничество
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                Если вы — строительная компания, девелопер, управляющая компания или поставщик оборудования, мы готовы рассмотреть варианты партнёрства. Предлагаем гибкие условия и взаимовыгодное сотрудничество.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {partnerBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={15} className="mt-0.5 flex-shrink-0 text-[#2D3092]" />
                    <span className="text-gray-700 font-body text-sm">{b}</span>
                  </div>
                ))}
              </div>
              <a href="/contacts" className="btn-dark inline-flex items-center gap-2">
                Обсудить партнёрство <ArrowRight size={16} />
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={`${CDN}/freonn-industrial-hvac-CUToKRXqhd5NqVLbfLUTwL.webp`}
                alt="Партнёрство Freonn"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </PageLayout>
  );
}
