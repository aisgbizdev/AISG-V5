import express from "express";
import cors from "cors";
import prodemRoutes from "./routes/prodem.routes";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/prodem", prodemRoutes);

// health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "AISG ProDem Engine" });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AISG ProDem API running at port ${PORT}`);
});
