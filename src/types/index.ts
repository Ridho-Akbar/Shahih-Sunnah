// src/types/index.ts

export interface Hadits {
  slug: string;
  no: number;
  judul: string;
  arab: string;
  arti: string;
  keterangan: string;
  status: "shahih" | "hasan" | "dhaif" | "palsu";
  perawi: string;
  sumber: string;
  tema: string[];
}

export interface Amalan {
  slug: string;
  judul: string;
  arab: string;
  arti: string;
  keutamaan: string;
  waktu: "pagi" | "petang" | "malam" | "umum";
  sumber: string;
  tema: string[];
}

export interface Fikih {
  slug: string;
  judul: string;
  ringkasan: string;
  pembahasan: string;
  dalil: string[];
  kesimpulan: string;
  tema: string[];
  referensi: string[];
}