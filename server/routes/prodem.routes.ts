import { Router } from "express";
import { evaluateProdem } from "../prodem-engine.js";

const router = Router();

router.post("/evaluate", (req, res) => {
  try {
    const result = evaluateProdem(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
