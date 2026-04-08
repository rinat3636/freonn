/*
 * FREONN SERVICES PAGE — /uslugi
 */
import PageLayout from "@/components/PageLayout";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";

export default function ServicesPage() {
  return (
    <PageLayout
      title="Инженерные системы — услуги Freonn"
      breadcrumb={[{ label: "Услуги" }]}
    >
      <ServicesSection />
      <ProcessSection />
      <ContactSection />
    </PageLayout>
  );
}
