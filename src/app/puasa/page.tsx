// src/app/puasa/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { puasaList } from "@/data/puasa";
import { ArrowLeft, X, BookOpen, CheckCircle, Clock, Calendar, Star, Search, Info } from "lucide-react";

const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  shahih: { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: <CheckCircle className="w-3 h-3" />, label: "Shahih" },
  hasan: { color: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: <Clock className="w-3 h-3" />, label: "Hasan" },
  dhaif: { color: "text-red-400 bg-red-500/10 border-red-500/20", icon: <X className="w-3 h-3" />, label: "Dhaif" },
  dishahihkan: { color: "text-amber-400 bg-amber-500/10 border-amber-500/20", icon: <BookOpen className="w-3 h-3" />, label: "Dishahihkan" },
};

const hijriMonths = [
  "Muharram", "Safar", "Rabi'ul Awal", "Rabi'ul Akhir", 
  "Jumadil Awal", "Jumadil Akhir", "Rajab", "Sya'ban", 
  "Ramadhan", "Syawwal", "Dzulqa'dah", "Dzulhijjah"
];

export default function PuasaPage() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const currentItem = selectedIdx !== null ? puasaList[selectedIdx] : null;

  // Pisahkan data berdasarkan type
  const puasaItems = puasaList.filter(d => d.type === "puasa");
  const haditsItems = puasaList.filter(d => d.type === "hadits");

  // Untuk section kalender, pisahkan lagi: Rutin vs Spesifik Bulan
  const routinePuasa = puasaItems.filter(d => d.month === -1);
  const monthlyPuasa = puasaItems.filter(d => d.month !== -1);

  // Search logic untuk khazanah hadits
  const filteredHadits = haditsItems.filter(d => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return d.title.toLowerCase().includes(q) || d.evidence.toLowerCase().includes(q);
  });

  return (
    <div className="fixed inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <header className="px-4 pt-6 pb-4 border-b border-white/10 bg-black/20 backdrop-blur-md shrink-0">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors mb-4 text-xs font-medium uppercase tracking-wider">
            <ArrowLeft size={14} /> Kembali ke Beranda
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Kalender Puasa</h1>
              <p className="text-sm text-white/60 mt-1">Jadwal & keutamaan puasa sunnah sepanjang tahun.</p>
            </div>
          </div>
        </header>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-10">

            {/* 1. Section: Puasa Rutin (Highlight) */}
            {routinePuasa.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Star size={18} className="text-amber-400" />
                  <h2 className="text-lg font-bold text-white">Puasa Rutin & Sunnah Mingguan</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {routinePuasa.map((d) => {
                    const idx = puasaList.indexOf(d);
                    const statusStyle = statusConfig[d.status];
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedIdx(idx)}
                        className="group relative flex flex-col p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/30 rounded-xl transition-all text-left"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 ${statusStyle.color}`}>
                            {statusStyle.icon} {statusStyle.label}
                          </span>
                          <Calendar size={14} className="text-white/20 group-hover:text-amber-400 transition-colors" />
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-amber-200 transition-colors">{d.title}</h3>
                        <p className="text-[11px] text-white/50 line-clamp-2">{d.date}</p>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 2. Section: Timeline Kalender Hijriah */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={18} className="text-emerald-400" />
                <h2 className="text-lg font-bold text-white">Kalender Tahunan</h2>
              </div>

              <div className="relative pl-4 sm:pl-6">
                {/* Vertical Line */}
                <div className="absolute left-[11px] sm:left-[15px] top-2 bottom-2 w-0.5 bg-white/10" />

                <div className="space-y-8">
                  {hijriMonths.map((monthName, monthIndex) => {
                    const monthItems = monthlyPuasa.filter(d => d.month === monthIndex);
                    if (monthItems.length === 0) return null;

                    const isRamadhan = monthIndex === 8;

                    return (
                      <div key={monthIndex} className="relative group">
                        {/* Dot Indicator */}
                        <div className={`absolute -left-[5px] sm:-left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 z-10 
                          ${isRamadhan ? "bg-emerald-500 border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-neutral-800 border-neutral-600"}`} 
                        />

                        {/* Month Label */}
                        <div className="ml-6 sm:ml-8 mb-3">
                          <h3 className={`text-base font-bold ${isRamadhan ? "text-emerald-400" : "text-white"}`}>
                            {monthName}
                          </h3>
                          {isRamadhan && <span className="text-[10px] text-emerald-500/80 font-medium">Bulan Penuh Berkah</span>}
                        </div>

                        {/* Cards Container */}
                        <div className="ml-6 sm:ml-8 space-y-3">
                          {monthItems.map((d) => {
                            const idx = puasaList.indexOf(d);
                            return (
                              <button
                                key={idx}
                                onClick={() => setSelectedIdx(idx)}
                                className="w-full flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-xl transition-all text-left group/card"
                              >
                                {/* Date Badge */}
                                <div className={`shrink-0 w-12 h-12 rounded-lg flex flex-col items-center justify-center border 
                                  ${isRamadhan ? "bg-emerald-900/20 border-emerald-500/30" : "bg-neutral-800 border-white/10"}`}>
                                  <span className={`text-xs font-bold ${isRamadhan ? "text-emerald-400" : "text-white"}`}>
                                    {d.date.split(" ")[0]}
                                  </span>
                                  <span className="text-[8px] text-white/40 uppercase">
                                    {d.date.includes(" ") ? d.date.split(" ")[1].substring(0,3) : "HR"}
                                  </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-white group-hover/card:text-emerald-200 transition-colors truncate">
                                    {d.title}
                                  </h4>
                                  <p className="text-[10px] text-white/40 truncate mt-0.5">{d.date}</p>
                                </div>
                                
                                <ArrowLeft size={16} className="rotate-180 text-white/20 group-hover/card:text-emerald-400 transition-colors" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 3. Khazanah Hadits Puasa */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                  Khazanah Hadits Puasa
                </h2>
                <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white/60">{haditsItems.length} Hadits</span>
              </div>
              
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Cari topik hadits puasa (contoh: sahur, berbuka)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                />
              </div>

              {/* Grid Hadits */}
              {filteredHadits.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredHadits.map((d, i) => {
                    const originalIndex = puasaList.indexOf(d);
                    const statusStyle = statusConfig[d.status] || statusConfig.shahih;
                    
                    return (
                      <button 
                        key={i} 
                        onClick={() => setSelectedIdx(originalIndex)}
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

      {/* Detail Modal */}
      {currentItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedIdx(null)} />
          
          <div className="relative w-full sm:max-w-lg bg-[#1a1a1a] border border-white/10 overflow-hidden rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 fade-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-900/30 border border-emerald-500/20 flex flex-col items-center justify-center">
                   <span className="text-xs font-bold text-emerald-400">{currentItem.date.split(" ")[0]}</span>
                   <span className="text-[8px] text-emerald-400/60">{currentItem.date.includes(" ") ? currentItem.date.split(" ")[1] : ""}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">{currentItem.title}</h3>
                  <p className="text-[10px] text-white/50">
                    {currentItem.type === "puasa" 
                      ? (currentItem.month !== -1 ? hijriMonths[currentItem.month] : "Rutin")
                      : "Adab & Hadits Puasa"
                    }
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedIdx(null)} className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
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
                  <p className="text-xs font-bold text-emerald-400">DALIL & KEUTAMAAN</p>
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
          </div>
        </div>
      )}
    </div>
  );
}