import { useEffect } from "react";

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "service";
  canonical?: string;
  /** JSON-LD structured data object(s) — pass array for multiple schemas */
  jsonLd?: object | object[];
  /** noindex pages (404, coming-soon, etc.) */
  noIndex?: boolean;
  /** Article published date ISO string */
  publishedTime?: string;
  /** Article modified date ISO string */
  modifiedTime?: string;
  /** Breadcrumb items for BreadcrumbList schema */
  breadcrumbs?: Array<{ name: string; url: string }>;
  /** Article author name */
  author?: string;
  /** Article section / category */
  section?: string;
  /** Article tags */
  tags?: string[];
}

export const SITE_NAME = "Freonn — Инженерная компания";
export const SITE_URL = "https://freonn.ru";
export const DEFAULT_OG_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/og-cover_freonn.jpg";
export const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-logo_62401a1b.png";

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(
    `meta[${attr}="${name}"]`
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(name: string, property = false) {
  const attr = property ? "property" : "name";
  const el = document.querySelector(`meta[${attr}="${name}"]`);
  if (el) el.remove();
}

function removeAllMeta(name: string, property = false) {
  const attr = property ? "property" : "name";
  document.querySelectorAll(`meta[${attr}="${name}"]`).forEach(el => el.remove());
}

function setLink(rel: string, href: string, id?: string, extra?: Record<string, string>) {
  const selector = id ? `link[data-seo-id="${id}"]` : `link[rel="${rel}"]`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (id) el.setAttribute("data-seo-id", id);
    if (extra) Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(schemas: object[], id: string) {
  let el = document.querySelector(
    `script[data-seo-id="${id}"]`
  ) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("data-seo-id", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(
    schemas.length === 1 ? schemas[0] : schemas
  );
}

function removeJsonLd(id: string) {
  const el = document.querySelector(`script[data-seo-id="${id}"]`);
  if (el) el.remove();
}

export function useSEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  canonical,
  jsonLd,
  noIndex = false,
  publishedTime,
  modifiedTime,
  breadcrumbs,
  author,
  section,
  tags,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;
    const resolvedCanonical = canonical
      ? `${SITE_URL}${canonical}`
      : window.location.href.split("?")[0].split("#")[0];
    const resolvedImage = ogImage || DEFAULT_OG_IMAGE;
    const resolvedOgTitle = ogTitle || title;
    const resolvedOgDesc = ogDescription || description;
    const resolvedAuthor = author || "Freonn — Инженерная компания";

    // ── Title ──────────────────────────────────────────────────────────────
    document.title = fullTitle;

    // ── Basic meta ─────────────────────────────────────────────────────────
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta(
      "robots",
      noIndex
        ? "noindex, nofollow"
        : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );
    setMeta("googlebot", noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setMeta("yandexbot", noIndex ? "noindex, nofollow" : "index, follow");
    setMeta("author", resolvedAuthor);
    setMeta("copyright", "© 2011–2026 ООО «ЭКС» (Freonn)");

    // ── Geo / Yandex region ────────────────────────────────────────────────
    setMeta("geo.region", "RU-MOW");
    setMeta("geo.placename", "Москва");
    setMeta("geo.position", "55.7558;37.6173");
    setMeta("ICBM", "55.7558, 37.6173");
    setMeta("yandex-region", "213");

    // ── Open Graph ─────────────────────────────────────────────────────────
    setMeta("og:type", ogType === "article" ? "article" : "website", true);
    setMeta("og:locale", "ru_RU", true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("og:title", resolvedOgTitle, true);
    setMeta("og:description", resolvedOgDesc, true);
    setMeta("og:image", resolvedImage, true);
    setMeta("og:image:secure_url", resolvedImage, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:image:type", resolvedImage.endsWith(".png") ? "image/png" : "image/jpeg", true);
    setMeta("og:image:alt", resolvedOgTitle, true);
    setMeta("og:url", resolvedCanonical, true);
    setMeta("og:updated_time", new Date().toISOString(), true);

    // ── Article-specific OG tags ───────────────────────────────────────────
    if (ogType === "article") {
      if (publishedTime) {
        setMeta("article:published_time", publishedTime, true);
        setMeta("article:modified_time", modifiedTime || publishedTime, true);
      }
      setMeta("article:author", resolvedAuthor, true);
      setMeta("article:section", section || "Инженерные системы", true);
      setMeta("article:publisher", SITE_URL, true);
      // Remove old tags, re-add fresh
      removeAllMeta("article:tag", true);
      if (tags && tags.length > 0) {
        tags.forEach(tag => {
          const el = document.createElement("meta");
          el.setAttribute("property", "article:tag");
          el.setAttribute("content", tag);
          document.head.appendChild(el);
        });
      }
    } else {
      removeMeta("article:published_time", true);
      removeMeta("article:modified_time", true);
      removeMeta("article:author", true);
      removeMeta("article:section", true);
      removeMeta("article:publisher", true);
      removeAllMeta("article:tag", true);
    }

    // ── Twitter Card ───────────────────────────────────────────────────────
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", "@freonn");
    setMeta("twitter:creator", "@freonn");
    setMeta("twitter:title", resolvedOgTitle);
    setMeta("twitter:description", resolvedOgDesc);
    setMeta("twitter:image", resolvedImage);
    setMeta("twitter:image:alt", resolvedOgTitle);

    // ── Canonical + hreflang ───────────────────────────────────────────────
    setLink("canonical", resolvedCanonical, "canonical");
    setLink("alternate", resolvedCanonical, "hreflang-ru", { hreflang: "ru" });
    setLink("alternate", resolvedCanonical, "hreflang-default", { hreflang: "x-default" });

    // ── JSON-LD ────────────────────────────────────────────────────────────
    const schemas: object[] = [];

    // Always inject Organization schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Freonn",
      legalName: "ООО «ЭКС»",
      alternateName: "Freonn — Инженерная компания",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
        width: 200,
        height: 60,
      },
      description:
        "Проектирование, монтаж и обслуживание инженерных систем: вентиляция, кондиционирование, дымоудаление, отопление, электроснабжение. Москва и МО.",
      telephone: "+78001012009",
      email: "freonn@internet.ru",
      address: {
        "@type": "PostalAddress",
        addressCountry: "RU",
        addressRegion: "Московская область",
        addressLocality: "Дзержинский",
        postalCode: "143500",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 55.9167,
        longitude: 36.8667,
      },
      areaServed: [
        { "@type": "City", name: "Москва" },
        { "@type": "AdministrativeArea", name: "Московская область" },
      ],
      sameAs: ["https://freonn.ru"],
      foundingDate: "2011",
      numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
    });

    // BreadcrumbList if breadcrumbs provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: SITE_URL,
          },
          ...breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            position: i + 2,
            name: b.name,
            item: b.url.startsWith("http") ? b.url : `${SITE_URL}${b.url}`,
          })),
        ],
      });
    }

    // Custom JSON-LD from caller
    if (jsonLd) {
      const arr = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.push(...arr);
    }

    setJsonLd(schemas, "page-schema");

    return () => {
      removeJsonLd("page-schema");
    };
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    canonical,
    noIndex,
    publishedTime,
    modifiedTime,
    author,
    section,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(breadcrumbs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(jsonLd),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(tags),
  ]);
}
