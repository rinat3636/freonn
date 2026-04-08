/*
 * FREONN ABOUT PAGE — /o-kompanii
 */
import PageLayout from "@/components/PageLayout";
import AboutSection from "@/components/AboutSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";

export default function AboutCompanyPage() {
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
