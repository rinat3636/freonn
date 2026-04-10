/**
 * useAIServiceContent — Groq-powered FAQ and content for service pages
 *
 * Generates unique FAQ, extended description, and JSON-LD for service pages.
 * SAFETY: Full graceful fallback if Groq unavailable.
 * PERFORMANCE: Cached in sessionStorage for 7 days per service.
 */
import { useState, useEffect, useRef } from "react";

export interface ServiceAIContent {
  faq: Array<{ q: string; a: string }>;
  extendedDescription: string;
  jsonLdFaq: object | null;
  isAI: boolean;
  isLoading: boolean;
}

const CACHE_PREFIX = "freonn_service_v2_";
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;

// Static FAQ fallbacks per service
const STATIC_FAQS: Record<string, Array<{ q: string; a: string }>> = {
  ventilyaciya: [
    { q: "Сколько стоит монтаж вентиляции?", a: "Стоимость зависит от площади объекта и типа системы. Для объектов от 500 м² — от 800 руб/м². Точный расчёт бесплатно после выезда инженера." },
    { q: "Как долго длится монтаж вентиляции?", a: "Монтаж приточно-вытяжной системы для объекта 1000–3000 м² занимает 2–4 недели. Сроки зависят от сложности проекта." },
    { q: "Нужен ли проект для монтажа вентиляции?", a: "Да, для коммерческих и промышленных объектов проект обязателен. Freonn разрабатывает проектную документацию в соответствии со СП 60.13330.2020." },
    { q: "Какую гарантию вы даёте?", a: "Гарантия на монтажные работы — 1 год. На оборудование действует гарантия производителя (обычно 1–3 года)." },
  ],
  kondicionirovanie: [
    { q: "Какие системы кондиционирования вы монтируете?", a: "Монтируем сплит-системы, мульти-сплит, VRF/VRV системы, чиллеры с фанкойлами, прецизионные кондиционеры для серверных." },
    { q: "Сколько стоит монтаж кондиционирования?", a: "Стоимость монтажа VRF-системы — от 1200 руб/м². Сплит-системы — от 5000 руб за установку. Точный расчёт после обследования объекта." },
    { q: "Работаете ли вы с промышленными объектами?", a: "Да, специализируемся на объектах от 500 м²: производства, склады, торговые центры, бизнес-центры, дата-центры." },
    { q: "Как быстро выедет инженер?", a: "Выезд инженера на объект — в течение 1 рабочего дня. Расчёт стоимости — бесплатно." },
  ],
  dymoudalenie: [
    { q: "Какие нормы регулируют монтаж дымоудаления?", a: "Системы дымоудаления монтируются в соответствии со СП 7.13130.2013 и требованиями МЧС. Freonn имеет лицензию МЧС на противопожарные работы." },
    { q: "Для каких объектов обязательна система дымоудаления?", a: "Дымоудаление обязательно для ТЦ, бизнес-центров, подземных паркингов, производственных цехов площадью от 1000 м² и зданий высотой более 28 м." },
    { q: "Сколько стоит монтаж дымоудаления?", a: "Стоимость зависит от площади и типа объекта. Ориентировочно — от 600 руб/м². Точный расчёт после изучения проектной документации." },
    { q: "Нужна ли лицензия МЧС для монтажа?", a: "Да. Freonn имеет все необходимые лицензии МЧС и допуски СРО для выполнения противопожарных работ." },
  ],
  otoplenie: [
    { q: "Какие системы отопления вы монтируете?", a: "Монтируем воздушное, водяное, паровое и электрическое отопление, тепловые пункты (ИТП), тепловые завесы, системы лучистого отопления." },
    { q: "Сколько стоит монтаж отопления?", a: "Стоимость монтажа системы отопления — от 600 руб/м². Монтаж ИТП — от 500 000 руб. Точный расчёт после обследования объекта." },
    { q: "По каким нормам выполняется монтаж?", a: "Монтаж выполняется в соответствии со СП 60.13330.2020, СП 41-101-95, СНиП 41-02-2003 и техническими условиями теплоснабжающей организации." },
    { q: "Выполняете ли монтаж ИТП?", a: "Да, монтаж индивидуальных тепловых пунктов — одно из наших ключевых направлений. Выполняем под ключ: проект, монтаж, пусконаладка, сдача в эксплуатацию." },
  ],
};

const DEFAULT_FAQ = [
  { q: "Как быстро выедет инженер?", a: "Выезд инженера на объект — в течение 1 рабочего дня. Расчёт стоимости — бесплатно." },
  { q: "Работаете ли вы с объектами от 500 м²?", a: "Да, специализируемся на коммерческих и промышленных объектах от 500 м²." },
  { q: "Какую гарантию вы даёте?", a: "Гарантия на монтажные работы — 1 год. На оборудование — гарантия производителя." },
  { q: "Есть ли у вас лицензии и допуски?", a: "Да, Freonn имеет все необходимые лицензии, допуски СРО и лицензию МЧС для противопожарных работ." },
];

function buildFaqJsonLd(faq: Array<{ q: string; a: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(item => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function getCached(service: string): Omit<ServiceAIContent, "isAI" | "isLoading"> | null {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + service);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) { sessionStorage.removeItem(CACHE_PREFIX + service); return null; }
    return data;
  } catch { return null; }
}

function setCache(service: string, data: Omit<ServiceAIContent, "isAI" | "isLoading">) {
  try { sessionStorage.setItem(CACHE_PREFIX + service, JSON.stringify({ data, ts: Date.now() })); } catch { /* ignore */ }
}

export function useAIServiceContent(
  serviceSlug: string,
  serviceName: string,
  serviceDescription: string
): ServiceAIContent {
  const staticFaq = STATIC_FAQS[serviceSlug] || DEFAULT_FAQ;

  const [content, setContent] = useState<ServiceAIContent>({
    faq: staticFaq,
    extendedDescription: serviceDescription,
    jsonLdFaq: buildFaqJsonLd(staticFaq),
    isAI: false,
    isLoading: false,
  });
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!serviceSlug || fetchedRef.current) return;
    fetchedRef.current = true;

    const cached = getCached(serviceSlug);
    if (cached) {
      setContent({ ...cached, isAI: true, isLoading: false });
      return;
    }

    setContent(prev => ({ ...prev, isLoading: true }));

    fetch("/api/seo/service-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: serviceSlug, title: serviceName, description: serviceDescription }),
      signal: AbortSignal.timeout(12000),
    })
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (json && json.faq && Array.isArray(json.faq) && !json.fallback) {
          const aiData = {
            faq: json.faq,
            extendedDescription: json.extendedDescription || serviceDescription,
            jsonLdFaq: buildFaqJsonLd(json.faq),
          };
          setCache(serviceSlug, aiData);
          setContent({ ...aiData, isAI: true, isLoading: false });
        } else {
          setContent(prev => ({ ...prev, isLoading: false }));
        }
      })
      .catch(() => {
        setContent(prev => ({ ...prev, isLoading: false }));
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceSlug]);

  return content;
}
