/*
 * FREONN PROCESS — Bold Technical Expressionism
 * Light blue section showing work stages
 */
import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Заявка и консультация", desc: "Принимаем заявку, выезжаем на объект или проводим онлайн-консультацию для оценки задачи." },
  { num: "02", title: "Техническое задание", desc: "Формируем ТЗ с учётом особенностей объекта, требований нормативов и бюджета заказчика." },
  { num: "03", title: "Проектирование", desc: "Разрабатываем проектную документацию, согласовываем с заказчиком и надзорными органами." },
  { num: "04", title: "Поставка оборудования", desc: "Закупаем оборудование напрямую у производителей со скидкой до 20% и доставляем на объект." },
  { num: "05", title: "Монтаж систем", desc: "Выполняем монтажные работы силами собственных бригад в строгом соответствии с проектом." },
  { num: "06", title: "Пусконаладка и сдача", desc: "Проводим пусконаладочные работы, тестирование, обучение персонала и сдаём объект." },
];

export default function ProcessSection() {
  return (
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
              Как мы работаем
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340]">
            Этапы реализации проекта
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white p-6 border-b-4 border-transparent hover:border-[#ED1C24] transition-all duration-300 group"
            >
              <div className="font-display text-5xl text-[#2D3092]/10 group-hover:text-[#ED1C24]/20 transition-colors mb-3 leading-none">
                {step.num}
              </div>
              <h3 className="font-heading font-semibold text-[#0F1340] text-lg mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm font-body leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
