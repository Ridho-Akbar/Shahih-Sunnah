// src/app/doa/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { doaList } from "@/data/doa";
import { HeartHandshake, ArrowLeft, X, BookOpen, CheckCircle, Clock, Search, Sparkles, Quote } from "lucide-react";

const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  shahih: { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: <CheckCircle className="w-3 h-3" />, label: "Shahih" },
  hasan: { color: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: <Clock className="w-3 h-3" />, label: "Hasan" },
  dhaif: { color: "text-red-400 bg-red-500/10 border-red-500/20", icon: <X className="w-3 h-3" />, label: "Dhaif" },
  dishahihkan: { color: "text-amber-400 bg-amber-500/10 border-amber-500/20", icon: <BookOpen className="w-3 h-3" />, label: "Dishahihkan" },
};

export default function DoaPage() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const currentItem = selectedIdx !== null ? doaList[selectedIdx] : null;

  const filtered = doaList.filter((d) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.translation.toLowerCase().includes(q) ||
      d.arabic.includes(search) 
    );
  });

  return (
    <div className="fixed inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <header className="px-4 pt-6 pb-4 border-b border-white/10 bg-black/20 backdrop-blur-md shrink-0">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-rose-400 transition-colors mb-4 text-xs font-medium uppercase tracking-wider">
            <ArrowLeft size={14} /> Kembali ke Beranda
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Kumpulan Doa</h1>
              <p className="text-sm text-white/60 mt-1">Doa-doa mustajab dari Al-Qur&apos;an & Sunnah.</p>
            </div>
          </div>
        </header>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">

            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-white/40 group-focus-within:text-rose-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Cari doa (contoh: rezeki, surga, orang tua)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-rose-500/50 focus:bg-white/10 transition-all shadow-lg"
              />
            </div>

            {/* Grid Doa */}
            {filtered.length === 0 ? (
              <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-white/10">
                <Sparkles size={32} className="mx-auto text-white/20 mb-3" />
                <p className="text-white/40 text-sm">Tidak ada doa yang ditemukan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filtered.map((d) => {
                  const idx = doaList.indexOf(d);
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedIdx(idx)}
                      className="group relative flex flex-col items-center text-center p-5 bg-white/5 hover:bg-rose-900/20 border border-white/10 hover:border-rose-500/30 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="mb-3 p-3 rounded-full bg-rose-500/10 text-rose-400 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-rose-900/20">
                        <HeartHandshake size={20} />
                      </div>
                      
                      <h3 className="text-xs sm:text-sm font-semibold text-white leading-snug line-clamp-2 mb-1 group-hover:text-rose-200 transition-colors">
                        {d.title}
                      </h3>
                      
                      <span className="text-[9px] text-white/40 uppercase tracking-wider mt-1">
                        Baca Doa
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
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
                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                  <Quote size={16} />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">{currentItem.title}</h3>
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

              {/* Arabic Text */}
              <div className="bg-rose-900/20 border border-rose-500/20 rounded-xl p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
                <p className="text-2xl sm:text-3xl leading-[2.2] font-arabic text-white dir-rtl drop-shadow-sm">
                  {currentItem.arabic}
                </p>
              </div>

              {/* Translation & Latin */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <p className="text-[10px] text-rose-400 uppercase tracking-widest mb-2 font-bold">Latin</p>
                  <p className="text-sm text-neutral-300 italic leading-relaxed">{currentItem.latin}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <p className="text-[10px] text-rose-400 uppercase tracking-widest mb-2 font-bold">Arti</p>
                  <p className="text-sm text-neutral-200 leading-relaxed">&ldquo;{currentItem.translation}&rdquo;</p>
                </div>
              </div>

              {/* Evidence / Dalil */}
              <div className="bg-neutral-800/50 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={14} className="text-rose-400" />
                  <p className="text-xs font-bold text-rose-400">DALIL & PENJELASAN</p>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed mb-3">&ldquo;{currentItem.evidence}&rdquo;</p>
                <div className="pt-3 border-t border-white/5 text-[10px] space-y-1 text-neutral-500">
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