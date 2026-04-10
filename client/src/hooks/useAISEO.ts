/**
 * useAISEO — Groq-powered dynamic SEO meta generation
 *
 * Generates title, description, keywords via Groq API for any page.
 * SAFETY: Full graceful fallback — if Groq unavailable, uses provided static values.
 * PERFORMANCE: Results cached in sessionStorage to avoid repeated API calls.
 */
import { useState, useEffect, useRef } from "react";

export interface AISEOInput {
  /** Page type for context */
  type: "city" | "service" | "blog" | "home" | "about" | "contacts" | "faq" | "pricing";
  /** Static fallback title (shown immediately, replaced by AI) */
  fallbackTitle: string;
  /** Static fallback description */
  fallbackDescription: string;
  /** Static fallback keywords */
  fallbackKeywords?: string;
  /** Extra data for AI context */
  data?: Record<string, string>;
  /** Unique cache key (e.g. city slug or service slug) */
  cacheKey: string;
}

export interface AISEOResult {
  title: string;
  description: string;
  keywords: string;
  isAI: boolean;
  isLoading: boolean;
}

const CACHE_PREFIX = "freonn_aiseo_v1_";
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

function getCached(key: string): { title: string; description: string; keywords: string } | null {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) { sessionStorage.removeItem(CACHE_PREFIX + key); return null; }
    return data;
  } catch { return null; }
}

function setCache(key: string, data: { title: string; description: string; keywords: string }) {
  try { sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ data, ts: Date.now() })); } catch { /* ignore */ }
}

export function useAISEO({
  type,
  fallbackTitle,
  fallbackDescription,
  fallbackKeywords = "",
  data = {},
  cacheKey,
}: AISEOInput): AISEOResult {
  const [result, setResult] = useState<AISEOResult>({
    title: fallbackTitle,
    description: fallbackDescription,
    keywords: fallbackKeywords,
    isAI: false,
    isLoading: false,
  });
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    // Check cache first
    const cached = getCached(cacheKey);
    if (cached) {
      setResult({ ...cached, isAI: true, isLoading: false });
      return;
    }

    // Fetch from AI
    setResult(prev => ({ ...prev, isLoading: true }));

    fetch("/api/seo/meta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data: { ...data, fallbackTitle, fallbackDescription } }),
      signal: AbortSignal.timeout(8000),
    })
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (json && json.title && !json.fallback) {
          const aiResult = {
            title: json.title,
            description: json.description,
            keywords: json.keywords || fallbackKeywords,
          };
          setCache(cacheKey, aiResult);
          setResult({ ...aiResult, isAI: true, isLoading: false });
        } else {
          setResult(prev => ({ ...prev, isLoading: false }));
        }
      })
      .catch(() => {
        setResult(prev => ({ ...prev, isLoading: false }));
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey]);

  return result;
}
