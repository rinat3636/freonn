/*
 * FREONN REQUISITES PAGE — /rekvizity
 */
import PageLayout from "@/components/PageLayout";
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

const requisites = [
  { label: "Полное наименование", value: "ООО «ФРЕОНН»" },
  { label: "Краткое наименование", value: "ООО «ФРЕОНН»" },
  { label: "ИНН", value: "5024238716" },
  { label: "КПП", value: "502401001" },
  { label: "ОГРН", value: "1225000072840" },
  { label: "Юридический адрес", value: "143581, Московская область, Истринский р-н, г. Истра, ул. Ленина, д. 2А, офис 301" },
  { label: "Фактический адрес", value: "143581, Московская область, Истринский р-н, г. Истра, ул. Ленина, д. 2А, офис 301" },
  { label: "Расчётный счёт", value: "40702810801500098765" },
  { label: "Банк", value: "АО «Тинькофф Банк»" },
  { label: "БИК", value: "044525974" },
  { label: "Корреспондентский счёт", value: "30101810145250000974" },
  { label: "ОКПО", value: "48372910" },
  { label: "ОКВЭД", value: "43.22 — Производство санитарно-технических работ, монтаж отопительных систем и систем кондиционирования воздуха" },
  { label: "Генеральный директор", value: "Баширов Ринат Тагирович" },
  { label: "Телефон", value: "8(800)101-2009" },
  { label: "Email", value: "info@freonn.ru" },
  { label: "Сайт", value: "freonn.ru" },
];

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-start gap-4 py-3.5 border-b border-gray-100 last:border-0 group">
      <div className="w-52 flex-shrink-0">
        <span className="text-gray-400 font-body text-sm">{label}</span>
      </div>
      <div className="flex-1 flex items-start gap-2">
        <span className="text-[#0F1340] font-body text-sm font-medium">{value}</span>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0 text-gray-400 hover:text-[#2D3092]"
          title="Скопировать"
        >
          {copied ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}

export default function RequisitesPage() {
  return (
    <PageLayout
      title="Реквизиты компании"
      breadcrumb={[{ label: "Реквизиты" }]}
    >
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#0F1340] rounded-xl flex items-center justify-center">
                <span className="text-white font-heading font-black text-lg">F</span>
              </div>
              <div>
                <h2 className="font-heading font-bold text-[#0F1340] text-lg">ООО «ФРЕОНН»</h2>
                <p className="text-gray-400 font-body text-sm">Инженерная компания</p>
              </div>
            </div>
            <div>
              {requisites.map((req, i) => (
                <CopyRow key={i} label={req.label} value={req.value} />
              ))}
            </div>
          </div>

          <div className="mt-6 bg-[#F7F8FF] rounded-2xl p-5">
            <p className="text-gray-500 font-body text-sm text-center">
              Для получения счёта, договора или закрывающих документов — свяжитесь с нами по телефону{" "}
              <a href="tel:88001012009" className="text-[#2D3092] font-semibold hover:underline">8(800)101-2009</a>{" "}
              или по email{" "}
              <a href="mailto:info@freonn.ru" className="text-[#2D3092] font-semibold hover:underline">info@freonn.ru</a>
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
