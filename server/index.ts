import express from "express";
import cors from "cors";
import prodemRoutes from "./routes/prodem.routes.js";

// Biar TypeScript gak rewel soal `process`
declare const process: any;

const app = express();

app.use(cors());
app.use(express.json());

// Route ProDem
app.use("/api/prodem", prodemRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "AISG ProDem Engine",
    timestamp: Date.now()
  });
});

const port = Number(process?.env?.PORT ?? 10000);

app.listen(port, () => {
  console.log(`🔥 AISG ProDem API running on port ${port}`);
});
