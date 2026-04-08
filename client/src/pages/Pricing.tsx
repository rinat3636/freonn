/*
 * FREONN PRICING PAGE — /ceny
 */
import PageLayout from "@/components/PageLayout";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

export default function PricingPage() {
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
