/*
 * FREONN HERO — Bold Technical Expressionism
 * Fully responsive: stacks on mobile, side-by-side on desktop
 * Brand: Freonn — dark navy #0F1340, red accent #B91C1C
 * Background: user video + team photo (2s) loop, blue overlay
 */
import { motion } from "framer-motion";
import { ArrowRight, FolderOpen, Tag, Phone } from "lucide-react";
import { ymGoal } from "@/lib/ym";
import { useEffect, useRef, useState } from "react";

const services = [
  { label: "Вентиляция", href: "/ventilyaciya" },
  { label: "Кондиционирование", href: "/kondicionirovanie" },
  { label: "Дымоудаление", href: "/dymoudalenie" },
  { label: "Отопление", href: "/otoplenie" },
  { label: "Холодоснабжение", href: "/holodosnabzhenie" },
  { label: "Электроснабжение", href: "/elektrosnabzhenie" },
  { label: "Пескоструйная обработка", href: "/peskostrujnaya-obrabotka" },
];

const quickLinks = [
  {
    icon: FolderOpen,
    title: "Выполненные объекты",
    desc: "Решённые кейсы в области проектирования и установки инженерных систем",
    href: "#projects",
  },
  {
    icon: Tag,
    title: "Цены на услуги",
    desc: "Прайс-лист разбит по категориям — стоимость основных и дополнительных работ",
    href: "#pricing",
  },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // showPhoto: false = video playing, true = photo showing
  const [showPhoto, setShowPhoto] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Запускаем видео только когда браузер готов (не блокируем первую отрисовку)
    const startVideo = () => {
      video.src = "/hero-video.mp4";
      video.load();
      video.play().catch(() => {});
      setVideoLoaded(true);
    };

    // На мобильных — запускаем после первого взаимодействия, на десктопе — сразу
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const onInteract = () => {
        startVideo();
        window.removeEventListener("touchstart", onInteract);
        window.removeEventListener("scroll", onInteract);
      };
      window.addEventListener("touchstart", onInteract, { passive: true });
      window.addEventListener("scroll", onInteract, { passive: true });
      // Fallback: запустить через 3 секунды в любом случае
      const fallback = setTimeout(startVideo, 3000);
      return () => {
        clearTimeout(fallback);
        window.removeEventListener("touchstart", onInteract);
        window.removeEventListener("scroll", onInteract);
      };
    } else {
      // Десктоп: запускаем после idle или через 500ms
      const id = (window as any).requestIdleCallback
        ? (window as any).requestIdleCallback(startVideo, { timeout: 1500 })
        : setTimeout(startVideo, 500);
      return () => {
        if ((window as any).cancelIdleCallback) (window as any).cancelIdleCallback(id);
        else clearTimeout(id);
      };
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoLoaded) return;

    const handleEnded = () => {
      // When video ends — show photo for 2 seconds, then restart video
      setShowPhoto(true);
      setTimeout(() => {
        setShowPhoto(false);
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 2000);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [videoLoaded]);

  return (
    <section data-theme="dark" className="relative flex items-center overflow-hidden bg-[#0A0E2E]">

      {/* ── VIDEO background ── */}
      <video
        ref={videoRef}
        muted
        playsInline
        poster="/hero-team.jpg"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: showPhoto ? 0 : 1 }}
        aria-hidden="true"
        preload="none"
      />

      {/* ── TEAM PHOTO — shown for 2s after video ends ── */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: "url(/hero-team.jpg)",
          opacity: showPhoto ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* ── Blue overlay (always on top of video/photo) ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(10,14,46,0.88) 0%, rgba(15,27,77,0.80) 50%, rgba(10,14,46,0.75) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Red accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B91C1C]" />

      <div className="container relative z-10 pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* Left: headline */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-10 bg-[#B91C1C]" />
                <span className="text-[#B91C1C] font-heading font-semibold uppercase text-xs sm:text-sm tracking-widest">
                  Инженерная компания
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-none mb-4 tracking-tight">
                FREONN
                <span className="sr-only"> — Монтаж инженерных систем в Москве и МО</span>
              </h1>
              <p className="text-white/80 text-base sm:text-lg font-body leading-relaxed mb-5 max-w-xl">
                Монтаж инженерных систем под ключ в Москве и МО: вентиляция, кондиционирование, дымоудаление, отопление, электроснабжение. Проектирование и обслуживание для промышленности, бизнеса и премиум недвижимости.
              </p>

              {/* Service tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {services.map((s) => (
                  <a key={s.label} href={s.href} onClick={() => ymGoal("service_tag_click", { tag: s.label })} className="text-xs px-3 py-1.5 border border-white/20 text-white/70 font-body hover:border-[#B91C1C] hover:text-white transition-colors rounded-full">
                    {s.label}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <a href="/contacts" onClick={() => ymGoal("hero_engineer_click")} className="flex items-center justify-center gap-2 text-sm sm:text-base font-heading font-semibold uppercase tracking-wide px-7 py-3 rounded-full border border-[#B91C1C]/70 bg-white/8 backdrop-blur-sm text-white hover:bg-[#B91C1C]/20 hover:border-[#B91C1C] transition-all duration-300">
                  <Phone size={15} /> Вызвать инженера <ArrowRight size={15} />
                </a>
                <a href="/o-kompanii" onClick={() => ymGoal("hero_about_click")} className="flex items-center justify-center gap-2 text-sm sm:text-base font-heading font-semibold uppercase tracking-wide px-7 py-3 rounded-full border border-[#B91C1C]/70 bg-white/8 backdrop-blur-sm text-white hover:bg-[#B91C1C]/20 hover:border-[#B91C1C] transition-all duration-300">
                  О компании <ArrowRight size={15} />
                </a>
                <a href="https://max.ru/id3604084591_biz" target="_blank" rel="noopener noreferrer" onClick={() => ymGoal("hero_works_click")} className="flex items-center justify-center gap-2 text-sm sm:text-base font-heading font-semibold uppercase tracking-wide px-7 py-3 rounded-full border border-[#B91C1C]/70 bg-white/8 backdrop-blur-sm text-white hover:bg-[#B91C1C]/20 hover:border-[#B91C1C] transition-all duration-300">
                  Наши работы <ArrowRight size={15} />
                </a>
              </div>

              {/* Trust bar */}
              <div className="flex flex-wrap gap-5 sm:gap-8 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
                {[
                  { val: "15+", label: "лет опыта" },
                  { val: "1280", label: "объектов" },
                  { val: "25", label: "бригад" },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <div className="font-display text-xl sm:text-2xl text-white font-bold">{val}</div>
                    <div className="text-white/50 text-xs font-body">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: quick links — hidden on mobile, shown from lg */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-4">
            {quickLinks.map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href}
                onClick={() => ymGoal("hero_quicklink_click", { link: item.title })}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                className="group flex items-start gap-4 bg-white/8 backdrop-blur-sm border border-[#B91C1C]/60 p-5 hover:bg-[#B91C1C]/15 hover:border-[#B91C1C] transition-all duration-300 rounded-2xl"
              >
                <div className="w-10 h-10 bg-[#B91C1C]/15 flex items-center justify-center group-hover:bg-[#B91C1C] transition-colors rounded-full flex-shrink-0">
                  <item.icon size={18} className="text-[#B91C1C] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-white text-sm mb-1 group-hover:text-[#B91C1C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/55 text-xs font-body leading-snug">{item.desc}</p>
                </div>
                <ArrowRight size={14} className="text-white/25 group-hover:text-[#B91C1C] flex-shrink-0 mt-1 transition-all group-hover:translate-x-1" />
              </motion.a>
            ))}

            {/* Phone block */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="bg-white/8 backdrop-blur-sm border border-[#B91C1C]/60 p-5 mt-2 rounded-2xl hover:border-[#B91C1C] transition-all duration-300"
            >
              <div className="text-white/60 text-xs font-body mb-1 uppercase tracking-wider">Бесплатная консультация</div>
              <a href="tel:88001012009" onClick={() => ymGoal("phone_click")} className="font-heading font-bold text-white text-xl hover:text-white/90 transition-colors">
                8(800)101-2009
              </a>
              <div className="text-white/50 text-xs font-body mt-0.5">Бесплатно по России · Пн–Сб 9:00–19:00</div>
            </motion.div>
          </div>

          {/* Mobile: phone block below content */}
          <div className="lg:hidden col-span-full">
            <div className="bg-white/8 backdrop-blur-sm border border-[#B91C1C]/60 p-4 rounded-2xl">
              <div className="text-white/60 text-xs font-body mb-1 uppercase tracking-wider">Бесплатная консультация</div>
              <a href="tel:88001012009" onClick={() => ymGoal("phone_click")} className="font-heading font-bold text-white text-lg">
                8(800)101-2009
              </a>
              <div className="text-white/50 text-xs font-body mt-0.5">Бесплатно по России · Пн–Сб 9:00–19:00</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
