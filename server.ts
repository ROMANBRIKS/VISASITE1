
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || "studio-978638961-eddfc"
  });
}
const db = getFirestore("ai-studio-7d605385-342d-48da-994c-a691bb0ee327");

// Initialize Google Drive
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});
const drive = google.drive({ version: 'v3', auth });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Create Checkout Session (Mocked - No Stripe)
  app.post("/api/checkout-session", async (req, res) => {
    const { userId, type, countryId, visaId, fileName } = req.body;

    try {
      // Directly create a "paid" application since Stripe is removed
      const applicationRef = await db.collection("applications").add({
        userId,
        countryId,
        visaId,
        status: "paid",
        type,
        fileName: fileName || null,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });

      // Return a success URL that the frontend can use to redirect
      res.json({ url: `/checkout/success?application_id=${applicationRef.id}` });
    } catch (error: any) {
      console.error("Checkout Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Download Guide from Google Drive
  app.get("/api/guides/download/:applicationId", async (req, res) => {
    const { applicationId } = req.params;

    try {
      const appDoc = await db.collection("applications").doc(applicationId).get();
      if (!appDoc.exists) {
        return res.status(404).json({ error: "Application not found" });
      }

      const appData = appDoc.data();
      if (appData?.status !== "paid" && appData?.status !== "completed") {
        return res.status(403).json({ error: "Payment required" });
      }

      // Find file in Google Drive
      // Use the fileName stored in the application document
      const fileName = appData?.fileName;
      
      if (!fileName) {
        return res.status(404).json({ error: "No guide file associated with this application" });
      }
      
      const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
      const response = await drive.files.list({
        q: `'${folderId}' in parents and name = '${fileName}' and trashed = false`,
        fields: 'files(id, name)',
      });

      const file = response.data.files?.[0];
      if (!file?.id) {
        return res.status(404).json({ error: "Guide file not found in Drive" });
      }

      // Stream file from Drive
      const driveRes = await drive.files.get(
        { fileId: file.id, alt: 'media' },
        { responseType: 'stream' }
      );

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
      
      driveRes.data
        .on('error', (err) => {
          console.error('Drive stream error:', err);
          res.status(500).end();
        })
        .pipe(res);

    } catch (error: any) {
      console.error("Download Error:", error);
      res.status(500).json({ error: error.message });
    }
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
