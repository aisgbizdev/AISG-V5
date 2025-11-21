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
      console.error(err);
      setError("Gagal hitung ProDem. Coba cek server-nya sudah jalan atau belum.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "1.5rem", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
        AISG ProDem Starter
      </h1>
      <p style={{ marginBottom: "1rem", color: "#555" }}>
        Form sederhana untuk menguji mesin ProDem (BC → VBM). Isikan data singkat lalu klik
        <strong> Hitung ProDem</strong>.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <div>
          <label>
            Nama Marketing
            <br />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.4rem", marginTop: "0.2rem" }}
              placeholder="Contoh: Budi"
            />
          </label>
        </div>

        <div>
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
        </div>

        <div>
          <label>
            Margin 3 Bulan Terakhir (USD)
            <br />
            <input
              type="number"
              name="margin3bl"
              value={form.margin3bl}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.4rem", marginTop: "0.2rem" }}
              placeholder="Contoh: 9000"
            />
          </label>
        </div>

        <div>
          <label>
            NA 3 Bulan Terakhir
            <br />
            <input
              type="number"
              name="na3bl"
              value={form.na3bl}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.4rem", marginTop: "0.2rem" }}
              placeholder="Contoh: 5"
            />
          </label>
        </div>

        <div>
          <label>
            Jumlah Staff Aktif (langsung)
            <br />
            <input
              type="number"
              name="staffAktif"
              value={form.staffAktif}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.4rem", marginTop: "0.2rem" }}
              placeholder="Contoh: 3"
            />
          </label>
        </div>

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
        <div style={{ color: "white", backgroundColor: "#b91c1c", padding: "0.75rem", borderRadius: 6 }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: 8 }}>
          <h2 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Hasil ProDem</h2>
          <p>
            <strong>Status:</strong> {result.status}{" "}
            <span style={{ fontSize: "0.9rem", color: "#555" }}>
              (Dari {result.currentLevel} → {result.recommendedLevel})
            </span>
          </p>
          <ul>
            {result.reasons.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "#888" }}>
        Versi starter – siap dihubungkan dengan data BAS dan dashboard AISG Enterprise.
      </p>
    </div>
  );
};
