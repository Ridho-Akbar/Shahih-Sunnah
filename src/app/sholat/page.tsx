// src/app/sholat/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { sholatList, Sholat } from "@/data/sholat";
import { ArrowLeft, X, BookOpen, CheckCircle, Clock, Search, Lightbulb, Info } from "lucide-react";

// Definisi Langkah Sholat (Hanya untuk type: 'bacaan')
const steps = [
  { id: "niat", label: "Niat", icon: "🤲", filter: (d: Sholat) => d.type === "bacaan" && d.title.includes("Dasar Niat") },
  { id: "takbir", label: "Takbir", icon: "🙌", filter: (d: Sholat) => d.type === "bacaan" && d.title.includes("Takbiratul Ihram") },
  { id: "iftitah", label: "Iftitah", icon: "📖", filter: (d: Sholat) => d.type === "bacaan" && d.title.includes("Doa Iftitah") },
  { id: "fatihah", label: "Fatihah", icon: "📜", filter: (d: Sholat) => d.type === "bacaan" && d.title === "Surat Al-Fatihah" },
  { id: "ruku", label: "Ruku'", icon: "🧎", filter: (d: Sholat) => d.type === "bacaan" && d.title.includes("Bacaan Ruku'") },
  { id: "iktidal", label: "I'tidal", icon: "🧍", filter: (d: Sholat) => d.type === "bacaan" && d.title.includes("Bacaan I'tidal") },
  { id: "sujud", label: "Sujud", icon: "🕌", filter: (d: Sholat) => d.type === "bacaan" && d.title.includes("Bacaan Sujud") },
  { id: "duduk", label: "Duduk", icon: "🧘", filter: (d: Sholat) => d.type === "bacaan" && d.title.includes("Duduk di Antara") },
  { id: "tasyahud", label: "Tasyahud", icon: "📿", filter: (d: Sholat) => d.type === "bacaan" && d.title === "Tasyahud Akhir (Riwayat Ibnu Mas'ud)" },
  { id: "salam", label: "Salam", icon: "🕊️", filter: (d: Sholat) => d.type === "bacaan" && d.title === "Salam Penutup Sholat" },
];

// Filter Data
const openingHadith = sholatList.find(d => d.title.includes("Perintah Sholat Sesuai"));
const readingItems = sholatList.filter(d => d.type === "bacaan");
const knowledgeHadits = sholatList.filter(d => d.type === "hadits" && !d.title.includes("Perintah Sholat Sesuai"));

const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  shahih: { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: <CheckCircle className="w-3 h-3" />, label: "Shahih" },
  hasan: { color: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: <Clock className="w-3 h-3" />, label: "Hasan" },
  dhaif: { color: "text-red-400 bg-red-500/10 border-red-500/20", icon: <X className="w-3 h-3" />, label: "Dhaif" },
  dishahihkan: { color: "text-amber-400 bg-amber-500/10 border-amber-500/20", icon: <BookOpen className="w-3 h-3" />, label: "Dishahihkan" },
};

const tips = [
  "Niat letaknya di hati. Melafazkan niat bukanlah syarat sah sholat menurut jumhur ulama.",
  "Angkat tangan sejajar bahu/telinga saat Takbir, mau Ruku', bangkit dari Ruku', dan bangun dari Tasyahud Awal.",
  "Letakkan tangan kanan di atas punggung tangan kiri di dada (di atas pusar).",
  "Pandangan mata tertuju ke tempat sujud (khusyu'), jangan menoleh ke kanan/kiri.",
  "Rapatkan jari-jari kaki dan arahkan ke kiblat saat sujud dan duduk."
];

