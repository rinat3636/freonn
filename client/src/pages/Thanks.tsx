/*
 * FREONN THANKS PAGE — /spasibo
 * Shown after successful form submission for Yandex.Metrika conversion tracking
 */
import { useEffect, useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { ymGoal } from "@/lib/ym";
import { CheckCircle, Phone, ArrowRight, Clock } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

const REDIRECT_SECONDS = 5;

export default function ThanksPage() {
  const [, navigate] = useLocation();
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

  useSEO({
    title: "Спасибо за заявку — Freonn",
    description: "Ваша заявка принята. Наш специалист свяжется с вами в ближайшее время.",
    canonical: "/spasibo",
    noIndex: true,
  });

  // Fire Yandex.Metrika conversion goal on page load
  useEffect(() => {
    ymGoal("form_submit");
  }, []);

  // Countdown timer with auto-redirect
  useEffect(() => {
    if (countdown <= 0) {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  // SVG circle progress
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = (countdown / REDIRECT_SECONDS) * circumference;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-14 h-14 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F1340] mb-4">
              Заявка принята!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Спасибо за обращение в компанию <strong>Freonn</strong>.
            </p>
            <p className="text-gray-500 mb-8">
              Наш специалист свяжется с вами в течение 30 минут в рабочее время.
            </p>
          </motion.div>

          {/* What happens next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#0F1340]/5 rounded-2xl p-6 mb-8 text-left"
          >
            <h2 className="font-semibold text-[#0F1340] mb-4 text-lg">Что будет дальше:</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0F1340] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <p className="text-gray-700">Менеджер перезвонит и уточнит детали вашего проекта</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0F1340] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <p className="text-gray-700">Инженер выедет на объект для бесплатного замера</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0F1340] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <p className="text-gray-700">Вы получите коммерческое предложение с точными ценами</p>
              </div>
            </div>
          </motion.div>

          {/* Working hours notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8"
          >
            <Clock className="w-4 h-4" />
            <span>Режим работы: Пн–Пт 9:00–18:00, Сб 10:00–16:00</span>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <a
              href="tel:88001012009"
              onClick={() => ymGoal("phone_click")}
              className="inline-flex items-center justify-center gap-2 bg-[#0F1340] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1a1f5e] transition-colors"
            >
              <Phone className="w-4 h-4" />
              8-800-101-2009
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-[#0F1340]/20 text-[#0F1340] px-6 py-3 rounded-xl font-medium hover:border-[#0F1340]/50 transition-colors"
            >
              На главную
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Countdown timer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                {/* Background circle */}
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                {/* Progress circle */}
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  fill="none"
                  stroke="#0F1340"
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - progress}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.9s linear" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#0F1340]">
                {countdown}
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Переход на главную через {countdown} сек.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
