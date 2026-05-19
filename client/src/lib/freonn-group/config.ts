/** Freonn Group unified API (app + PostgreSQL) */
export function getFreonnApiBaseUrl(): string {
  const url = import.meta.env.VITE_FREONN_API_BASE_URL?.trim();
  if (!url) {
    return "";
  }
  return url.replace(/\/$/, "");
}

export function isFreonnApiConfigured(): boolean {
  return Boolean(getFreonnApiBaseUrl());
}
