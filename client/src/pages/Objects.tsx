/*
 * FREONN OBJECTS PAGE — /obekty
 */
import { useSEO } from "@/hooks/useSEO";
import PageLayout from "@/components/PageLayout";
import ProjectsSection from "@/components/ProjectsSection";
import ObjectsSection from "@/components/ObjectsSection";
import ContactSection from "@/components/ContactSection";

export default function ObjectsPage() {

  useSEO({
    title: "Объекты — портфолио выполненных работ",
    description: "Более 1280 выполненных объектов: промышленные предприятия, торговые центры, офисы, премиум недвижимость. Монтаж инженерных систем в Москве и МО.",
    keywords: "портфолио инженерные системы, выполненные объекты вентиляция, монтаж вентиляции примеры работ",
    canonical: "/obekty",
  });
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
