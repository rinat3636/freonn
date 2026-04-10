/**
 * generate-meta-tags.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Generates unique SEO meta tags (title + description) for all pages via Groq.
 * Output: scripts/output/meta-tags.json
 *
 * Usage:
 *   GROQ_API_KEY=gsk_xxx npx tsx scripts/generate-meta-tags.ts
 *
 * SAFETY: Read-only by default. Never modifies source files.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.1-8b-instant"; // Fast model is enough for meta tags
const API_KEY = process.env.GROQ_API_KEY ?? "";
const DELAY_MS = 800;

interface PageMeta {
  url: string;
  title: string;
  description: string;
  keywords: string;
}

const PAGES: Array<{ url: string; type: string; name: string; context: string }> = [
  { url: "/", type: "home", name: "Главная", context: "Монтаж инженерных систем под ключ в Москве и МО: вентиляция, кондиционирование, дымоудаление, отопление, электроснабжение. 15 лет опыта, 1280 объектов." },
  { url: "/o-kompanii", type: "about", name: "О компании", context: "Freonn — инженерная компания с 2011 года. 25 монтажных бригад, 1280+ объектов, гарантия 1 год." },
  { url: "/uslugi", type: "services", name: "Услуги", context: "Все услуги: монтаж вентиляции, кондиционирования, дымоудаления, отопления, холодоснабжения, водоснабжения, электроснабжения, пескоструй." },
  { url: "/ventilyaciya", type: "service", name: "Вентиляция", context: "Монтаж систем вентиляции: приточно-вытяжные системы, промышленная вентиляция, вентиляция для производств и ТЦ." },
  { url: "/kondicionirovanie", type: "service", name: "Кондиционирование", context: "Монтаж систем кондиционирования: сплит-системы, VRF/VRV, чиллеры и фанкойлы для коммерческих и промышленных объектов." },
  { url: "/dymoudalenie", type: "service", name: "Дымоудаление", context: "Монтаж систем противодымной защиты по нормам МЧС: дымоудаление, подпор воздуха, противодымная вентиляция." },
  { url: "/otoplenie", type: "service", name: "Отопление", context: "Монтаж систем отопления: воздушное, водяное и электрическое отопление для производственных и коммерческих объектов." },
  { url: "/holodosnabzhenie", type: "service", name: "Холодоснабжение", context: "Монтаж промышленных холодильных систем: чиллеры, фреоновые системы для пищевых производств и складов." },
  { url: "/vodosnabzhenie", type: "service", name: "Водоснабжение", context: "Монтаж систем водоснабжения и канализации для промышленных и коммерческих объектов." },
  { url: "/elektrosnabzhenie", type: "service", name: "Электроснабжение", context: "Электромонтажные работы: электроснабжение, освещение, электрощитовые для промышленных объектов." },
  { url: "/peskostrujnaya-obrabotka", type: "service", name: "Пескоструй", context: "Пескоструйная обработка металлоконструкций: очистка, подготовка под покраску, антикоррозийная обработка." },
  { url: "/obekty", type: "objects", name: "Объекты", context: "Портфолио выполненных объектов: промышленные предприятия, торговые центры, бизнес-центры, жилые комплексы." },
  { url: "/ceny", type: "pricing", name: "Цены", context: "Прайс-лист на монтаж инженерных систем: стоимость вентиляции, кондиционирования, отопления в Москве." },
  { url: "/blog", type: "blog", name: "Блог", context: "Экспертные статьи об инженерных системах: вентиляция, кондиционирование, отопление, автоматизация." },
  { url: "/faq", type: "faq", name: "Вопросы и ответы", context: "Ответы на частые вопросы о монтаже инженерных систем, стоимости, сроках и гарантиях." },
  { url: "/contacts", type: "contacts", name: "Контакты", context: "Контакты Freonn: телефон 8(800)101-2009, email info@freonn.ru, адрес в Дзержинском." },
  { url: "/garantii", type: "guarantee", name: "Гарантии", context: "Гарантии Freonn: 1 год на монтажные работы, гарантия производителя на оборудование, сервисное обслуживание." },
  { url: "/partnery", type: "partners", name: "Партнёрам", context: "Партнёрская программа Freonn: сотрудничество с проектировщиками, застройщиками, управляющими компаниями." },
  { url: "/vakansii", type: "vacancies", name: "Вакансии", context: "Вакансии в Freonn: монтажники инженерных систем, инженеры-проектировщики, прорабы." },
];

async function generateMeta(page: typeof PAGES[0]): Promise<PageMeta | null> {
  if (!API_KEY) return null;

  const prompt = `Напиши SEO Title и Meta Description для страницы сайта инженерной компании Freonn (freonn.ru).

Страница: ${page.name} (${page.url})
Контекст: ${page.context}

Требования:
- Title: до 60 символов, включи ключевое слово и "Freonn" или "Москва"
- Description: до 160 символов, привлекательный, с призывом к действию
- Keywords: 5–7 ключевых слов через запятую

Ответь строго в JSON:
{"title":"...","description":"...","keywords":"..."}`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      console.error(`  ✗ API error: ${response.status}`);
      return null;
    }

    const data = await response.json() as { choices: Array<{ message: { content: string } }> };
    const content = data.choices?.[0]?.message?.content ?? "";

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      url: page.url,
      title: String(parsed.title ?? "").slice(0, 65),
      description: String(parsed.description ?? "").slice(0, 165),
      keywords: String(parsed.keywords ?? ""),
    };
  } catch (err) {
    console.error(`  ✗ Error for ${page.url}:`, err);
    return null;
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  Freonn SEO — Meta Tags Generator (Groq API)");
  console.log("═══════════════════════════════════════════════════════\n");

  if (!API_KEY) {
    console.error("✗ GROQ_API_KEY is not set.");
    console.error("  Usage: GROQ_API_KEY=gsk_xxx npx tsx scripts/generate-meta-tags.ts");
    process.exit(1);
  }

  const outputDir = path.resolve(__dirname, "output");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const results: PageMeta[] = [];
  const failed: string[] = [];

  for (let i = 0; i < PAGES.length; i++) {
    const page = PAGES[i];
    process.stdout.write(`  [${String(i + 1).padStart(2)}/${PAGES.length}] ${page.url.padEnd(35)}`);

    const meta = await generateMeta(page);

    if (meta) {
      results.push(meta);
      console.log("✓");
    } else {
      failed.push(page.url);
      console.log("✗");
    }

    if (i < PAGES.length - 1) {
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  const outputPath = path.resolve(outputDir, "meta-tags.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");

  console.log(`\n═══════════════════════════════════════════════════════`);
  console.log(`  Done! ${results.length} pages processed, ${failed.length} failed.`);
  console.log(`  Output: ${outputPath}`);

  if (results.length > 0) {
    console.log("\n  Sample output:");
    const sample = results[0];
    console.log(`  URL: ${sample.url}`);
    console.log(`  Title: ${sample.title}`);
    console.log(`  Description: ${sample.description}`);
  }
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
