import { Shield, Star, Truck, Users } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  const values = [
    { icon: <Shield className="w-7 h-7" />, title: "Качество", desc: "Используем только проверенные материалы от надёжных поставщиков. Каждый товар проходит контроль качества." },
    { icon: <Star className="w-7 h-7" />, title: "Дизайн", desc: "Наши дизайнеры следят за мировыми трендами и создают мебель, которая вписывается в любой интерьер." },
    { icon: <Truck className="w-7 h-7" />, title: "Сервис", desc: "Доставка, сборка и гарантийное обслуживание — мы заботимся о вас на каждом этапе." },
    { icon: <Users className="w-7 h-7" />, title: "Команда", desc: "Более 50 профессионалов: дизайнеры, мастера, менеджеры — все работают для вашего комфорта." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="relative bg-gray-900 text-white pt-24 pb-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&h=600&fit=crop"
          alt="О нас"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative container mx-auto px-4 max-w-7xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">О компании Teos Mebel</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Более 10 лет мы создаём качественную мебель для домов и офисов Узбекистана.
            Наша миссия — сделать каждый дом уютным и красивым.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Наша история</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">
                Начали с мечты, выросли в компанию
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Teos Mebel была основана в 2014 году с простой идеей: создавать красивую и доступную мебель для каждой семьи. Начав с небольшой мастерской, сегодня мы — одна из ведущих мебельных компаний страны.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                За эти годы мы обустроили более 5000 домов и офисов, создали сотни уникальных дизайн-проектов и наладили производство полного цикла — от разработки эскиза до доставки готового изделия.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Мы постоянно развиваемся: внедряем новые технологии, расширяем ассортимент и улучшаем сервис. Наша цель — чтобы каждый клиент остался доволен и вернулся к нам снова.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop"
                alt="Производство"
                className="rounded-2xl w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop"
                alt="Дизайн"
                className="rounded-2xl w-full object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "10+", label: "лет на рынке" },
              { num: "5000+", label: "довольных клиентов" },
              { num: "500+", label: "моделей мебели" },
              { num: "50+", label: "сотрудников" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.num}</p>
                <p className="text-gray-400 mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Наши ценности</h2>
            <p className="text-gray-500 mt-2">Принципы, которыми мы руководствуемся каждый день</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "oklch(0.72 0.12 75 / 0.15)", color: "oklch(0.72 0.12 75)" }}>
                  {val.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Готовы сотрудничать?</h2>
          <p className="text-gray-500 mb-6">Свяжитесь с нами или посмотрите наш каталог</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/catalog"
              className="px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.12 0.01 60)" }}
            >
              Смотреть каталог
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg font-semibold text-sm border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary transition-all"
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
