/*
 * FREONN PARTNERS — Modern marquee-style layout
 * Brand: Freonn — dark navy #0F1340, red accent #B91C1C
 */
import { motion } from "framer-motion";

const brands = [
  "Daikin", "Mitsubishi Electric", "Carrier", "Trane", "Systemair",
  "Вентс", "Неватом", "Electrolux", "LG", "Samsung", "Panasonic", "Haier",
  "Gree", "Midea", "Fujitsu", "Hitachi", "Danfoss", "Grundfos",
];

export default function PartnersSection() {
  return (
    <section data-theme="light" className="py-14 bg-[#F7F8FF] overflow-hidden">
      <div className="container mb-8">
        <div className="flex items-center gap-3">
          <div className="h-0.5 w-10 bg-[#B91C1C]" />
          <span className="text-gray-400 font-body text-sm uppercase tracking-widest">
            Оборудование ведущих производителей
          </span>
        </div>
      </div>

      {/* Scrolling marquee */}
      <div className="relative overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex-shrink-0 px-6 py-3 bg-white border border-gray-200 text-gray-500 font-heading font-semibold text-sm hover:text-[#2D3092] hover:border-[#2D3092] transition-colors cursor-default rounded-full"
            >
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
