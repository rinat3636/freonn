/** Маппинг подписей формы freonn.ru → slug для API Freonn Group */
const LABEL_TO_SLUG: Record<string, string> = {
  "Монтаж вентиляции": "ventilyaciya",
  "Монтаж кондиционирования": "kondicionirovanie",
  "Монтаж дымоудаления": "dymoudalenie",
  "Монтаж отопления": "otoplenie",
  "Холодоснабжение": "holodosnabzhenie",
  "Водоснабжение и канализация": "vodosnabzhenie",
  "Электроснабжение": "elektrosnabzhenie",
  "Пескоструйная обработка": "peskostrujnaya-obrabotka",
  "Проектирование ОВиК": "ventilyaciya",
  "Комплексный проект": "ventilyaciya",
  "Пусконаладочные работы": "ventilyaciya",
  "Сервисное обслуживание": "ventilyaciya",
  Консультация: "ventilyaciya",
  Монтаж: "ventilyaciya",
};

export function mapServiceLabelToSlug(label: string): string {
  return LABEL_TO_SLUG[label] ?? "ventilyaciya";
}
