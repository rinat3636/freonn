/**
 * generate-blog-articles.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Generates SEO blog articles for Freonn.ru via Groq API.
 * Articles are saved to scripts/output/articles/ as Markdown files.
 *
 * Usage:
 *   # Generate all topics from the built-in list:
 *   GROQ_API_KEY=gsk_xxx npx tsx scripts/generate-blog-articles.ts
 *
 *   # Generate a single article on a custom topic:
 *   GROQ_API_KEY=gsk_xxx TOPIC="Монтаж чиллеров" CATEGORY="Кондиционирование" \
 *     npx tsx scripts/generate-blog-articles.ts --single
 *
 *   # Generate and auto-add to BlogArticle.tsx:
 *   GROQ_API_KEY=gsk_xxx AUTO_PATCH=true npx tsx scripts/generate-blog-articles.ts
 *
 * SAFETY: Never modifies source files unless AUTO_PATCH=true.
 * If Groq is unavailable — exits with clear message, no damage to the site.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const API_KEY = process.env.GROQ_API_KEY ?? "";
const AUTO_PATCH = process.env.AUTO_PATCH === "true";
const SINGLE_MODE = process.argv.includes("--single");
const DELAY_MS = 2000;

// ─── Built-in topic list (expand as needed) ───────────────────────────────────
const ARTICLE_TOPICS = [
  { topic: "Монтаж приточно-вытяжной вентиляции в торговом центре", category: "Вентиляция", keywords: ["вентиляция ТЦ", "приточно-вытяжная вентиляция", "монтаж вентиляции торговый центр"] },
  { topic: "Системы кондиционирования для серверных комнат и ЦОД", category: "Кондиционирование", keywords: ["кондиционирование серверной", "прецизионный кондиционер", "ЦОД охлаждение"] },
  { topic: "Воздушное отопление производственных цехов: нормы и решения", category: "Отопление", keywords: ["воздушное отопление цеха", "отопление производства", "тепловая завеса"] },
  { topic: "Системы дымоудаления: требования МЧС и проектирование", category: "Дымоудаление", keywords: ["дымоудаление МЧС", "противодымная защита", "система дымоудаления"] },
  { topic: "Холодоснабжение пищевых производств: чиллеры и фреоновые системы", category: "Холодоснабжение", keywords: ["холодоснабжение производство", "чиллер", "промышленное холодоснабжение"] },
  { topic: "VRF/VRV системы кондиционирования: преимущества и монтаж", category: "Кондиционирование", keywords: ["VRF система", "VRV кондиционирование", "мультизональная система"] },
  { topic: "Вентиляция складских комплексов: расчёт и проектирование", category: "Вентиляция", keywords: ["вентиляция склада", "вентиляция складского комплекса", "приточная вентиляция склад"] },
  { topic: "Пескоструйная обработка металлоконструкций: технология и применение", category: "Пескоструй", keywords: ["пескоструйная обработка", "пескоструй металл", "антикоррозийная обработка"] },
  { topic: "Сервисное обслуживание систем вентиляции: регламент и периодичность", category: "Обслуживание", keywords: ["обслуживание вентиляции", "ТО вентиляции", "сервис инженерных систем"] },
  { topic: "Монтаж систем водоснабжения промышленных объектов", category: "Водоснабжение", keywords: ["водоснабжение промышленность", "монтаж водоснабжения", "промышленное водоснабжение"] },
];

interface ArticleMeta {
  title: string;
  description: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
}

interface GeneratedArticle {
  meta: ArticleMeta;
  content: string;
  topic: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[а-яё]/g, char => {
      const map: Record<string, string> = {
        а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"yo",ж:"zh",з:"z",и:"i",
        й:"j",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",
        у:"u",ф:"f",х:"h",ц:"ts",ч:"ch",ш:"sh",щ:"shch",ъ:"",ы:"y",
        ь:"",э:"e",ю:"yu",я:"ya",
      };
      return map[char] ?? char;
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} минут`;
}

async function generateArticle(
  topic: string,
  category: string,
  keywords: string[]
): Promise<GeneratedArticle | null> {
  if (!API_KEY) return null;

  const kwList = keywords.join(", ");

  const prompt = `Напиши экспертную SEO-статью для блога инженерной компании Freonn (freonn.ru).

Тема: "${topic}"
Категория: ${category}
Ключевые слова: ${kwList}

Требования к статье:
- Объём: 700–900 слов
- Структура: введение (2–3 предложения), 3–4 раздела с заголовками H2, заключение с призывом к действию
- В заключении упомяни компанию Freonn и предложи оставить заявку
- Используй ключевые слова органично (не спам)
- Пиши профессионально, как инженер-эксперт
- Формат текста: Markdown (используй ## для H2, ### для H3, **жирный** для акцентов)
- НЕ используй H1 (# заголовок) — он будет добавлен отдельно

После статьи добавь JSON-блок с мета-данными:
\`\`\`json
{
  "title": "SEO Title до 60 символов",
  "description": "Meta Description до 160 символов",
  "slug": "url-slug-transliterated",
  "excerpt": "Краткое описание 1–2 предложения для превью в блоге"
}
\`\`\``;

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
        max_tokens: 2500,
        temperature: 0.75,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`  ✗ API error: ${response.status} ${err.slice(0, 200)}`);
      return null;
    }

    const data = await response.json() as { choices: Array<{ message: { content: string } }> };
    const raw = data.choices?.[0]?.message?.content ?? "";

    // Extract JSON meta block
    const jsonMatch = raw.match(/```json\s*([\s\S]*?)```/);
    let meta: ArticleMeta = {
      title: topic,
      description: "",
      slug: slugify(topic),
      excerpt: "",
      category,
      readTime: "7 минут",
    };

    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        meta = {
          title: String(parsed.title ?? topic).slice(0, 65),
          description: String(parsed.description ?? "").slice(0, 165),
          slug: String(parsed.slug ?? slugify(topic)),
          excerpt: String(parsed.excerpt ?? ""),
          category,
          readTime: "7 минут",
        };
      } catch {
        // use defaults
      }
    }

    // Remove JSON block from content
    const content = raw.replace(/```json[\s\S]*?```/, "").trim();
    meta.readTime = estimateReadTime(content);

    return { meta, content, topic };
  } catch (err) {
    console.error(`  ✗ Error generating article:`, err);
    return null;
  }
}

function saveArticle(article: GeneratedArticle, outputDir: string): string {
  const filename = `${article.meta.slug}.md`;
  const filepath = path.resolve(outputDir, filename);

  const fileContent = `---
title: "${article.meta.title}"
description: "${article.meta.description}"
slug: "${article.meta.slug}"
category: "${article.meta.category}"
readTime: "${article.meta.readTime}"
excerpt: "${article.meta.excerpt}"
---

# ${article.meta.title}

${article.content}
`;

  fs.writeFileSync(filepath, fileContent, "utf-8");
  return filepath;
}

function patchBlogArticle(articles: GeneratedArticle[]): void {
  const blogArticlePath = path.resolve(__dirname, "../client/src/pages/BlogArticle.tsx");

  if (!fs.existsSync(blogArticlePath)) {
    console.error("✗ BlogArticle.tsx not found");
    return;
  }

  let content = fs.readFileSync(blogArticlePath, "utf-8");

  // Find the articles object closing brace
  const insertPoint = content.lastIndexOf('};');
  if (insertPoint === -1) {
    console.error("✗ Could not find insertion point in BlogArticle.tsx");
    return;
  }

  const newEntries = articles.map(article => {
    const escaped = (s: string) => s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
    return `  "${article.meta.slug}": {
    title: "${article.meta.title.replace(/"/g, '\\"')}",
    category: "${article.meta.category}",
    readTime: "${article.meta.readTime}",
    img: \`\${CDN}/ru-hvac-production_2fc3fdd7.jpg\`,
    content: \`${escaped(article.content)}\`,
  }`;
  }).join(",\n");

  // Insert before the last closing brace of the articles object
  const before = content.slice(0, insertPoint);
  const after = content.slice(insertPoint);

  // Check if there's already content (add comma if needed)
  const needsComma = before.trimEnd().endsWith("}");
  const insertion = needsComma ? `,\n${newEntries}` : newEntries;

  content = before + insertion + "\n" + after;
  fs.writeFileSync(blogArticlePath, content, "utf-8");
  console.log(`\n✓ BlogArticle.tsx patched with ${articles.length} new articles!`);
}

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  Freonn SEO — Blog Article Generator (Groq API)");
  console.log("═══════════════════════════════════════════════════════\n");

  if (!API_KEY) {
    console.error("✗ GROQ_API_KEY is not set.");
    console.error("  Usage: GROQ_API_KEY=gsk_xxx npx tsx scripts/generate-blog-articles.ts");
    process.exit(1);
  }

  const outputDir = path.resolve(__dirname, "output/articles");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  let topics = ARTICLE_TOPICS;

  // Single mode: use env vars
  if (SINGLE_MODE) {
    const topic = process.env.TOPIC;
    const category = process.env.CATEGORY ?? "Инженерные системы";
    const keywords = (process.env.KEYWORDS ?? "").split(",").map(k => k.trim()).filter(Boolean);

    if (!topic) {
      console.error("✗ TOPIC env var is required in --single mode");
      process.exit(1);
    }

    topics = [{ topic, category, keywords }];
  }

  console.log(`  Model: ${GROQ_MODEL}`);
  console.log(`  Articles to generate: ${topics.length}`);
  console.log(`  Auto-patch BlogArticle.tsx: ${AUTO_PATCH ? "YES" : "NO"}\n`);

  const generated: GeneratedArticle[] = [];
  const failed: string[] = [];

  for (let i = 0; i < topics.length; i++) {
    const { topic, category, keywords } = topics[i];
    console.log(`  [${i + 1}/${topics.length}] ${topic}`);

    const article = await generateArticle(topic, category, keywords);

    if (article) {
      const filepath = saveArticle(article, outputDir);
      generated.push(article);
      console.log(`    ✓ Saved: ${path.basename(filepath)} (${article.meta.readTime})`);
    } else {
      failed.push(topic);
      console.log(`    ✗ Failed`);
    }

    if (i < topics.length - 1) await sleep(DELAY_MS);
  }

  // Save summary JSON
  const summaryPath = path.resolve(__dirname, "output/articles-summary.json");
  fs.writeFileSync(
    summaryPath,
    JSON.stringify(
      generated.map(a => ({ slug: a.meta.slug, title: a.meta.title, category: a.meta.category, excerpt: a.meta.excerpt })),
      null,
      2
    ),
    "utf-8"
  );

  console.log(`\n═══════════════════════════════════════════════════════`);
  console.log(`  Done! ${generated.length} articles generated, ${failed.length} failed.`);
  console.log(`  Output directory: ${outputDir}`);
  console.log(`  Summary: ${summaryPath}`);

  if (AUTO_PATCH && generated.length > 0) {
    console.log("\n  Patching BlogArticle.tsx...");
    patchBlogArticle(generated);
  } else if (generated.length > 0) {
    console.log("\n  To add to BlogArticle.tsx, run with AUTO_PATCH=true");
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
