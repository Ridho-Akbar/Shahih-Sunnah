// src/app/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { dzikirList } from "@/data/dzikir";
import { Sunrise, Sunset, HeartHandshake, Clock, BookOpen, Flame, ChevronRight, CheckCircle2 } from "lucide-react";
import DzikirStepModal from "../components/dzikir-step-modal";
import Image from "next/image";

const STORAGE_KEY_MORNING = "dzikir-counts-morning";
const STORAGE_KEY_EVENING = "dzikir-counts-evening";

function shouldReset(lastResetKey: string, resetHour: number, resetMinute: number): boolean {
  if (typeof window === "undefined") return false;
  const now = new Date();
  const lastReset = localStorage.getItem(lastResetKey);
  if (!lastReset) return true;
  const lastResetDate = new Date(lastReset);
  const todayReset = new Date(now.getFullYear(), now.getMonth(), now.getDate(), resetHour, resetMinute, 0);
  if (now >= todayReset && lastResetDate < todayReset) return true;
  return false;
}

function getStoredCounts(key: string): Record<number, number> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(key) || "{}"); } catch { return {}; }
}

function initializeCounts(category: "morning" | "evening", storageKey: string, resetKey: string, resetHour: number, resetMinute: number): Record<number, number> {
  if (typeof window === "undefined") return {};
  
  const counts = getStoredCounts(storageKey);
  
  if (shouldReset(resetKey, resetHour, resetMinute)) {
    dzikirList.filter(d => d.category.includes(category)).forEach(d => {
      counts[dzikirList.indexOf(d)] = 0;
    });
    localStorage.setItem(resetKey, new Date().toISOString());
  }
  
  localStorage.setItem(storageKey, JSON.stringify(counts));
  return counts;
}

