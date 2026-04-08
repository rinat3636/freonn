/*
 * FREONN HEADER — Bold Technical Expressionism
 * Transparent on hero section, white background on scroll
 * Mobile: only ЗАЯВКА button + burger menu
 * Brand: Freonn — dark navy #0F1340, red accent #ED1C24
 */
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import { toast } from "sonner";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-logo_62401a1b.png";

const navItems = [
  { label: "О компании", href: "#about" },
  {
    label: "Услуги", href: "#services", children: [
      { label: "Вентиляция", href: "#services" },
      { label: "Кондиционирование", href: "#services" },
      { label: "Дымоудаление", href: "#services" },
      { label: "Отопление и теплоснабжение", href: "#services" },
      { label: "Холодоснабжение", href: "#services" },
      { label: "Водоснабжение и канализация", href: "#services" },
      { label: "Электроснабжение", href: "#services" },
      { label: "Пескоструйная обработка", href: "#services" },
    ]
  },
  { label: "Цены", href: "#pricing" },
  { label: "Объекты", href: "#projects" },
  { label: "Блог", href: "#blog" },
  { label: "Вопросы", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const topBarLinks = ["Акции", "Оплата и доставка", "Гарантии", "Сертификаты"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleTopLink = () => toast.info("Раздел в разработке");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Main header bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center gap-3 sm:gap-4 lg:gap-6 py-3 sm:py-4">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src={LOGO_URL}
              alt="Freonn"
              className={`h-9 sm:h-11 w-auto transition-all duration-300 ${
                !scrolled ? "brightness-0 invert" : ""
              }`}
            />
          </a>

          <div className="flex-1" />

          {/* Phone — desktop only, visible when scrolled */}
          {scrolled && (
            <a
              href="tel:88001012009"
              className="hidden lg:flex items-center gap-1.5 text-[#0F1340] font-heading font-semibold text-sm whitespace-nowrap"
            >
              <Phone size={14} className="text-[#ED1C24]" />
              8(800)101-2009
            </a>
          )}

          {/* Desktop nav links — shown when scrolled */}
          {scrolled && (
            <nav className="hidden lg:flex items-center gap-0">
              {navItems.map(item => (
                <div key={item.label} className="relative group flex-shrink-0">
                  <a
                    href={item.href}
                    className="flex items-center gap-1 px-3 xl:px-4 py-2 whitespace-nowrap text-sm text-[#1A1A2E] hover:text-[#2D3092] font-heading font-medium uppercase tracking-wide transition-colors"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </a>
                  {item.children && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-xl border-t-2 border-[#2D3092] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 rounded-b-lg">
                      {item.children.map(child => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F0F2FF] hover:text-[#2D3092] font-body border-b border-gray-50 last:border-0"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* CTA button — desktop */}
          <a
            href="#contacts"
            className={`hidden lg:inline-flex items-center text-sm py-2 px-5 xl:px-6 rounded-full font-heading font-bold uppercase tracking-wide transition-all duration-300 flex-shrink-0 ${
              scrolled
                ? "bg-[#ED1C24] text-white hover:bg-[#c91a1f]"
                : "border-2 border-white text-white hover:bg-white hover:text-[#ED1C24]"
            }`}
          >
            Заявка
          </a>

          {/* Mobile CTA button */}
          <a
            href="#contacts"
            className={`lg:hidden text-xs py-2 px-4 flex-shrink-0 font-heading font-bold uppercase tracking-wide rounded-full transition-all duration-300 ${
              scrolled
                ? "bg-[#ED1C24] text-white hover:bg-[#c91a1f]"
                : "border-2 border-white text-white hover:bg-white hover:text-[#ED1C24]"
            }`}
          >
            Заявка
          </a>

          {/* Mobile menu toggle */}
          <button
            className={`lg:hidden p-2 flex-shrink-0 transition-colors duration-300 ${
              scrolled ? "text-[#2D3092]" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop burger (when not scrolled — show nav toggle) */}
          {!scrolled && (
            <button
              className="hidden lg:flex p-2 flex-shrink-0 text-white hover:text-white/70 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              <Menu size={22} />
            </button>
          )}
        </div>

        {/* Desktop Navigation bar — shown when scrolled */}
        {scrolled && (
          <nav className="hidden lg:block border-t border-gray-100 bg-white">
            <div className="container flex items-center gap-0 overflow-x-auto">
              {navItems.map(item => (
                <div key={item.label} className="relative group flex-shrink-0">
                  <a
                    href={item.href}
                    className="nav-link flex items-center gap-1 px-3 xl:px-4 py-3 whitespace-nowrap text-[#1A1A2E] hover:text-[#2D3092]"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown size={13} className="group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </a>
                  {item.children && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-xl border-t-2 border-[#2D3092] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 rounded-b-lg">
                      {item.children.map(child => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F0F2FF] hover:text-[#2D3092] font-body border-b border-gray-50 last:border-0"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* Mobile menu — full screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-0 top-0 bg-[#0F1340] text-white z-[100] overflow-y-auto"
          >
            {/* Mobile menu header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <img src={LOGO_URL} alt="Freonn" className="h-9 w-auto brightness-0 invert" />
              <button onClick={() => setMobileOpen(false)} className="p-2 text-white/80 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Contact info */}
            <div className="px-4 py-4 bg-[#ED1C24]/10 border-b border-white/10">
              <a href="tel:88001012009" className="flex items-center gap-2 text-white font-heading font-semibold text-lg mb-1">
                <Phone size={18} className="text-[#ED1C24]" /> 8(800)101-2009
              </a>
              <p className="text-white/50 text-xs font-body">Бесплатно по России · Пн-Сб 9:00–19:00</p>
            </div>

            {/* Nav links */}
            <div className="flex flex-col">
              {navItems.map(item => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex items-center justify-between py-4 px-4 border-b border-white/10 font-heading font-medium uppercase text-sm tracking-wide hover:text-[#ED1C24] transition-colors"
                      >
                        {item.label}
                        <ChevronDown size={16} className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden bg-[#1a2060]"
                          >
                            {item.children.map(child => (
                              <a
                                key={child.label}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-3 px-8 text-sm text-white/70 hover:text-[#ED1C24] border-b border-white/5 font-body transition-colors"
                              >
                                {child.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 px-4 border-b border-white/10 font-heading font-medium uppercase text-sm tracking-wide hover:text-[#ED1C24] transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="p-4 mt-2 flex flex-col gap-3">
              <a href="#contacts" onClick={() => setMobileOpen(false)} className="btn-primary text-center text-base py-3">
                Вызвать инженера
              </a>
              <button onClick={() => { handleTopLink(); setMobileOpen(false); }} className="btn-outline text-center text-base py-3 border-white text-white rounded-full">
                Пригласить в тендер
              </button>
            </div>

            {/* Footer links in mobile menu */}
            <div className="px-4 pb-6 flex flex-wrap gap-3">
              {topBarLinks.map(link => (
                <button key={link} onClick={handleTopLink} className="text-white/40 text-xs font-body hover:text-white/70 transition-colors">
                  {link}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
