/*
 * FREONN ABOUT PAGE — /o-kompanii
 */
import { useSEO } from "@/hooks/useSEO";
import PageLayout from "@/components/PageLayout";
import AboutSection from "@/components/AboutSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";

export default function AboutCompanyPage() {

  useSEO({
    title: "О компании Freonn — инженерная компания Москва",
    description: "Freonn — инженерная компания с 15-летним опытом. Монтаж вентиляции, кондиционирования, дымоудаления и отопления в Москве и МО. Более 1280 выполненных объектов.",
    keywords: "инженерная компания Москва, монтаж вентиляции, о компании Freonn, история компании",
    canonical: "/o-kompanii",
    breadcrumbs: [{ name: "О компании", url: "/o-kompanii" }],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://freonn.ru/o-kompanii#webpage",
      name: "О компании Freonn",
      description: "Freonn — инженерная компания с 15-летним опытом. Более 1280 выполненных объектов.",
      url: "https://freonn.ru/o-kompanii",
      isPartOf: { "@id": "https://freonn.ru/#website" },
      about: { "@id": "https://freonn.ru/#organization" },
    },
  });
  return (
    <PageLayout
      title="О компании Freonn"
      breadcrumb={[{ label: "О компании" }]}
    >
      <AboutSection />
      <AdvantagesSection />
      <PartnersSection />
      <ContactSection />
    </PageLayout>
  );
}
