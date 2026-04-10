/*
 * FREONN PRICING PAGE — /ceny
 */
import { useSEO } from "@/hooks/useSEO";
import PageLayout from "@/components/PageLayout";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

export default function PricingPage() {

  useSEO({
    title: "Цены на монтаж инженерных систем — прайс-лист",
    description: "Актуальные цены на монтаж вентиляции, кондиционирования, дымоудаления и отопления в Москве. Прозрачное ценообразование, смета бесплатно.",
    keywords: "цены монтаж вентиляции, стоимость кондиционирования, прайс дымоудаление, расценки инженерные системы",
    canonical: "/ceny",
    breadcrumbs: [{ name: "Цены", url: "/ceny" }],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://freonn.ru/ceny#webpage",
      name: "Цены на монтаж инженерных систем — прайс-лист",
      description: "Актуальные цены на монтаж вентиляции, кондиционирования, дымоудаления и отопления в Москве.",
      url: "https://freonn.ru/ceny",
      isPartOf: { "@id": "https://freonn.ru/#website" },
      provider: { "@id": "https://freonn.ru/#organization" },
    },
  });
  return (
    <PageLayout
      title="Цены на инженерные системы"
      breadcrumb={[{ label: "Цены" }]}
    >
      <PricingSection />
      <ContactSection />
    </PageLayout>
  );
}
