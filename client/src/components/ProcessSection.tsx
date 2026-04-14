/*
 * FREONN PROCESS — Modern timeline layout
 * Horizontal timeline on desktop, vertical on mobile
 * Brand: Freonn — dark navy #0F1340, red accent #B91C1C
 */
import { motion } from "framer-motion";
import { ymGoal } from "@/lib/ym";

const steps = [
  { num: "01", title: "Заявка и консультация", desc: "Принимаем заявку, выезжаем на объект или проводим онлайн-консультацию для оценки задачи." },
  { num: "02", title: "Техническое задание", desc: "Формируем ТЗ с учётом особенностей объекта, требований нормативов и бюджета заказчика." },
  { num: "03", title: "Проектирование", desc: "Разрабатываем проектную документацию, согласовываем с заказчиком и надзорными органами." },
  { num: "04", title: "Поставка оборудования", desc: "Закупаем оборудование напрямую у производителей со скидкой до 20% и доставляем на объект." },
  { num: "05", title: "Монтаж систем", desc: "Выполняем монтажные работы силами собственных бригад в строгом соответствии с проектом." },
  { num: "06", title: "Пусконаладка и сдача", desc: "Проводим пусконаладочные работы, тестирование, обучение персонала и сдаём объект заказчику." },
];

export default function ProcessSection() {
  return (
    <section data-theme="light" className="py-20 bg-white overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-0.5 w-10 bg-[#B91C1C]" />
            <span className="text-[#B91C1C] font-heading font-semibold uppercase text-sm tracking-widest">
              Как мы работаем
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340]">
              Этапы реализации проекта
            </h2>
            <p className="text-gray-500 text-sm font-body max-w-sm">
              Берём на себя все этапы работы — от планирования до реализации
            </p>
          </div>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          {/* Connector line */}
          <div className="relative mb-0">
            <div className="absolute top-8 left-0 right-0 h-px bg-gray-200 z-0" />
            <div className="grid grid-cols-6 gap-0 relative z-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center px-3 group"
                >
                  {/* Circle */}
                  <div className="w-16 h-16 bg-white border-2 border-gray-200 group-hover:border-[#B91C1C] flex items-center justify-center mb-5 transition-colors duration-300 relative z-10 rounded-full">
                    <span className="font-display text-xl text-[#2D3092] group-hover:text-[#B91C1C] transition-colors font-bold">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-[#0F1340] text-sm mb-2 leading-snug group-hover:text-[#2D3092] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs font-body leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-5 pb-8 relative"
            >
              {/* Vertical line */}
              {i < steps.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200" />
              )}
              {/* Circle */}
              <div className="w-12 h-12 bg-white border-2 border-[#2D3092] flex items-center justify-center flex-shrink-0 relative z-10 rounded-full">
                <span className="font-display text-sm text-[#2D3092] font-bold">{step.num}</span>
              </div>
              <div className="pt-2">
                <h3 className="font-heading font-semibold text-[#0F1340] text-base mb-1">{step.title}</h3>
                <p className="text-gray-500 text-sm font-body leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-[#F7F8FF] border-l-4 border-[#B91C1C] p-6 flex flex-col md:flex-row items-center gap-6 rounded-2xl"
        >
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-[#0F1340] text-lg mb-1">
              Готовы обсудить ваш проект?
            </h3>
            <p className="text-gray-500 font-body text-sm">
              Организуем выезд инженера для оценки объекта и подготовки коммерческого предложения.
            </p>
          </div>
          <a href="/contacts" onClick={() => ymGoal("process_contact_click")} className="btn-dark flex-shrink-0">
            Вызвать инженера
          </a>
        </motion.div>
      </div>
    </section>
  );
}
