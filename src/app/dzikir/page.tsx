// src/app/dhikr/page.tsx — tambah filter kategori
"use client";

import { useState } from "react";
import Link from "next/link";
import { dzikirList } from "@/data/dzikir";
import { Sunrise, Sunset, Clock, ArrowLeft, X, BookOpen, CheckCircle, Search, RotateCw, SearchX } from "lucide-react";

const categoryConfig: Record<string, { 
  icon: React.ReactNode; 
  label: string; 
  color: string;
  bg: string;
  border: string;
  gradient: string;
}> = {
  morning: { 
    icon: <Sunrise size={18} />, 
    label: "Pagi", 
    color: "text-amber-400", 
    bg: "bg-amber-500/10", 
    border: "border-amber-500/20",
    gradient: "from-amber-500/20 to-transparent"
  },
  evening: { 
    icon: <Sunset size={18} />, 
    label: "Petang", 
    color: "text-indigo-400", 
    bg: "bg-indigo-500/10", 
    border: "border-indigo-500/20",
    gradient: "from-indigo-500/20 to-transparent"
  },
  anytime: { 
    icon: <RotateCw size={18} />, 
    label: "Kapan Saja", 
    color: "text-emerald-400", 
    bg: "bg-emerald-500/10", 
    border: "border-emerald-500/20",
    gradient: "from-emerald-500/20 to-transparent"
  },
};

const statusIcon: Record<string, React.ReactNode> = {
  shahih: <CheckCircle className="w-3 h-3" />,
  hasan: <Clock className="w-3 h-3" />,
  dhaif: <X className="w-3 h-3" />,
  dishahihkan: <BookOpen className="w-3 h-3" />,
};

export default function DhikrPage() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<"morning" | "evening" | "anytime" | null>(null);

  const currentItem = selectedIdx !== null ? dzikirList[selectedIdx] : null;
  const activeTheme = currentItem 
    ? categoryConfig[currentItem.category[0]] || categoryConfig["anytime"] 
    : categoryConfig["anytime"];

  const filtered = dzikirList.filter((d) => {
    // Filter by category
    if (filterCategory && !d.category.includes(filterCategory)) return false;
    
    // Filter by search
    if (!search) return true;
    const q = search.toLowerCase();
    return d.title.toLowerCase().includes(q) || d.translation.toLowerCase().includes(q);
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
              <h1 className="text-2xl font-bold text-white">Dzikir Harian</h1>
              <p className="text-sm text-white/60 mt-1">Amalan pagi, petang, dan sepanjang hari.</p>
            </div>
          </div>
        </header>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">

            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-white/40 group-focus-within:text-emerald-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Cari dzikir (contoh: pagi, tidur, masjid)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all shadow-lg"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setFilterCategory(null)}
                className={`cursor-pointer shrink-0 px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                  filterCategory === null
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                Semua
              </button>
              {Object.entries(categoryConfig).map(([key, config]) => {
                const categoryKey = key as "morning" | "evening" | "anytime";
              return (
                <button
                  key={key}
                  onClick={() => setFilterCategory(filterCategory === categoryKey ? null : categoryKey)}
                  className={`cursor-pointer shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                    filterCategory === key
                      ? `${config.bg} ${config.color} ${config.border}`
                      : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {config.icon}
                  {config.label}
                </button>
              )})}
            </div>

            {/* Grid Dzikir */}
            {filtered.length === 0 ? (
              <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-white/10">
                <SearchX size={32} className="mx-auto text-white/20 mb-3" />
                <p className="text-white/40 text-sm">Tidak ada dzikir yang ditemukan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filtered.map((d) => {
                  const idx = dzikirList.indexOf(d);
                  const theme = categoryConfig[d.category[0]] || categoryConfig["anytime"];
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedIdx(idx)}
                      className={`group relative flex flex-col items-start text-left p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      <div className="flex justify-between items-start w-full mb-3 relative z-10">
                        <span className={`p-2 rounded-lg ${theme.bg} ${theme.color} group-hover:scale-110 transition-transform duration-300`}>
                          {theme.icon}
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${theme.border} ${theme.color} bg-black/20`}>
                          {theme.label}
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 relative z-10 group-hover:text-white transition-colors">
                        {d.title}
                      </h3>
                      
                      <div className="mt-auto pt-3 flex items-center gap-1 text-[10px] text-white/40 relative z-10">
                        {statusIcon[d.status]}
                        <span>{d.status}</span>
                      </div>
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
          
          <div className={`relative w-full sm:max-w-lg bg-[#1a1a1a] border rounded-t-2xl overflow-hidden sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 fade-in duration-200 ${activeTheme.border}`}>
            
            <div className={`flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#1a1a1a]`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeTheme.bg} ${activeTheme.color}`}>
                  {activeTheme.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">{currentItem.title}</h3>
                  <p className="text-[10px] text-white/50">{activeTheme.label} &bull; {currentItem.count}x</p>
                </div>
              </div>
              <button onClick={() => setSelectedIdx(null)} className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto no-scrollbar p-5 space-y-6">
              
              <div className="flex justify-center">
                 <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${activeTheme.bg} ${activeTheme.color} ${activeTheme.border}`}>
                    {statusIcon[currentItem.status]} {currentItem.status.toUpperCase()}
                 </span>
              </div>

              <div className={`${activeTheme.bg} border ${activeTheme.border} rounded-xl p-6 text-center relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${activeTheme.color.split('-')[1]}-500 to-transparent opacity-50`} />
                <p className="text-2xl sm:text-3xl leading-[2.2] font-arabic text-white dir-rtl drop-shadow-sm">
                  {currentItem.arabic}
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <p className={`text-[10px] ${activeTheme.color} uppercase tracking-widest mb-2 font-bold`}>Latin</p>
                  <p className="text-sm text-neutral-300 italic leading-relaxed">{currentItem.latin}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <p className={`text-[10px] ${activeTheme.color} uppercase tracking-widest mb-2 font-bold`}>Arti</p>
                  <p className="text-sm text-neutral-200 leading-relaxed">&ldquo;{currentItem.translation}&rdquo;</p>
                </div>
              </div>

              <div className="bg-neutral-800/50 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={14} className={activeTheme.color} />
                  <p className={`text-xs font-bold ${activeTheme.color}`}>DALIL & PENJELASAN</p>
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