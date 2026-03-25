
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Mock Payment Webhook
  app.post("/api/webhooks/payment", (req, res) => {
    const { event, data } = req.body;
    console.log(`Received payment event: ${event}`, data);
    // In a real app, you'd verify the signature and update Firestore
    res.json({ received: true });
  });

  // Email Trigger Simulation
  app.post("/api/email/trigger", (req, res) => {
    const { type, email, data } = req.body;
    
    const templates: Record<string, string> = {
      signup_verification: `Welcome to VisaPlatform! Please verify your email to unlock all features.`,
      inactivity_reminder: `We haven't seen you in a while! Your visa application for ${data?.country || 'your destination'} is waiting for you.`,
      payment_confirmation: `Payment Successful! Your ${data?.type || 'Visa Guide'} is now available in your dashboard. Transaction ID: ${data?.id || 'N/A'}`
    };

    const message = templates[type] || "Transactional notification from VisaPlatform.";
    
    console.log(`[EMAIL SIMULATION] 
      TO: ${email}
      TYPE: ${type}
      MESSAGE: ${message}
      DATA:`, JSON.stringify(data, null, 2));

    res.json({ 
      success: true, 
      message: `Email of type '${type}' simulated for ${email}` 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
