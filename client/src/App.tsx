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
