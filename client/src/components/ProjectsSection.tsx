/*
 * FREONN PROJECTS — All 12 completed objects from ceds.ru
 * Grid with hover overlays, real project titles
 * Brand: Freonn — dark navy #0F1340, red accent #B91C1C
 */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ymGoal } from "@/lib/ym";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW";
const GEN_INDUSTRIAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-industrial-hvac-CUToKRXqhd5NqVLbfLUTwL.webp";
const GEN_COMMERCIAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-commercial-ac-25u7KoLKzpAUCxypUsYPv5.webp";

const projects = [
  {
    title: "Монтаж вентиляции и кондиционирования в БЦ «Aero City»",
    category: "Коммерция",
    desc: "Установка системы вентиляции и кондиционирования, подбор оборудования, проведение монтажных работ.",
    img: GEN_COMMERCIAL,
  },
  {
    title: "Монтаж инженерных систем в производственном цеху Arida Home",
    category: "Промышленность",
    desc: "Монтаж систем вентиляции для компании Арида Хоум на производстве аромадиффузоров.",
    img: GEN_INDUSTRIAL,
  },
  {
    title: "Монтаж инженерных систем в отеле Доброград",
    category: "Коммерция",
    desc: "Поставка и монтаж систем вентиляции, кондиционирования и дымоудаления.",
    img: `${CDN}/proj-ductwork_f5dd8a8d.jpg`,
  },
  {
    title: "Кондиционирование на производстве Квант",
    category: "Промышленность",
    desc: "Проектирование кондиционирования, монтаж вентиляции, установка систем кондиционирования, пусконаладочные работы.",
    img: `${CDN}/proj-industrial-vent_1f44b222.jpg`,
  },
  {
    title: "Установка системы вентиляции в школе танцев «Lotos»",
    category: "Коммерция",
    desc: "Монтаж приточно-вытяжной вентиляции, подбор оборудования, проведение пусконаладочных работ.",
    img: `${CDN}/equip-ventilation_25987b56.jpg`,
  },
  {
    title: "Монтаж вытяжной вентиляции для лаборатории в школе Magic Castle",
    category: "Образование",
    desc: "Проектирование и монтаж системы вытяжной вентиляции, пусконаладочные работы.",
    img: `${CDN}/ru-industrial-ventilation_4939c0aa.jpg`,
  },
  {
    title: "Монтаж инженерных систем в Московском училище олимпийского резерва №1",
    category: "Образование",
    desc: "Монтаж вентиляции, дымоудаления, установка VRF систем, пусконаладочные работы, поставка материала и оборудования.",
    img: `${CDN}/proj-ductwork_f5dd8a8d.jpg`,
  },
  {
    title: "Монтаж приточно-вытяжной вентиляции в цеху ООО «Ресна»",
    category: "Промышленность",
    desc: "Проектирование, поставка и монтаж приточно-вытяжных систем, установка циклона.",
    img: `${CDN}/ru-hvac-production_2fc3fdd7.jpg`,
  },
  {
    title: "Монтаж короба для системы кондиционирования в Третьяковской галерее",
    category: "Культура",
    desc: "Монтаж крышного короба для VRF-системы кондиционирования в историческом здании.",
    img: `${CDN}/proj-fancoil_49fccb2c.jpg`,
  },
  {
    title: "Вентиляция, кондиционирование и отопление для фитнес-центра Vysota",
    category: "Коммерция",
    desc: "Генеральное проектирование, поставка оборудования, монтаж вентиляции, кондиционирования, отопления, теплового пола, освещения.",
    img: GEN_COMMERCIAL,
  },
  {
    title: "Монтаж систем вентиляции и кондиционирования в корпусе ГК «Электронинвест»",
    category: "Промышленность",
    desc: "Проектирование и установка систем вентиляции и кондиционирования в производственно-исследовательском корпусе.",
    img: GEN_INDUSTRIAL,
  },
  {
    title: "Монтаж системы вентиляции на пиво-безалкогольном комбинате Очаково",
    category: "Промышленность",
    desc: "Установка системы вентиляции, противопожарных клапанов, проведение пусконаладочных работ.",
    img: `${CDN}/proj-industrial-vent_1f44b222.jpg`,
  },
];

const categoryColors: Record<string, string> = {
  "Промышленность": "bg-[#2D3092] text-white",
  "Коммерция": "bg-[#B91C1C] text-white",
  "Образование": "bg-[#0F1340] text-white",
  "Культура": "bg-amber-600 text-white",
  "Премиум": "bg-emerald-700 text-white",
};

export default function ProjectsSection() {
  return (
    <section data-theme="light" id="projects" className="py-20 bg-[#F7F8FF]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-0.5 w-10 bg-[#B91C1C]" />
            <span className="text-[#B91C1C] font-heading font-semibold uppercase text-sm tracking-widest">
              Портфолио
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340]">
              Выполненные объекты
            </h2>
            <a href="/obekty" onClick={() => ymGoal("projects_all_click")} className="inline-flex items-center gap-2 text-[#2D3092] font-heading font-semibold hover:text-[#B91C1C] transition-colors text-sm uppercase tracking-wide">
              Все объекты <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        {/* Main featured grid: first item wide */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href="https://max.ru/id3604084591_biz"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => ymGoal("project_card_click", { project: project.title })}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className={`group cursor-pointer overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl block ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? "aspect-[21/9]" : "aspect-[16/10]"}`}>
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1340]/70 via-[#0F1340]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-heading font-semibold uppercase tracking-wide rounded-full ${categoryColors[project.category] || "bg-gray-700 text-white"}`}>
                  {project.category}
                </div>
                {/* Hover overlay text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white/80 text-xs font-body leading-relaxed">{project.desc}</p>
                </div>
              </div>
              <div className="p-5 border-t-2 border-transparent group-hover:border-[#B91C1C] transition-all duration-300">
                <h3 className="font-heading font-semibold text-[#0F1340] text-sm leading-snug mb-2 group-hover:text-[#2D3092] transition-colors">
                  {project.title}
                </h3>
                <span className="text-[#B91C1C] text-xs font-heading font-semibold uppercase tracking-wide group-hover:underline">
                  Информация об объекте →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
