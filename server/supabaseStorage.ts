import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || "media";

let supabase: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (!supabase) {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase credentials not configured");
    }
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  }
  return supabase;
}

export async function uploadFileToSupabase(
  buffer: Buffer,
  originalName: string,
  mimeType: string
): Promise<string> {
  const client = getSupabaseClient();

  const timestamp = Date.now();
  const sanitizedName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `uploads/${timestamp}_${sanitizedName}`;

  const { data, error } = await client.storage
    .from(SUPABASE_BUCKET)
    .upload(filePath, buffer, {
      contentType: mimeType,
      upsert: false,
    });

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  const { data: urlData } = client.storage
    .from(SUPABASE_BUCKET)
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}
