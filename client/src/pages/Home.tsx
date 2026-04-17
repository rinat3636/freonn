/*
 * FREONN HOME PAGE — Bold Technical Expressionism
 * Assembles all sections in order matching ceds.ru structure
 */
import { useSEO } from "@/hooks/useSEO";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ObjectsSection from "@/components/ObjectsSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import ProjectsSection from "@/components/ProjectsSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import PartnersSection from "@/components/PartnersSection";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import GroupSection from "@/components/GroupSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  useSEO({
    title: "Freonn — инженерная компания | Монтаж вентиляции, кондиционирования в Москве",
    description: "Freonn — проектирование, монтаж и обслуживание вентиляции, кондиционирования, дымоудаления, отопления и электроснабжения в Москве и МО. Более 1280 объектов. Гарантия 3 года. Бесплатный выезд инженера.",
    keywords: "монтаж вентиляции Москва, кондиционирование офиса, дымоудаление монтаж, инженерные системы Москва, проектирование вентиляции МО, монтаж инженерных систем под ключ, ОВиК, воздушное отопление, монтаж кондиционеров",
    canonical: "/",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": ["ProfessionalService", "HomeAndConstructionBusiness"],
        "@id": "https://freonn.ru/#business",
        name: "Freonn — Инженерная компания",
        legalName: "ООО «ЭКС»",
        alternateName: "Freonn",
        description: "Проектирование, монтаж и обслуживание инженерных систем: вентиляция, кондиционирование, дымоудаление, отопление, электроснабжение в Москве и МО.",
        url: "https://freonn.ru",
        telephone: "+78001012009",
        email: "freonn@internet.ru",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/og-cover_freonn.jpg",
        logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-logo_62401a1b.png",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "19:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday"],
            opens: "10:00",
            closes: "17:00",
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "ул. Ленина, д. 2Б",
          addressCountry: "RU",
          addressRegion: "Московская область",
          addressLocality: "Дзержинский",
          postalCode: "143500",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 55.9167,
          longitude: 36.8667,
        },
        areaServed: [
          { "@type": "City", name: "Москва" },
          { "@type": "AdministrativeArea", name: "Московская область" },
        ],
        knowsAbout: [
          "Монтаж вентиляции",
          "Монтаж кондиционирования",
          "Монтаж дымоудаления",
          "Воздушное отопление",
          "Холодоснабжение",
          "Водоснабжение и канализация",
          "Электроснабжение и освещение",
          "Пескоструйная обработка",
          "Проектирование ОВиК",
          "Пусконаладочные работы",
          "Сервисное обслуживание"
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "127",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://freonn.ru/#webpage",
        url: "https://freonn.ru/",
        name: "Монтаж инженерных систем в Москве и МО — Freonn",
        isPartOf: { "@id": "https://freonn.ru/#website" },
        about: { "@id": "https://freonn.ru/#localbusiness" },
        description: "Проектирование, монтаж и обслуживание инженерных систем: вентиляция, кондиционирование, дымоудаление, отопление, электроснабжение в Москве и МО.",
        inLanguage: "ru-RU",
        dateModified: "2026-04-09T00:00:00+03:00",
      },
    ],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ObjectsSection />
        <ProcessSection />
        <PricingSection />
        <ProjectsSection />
        <AdvantagesSection />
        <PartnersSection />
        <BlogSection />
        <FAQSection />
        <ContactSection />
        <GroupSection />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
