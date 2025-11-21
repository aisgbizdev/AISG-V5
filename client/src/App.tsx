import React, { useState } from "react";
import { evaluateProdemApi } from "./api";

type Jabatan = "BC" | "SBC" | "BSM" | "SBM" | "EM" | "SEM" | "VBM";

interface FormState {
  name: string;
  jabatan: Jabatan;
  margin3bl: string;
  na3bl: string;
  staffAktif: string;
}

export interface ProdemResult {
  status: "Naik" | "Tetap" | "Turun";
  currentLevel: Jabatan;
  recommendedLevel: Jabatan;
  reasons: string[];
}

export const App: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    jabatan: "BC",
    margin3bl: "",
    na3bl: "",
    staffAktif: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProdemResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        name: form.name || "Marketing",
        jabatan: form.jabatan,
        margin3bl: Number(form.margin3bl || 0),
        na3bl: Number(form.na3bl || 0),
        staffAktif: Number(form.staffAktif || 0)
      };

      const res = await evaluateProdemApi(payload);
      setResult(res);
    } catch (err: any) {
      setError("Gagal hitung ProDem. Pastikan server sedang berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "1.5rem", maxWidth: 820, margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>AISG ProDem Starter</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem", marginBottom: "1.5rem" }}>

        <label>
          Nama Marketing
          <br />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.4rem", marginTop: "0.2rem" }}
          />
        </label>

        <label>
          Jabatan Sekarang
          <br />
          <select
            name="jabatan"
            value={form.jabatan}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.4rem", marginTop: "0.2rem" }}
          >
            <option value="BC">BC</option>
            <option value="SBC">SBC</option>
            <option value="BSM">BSM</option>
            <option value="SBM">SBM</option>
            <option value="EM">EM</option>
            <option value="SEM">SEM</option>
            <option value="VBM">VBM</option>
          </select>
        </label>

        <label>
          Margin 3 Bulan Terakhir (USD)
          <br />
          <input
            type="number"
            name="margin3bl"
            value={form.margin3bl}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.4rem", marginTop: "0.2rem" }}
          />
        </label>

        <label>
          NA 3 Bulan Terakhir
          <br />
          <input
            type="number"
            name="na3bl"
            value={form.na3bl}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.4rem", marginTop: "0.2rem" }}
          />
        </label>

        <label>
          Jumlah Staff Aktif
          <br />
          <input
            type="number"
            name="staffAktif"
            value={form.staffAktif}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.4rem", marginTop: "0.2rem" }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.6rem 1.2rem",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          {loading ? "Menghitung..." : "Hitung ProDem"}
        </button>
      </form>

      {error && (
        <div style={{ color: "white", backgroundColor: "#dc2626", padding: "0.75rem", borderRadius: 6 }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: 8 }}>
          <h2 style={{ marginTop: 0 }}>Hasil ProDem</h2>

          <p>
            <strong>Status:</strong> {result.status}  
            <br />
            <strong>Dari:</strong> {result.currentLevel}  
            <br />
            <strong>Ke:</strong> {result.recommendedLevel}
          </p>

          <ul>
            {result.reasons.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};
