/**
 * useAICityContent — Groq-powered unique LSI content for city pages
 *
 * Generates unique SEO text for each city page via Groq API.
 * SAFETY: Full graceful fallback to static cityDescriptions if Groq unavailable.
 * PERFORMANCE: Cached in sessionStorage for 7 days per city.
 */
import { useState, useEffect, useRef } from "react";

export interface CityContent {
  lsi: string;
  district: string;
  objects: string;
  faq?: Array<{ q: string; a: string }>;
  isAI: boolean;
  isLoading: boolean;
}

const CACHE_PREFIX = "freonn_city_v2_";
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

function getCached(city: string): Omit<CityContent, "isAI" | "isLoading"> | null {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + city);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) { sessionStorage.removeItem(CACHE_PREFIX + city); return null; }
    return data;
  } catch { return null; }
}

function setCache(city: string, data: Omit<CityContent, "isAI" | "isLoading">) {
  try { sessionStorage.setItem(CACHE_PREFIX + city, JSON.stringify({ data, ts: Date.now() })); } catch { /* ignore */ }
}

export function useAICityContent(
  city: string,
  cityName: string,
  staticFallback: { lsi: string; district: string; objects: string }
): CityContent {
  const [content, setContent] = useState<CityContent>({
    ...staticFallback,
    faq: undefined,
    isAI: false,
    isLoading: false,
  });
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!city || !cityName || fetchedRef.current) return;
    fetchedRef.current = true;

    // Check cache
    const cached = getCached(city);
    if (cached) {
      setContent({ ...cached, isAI: true, isLoading: false });
      return;
    }

    setContent(prev => ({ ...prev, isLoading: true }));

    fetch("/api/seo/city-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city, cityName }),
      signal: AbortSignal.timeout(10000),
    })
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (json && json.lsi && !json.fallback) {
          const aiData = {
            lsi: json.lsi,
            district: json.district || staticFallback.district,
            objects: json.objects || staticFallback.objects,
            faq: json.faq || undefined,
          };
          setCache(city, aiData);
          setContent({ ...aiData, isAI: true, isLoading: false });
        } else {
          setContent(prev => ({ ...prev, isLoading: false }));
        }
      })
      .catch(() => {
        setContent(prev => ({ ...prev, isLoading: false }));
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, cityName]);

  return content;
}
