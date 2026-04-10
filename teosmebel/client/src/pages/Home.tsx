import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight, Phone, Star, Shield, Truck } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const HERO_FALLBACK = [
  {
    id: 0,
    title: "Мебель для вашего дома",
    subtitle: "Современный дизайн, высокое качество и доступные цены. Создайте уют в каждом уголке.",
    buttonText: "Смотреть каталог",
    buttonLink: "/catalog",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&h=800&fit=crop",
  },
  {
    id: 1,
    title: "Диваны и кресла",
    subtitle: "Комфорт и стиль для вашей гостиной. Широкий выбор моделей и тканей.",
    buttonText: "Выбрать диван",
    buttonLink: "/catalog",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=800&fit=crop",
  },
  {
    id: 2,
    title: "Спальные гарнитуры",
    subtitle: "Создайте идеальную спальню с нашими коллекциями. Качество и красота в каждой детали.",
    buttonText: "В каталог",
    buttonLink: "/catalog",
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&h=800&fit=crop",
  },
];

const CATEGORY_ICONS: Record<string, string> = {
  default: "🛋️",
};

const CATEGORY_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop",
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const { data: heroSlides } = trpc.heroSlides.list.useQuery();
  const { data: categoriesData } = trpc.categories.list.useQuery();
  const { data: featuredData } = trpc.products.list.useQuery({ featured: true, limit: 8 });
  const { data: settings } = trpc.settings.get.useQuery();

  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : HERO_FALLBACK;
  const categories = categoriesData ?? [];
  const featuredProducts = featuredData?.items ?? [];
  const phone = settings?.phone ?? "+998 90 000 00 00";

  // Auto-play hero slider
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, slides.length]);

  const prevSlide = () => {
    setAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  const nextSlide = () => {
    setAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.imageUrl || HERO_FALLBACK[0].imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>
        ))}

        {/* Slide content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                {slides[currentSlide]?.title}
              </h1>
              <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
                {slides[currentSlide]?.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={slides[currentSlide]?.buttonLink || "/catalog"}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                  style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.12 0.01 60)" }}
                >
                  {slides[currentSlide]?.buttonText || "Смотреть каталог"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  {phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Slider controls */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setAutoPlay(false); setCurrentSlide(idx); }}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentSlide ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Features bar */}
      <section className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="w-6 h-6" />, title: "Гарантия качества", desc: "На всю мебель 2 года гарантии" },
              { icon: <Truck className="w-6 h-6" />, title: "Доставка по городу", desc: "Быстрая доставка и сборка" },
              { icon: <Star className="w-6 h-6" />, title: "Индивидуальный заказ", desc: "Изготовим по вашим размерам" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.72 0.12 75 / 0.2)", color: "oklch(0.72 0.12 75)" }}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Категории</h2>
                <p className="text-gray-500 mt-1">Найдите мебель по вашему вкусу</p>
              </div>
              <Link href="/catalog" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Все категории <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat, idx) => (
                <Link key={cat.id} href={`/catalog?category=${cat.id}`}>
                  <div className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer">
                    <img
                      src={cat.imageUrl || CATEGORY_FALLBACK_IMAGES[idx % CATEGORY_FALLBACK_IMAGES.length]}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-sm md:text-base">{cat.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Популярные товары</h2>
                <p className="text-gray-500 mt-1">Лучшие предложения нашего каталога</p>
              </div>
              <Link href="/catalog" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Весь каталог <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(({ product }) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-10 text-center md:hidden">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
              >
                Весь каталог <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">О компании</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">
                Teos Mebel — мебель с душой
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Мы создаём качественную мебель для вашего дома и офиса уже более 10 лет. Каждое изделие проходит строгий контроль качества и изготавливается из лучших материалов.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Наша команда профессиональных дизайнеров и мастеров готова воплотить любую идею в жизнь — от стандартных моделей до индивидуальных заказов по вашим размерам.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { num: "10+", label: "лет опыта" },
                  { num: "500+", label: "моделей" },
                  { num: "5000+", label: "клиентов" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-gray-50">
                    <p className="text-2xl font-bold text-primary">{stat.num}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.12 0.01 60)" }}
              >
                Подробнее о нас <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&h=500&fit=crop"
                alt="О компании"
                className="rounded-2xl w-full object-cover shadow-xl"
              />
              <div
                className="absolute -bottom-6 -left-6 p-6 rounded-xl shadow-lg hidden md:block"
                style={{ background: "oklch(0.72 0.12 75)" }}
              >
                <p className="text-2xl font-bold" style={{ color: "oklch(0.12 0.01 60)" }}>10+</p>
                <p className="text-sm font-medium" style={{ color: "oklch(0.12 0.01 60)" }}>лет на рынке</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-dark text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Готовы обновить интерьер?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Свяжитесь с нами для консультации. Поможем выбрать мебель под ваш бюджет и стиль.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.12 0.01 60)" }}
            >
              Смотреть каталог
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
