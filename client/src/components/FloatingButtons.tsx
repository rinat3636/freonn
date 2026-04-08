/*
 * FREONN FLOATING BUTTONS — Bold Technical Expressionism
 * Fixed bottom-right: phone button + scroll-to-top
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowUp, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* WhatsApp/Telegram */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => toast.info("Мессенджеры подключаются — скоро будут доступны")}
        className="w-12 h-12 bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors hover:scale-110 active:scale-95 rounded-full"
        title="Написать в мессенджер"
      >
        <MessageCircle size={22} />
      </motion.button>

      {/* Phone */}
      <motion.a
        href="tel:88001012009"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
        className="w-14 h-14 bg-[#ED1C24] text-white flex items-center justify-center shadow-xl hover:bg-red-700 transition-colors hover:scale-110 active:scale-95 relative rounded-full"
        title="Позвонить"
      >
        <Phone size={24} />
        {/* Pulse ring */}
        <span className="absolute inset-0 animate-ping bg-[#ED1C24] opacity-30 rounded-full" />
      </motion.a>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 bg-[#2D3092] text-white flex items-center justify-center shadow-md hover:bg-[#0F1340] transition-colors hover:scale-110 active:scale-95 rounded-full"
            title="Наверх"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
