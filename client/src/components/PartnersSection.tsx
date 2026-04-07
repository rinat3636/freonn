/*
 * FREONN PARTNERS — Bold Technical Expressionism
 * White section with brand logos (text-based for now)
 */
import { motion } from "framer-motion";

const brands = [
  "Daikin", "Mitsubishi Electric", "Carrier", "Trane", "Systemair",
  "Vents", "Electrolux", "Panasonic", "LG", "Samsung", "Danfoss", "Grundfos",
];

export default function PartnersSection() {
  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-gray-400 font-heading font-semibold uppercase text-sm tracking-widest">
            Оборудование ведущих мировых производителей
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 lg:gap-10"
        >
          {brands.map((brand) => (
            <div
              key={brand}
              className="text-gray-300 font-heading font-bold text-base lg:text-lg uppercase tracking-wide hover:text-[#2D3092] transition-colors cursor-default"
            >
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
