import { Router } from "express";
import { runProdem } from "../prodem-engine";
import { ProdemInput } from "../types";

const router = Router();

// POST /api/prodem
router.post("/", (req, res) => {
  try {
    const body = req.body as ProdemInput;
    const result = runProdem(body);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

export default router;
