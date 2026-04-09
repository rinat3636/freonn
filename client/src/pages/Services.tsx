/*
 * FREONN SERVICES PAGE — /uslugi
 */
import { useSEO } from "@/hooks/useSEO";
import PageLayout from "@/components/PageLayout";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";

export default function ServicesPage() {

  useSEO({
    title: "Услуги — монтаж инженерных систем в Москве",
    description: "Полный спектр инженерных услуг: вентиляция, кондиционирование, дымоудаление, отопление, холодоснабжение, водоснабжение, электроснабжение. Проектирование и монтаж под ключ.",
    keywords: "услуги монтаж вентиляции, кондиционирование офиса, дымоудаление монтаж, инженерные системы под ключ",
    canonical: "/uslugi",
  });
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
