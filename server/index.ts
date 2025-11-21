import express from "express";
import cors from "cors";
import { z } from "zod";
import { evaluateProdem } from "./prodem-engine";
import type { ProdemInput } from "./types";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const ProdemSchema = z.object({
  name: z.string(),
  jabatan: z.enum(["BC", "SBC", "BSM", "SBM", "EM", "SEM", "VBM"]),
  margin3bl: z.number().nonnegative(),
  na3bl: z.number().nonnegative(),
  staffAktif: z.number().int().nonnegative()
});

app.get("/", (_req, res) => {
  res.json({
    message: "AISG ProDem Starter API",
    endpoints: ["/api/prodem/evaluate"]
  });
});

app.post("/api/prodem/evaluate", (req, res) => {
  try {
    const parsed: ProdemInput = ProdemSchema.parse(req.body);
    const result = evaluateProdem(parsed);
    res.json(result);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({
      error: "Invalid payload",
      detail: err instanceof Error ? err.message : String(err)
    });
  }
});

app.listen(PORT, () => {
  console.log(`AISG ProDem API running on port ${PORT}`);
});
