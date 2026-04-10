/**
 * cluster-keywords.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Clusters a list of keywords by page intent using Groq AI.
 * Input: scripts/input/keywords.txt (one keyword per line)
 * Output: scripts/output/keyword-clusters.json + scripts/output/keyword-clusters.md
 *
 * Usage:
 *   # Create input file first:
 *   echo "монтаж вентиляции\nвентиляция цена\nкупить кондиционер" > scripts/input/keywords.txt
 *
 *   GROQ_API_KEY=gsk_xxx npx tsx scripts/cluster-keywords.ts
 *
 * SAFETY: Read-only. Never modifies site source files.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const API_KEY = process.env.GROQ_API_KEY ?? "";
const BATCH_SIZE = 80; // Keywords per API call (stay within token limits)
const DELAY_MS = 2000;

interface KeywordCluster {
  page: string;
  pageTitle: string;
  url: string;
  intent: "commercial" | "informational" | "navigational";
  priority: "high" | "medium" | "low";
  keywords: string[];
  missingFromSite?: boolean;
}

interface ClusterResult {
  totalKeywords: number;
  processedAt: string;
  clusters: KeywordCluster[];
  unclustered: string[];
}

// Known pages for clustering context
const SITE_PAGES = `
Страницы сайта Freonn.ru:
- / (Главная) — монтаж инженерных систем под ключ
- /ventilyaciya — вентиляция
- /kondicionirovanie — кондиционирование
- /dymoudalenie — дымоудаление
- /otoplenie — отопление
- /holodosnabzhenie — холодоснабжение
- /vodosnabzhenie — водоснабжение
- /elektrosnabzhenie — электроснабжение
- /peskostrujnaya-obrabotka — пескоструйная обработка
- /obekty — портфолио объектов
- /blog — блог
- /o-kompanii — о компании
- /contacts — контакты
- /ceny — цены
- /garantii — гарантии
- Городские страницы: /istra, /odintsovo, /khimki, /mytishchi, /podolsk и т.д.
`;

async function clusterBatch(keywords: string[]): Promise<KeywordCluster[]> {
  const prompt = `Ты — SEO-специалист. Кластеризуй ключевые слова для сайта инженерной компании Freonn.ru.

${SITE_PAGES}

Ключевые слова для кластеризации:
${keywords.map((k, i) => `${i + 1}. ${k}`).join("\n")}

Задача:
1. Распредели каждое ключевое слово по наиболее подходящей странице сайта
2. Определи интент: "commercial" (хочет купить/заказать), "informational" (хочет узнать), "navigational" (ищет конкретную компанию)
3. Определи приоритет: "high" (высокочастотный, коммерческий), "medium", "low"
4. Если ключевое слово не подходит ни к одной странице — добавь в "unclustered"
5. Если ключевое слово указывает на отсутствующую страницу — отметь missingFromSite: true

Ответь строго в JSON:
{
  "clusters": [
    {
      "page": "slug страницы",
      "pageTitle": "Название страницы",
      "url": "/url-страницы",
      "intent": "commercial|informational|navigational",
      "priority": "high|medium|low",
      "keywords": ["ключ1", "ключ2"],
      "missingFromSite": false
    }
  ],
  "unclustered": ["ключ1", "ключ2"]
}`;

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
        max_tokens: 3000,
        temperature: 0.3, // Low temperature for consistent clustering
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`  ✗ API error: ${response.status} ${err.slice(0, 200)}`);
      return [];
    }

    const data = await response.json() as { choices: Array<{ message: { content: string } }> };
    const content = data.choices?.[0]?.message?.content ?? "";

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("  ✗ No JSON in response");
      return [];
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return Array.isArray(parsed.clusters) ? parsed.clusters : [];
  } catch (err) {
    console.error("  ✗ Error clustering batch:", err);
    return [];
  }
}

function mergeClusters(allClusters: KeywordCluster[][]): KeywordCluster[] {
  const merged: Map<string, KeywordCluster> = new Map();

  for (const batch of allClusters) {
    for (const cluster of batch) {
      const existing = merged.get(cluster.page);
      if (existing) {
        // Merge keywords, avoid duplicates
        const combined = [...new Set([...existing.keywords, ...cluster.keywords])];
        merged.set(cluster.page, { ...existing, keywords: combined });
      } else {
        merged.set(cluster.page, { ...cluster });
      }
    }
  }

  // Sort by priority and keyword count
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return Array.from(merged.values()).sort((a, b) => {
    const pa = priorityOrder[a.priority] ?? 2;
    const pb = priorityOrder[b.priority] ?? 2;
    if (pa !== pb) return pa - pb;
    return b.keywords.length - a.keywords.length;
  });
}

function generateMarkdownReport(result: ClusterResult): string {
  const lines: string[] = [
    "# Кластеризация семантики Freonn.ru",
    "",
    `**Дата:** ${result.processedAt}`,
    `**Всего ключевых слов:** ${result.totalKeywords}`,
    `**Кластеров:** ${result.clusters.length}`,
    "",
    "---",
    "",
  ];

  // Summary table
  lines.push("## Сводная таблица кластеров", "");
  lines.push("| Страница | URL | Интент | Приоритет | Кол-во ключей |");
  lines.push("|---|---|---|---|---|");

  for (const cluster of result.clusters) {
    const intentEmoji = cluster.intent === "commercial" ? "🛒" : cluster.intent === "informational" ? "📖" : "🔍";
    const priorityEmoji = cluster.priority === "high" ? "🔴" : cluster.priority === "medium" ? "🟡" : "🟢";
    const missing = cluster.missingFromSite ? " ⚠️ нет страницы" : "";
    lines.push(`| ${cluster.pageTitle}${missing} | \`${cluster.url}\` | ${intentEmoji} ${cluster.intent} | ${priorityEmoji} ${cluster.priority} | ${cluster.keywords.length} |`);
  }

  lines.push("");

  // Detailed clusters
  lines.push("## Детальные кластеры", "");

  for (const cluster of result.clusters) {
    const missing = cluster.missingFromSite ? " ⚠️ *Страница отсутствует на сайте*" : "";
    lines.push(`### ${cluster.pageTitle} — \`${cluster.url}\`${missing}`, "");
    lines.push(`**Интент:** ${cluster.intent} | **Приоритет:** ${cluster.priority}`, "");
    lines.push("**Ключевые слова:**", "");
    for (const kw of cluster.keywords) {
      lines.push(`- ${kw}`);
    }
    lines.push("");
  }

  // Unclustered
  if (result.unclustered.length > 0) {
    lines.push("## Нераспределённые ключевые слова", "");
    lines.push("*Эти ключевые слова не подошли ни к одной существующей странице. Рассмотрите создание новых страниц.*", "");
    for (const kw of result.unclustered) {
      lines.push(`- ${kw}`);
    }
  }

  return lines.join("\n");
}

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  Freonn SEO — Keyword Clustering (Groq API)");
  console.log("═══════════════════════════════════════════════════════\n");

  if (!API_KEY) {
    console.error("✗ GROQ_API_KEY is not set.");
    console.error("  Usage: GROQ_API_KEY=gsk_xxx npx tsx scripts/cluster-keywords.ts");
    process.exit(1);
  }

  // Read input keywords
  const inputDir = path.resolve(__dirname, "input");
  const inputPath = path.resolve(inputDir, "keywords.txt");

  if (!fs.existsSync(inputPath)) {
    // Create example file
    if (!fs.existsSync(inputDir)) fs.mkdirSync(inputDir, { recursive: true });
    const example = [
      "монтаж вентиляции Москва",
      "стоимость вентиляции",
      "вентиляция для производства",
      "кондиционер для офиса цена",
      "монтаж кондиционирования",
      "дымоудаление нормы МЧС",
      "монтаж отопления склад",
      "пескоструйная обработка металл",
      "инженерные системы под ключ",
      "обслуживание вентиляции",
    ].join("\n");

    fs.writeFileSync(inputPath, example, "utf-8");
    console.log(`  Created example input file: ${inputPath}`);
    console.log("  Add your keywords (one per line) and run again.\n");
  }

  const rawKeywords = fs.readFileSync(inputPath, "utf-8")
    .split("\n")
    .map(k => k.trim())
    .filter(k => k.length > 0 && !k.startsWith("#"));

  if (rawKeywords.length === 0) {
    console.error("✗ No keywords found in input file.");
    process.exit(1);
  }

  console.log(`  Keywords loaded: ${rawKeywords.length}`);
  console.log(`  Batch size: ${BATCH_SIZE}`);
  console.log(`  Batches: ${Math.ceil(rawKeywords.length / BATCH_SIZE)}\n`);

  // Split into batches
  const batches: string[][] = [];
  for (let i = 0; i < rawKeywords.length; i += BATCH_SIZE) {
    batches.push(rawKeywords.slice(i, i + BATCH_SIZE));
  }

  const allClusterBatches: KeywordCluster[][] = [];
  const allUnclustered: string[] = [];

  for (let i = 0; i < batches.length; i++) {
    console.log(`  Processing batch ${i + 1}/${batches.length} (${batches[i].length} keywords)...`);
    const clusters = await clusterBatch(batches[i]);
    allClusterBatches.push(clusters);
    console.log(`    ✓ Got ${clusters.length} clusters`);

    if (i < batches.length - 1) {
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  const mergedClusters = mergeClusters(allClusterBatches);

  const result: ClusterResult = {
    totalKeywords: rawKeywords.length,
    processedAt: new Date().toLocaleString("ru-RU"),
    clusters: mergedClusters,
    unclustered: allUnclustered,
  };

  // Save outputs
  const outputDir = path.resolve(__dirname, "output");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const jsonPath = path.resolve(outputDir, "keyword-clusters.json");
  const mdPath = path.resolve(outputDir, "keyword-clusters.md");

  fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2), "utf-8");
  fs.writeFileSync(mdPath, generateMarkdownReport(result), "utf-8");

  console.log(`\n═══════════════════════════════════════════════════════`);
  console.log(`  Done! ${mergedClusters.length} clusters created.`);
  console.log(`  JSON: ${jsonPath}`);
  console.log(`  Report: ${mdPath}`);

  // Show pages needing creation
  const missingPages = mergedClusters.filter(c => c.missingFromSite);
  if (missingPages.length > 0) {
    console.log(`\n  ⚠️  Pages to create (${missingPages.length}):`);
    for (const p of missingPages) {
      console.log(`    - ${p.pageTitle} (${p.keywords.length} keywords)`);
    }
  }
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
