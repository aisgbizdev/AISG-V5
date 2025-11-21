import express from "express";
import cors from "cors";
import prodemRoutes from "./routes/prodem.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/prodem", prodemRoutes);

// Health check
app.get("/health", (_, res) => {
  res.json({ status: "ok", service: "AISG ProDem Engine" });
});

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 AISG ProDem API running on port ${PORT}`);
});
