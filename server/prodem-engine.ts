import type { ProdemInput, ProdemOutput, Jabatan } from "./types";

function nextLevel(jabatan: Jabatan): Jabatan {
  switch (jabatan) {
    case "BC":
      return "SBC";
    case "SBC":
      return "BSM";
    case "BSM":
      return "SBM";
    case "SBM":
      return "EM";
    case "EM":
      return "SEM";
    case "SEM":
      return "VBM";
    case "VBM":
    default:
      return "VBM";
  }
}

export function evaluateProdem(input: ProdemInput): ProdemOutput {
  const reasons: string[] = [];
  let canPromote = false;

  const m = input.margin3bl;
  const na = input.na3bl;
  const staff = input.staffAktif;

  // Very simplified thresholds based on our blueprint.
  if (input.jabatan === "BC") {
    if (m >= 6000 && na >= 1) {
      canPromote = true;
      reasons.push("Margin 3 bulan >= 6.000 USD dan NA >= 1 (BC → SBC).");
    } else {
      reasons.push("Belum memenuhi syarat BC → SBC (butuh margin 6.000 & NA ≥ 1).");
    }
  } else if (input.jabatan === "SBC") {
    if (m >= 15000 && staff >= 2 && na >= 2) {
      canPromote = true;
      reasons.push("Margin 3 bulan >= 15.000, staff aktif ≥ 2, NA ≥ 2 (SBC → BSM).");
    } else {
      reasons.push("Belum memenuhi syarat SBC → BSM.");
    }
  } else if (input.jabatan === "BSM") {
    if (m >= 45000 && na >= 3) {
      canPromote = true;
      reasons.push("Margin 3 bulan >= 45.000, NA ≥ 3 (BSM → SBM).");
    } else {
      reasons.push("Belum memenuhi syarat BSM → SBM.");
    }
  } else if (input.jabatan === "SBM") {
    if (m >= 90000 && na >= 5) {
      canPromote = true;
      reasons.push("Margin 3 bulan >= 90.000, NA ≥ 5 (SBM → EM).");
    } else {
      reasons.push("Belum memenuhi syarat SBM → EM.");
    }
  } else if (input.jabatan === "EM") {
    if (m >= 150000 && na >= 7) {
      canPromote = true;
      reasons.push("Margin 3 bulan >= 150.000, NA ≥ 7 (EM → SEM).");
    } else {
      reasons.push("Belum memenuhi syarat EM → SEM.");
    }
  } else if (input.jabatan === "SEM") {
    if (m >= 225000 && na >= 10) {
      canPromote = true;
      reasons.push("Margin 3 bulan >= 225.000, NA ≥ 10 (SEM → VBM).");
    } else {
      reasons.push("Belum memenuhi syarat SEM → VBM.");
    }
  } else if (input.jabatan === "VBM") {
    reasons.push("VBM adalah batas tertinggi dalam mesin ProDem ini.");
  }

  let status: ProdemOutput["status"] = "Tetap";
  let recommendedLevel: Jabatan = input.jabatan;

  if (canPromote) {
    status = "Naik";
    recommendedLevel = nextLevel(input.jabatan);
  }

  // Simple demotion rule example:
  if (m === 0 && na === 0) {
    // Only apply if not already at BC
    if (input.jabatan !== "BC") {
      status = "Turun";
      reasons.push("Margin & NA 3 bulan = 0 → indikasi demosi (rule simple).");
      // We keep recommendedLevel = currentLevel for now (manual review).
    }
  }

  return {
    status,
    currentLevel: input.jabatan,
    recommendedLevel,
    reasons
  };
}
