export type Jabatan = "BC" | "SBC" | "BSM" | "SBM" | "EM" | "SEM" | "VBM";

export interface ProdemInput {
  name: string;
  jabatan: Jabatan;
  margin3bl: number;
  na3bl: number;
  staffAktif: number;
}

export interface ProdemOutput {
  status: "Naik" | "Tetap" | "Turun";
  currentLevel: Jabatan;
  recommendedLevel: Jabatan;
  reasons: string[];
}
