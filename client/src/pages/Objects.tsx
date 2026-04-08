/*
 * FREONN OBJECTS PAGE — /obekty
 */
import PageLayout from "@/components/PageLayout";
import ProjectsSection from "@/components/ProjectsSection";
import ObjectsSection from "@/components/ObjectsSection";
import ContactSection from "@/components/ContactSection";

export default function ObjectsPage() {
  return (
    <PageLayout
      title="Выполненные объекты"
      breadcrumb={[{ label: "Объекты" }]}
    >
      <ObjectsSection />
      <ProjectsSection />
      <ContactSection />
    </PageLayout>
  );
}
