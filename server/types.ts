export type Jabatan =
  | "BC"
  | "SBC"
  | "BSM"
  | "SBM"
  | "EM"
  | "SEM"
  | "VBM";

export interface ProdemPayload {
  name: string;
  jabatan: Jabatan;
  margin3bl: number;
  na3bl: number;
  staffAktif: number;
}

export interface ProdemResult {
  status: "Naik" | "Tetap" | "Turun";
  currentLevel: Jabatan;
  recommendedLevel: Jabatan;
  reasons: string[];
}
