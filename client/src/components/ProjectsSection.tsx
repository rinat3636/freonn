/*
 * FREONN PROJECTS — Bold Technical Expressionism
 * Grid of completed project cards with Unsplash images
 */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Монтаж вентиляции в производственном цеху",
    category: "Промышленность",
    area: "2400 м²",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  },
  {
    title: "Кондиционирование в бизнес-центре",
    category: "Коммерция",
    area: "5800 м²",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    title: "Система дымоудаления в торговом центре",
    category: "Коммерция",
    area: "12000 м²",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  {
    title: "Вентиляция и отопление в складском комплексе",
    category: "Промышленность",
    area: "8500 м²",
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80",
  },
  {
    title: "Умный климат-контроль в премиум-апартаментах",
    category: "Премиум",
    area: "320 м²",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  },
  {
    title: "Промышленное охлаждение на пищевом производстве",
    category: "Промышленность",
    area: "3200 м²",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
];

const categoryColors: Record<string, string> = {
  "Промышленность": "bg-[#2D3092] text-white",
  "Коммерция": "bg-[#ED1C24] text-white",
  "Премиум": "bg-[#0F1340] text-white",
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-white">
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
              Портфолио
            </span>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0F1340]">
              Наши выполненные проекты
            </h2>
            <a href="#contacts" className="hidden md:flex items-center gap-2 text-[#2D3092] font-heading font-semibold hover:text-[#ED1C24] transition-colors text-sm uppercase tracking-wide">
              Все проекты <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group cursor-pointer overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1340]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-heading font-semibold uppercase tracking-wide ${categoryColors[project.category] || "bg-gray-700 text-white"}`}>
                  {project.category}
                </div>
              </div>
              <div className="p-5 border-l-4 border-transparent group-hover:border-[#2D3092] transition-all duration-300">
                <h3 className="font-heading font-semibold text-[#0F1340] text-base mb-2 group-hover:text-[#2D3092] transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm font-body">{project.area}</span>
                  <span className="text-[#ED1C24] text-sm font-heading font-semibold group-hover:underline">
                    Подробнее →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