export default function Home() {
  const [activeSession, setActiveSession] = useState<"morning" | "evening" | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [morningCounts, setMorningCounts] = useState<Record<number, number>>({});
  const [eveningCounts, setEveningCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    setMorningCounts(initializeCounts("morning", STORAGE_KEY_MORNING, "dzikir-morning-reset", 4, 30));
    setEveningCounts(initializeCounts("evening", STORAGE_KEY_EVENING, "dzikir-evening-reset", 15, 30));
    setIsMounted(true);
  }, []);

  const updateCount = useCallback((index: number, count: number, session: "morning" | "evening") => {
    const setter = session === "morning" ? setMorningCounts : setEveningCounts;
    const key = session === "morning" ? STORAGE_KEY_MORNING : STORAGE_KEY_EVENING;
    setter(prev => { 
      const next = { ...prev, [index]: count }; 
      localStorage.setItem(key, JSON.stringify(next)); 
      return next; 
    });
  }, []);

  const morningZikir = dzikirList.filter(d => d.category.includes("morning"));
  const eveningZikir = dzikirList.filter(d => d.category.includes("evening"));

  const getProgress = (list: typeof dzikirList, counts: Record<number, number>) => {
    let done = 0;
    list.forEach(item => {
      const idx = dzikirList.indexOf(item);
      if (counts[idx] >= (item.count ?? 1)) done++;
    });
    return { done, total: list.length };
  };

  const morningProgress = getProgress(morningZikir, morningCounts);
  const eveningProgress = getProgress(eveningZikir, eveningCounts);

  return (
    <>
      <div className="fixed inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        
        <div className="relative z-10 h-full flex flex-col px-4 py-8 sm:py-12 max-w-md mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-10 animate-fade-in-down">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 mb-4 shadow-lg shadow-emerald-900/20">
              <Image 
                src="/favicon.svg" 
                alt="Shahih Sunnah" 
                width={42} 
                height={42} 
                className="w-12 h-12"
              />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Shahih Sunnah</h1>
            <p className="text-white/60 text-sm">Amalan harian berdasarkan dalil shahih.</p>
          </div>

          {/* Main Action: Zikir Sessions */}
          <div className="space-y-4 mb-8">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Mulai Dzikir</p>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Morning Card */}
              <button onClick={() => setActiveSession("morning")}
                className="group relative w-full flex items-center p-4 bg-gradient-to-r from-amber-900/20 to-transparent border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-all cursor-pointer overflow-hidden">
                
                <div className="absolute bottom-0 left-0 h-1 bg-amber-500/30 transition-all duration-500" 
                     style={{ width: `${isMounted && morningProgress.total > 0 ? (morningProgress.done / morningProgress.total) * 100 : 0}%` }} />
                
                <div className="shrink-0 w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mr-4 group-hover:scale-105 transition-transform border border-amber-500/10">
                  <Sunrise size={28} className="text-amber-400" />
                </div>
                
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">Zikir Pagi</h3>
                  <p className="text-xs text-white/50 mb-1">Setelah Subuh - Terbit Matahari</p>
                  <div className="flex items-center gap-2 text-[10px] text-amber-400/80 font-medium">
                    <CheckCircle2 size={12} />
                    <span>{isMounted ? `${morningProgress.done} dari ${morningProgress.total} selesai` : "Memuat..."}</span>
                  </div>
                </div>
                
                <ChevronRight className="text-white/20 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Evening Card */}
              <button onClick={() => setActiveSession("evening")}
                className="group relative w-full flex items-center p-4 bg-gradient-to-r from-indigo-900/20 to-transparent border border-indigo-500/20 rounded-2xl hover:border-indigo-500/40 transition-all cursor-pointer overflow-hidden">
                
                <div className="absolute bottom-0 left-0 h-1 bg-indigo-500/30 transition-all duration-500" 
                     style={{ width: `${isMounted && eveningProgress.total > 0 ? (eveningProgress.done / eveningProgress.total) * 100 : 0}%` }} />

                <div className="shrink-0 w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center mr-4 group-hover:scale-105 transition-transform border border-indigo-500/10">
                  <Sunset size={28} className="text-indigo-400" />
                </div>
                
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">Zikir Petang</h3>
                  <p className="text-xs text-white/50 mb-1">Setelah Ashar - Tenggelam Matahari</p>
                  <div className="flex items-center gap-2 text-[10px] text-indigo-400/80 font-medium">
                    <CheckCircle2 size={12} />
                    <span>{isMounted ? `${eveningProgress.done} dari ${eveningProgress.total} selesai` : "Memuat..."}</span>
                  </div>
                </div>
                
                <ChevronRight className="text-white/20 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="mt-auto">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1 mb-4">Menu Lainnya</p>
            <div className="grid grid-cols-4 gap-3">
              <Link href="/dzikir" className="flex flex-col items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-xl transition-all group">
                <Flame size={20} className="text-white/60 group-hover:text-emerald-400 transition-colors" />
                <span className="text-[10px] font-medium text-white/80">Dzikir</span>
              </Link>
              
              <Link href="/doa" className="flex flex-col items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-500/30 rounded-xl transition-all group">
                <HeartHandshake size={20} className="text-white/60 group-hover:text-rose-400 transition-colors" />
                <span className="text-[10px] font-medium text-white/80">Doa</span>
              </Link>
              
              <Link href="/sholat" className="flex flex-col items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-xl transition-all group">
                <Clock size={20} className="text-white/60 group-hover:text-blue-400 transition-colors" />
                <span className="text-[10px] font-medium text-white/80">Sholat</span>
              </Link>
              
              <Link href="/puasa" className="flex flex-col items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/30 rounded-xl transition-all group">
                <BookOpen size={20} className="text-white/60 group-hover:text-amber-400 transition-colors" />
                <span className="text-[10px] font-medium text-white/80">Puasa</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {isMounted && activeSession && (
        <DzikirStepModal
          dzikirs={activeSession === "morning" ? morningZikir : eveningZikir}
          counts={activeSession === "morning" ? morningCounts : eveningCounts}
          onUpdateCount={(index, count) => updateCount(index, count, activeSession)}
          onClose={() => setActiveSession(null)}
          session={activeSession}
        />
      )}
    </>
  );
}