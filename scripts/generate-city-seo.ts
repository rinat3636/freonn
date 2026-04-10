/**
 * generate-city-seo.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Generates unique LSI SEO texts for all city pages via Groq API.
 * Results are saved to scripts/output/city-seo-texts.json
 *
 * Usage:
 *   GROQ_API_KEY=gsk_xxx npx tsx scripts/generate-city-seo.ts
 *
 * SAFETY: If Groq is unavailable, the script exits gracefully with a message.
 * It NEVER modifies the site source files automatically — output is JSON only.
 * You review and paste into CityPage.tsx manually (or use the auto-patch flag).
 *
 * Auto-patch mode (updates CityPage.tsx directly):
 *   GROQ_API_KEY=gsk_xxx AUTO_PATCH=true npx tsx scripts/generate-city-seo.ts
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
const DELAY_MS = 1200; // Rate limit: ~50 req/min on free tier

// All cities from CityPage.tsx
const CITIES: Record<string, string> = {
  "istra": "Истра",
  "odintsovo": "Одинцово",
  "khimki": "Химки",
  "mytishchi": "Мытищи",
  "podolsk": "Подольск",
  "balashikha": "Балашиха",
  "korolev": "Королёв",
  "lyubertsy": "Люберцы",
  "serpukhov": "Серпухов",
  "klin": "Клин",
  "solnechnogorsk": "Солнечногорск",
  "volokolamsk": "Волоколамск",
  "ruza": "Руза",
  "mozhaisk": "Можайск",
  "naro-fominsk": "Нарофоминск",
  "chekhov": "Чехов",
  "domodedovo": "Домодедово",
  "ramenskoe": "Раменское",
  "elektrostal": "Электросталь",
  "noginsk": "Ногинск",
  "shchelkovo": "Щёлково",
  "fryazevo": "Фрязево",
  "pushkino": "Пушкино",
  "sergiev-posad": "Сергиев Посад",
  "dmitrov": "Дмитров",
  "dubna": "Дубна",
  "taldom": "Талдом",
  "orekhovo-zuevo": "Орехово-Зуево",
  "voskresensk": "Воскресенск",
  "kolomna": "Коломна",
  "kashira": "Кашира",
  "stupino": "Ступино",
  "protvino": "Протвино",
  "zhukovsky": "Жуковский",
  "lobnya": "Лобня",
  "dolgoprudny": "Долгопрудный",
  "krasnogorsk": "Красногорск",
  "krasnoznamensk": "Краснознаменск",
  "zelenograd": "Зеленоград",
  "troitsk": "Троицк",
  "shcherbinka": "Щербинка",
};

interface CityData {
  district: string;
  lsi: string;
  objects: string;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateCityText(citySlug: string, cityName: string): Promise<CityData | null> {
  if (!API_KEY) return null;

  const prompt = `Напиши уникальный SEO-текст (2–3 предложения, 60–90 слов) для страницы "Монтаж инженерных систем в ${cityName}" компании Freonn.

Требования:
- Включи LSI-ключевые слова: вентиляция, кондиционирование, дымоудаление, отопление, монтаж под ключ
- Упомяни специфику ${cityName} (тип предприятий, промышленность, особенности района)
- Текст должен быть уникальным, не похожим на другие города
- Укажи типичные объекты через запятую (3–5 типов)
- Укажи правильное склонение района (например: "Истринском районе", "городском округе Химки")

Ответь строго в JSON (без markdown, только JSON):
{"lsi": "...", "district": "...", "objects": "..."}`;

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
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`  ✗ API error for ${cityName}: ${response.status} ${err}`);
      return null;
    }

    const data = await response.json() as { choices: Array<{ message: { content: string } }> };
    const content = data.choices?.[0]?.message?.content ?? "";

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error(`  ✗ No JSON in response for ${cityName}: ${content.slice(0, 100)}`);
      return null;
    }

    const parsed = JSON.parse(jsonMatch[0]) as CityData;
    return {
      lsi: String(parsed.lsi ?? "").trim(),
      district: String(parsed.district ?? `${cityName}ском районе`).trim(),
      objects: String(parsed.objects ?? "Промышленные объекты, коммерческая недвижимость").trim(),
    };
  } catch (err) {
    console.error(`  ✗ Error for ${cityName}:`, err);
    return null;
  }
}

function patchCityPage(results: Record<string, CityData>): void {
  const cityPagePath = path.resolve(__dirname, "../client/src/pages/CityPage.tsx");

  if (!fs.existsSync(cityPagePath)) {
    console.error("✗ CityPage.tsx not found at expected path");
    return;
  }

  let content = fs.readFileSync(cityPagePath, "utf-8");

  // Build new cityDescriptions object
  const entries = Object.entries(results)
    .map(([slug, data]) => {
      const escaped = (s: string) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return `  "${slug}": {\n    district: "${escaped(data.district)}",\n    lsi: "${escaped(data.lsi)}",\n    objects: "${escaped(data.objects)}",\n  }`;
    })
    .join(",\n");

  const newBlock = `const cityDescriptions: Record<string, { district: string; lsi: string; objects: string }> = {\n${entries},\n};`;

  // Replace existing cityDescriptions block
  const regex = /const cityDescriptions: Record<string, \{ district: string; lsi: string; objects: string \}> = \{[\s\S]*?\n\};/;

  if (regex.test(content)) {
    content = content.replace(regex, newBlock);
    fs.writeFileSync(cityPagePath, content, "utf-8");
    console.log("\n✓ CityPage.tsx patched successfully!");
  } else {
    console.error("\n✗ Could not find cityDescriptions block in CityPage.tsx");
    console.log("  Please update manually using the JSON output file.");
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  Freonn SEO — City Pages Text Generator (Groq API)");
  console.log("═══════════════════════════════════════════════════════\n");

  if (!API_KEY) {
    console.error("✗ GROQ_API_KEY is not set.");
    console.error("  Usage: GROQ_API_KEY=gsk_xxx npx tsx scripts/generate-city-seo.ts");
    process.exit(1);
  }

  console.log(`  Model: ${GROQ_MODEL}`);
  console.log(`  Cities: ${Object.keys(CITIES).length}`);
  console.log(`  Auto-patch CityPage.tsx: ${AUTO_PATCH ? "YES" : "NO"}\n`);

  const outputDir = path.resolve(__dirname, "output");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const results: Record<string, CityData> = {};
  const failed: string[] = [];
  const cityEntries = Object.entries(CITIES);

  for (let i = 0; i < cityEntries.length; i++) {
    const [slug, name] = cityEntries[i];
    process.stdout.write(`  [${String(i + 1).padStart(2)}/${cityEntries.length}] ${name.padEnd(20)}`);

    const data = await generateCityText(slug, name);

    if (data) {
      results[slug] = data;
      console.log("✓");
    } else {
      failed.push(slug);
      console.log("✗ (fallback will be used)");
    }

    // Rate limiting — pause between requests
    if (i < cityEntries.length - 1) await sleep(DELAY_MS);
  }

  // Save results
  const outputPath = path.resolve(outputDir, "city-seo-texts.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");

  console.log(`\n═══════════════════════════════════════════════════════`);
  console.log(`  Done! ${Object.keys(results).length} cities generated, ${failed.length} failed.`);
  console.log(`  Output: ${outputPath}`);

  if (failed.length > 0) {
    console.log(`  Failed cities: ${failed.join(", ")}`);
  }

  if (AUTO_PATCH && Object.keys(results).length > 0) {
    console.log("\n  Patching CityPage.tsx...");
    patchCityPage(results);
  } else if (Object.keys(results).length > 0) {
    console.log("\n  To apply to CityPage.tsx, run with AUTO_PATCH=true");
    console.log("  Or review the JSON and update manually.");
  }
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
