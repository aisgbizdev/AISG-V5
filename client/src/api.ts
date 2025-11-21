import type { ProdemResult } from "./App";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export interface ProdemPayload {
  name: string;
  jabatan: "BC" | "SBC" | "BSM" | "SBM" | "EM" | "SEM" | "VBM";
  margin3bl: number;
  na3bl: number;
  staffAktif: number;
}

export async function evaluateProdemApi(payload: ProdemPayload): Promise<ProdemResult> {
  const res = await fetch(`${API_BASE}/api/prodem/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}