export default function SalahPage() {
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [selectedHaditsIndex, setSelectedHaditsIndex] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Logic untuk Step Sholat
  const activeStep = steps.find(s => s.id === selectedStepId);
  const stepOptions = activeStep ? readingItems.filter(activeStep.filter) : [];
  const currentOptionIndex = selectedStepId ? (selectedOptions[selectedStepId] ?? 0) : 0;
  const currentItem = stepOptions[currentOptionIndex];

  // Logic untuk Search Hadits
  const filteredHadits = knowledgeHadits.filter(d => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return d.title.toLowerCase().includes(q) || d.evidence.toLowerCase().includes(q);
  });

  const selectedHaditsItem = selectedHaditsIndex !== null ? knowledgeHadits[selectedHaditsIndex] : null;

  return (
    <div className="fixed inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <header className="px-4 pt-6 pb-4 border-b border-white/10 bg-black/20 backdrop-blur-md shrink-0">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors mb-4 text-xs font-medium uppercase tracking-wider">
            <ArrowLeft size={14} /> Kembali ke Beranda
          </Link>
          <h1 className="text-2xl font-bold text-white">Panduan Sholat</h1>
          <p className="text-sm text-white/60 mt-1">Tuntunan lengkap berdasarkan dalil shahih.</p>
        </header>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">

            {/* 1. Opening Hadith (Hero) */}
            {openingHadith && (
              <div className="bg-gradient-to-br from-emerald-900/40 to-black/40 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={16} className="text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Dalil Utama</span>
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed">&ldquo;{openingHadith.evidence}&rdquo;</p>
                  <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-white/40">
                    <span>{openingHadith.source}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">{openingHadith.status}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Tips Section */}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={18} className="text-amber-400" />
                <h2 className="text-sm font-bold text-amber-400">Adab & Petunjuk Penting</h2>
              </div>
              <ul className="space-y-3">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-white/80 leading-relaxed">
                    <span className="text-amber-500 font-bold mt-0.5">{i + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Timeline Steps (Bacaan Sholat) */}
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
                Urutan Bacaan Sholat
              </h2>
              
              <div className="relative pl-4 sm:pl-8">
                {/* Vertical Line */}
                <div className="absolute left-[11px] sm:left-[19px] top-2 bottom-2 w-0.5 bg-white/10" />
                
                <div className="space-y-3">
                  {steps.map((step, idx) => {
                    const hasContent = readingItems.some(step.filter);
                    return (
                      <div key={step.id} className="relative group">
                        <button 
                          onClick={() => hasContent && setSelectedStepId(step.id)}
                          disabled={!hasContent}
                          className={`absolute -left-4 sm:-left-8 top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all z-10
                            ${hasContent 
                              ? "bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-900/50 cursor-pointer hover:scale-110 hover:bg-emerald-500" 
                              : "bg-neutral-800 border-neutral-700 text-neutral-500 cursor-not-allowed opacity-50"}`}
                        >
                          {idx + 1}
                        </button>
                        
                        <div 
                          onClick={() => hasContent && setSelectedStepId(step.id)}
                          className={`ml-6 sm:ml-10 p-3 rounded-xl border transition-all duration-200
                            ${hasContent 
                              ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-500/30 cursor-pointer" 
                              : "bg-transparent border-transparent opacity-40 cursor-default"}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{step.icon}</span>
                            <div className="text-left">
                              <h3 className={`text-sm font-semibold ${hasContent ? "text-white" : "text-white/40"}`}>{step.label}</h3>
                              {!hasContent && <p className="text-[10px] text-white/30">Segera hadir</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 4. Khazanah Hadits (Knowledge Base) */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                  Khazanah Hadits Sholat
                </h2>
                <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white/60">{knowledgeHadits.length} Hadits</span>
              </div>
              
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Cari topik hadits (contoh: berjamaah, subuh)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                />
              </div>

              {/* Grid Hadits */}
              {filteredHadits.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredHadits.map((d, i) => {
                    const originalIndex = knowledgeHadits.indexOf(d);
                    const statusStyle = statusConfig[d.status] || statusConfig.shahih;
                    
                    return (
                      <button 
                        key={i} 
                        onClick={() => setSelectedHaditsIndex(originalIndex)}
                        className="flex flex-col items-start text-left p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-xl transition-all group"
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 ${statusStyle.color}`}>
                            {statusStyle.icon} {statusStyle.label}
                          </span>
                          <BookOpen size={14} className="text-white/20 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <h3 className="text-sm font-medium text-white line-clamp-2 mb-1 group-hover:text-blue-200 transition-colors">{d.title}</h3>
                        <p className="text-[10px] text-white/40 line-clamp-1">{d.source}</p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10 bg-white/5 rounded-xl border border-dashed border-white/10">
                  <Info size={32} className="mx-auto text-white/20 mb-3" />
                  <p className="text-white/40 text-sm">Tidak ada hadits yang cocok dengan pencarian.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* MODAL: STEP DETAIL (Bacaan Sholat) */}
      {selectedStepId && currentItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedStepId(null)} />
          
          <div className="relative w-full sm:max-w-lg bg-[#1a1a1a] border border-white/10 overflow-hidden rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 fade-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-900/50">
                  {steps.findIndex(s => s.id === selectedStepId) + 1}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{activeStep?.label}</h3>
                  <p className="text-[10px] text-emerald-400">Bacaan Sholat</p>
                </div>
              </div>
              <button onClick={() => setSelectedStepId(null)} className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto no-scrollbar p-5 space-y-6">
              
              {/* Status Badge */}
              <div className="flex justify-center">
                 <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[currentItem.status]?.color || "text-white bg-white/10"}`}>
                    {statusConfig[currentItem.status]?.icon} {currentItem.status.toUpperCase()}
                 </span>
              </div>

              {/* Evidence / Dalil */}
              <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={14} className="text-emerald-400" />
                  <p className="text-xs font-bold text-emerald-400">DALIL & BACAAN</p>
                </div>
                <p className="text-sm text-neutral-200 leading-relaxed">{currentItem.evidence}</p>
              </div>

              {/* Source Info */}
              <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-4">
                <div className="pt-3 text-[10px] space-y-1 text-neutral-500">
                  <p>Sumber: <span className="text-neutral-300">{currentItem.source}</span></p>
                  {currentItem.statusBy && <p>Verifikasi: <span className="text-neutral-300">{currentItem.statusBy}</span></p>}
                </div>
              </div>
            </div>

            {/* Modal Footer (Navigation for multiple options) */}
            {stepOptions.length > 1 && (
              <div className="shrink-0 px-5 py-3 bg-[#151515] border-t border-white/10 flex items-center justify-between">
                <button 
                  onClick={() => { 
                    const newIndex = currentOptionIndex === 0 ? stepOptions.length - 1 : currentOptionIndex - 1;
                    setSelectedOptions(prev => ({ ...prev, [selectedStepId!]: newIndex }));
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  ‹
                </button>
                <span className="text-xs font-medium text-white/60">
                  Opsi {currentOptionIndex + 1} dari {stepOptions.length}
                </span>
                <button 
                  onClick={() => { 
                    const newIndex = currentOptionIndex === stepOptions.length - 1 ? 0 : currentOptionIndex + 1;
                    setSelectedOptions(prev => ({ ...prev, [selectedStepId!]: newIndex }));
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: HADITS DETAIL (Knowledge) */}
      {selectedHaditsItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedHaditsIndex(null)} />
          
          <div className="relative w-full sm:max-w-lg bg-[#1a1a1a] border border-white/10 overflow-hidden rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 fade-in duration-200">
            
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#1a1a1a]">
              <h3 className="text-sm font-bold text-white truncate pr-4">{selectedHaditsItem.title}</h3>
              <button onClick={() => setSelectedHaditsIndex(null)} className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto no-scrollbar p-5 space-y-6">
               <div className="flex justify-center">
                 <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[selectedHaditsItem.status]?.color || "text-white bg-white/10"}`}>
                    {statusConfig[selectedHaditsItem.status]?.icon} {selectedHaditsItem.status.toUpperCase()}
                 </span>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={14} className="text-blue-400" />
                  <p className="text-xs font-bold text-blue-400">DALIL HADITS</p>
                </div>
                <p className="text-sm text-neutral-200 leading-relaxed">{selectedHaditsItem.evidence}</p>
              </div>

              <div className="bg-neutral-800/50 border border-white/10 rounded-xl p-4">
                <div className="pt-3 text-[10px] space-y-1 text-neutral-500">
                  <p>Sumber: <span className="text-neutral-300">{selectedHaditsItem.source}</span></p>
                  {selectedHaditsItem.statusBy && <p>Verifikasi: <span className="text-neutral-300">{selectedHaditsItem.statusBy}</span></p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}