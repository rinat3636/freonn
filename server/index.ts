import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_BOT_TOKEN = process.env.MAX_BOT_TOKEN || "";
const MAX_API_URL = "https://platform-api.max.ru/messages";
// Two recipients: owner device 1 and device 2
const MAX_USER_IDS = [161746887, 214386106];

async function sendMaxMessage(text: string): Promise<void> {
  for (const userId of MAX_USER_IDS) {
    try {
      const res = await fetch(`${MAX_API_URL}?user_id=${userId}`, {
        method: "POST",
        headers: {
          Authorization: MAX_BOT_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error(`[MAX] Failed to send to user ${userId}:`, err);
      } else {
        console.log(`[MAX] Message sent to user ${userId}`);
      }
    } catch (e) {
      console.error(`[MAX] Error sending to user ${userId}:`, e);
    }
  }
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // API route for form submissions → MAX bot
  app.post("/api/submit-form", async (req, res) => {
    try {
      const { name, phone, email, service, message } = req.body || {};

      if (!name || !phone) {
        res.status(400).json({ success: false, error: "Имя и телефон обязательны" });
        return;
      }

      const text = [
        "📋 *Новая заявка с сайта freonn.ru*",
        "",
        `👤 Имя: ${name}`,
        `📞 Телефон: ${phone}`,
        email ? `📧 Email: ${email}` : null,
        service ? `🔧 Услуга: ${service}` : null,
        message ? `💬 Сообщение: ${message}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      await sendMaxMessage(text);

      res.json({ success: true });
    } catch (e) {
      console.error("[submit-form] Error:", e);
      res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
