import { ProdemPayload, ProdemResult, Jabatan } from "./types.js";

const order: Jabatan[] = ["BC", "SBC", "BSM", "SBM", "EM", "SEM", "VBM"];

export function evaluateProdem(data: ProdemPayload): ProdemResult {
  const { jabatan, margin3bl, na3bl, staffAktif } = data;

  const idx = order.indexOf(jabatan);

  // RULES
  const enoughMargin = margin3bl >= 9000;
  const enoughNA = na3bl >= 3;

  const reasons: string[] = [];

  if (enoughMargin) reasons.push("Margin terpenuhi");
  else reasons.push("Margin belum terpenuhi");

  if (enoughNA) reasons.push("NA terpenuhi");
  else reasons.push("NA belum terpenuhi");

  if (staffAktif >= 1) reasons.push("Jumlah staff mencukupi");
  else reasons.push("Tidak ada staff aktif");

  let recommended = jabatan;

  if (enoughMargin && enoughNA && staffAktif >= 1) {
    recommended = order[Math.min(idx + 1, order.length - 1)];
  } else if (!enoughMargin && !enoughNA) {
    recommended = order[Math.max(idx - 1, 0)];
  }

  return {
    status:
      recommended === jabatan
        ? "Tetap"
        : order.indexOf(recommended) > idx
        ? "Naik"
        : "Turun",
    currentLevel: jabatan,
    recommendedLevel: recommended,
    reasons
  };
}
