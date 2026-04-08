/*
 * FREONN FAQ PAGE — /faq
 */
import PageLayout from "@/components/PageLayout";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";

export default function FAQPage() {
  return (
    <PageLayout
      title="Часто задаваемые вопросы"
      breadcrumb={[{ label: "Вопросы" }]}
    >
      <FAQSection />
      <ContactSection />
    </PageLayout>
  );
}
