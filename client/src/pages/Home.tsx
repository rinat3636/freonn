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
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  useSEO({
    title: "Монтаж инженерных систем в Москве и МО",
    description: "Freonn — проектирование, монтаж и обслуживание вентиляции, кондиционирования, дымоудаления, отопления и электроснабжения в Москве и Московской области. Более 1280 выполненных объектов.",
    keywords: "монтаж вентиляции Москва, кондиционирование офиса, дымоудаление, инженерные системы, проектирование вентиляции МО, монтаж инженерных систем под ключ",
    canonical: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://freonn.ru/#organization",
      name: "Freonn",
      alternateName: "Freonn — Инженерная компания",
      description: "Проектирование, монтаж и обслуживание инженерных систем: вентиляция, кондиционирование, дымоудаление, отопление, электроснабжение в Москве и МО.",
      url: "https://freonn.ru",
      telephone: "+78001012009",
      email: "info@freonn.ru",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-logo_62401a1b.png",
      priceRange: "₽₽₽",
      currenciesAccepted: "RUB",
      paymentAccepted: "Наличные, безналичный расчёт, банковский перевод",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "19:00",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "RU",
        addressRegion: "Москва",
        addressLocality: "Москва",
        postalCode: "121099",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 55.7558,
        longitude: 37.6173,
      },
      areaServed: [
        { "@type": "City", name: "Москва" },
        { "@type": "AdministrativeArea", name: "Московская область" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Инженерные системы",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Монтаж вентиляции" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Монтаж кондиционирования" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Монтаж дымоудаления" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Монтаж отопления" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Электроснабжение" } },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "87",
        bestRating: "5",
      },
    },
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
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
