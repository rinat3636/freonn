/*
 * FREONN FAQ PAGE — /faq
 */
import { useSEO } from "@/hooks/useSEO";
import PageLayout from "@/components/PageLayout";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";

export default function FAQPage() {

  useSEO({
    title: "Вопросы и ответы — монтаж инженерных систем",
    description: "Ответы на частые вопросы о монтаже вентиляции, кондиционирования и дымоудаления. Сроки, гарантии, стоимость работ, необходимые документы.",
    keywords: "вопросы вентиляция, FAQ кондиционирование, стоимость монтажа вентиляции, гарантия на вентиляцию",
    canonical: "/faq",
  });
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
