import { freonnFetch } from "./api";
import { mapServiceLabelToSlug } from "./service-map";

export async function submitFreonnRequest(input: {
  serviceLabel: string;
  message?: string;
  region?: string;
  fileUrl?: string;
}) {
  const slug = mapServiceLabelToSlug(input.serviceLabel);
  const comment = [input.message, input.fileUrl ? `Файл: ${input.fileUrl}` : null]
    .filter(Boolean)
    .join("\n");
  return freonnFetch<{ requestId: string; notified: boolean }>("/api/v1/requests", {
    method: "POST",
    body: JSON.stringify({
      direction: "freonn",
      services: [slug],
      comment: comment || input.serviceLabel,
      region: input.region,
    }),
  });
}
