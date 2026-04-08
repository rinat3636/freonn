/*
 * FREONN CONTACTS PAGE — /contacts
 */
import PageLayout from "@/components/PageLayout";
import ContactSection from "@/components/ContactSection";

export default function ContactsPage() {
  return (
    <PageLayout
      title="Контакты"
      breadcrumb={[{ label: "Контакты" }]}
    >
      <ContactSection />
    </PageLayout>
  );
}
