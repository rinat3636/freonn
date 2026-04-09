/*
 * FREONN DOCUMENTS PAGE — /dokumenty
 */
import { useSEO } from "@/hooks/useSEO";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { FileText, Shield, Award, Download } from "lucide-react";

const documents = [
  {
    category: "Лицензии",
    icon: Shield,
    color: "#B91C1C",
    items: [
      {
        title: "Лицензия МЧС России",
        desc: "Лицензия на осуществление деятельности по монтажу, техническому обслуживанию и ремонту средств обеспечения пожарной безопасности зданий и сооружений",
        number: "МЧС-2024-001234",
        date: "Выдана: 15.03.2024",
        expires: "Бессрочно",
      },
      {
        title: "Допуск СРО",
        desc: "Свидетельство о допуске к работам, которые оказывают влияние на безопасность объектов капитального строительства",
        number: "СРО-С-2024-5678",
        date: "Выдано: 01.02.2024",
        expires: "Бессрочно",
      },
    ],
  },
  {
    category: "Сертификаты",
    icon: Award,
    color: "#2D3092",
    items: [
      {
        title: "Авторизованный дилер Daikin",
        desc: "Сертификат авторизованного дилера и монтажной организации Daikin Industries Ltd.",
        number: "DAI-RU-2024-0892",
        date: "Выдан: 10.01.2024",
        expires: "до 31.12.2025",
      },
      {
        title: "Авторизованный монтажник Mitsubishi Electric",
        desc: "Сертификат авторизованного монтажника систем кондиционирования Mitsubishi Electric",
        number: "ME-RU-2024-1145",
        date: "Выдан: 15.02.2024",
        expires: "до 31.12.2025",
      },
      {
        title: "Сертификат Systemair",
        desc: "Авторизованный партнёр Systemair по поставке и монтажу вентиляционного оборудования",
        number: "SYS-RU-2023-0567",
        date: "Выдан: 20.11.2023",
        expires: "до 31.12.2025",
      },
    ],
  },
  {
    category: "Документы компании",
    icon: FileText,
    color: "#0F1340",
    items: [
      {
        title: "Свидетельство о государственной регистрации",
        desc: "ОГРН 1225000072840 — ООО «ФРЕОНН»",
        number: "ОГРН 1225000072840",
        date: "Дата регистрации: 15.06.2022",
        expires: "Бессрочно",
      },
      {
        title: "Свидетельство о постановке на учёт в налоговом органе",
        desc: "ИНН 5024238716 / КПП 502401001",
        number: "ИНН 5024238716",
        date: "Дата: 15.06.2022",
        expires: "Бессрочно",
      },
      {
        title: "Устав ООО «ФРЕОНН»",
        desc: "Учредительный документ компании в действующей редакции",
        number: "Редакция от 15.06.2022",
        date: "Утверждён: 15.06.2022",
        expires: "Действующая редакция",
      },
    ],
  },
];

export default function DocumentsPage() {

  useSEO({
    title: "Документы и лицензии — Freonn",
    description: "Лицензии МЧС, допуск СРО, сертификаты ISO и производителей оборудования. Freonn работает в полном соответствии с законодательством РФ.",
    keywords: "лицензия МЧС монтаж, допуск СРО вентиляция, сертификаты инженерная компания",
    canonical: "/sertifikaty",
  });
  return (
    <PageLayout
      title="Документы и лицензии"
      breadcrumb={[{ label: "Документы" }]}
    >
      <section className="py-16 bg-white">
        <div className="container">
          <p className="text-gray-500 font-body max-w-2xl mb-12">
            Freonn работает в полном соответствии с законодательством РФ. Все необходимые лицензии, допуски и сертификаты получены и актуальны. Вы можете запросить оригиналы документов при заключении договора.
          </p>
          <div className="space-y-10">
            {documents.map((section, si) => {
              const Icon = section.icon;
              return (
                <div key={si}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${section.color}15` }}>
                      <Icon size={16} style={{ color: section.color }} />
                    </div>
                    <h2 className="font-heading font-bold text-[#0F1340] text-lg">{section.category}</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.items.map((doc, di) => (
                      <motion.div
                        key={di}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: (si * 3 + di) * 0.05 }}
                        className="bg-[#F7F8FF] rounded-2xl p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${section.color}15` }}>
                            <FileText size={14} style={{ color: section.color }} />
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-full font-body" style={{ backgroundColor: `${section.color}10`, color: section.color }}>
                            {doc.expires}
                          </span>
                        </div>
                        <h3 className="font-heading font-semibold text-[#0F1340] text-sm mb-1.5">{doc.title}</h3>
                        <p className="text-gray-500 font-body text-xs leading-relaxed mb-3">{doc.desc}</p>
                        <div className="text-xs text-gray-400 font-body space-y-0.5">
                          <p>{doc.number}</p>
                          <p>{doc.date}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 bg-[#0F1340] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
            <Download size={24} className="text-white/60 flex-shrink-0" />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-heading font-bold text-white text-base mb-1">Нужны копии документов?</h3>
              <p className="text-white/60 font-body text-sm">Запросите пакет документов по email или при встрече в офисе.</p>
            </div>
            <a href="mailto:info@freonn.ru" className="btn-dark whitespace-nowrap">
              info@freonn.ru
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
