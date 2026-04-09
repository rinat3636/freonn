import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import multer from "multer";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { notifyOwner } from "./notification";
import { storagePut } from "../storage";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // MAX bot notification
  const MAX_BOT_TOKEN = process.env.MAX_BOT_TOKEN || "";
  const MAX_API_URL = "https://platform-api.max.ru/messages";
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

  // File upload endpoint — stores file to S3 and returns URL
  const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });
  app.post("/api/upload-file", upload.single("file"), async (req: express.Request, res: express.Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, error: "Файл не получен" });
        return;
      }
      const ext = req.file.originalname.split(".").pop() || "bin";
      const key = `form-attachments/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { url } = await storagePut(key, req.file.buffer, req.file.mimetype);
      res.json({ success: true, url, filename: req.file.originalname });
    } catch (e) {
      console.error("[upload-file] Error:", e);
      res.status(500).json({ success: false, error: "Ошибка загрузки файла" });
    }
  });

  // Form submission → MAX bot
  app.post("/api/submit-form", async (req, res) => {
    try {
      const { name, phone, email, service, message, fileUrl, fileName } = req.body || {};
      if (!name || !phone) {
        res.status(400).json({ success: false, error: "Имя и телефон обязательны" });
        return;
      }
      const text = [
        "📋 Новая заявка с сайта freonn.ru",
        "",
        `👤 Имя: ${name}`,
        `📞 Телефон: ${phone}`,
        email ? `📧 Email: ${email}` : null,
        service ? `🔧 Услуга: ${service}` : null,
        message ? `💬 Сообщение: ${message}` : null,
        fileUrl ? `📎 Документ: ${fileName || "файл"} — ${fileUrl}` : null,
      ]
        .filter(Boolean)
        .join("\n");
      await sendMaxMessage(text);
      // Also send via Manus notifyOwner as backup
      try {
        await notifyOwner({
          title: `Новая заявка с freonn.ru — ${name}`,
          content: text,
        });
      } catch {
        // notifyOwner failure is non-critical
      }
      res.json({ success: true });
    } catch (e) {
      console.error("[submit-form] Error:", e);
      res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
