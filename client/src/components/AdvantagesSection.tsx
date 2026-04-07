/*
 * FREONN ADVANTAGES + CERTIFICATES — Bold Technical Expressionism
 * White section with key advantages and certificate badges
 */
import { motion } from "framer-motion";
import { Users, Wrench, Shield, Award, FileCheck, HardHat } from "lucide-react";

const advantages = [
  {
    icon: Users,
    title: "Собственный проектный отдел",
    desc: "Инженеры-проектировщики создают решения, точно соответствующие вашим нуждам. Тесная интеграция проектного и монтажного отделов гарантирует гибкость.",
  },
  {
    icon: HardHat,
    title: "25 монтажных бригад",
    desc: "Наша команда способна масштабировать работы до 25 монтажных бригад для выполнения проектов высокой сложности.",
  },
  {
    icon: Wrench,
    title: "Персональный ИТР",
    desc: "За успехом каждого проекта стоит персональный инженерно-технический работник, доступный на объекте 24/7.",
  },
  {
    icon: Shield,
    title: "Гарантия на работы",
    desc: "Предоставляем гарантию на все виды монтажных работ. Оборудование с гарантией производителя до 5 лет.",
  },
  {
    icon: Award,
    title: "Прямые договорённости",
    desc: "Прямые договорённости с производителями обеспечивают скидку до 20% на оборудование и комплектующие.",
  },
  {
    icon: FileCheck,
    title: "Все лицензии и допуски",
    desc: "Обладаем всеми лицензиями и сертификатами, включая лицензию МЧС, допуски СРО на монтаж и проектирование.",
  },
];

const certificates = [
  { title: "Лицензия МЧС", desc: "Разрешение на монтаж систем пожарной безопасности" },
  { title: "Допуск СРО монтаж", desc: "Допуск саморегулируемой организации на монтажные работы" },
  { title: "Допуск СРО проектирование", desc: "Допуск СРО на проектирование инженерных систем" },
  { title: "Сертификат ISO", desc: "Международный стандарт системы менеджмента качества" },
];

export default function AdvantagesSection() {
  return (
    <>
      {/* Advantages */}
      <section className="py-20 bg-white">
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
                Преимущества
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340]">
              Ключевые преимущества сотрудничества
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4 p-5 border border-gray-100 hover:border-[#2D3092]/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#F0F2FF] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2D3092] transition-colors">
                  <adv.icon size={22} className="text-[#2D3092] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[#0F1340] text-base mb-1.5">{adv.title}</h3>
                  <p className="text-gray-500 text-sm font-body leading-relaxed">{adv.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-16 bg-[#F0F2FF]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-0.5 w-10 bg-[#ED1C24]" />
              <span className="text-[#ED1C24] font-heading font-semibold uppercase text-sm tracking-widest">
                Документы
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl text-[#0F1340]">
              Наши сертификаты, лицензии и допуски СРО
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border-2 border-[#2D3092]/20 p-6 text-center hover:border-[#2D3092] transition-colors group"
              >
                <div className="w-16 h-16 bg-[#F0F2FF] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2D3092] transition-colors">
                  <FileCheck size={28} className="text-[#2D3092] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading font-semibold text-[#0F1340] text-base mb-2">{cert.title}</h3>
                <p className="text-gray-500 text-xs font-body">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
