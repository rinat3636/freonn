/*
 * FREONN CONTACTS PAGE — /contacts
 */
import { useSEO } from "@/hooks/useSEO";
import PageLayout from "@/components/PageLayout";
import ContactSection from "@/components/ContactSection";

export default function ContactsPage() {

  useSEO({
    title: "Контакты — Freonn инженерная компания",
    description: "Свяжитесь с нами: 8(800)101-2009 (бесплатно). Офис в Москве. Выезд инженера по Москве и МО. Оставьте заявку онлайн — ответим в течение 15 минут.",
    keywords: "контакты Freonn, телефон инженерной компании, заявка на вентиляцию, вызов инженера Москва",
    canonical: "/contacts",
  });
  return (
    <PageLayout
      title="Контакты"
      breadcrumb={[{ label: "Контакты" }]}
    >
      <ContactSection />
    </PageLayout>
  );
}
