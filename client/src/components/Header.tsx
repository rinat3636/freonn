/*
 * FREONN HEADER — Bold Technical Expressionism
 * Top bar: dark navy with utility links
 * Main header: white with logo, address, search
 * Nav: white with navy/red accents, Oswald font
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Search, ChevronDown, Menu, X } from "lucide-react";
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

const topBarLinks = ["Акции", "Оплата и доставка", "Гарантии", "Вопросы и ответы", "Сертификаты", "Отзывы"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTopLink = () => toast.info("Раздел в разработке");

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top utility bar */}
      <div className="bg-[#0F1340] text-white/80 text-xs">
        <div className="container flex items-center justify-between py-1.5 gap-4">
          <div className="hidden lg:flex items-center gap-4">
            {topBarLinks.map(link => (
              <button key={link} onClick={handleTopLink}
                className="hover:text-white transition-colors font-body">{link}</button>
            ))}
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a href="mailto:info@freonn.ru" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={12} /> info@freonn.ru
            </a>
            <a href="tel:88001012009" className="flex items-center gap-1.5 hover:text-white transition-colors font-semibold text-white">
              <Phone size={12} /> 8(800)101-2009
            </a>
            <button onClick={handleTopLink}
              className="bg-[#ED1C24] text-white px-4 py-1 text-xs font-heading font-semibold uppercase tracking-wide hover:bg-red-700 transition-colors rounded-full">
              Обратный звонок
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className={`bg-white border-b border-gray-100 transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""}`}>
        <div className="container flex items-center gap-6 py-3">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img src={LOGO_URL} alt="Freonn" className="h-12 w-auto" />
          </a>

          {/* Address & hours */}
          <div className="hidden lg:flex flex-col text-sm ml-2">
            <div className="flex items-center gap-1.5 text-gray-600">
              <MapPin size={13} className="text-[#2D3092]" />
              <span className="font-body">Московская обл., г. Дзержинский, ул. Ленина 2Б</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-0.5">
              <Clock size={12} className="text-[#ED1C24]" />
              <span className="font-body">Пн-Сб: 9:00 – 19:00</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search */}
          <div className="hidden md:flex items-center">
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text"
                  placeholder="Поиск по сайту..."
                  className="border border-gray-200 rounded-l px-3 py-1.5 text-sm outline-none focus:border-[#2D3092] font-body"
                />
              )}
            </AnimatePresence>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="bg-[#2D3092] text-white p-2 hover:bg-[#ED1C24] transition-colors rounded-full"
            >
              <Search size={16} />
            </button>
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex gap-3">
            <a href="#contacts" className="btn-primary text-sm">
              Вызвать инженера
            </a>
            <button onClick={handleTopLink} className="btn-outline text-sm border-[#2D3092] text-[#2D3092] hover:bg-[#2D3092] hover:text-white rounded-full">
              Пригласить в тендер
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-[#2D3092]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:block border-t border-gray-100 bg-white">
          <div className="container flex items-center gap-1">
            {navItems.map(item => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  className="nav-link flex items-center gap-1 px-4 py-3 text-[#1A1A2E] hover:text-[#2D3092]"
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />}
                </a>
                {item.children && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-xl border-t-2 border-[#2D3092] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#0F1340] text-white overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navItems.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-2 border-b border-white/10 font-heading font-medium uppercase text-sm tracking-wide hover:text-[#ED1C24] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <a href="#contacts" className="btn-primary text-center">Вызвать инженера</a>
                <a href="tel:88001012009" className="flex items-center gap-2 text-white/80 hover:text-white">
                  <Phone size={16} /> 8(800)101-2009
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
