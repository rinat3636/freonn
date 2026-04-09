import admin from "firebase-admin";

let initialized = false;

function getApp(): admin.app.App {
  if (!initialized) {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJson) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON env variable is not set");
    }
    const serviceAccount = JSON.parse(serviceAccountJson);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: `${serviceAccount.project_id}.appspot.com`,
    });
    initialized = true;
  }
  return admin.app();
}

/**
 * Upload a file to Firebase Storage and return a public URL.
 * @param relKey - relative path/key in the bucket, e.g. "uploads/file.pdf"
 * @param data - file content as Buffer or Uint8Array
 * @param contentType - MIME type, e.g. "application/pdf"
 */
export async function firebaseStoragePut(
  relKey: string,
  data: Buffer | Uint8Array,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  const app = getApp();
  const bucket = app.storage().bucket();
  const file = bucket.file(relKey);

  await file.save(Buffer.from(data), {
    metadata: { contentType },
    public: true,
  });

  // Make the file publicly accessible
  await file.makePublic();

  const url = `https://storage.googleapis.com/${bucket.name}/${relKey}`;
  return { key: relKey, url };
}
