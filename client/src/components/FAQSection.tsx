/*
 * FREONN FAQ SECTION — All questions from ceds.ru
 * Accordion layout, own Freonn design
 * Brand: Freonn — dark navy #0F1340, red accent #ED1C24
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Вы занимаетесь вентиляцией?",
    a: "Конечно, это наш профиль! Мы занимаемся установкой всех внутренних инженерных систем, но специализируемся на проектировании и монтаже вентиляции, кондиционирования и дымоудаления.",
  },
  {
    q: "Мой объект меньше 100 м², могу ли я к вам обратиться?",
    a: "К сожалению, мы берём в работу объекты от 500 м² и больше. Это позволяет нам сохранять высокое качество и применять специализированное промышленное оборудование.",
  },
  {
    q: "На моём объекте установка не доведена до конца, вы могли бы доделать?",
    a: "К сожалению, нет. Взявшись за эту работу, мы будем нести ответственность не только за то, что сделали мы, но и за то, что сделали до нас. Это создаёт риски для качества и безопасности.",
  },
  {
    q: "Могу ли я не устанавливать кондиционеры, если буду использовать вентиляционную систему?",
    a: "Безусловно, вы можете. Но вентиляционная система предназначена для подачи свежего воздуха, а кондиционер — для охлаждения. Это не взаимозаменяемые установки, они выполняют разные функции.",
  },
  {
    q: "Можете ли вы выехать на осмотр объекта?",
    a: "Конечно! И сделаем это абсолютно бесплатно. Наш инженер приедет, оценит объём работ и подготовит коммерческое предложение.",
  },
  {
    q: "Через сколько вы приступаете к работе после заключения договора?",
    a: "Мы приступаем к работе в течение недели после заключения договора. Точные сроки начала и завершения работ фиксируются в договоре.",
  },
  {
    q: "Вы работаете только по Москве?",
    a: "Мы работаем по всей России, но бесплатный выезд инженера распространяется только на московские объекты. Для регионов возможен выезд за дополнительную плату или онлайн-консультация.",
  },
  {
    q: "Есть ли хорошее и недорогое?",
    a: "Мы не завысим цену на конечную стоимость проекта — наша задача создать прочные длительные отношения. Тот вариант, который мы предложим, будет оптимальным по цене и функционалу.",
  },
  {
    q: "Какие у вас есть гарантии?",
    a: "На все произведённые монтажные работы мы предоставляем 1 год гарантии по договору. Производитель предоставляет гарантию на оборудование от 3 до 5 лет.",
  },
  {
    q: "Есть ли у вас лицензии?",
    a: "Да: лицензия МЧС, допуск СРО и СРО монтаж, и сертификат ISO. Все документы можно запросить при заключении договора.",
  },
  {
    q: "Что нужно для работы вентиляции?",
    a: "Для работы системы вентиляции нужны: система воздуховодов, воздухораспределительные устройства, приточные и вытяжные установки. Точный состав оборудования определяется при проектировании.",
  },
  {
    q: "Какие типы помещений вы берёте в работу?",
    a: "Производства, цеха, склады, магазины и ТЦ, кафе, рестораны, офисы, салоны красоты, квартиры от 500 м², загородные дома, отели, клиники, школы, детские сады, серверные и дата-центры.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-[#F7F8FF]">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 lg:sticky lg:top-24 self-start col-span-full lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-0.5 w-10 bg-[#ED1C24]" />
              <span className="text-[#ED1C24] font-heading font-semibold uppercase text-sm tracking-widest">
                FAQ
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340] mb-5 leading-tight">
              Вопросы и ответы
            </h2>
            <p className="text-gray-500 font-body text-sm leading-relaxed mb-8">
              Собрали ответы на самые частые вопросы наших клиентов. Если не нашли нужного — напишите нам.
            </p>
            <a
              href="#contacts"
              className="inline-flex items-center gap-2 bg-[#ED1C24] text-white font-heading font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#c91219] transition-colors"
            >
              Задать вопрос
            </a>
          </motion.div>

          {/* Right: accordion */}
          <div className="col-span-full lg:col-span-3 space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left group"
                >
                  <span
                    className={`font-heading font-semibold text-sm leading-snug transition-colors ${
                      openIndex === i ? "text-[#ED1C24]" : "text-[#0F1340] group-hover:text-[#2D3092]"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center transition-colors ${
                      openIndex === i ? "bg-[#ED1C24] text-white" : "bg-gray-100 text-gray-500 group-hover:bg-[#2D3092]/10 group-hover:text-[#2D3092]"
                    }`}
                  >
                    {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-gray-600 text-sm font-body leading-relaxed border-t border-gray-100 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
