export interface ProdemPayload {
  name: string;
  jabatan: "BC" | "SBC" | "BSM" | "SBM" | "EM" | "SEM" | "VBM";
  margin3bl: number;
  na3bl: number;
  staffAktif: number;
}

export interface ProdemResult {
  status: "Naik" | "Tetap" | "Turun";
  currentLevel: string;
  recommendedLevel: string;
  reasons: string[];
}

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function evaluateProdemApi(
  payload: ProdemPayload
): Promise<ProdemResult> {
  const res = await fetch(`${API_BASE}/api/prodem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}
