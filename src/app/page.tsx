// src/app/page.tsx
"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { dzikirList } from "@/data/dzikir";
import { Sunrise, Sunset, HeartHandshake, Clock, BookOpen, Flame, ChevronRight, CheckCircle2, ExternalLink } from "lucide-react";
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

function useCurrentTime() {
  const [time, setTime] = useState(() => new Date());
  
  useState(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  });
  
  return time;
}

export default function Home() {
  const [activeSession, setActiveSession] = useState<"morning" | "evening" | null>(null);

  const [morningCounts, setMorningCounts] = useState<Record<number, number>>(() => 
    initializeCounts("morning", STORAGE_KEY_MORNING, "dzikir-morning-reset", 4, 30)
  );

  const [eveningCounts, setEveningCounts] = useState<Record<number, number>>(() => 
    initializeCounts("evening", STORAGE_KEY_EVENING, "dzikir-evening-reset", 15, 30)
  );

  const currentTime = useCurrentTime();

  const updateCount = useCallback((index: number, count: number, session: "morning" | "evening") => {
    const setter = session === "morning" ? setMorningCounts : setEveningCounts;
    const key = session === "morning" ? STORAGE_KEY_MORNING : STORAGE_KEY_EVENING;
    setter(prev => { 
      const next = { ...prev, [index]: count }; 
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(next));
      }
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const getTimeStatus = (session: "morning" | "evening") => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const current = hour * 60 + minute;
    
    if (session === "morning") {
      const shubuh = 4 * 60 + 30;
      const syuruq = 6 * 60 + 0;
      if (current >= shubuh && current < syuruq) return { active: true, label: "Waktu Utama" };
      if (current < shubuh) return { active: false, label: "Belum Masuk" };
      return { active: false, label: "Terlewat" };
    } else {
      const ashar = 15 * 60 + 30;
      const maghrib = 18 * 60 + 0;
      if (current >= ashar && current < maghrib) return { active: true, label: "Waktu Utama" };
      if (current < ashar) return { active: false, label: "Belum Masuk" };
      return { active: false, label: "Terlewat" };
    }
  };

  const morningStatus = getTimeStatus("morning");
  const eveningStatus = getTimeStatus("evening");

  return (
    <>
      <div className="fixed inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        
        <div className="relative z-10 h-full flex flex-col px-4 py-5 sm:py-6 max-w-md mx-auto">
          
          {/* Header Section - Compact */}
          <div className="text-center mb-5 animate-fade-in-down shrink-0">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 mb-3 shadow-lg shadow-emerald-900/20">
              <Image 
                src="/favicon.svg" 
                alt="Shahih Sunnah" 
                width={32} 
                height={32} 
                className="w-9 h-9"
              />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Shahih Sunnah</h1>
            <p className="text-white/60 text-xs">Amalan harian berdasarkan dalil shahih.</p>
            
            {/* Live Clock */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <Clock size={12} className="text-emerald-400" />
                <span className="text-sm font-mono font-medium text-white tabular-nums">
                  {formatTime(currentTime)}
                </span>
                <span className="text-[10px] text-white/40">WIB</span>
              </div>
            </div>
          </div>

          {/* Main Action: Zikir Sessions */}
          <div className="space-y-3 mb-4 flex-1 flex flex-col justify-center">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Mulai Dzikir</p>
            
            <div className="grid grid-cols-1 gap-3">
              {/* Morning Card */}
              <button onClick={() => setActiveSession("morning")}
                className="group relative w-full flex items-center p-3.5 bg-gradient-to-r from-amber-900/20 to-transparent border border-amber-500/20 rounded-2xl hover:border-amber-500/40 transition-all cursor-pointer overflow-hidden">
                
                <div className="absolute bottom-0 left-0 h-1 bg-amber-500/30 transition-all duration-500" 
                     style={{ width: `${morningProgress.total > 0 ? (morningProgress.done / morningProgress.total) * 100 : 0}%` }} />
                
                <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mr-3.5 group-hover:scale-105 transition-transform border border-amber-500/10">
                  <Sunrise size={24} className="text-amber-400" />
                </div>
                
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">Zikir Pagi</h3>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${
                      morningStatus.active 
                        ? "bg-emerald-500/20 text-emerald-400" 
                        : "bg-white/10 text-white/40"
                    }`}>
                      {morningStatus.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/50 mb-1">Setelah Subuh • Reset 04:30</p>
                  <div className="flex items-center gap-2 text-[10px] text-amber-400/80 font-medium">
                    <CheckCircle2 size={11} />
                    <span>{morningProgress.done}/{morningProgress.total} selesai</span>
                  </div>
                </div>
                
                <ChevronRight size={18} className="text-white/20 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>

              {/* Evening Card */}
              <button onClick={() => setActiveSession("evening")}
                className="group relative w-full flex items-center p-3.5 bg-gradient-to-r from-indigo-900/20 to-transparent border border-indigo-500/20 rounded-2xl hover:border-indigo-500/40 transition-all cursor-pointer overflow-hidden">
                
                <div className="absolute bottom-0 left-0 h-1 bg-indigo-500/30 transition-all duration-500" 
                     style={{ width: `${eveningProgress.total > 0 ? (eveningProgress.done / eveningProgress.total) * 100 : 0}%` }} />

                <div className="shrink-0 w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mr-3.5 group-hover:scale-105 transition-transform border border-indigo-500/10">
                  <Sunset size={24} className="text-indigo-400" />
                </div>
                
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors">Zikir Petang</h3>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${
                      eveningStatus.active 
                        ? "bg-emerald-500/20 text-emerald-400" 
                        : "bg-white/10 text-white/40"
                    }`}>
                      {eveningStatus.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/50 mb-1">Setelah Ashar • Reset 15:30</p>
                  <div className="flex items-center gap-2 text-[10px] text-indigo-400/80 font-medium">
                    <CheckCircle2 size={11} />
                    <span>{eveningProgress.done}/{eveningProgress.total} selesai</span>
                  </div>
                </div>
                
                <ChevronRight size={18} className="text-white/20 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            </div>
          </div>

          {/* Navigation Menu + Copyright */}
          <div className="shrink-0">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1 mb-3">Menu Lainnya</p>
            <div className="grid grid-cols-4 gap-2.5">
              <Link href="/dzikir" className="flex flex-col items-center justify-center gap-1.5 p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-xl transition-all group">
                <Flame size={18} className="text-white/60 group-hover:text-emerald-400 transition-colors" />
                <span className="text-[10px] font-medium text-white/80">Dzikir</span>
              </Link>
              
              <Link href="/doa" className="flex flex-col items-center justify-center gap-1.5 p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-500/30 rounded-xl transition-all group">
                <HeartHandshake size={18} className="text-white/60 group-hover:text-rose-400 transition-colors" />
                <span className="text-[10px] font-medium text-white/80">Doa</span>
              </Link>
              
              <Link href="/sholat" className="flex flex-col items-center justify-center gap-1.5 p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-xl transition-all group">
                <Clock size={18} className="text-white/60 group-hover:text-blue-400 transition-colors" />
                <span className="text-[10px] font-medium text-white/80">Sholat</span>
              </Link>
              
              <Link href="/puasa" className="flex flex-col items-center justify-center gap-1.5 p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/30 rounded-xl transition-all group">
                <BookOpen size={18} className="text-white/60 group-hover:text-amber-400 transition-colors" />
                <span className="text-[10px] font-medium text-white/80">Puasa</span>
              </Link>
            </div>

            {/* Copyright */}
            <div className="flex justify-center mt-4">
              <a 
                href="https://rydhoz.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <span className="text-[9px] text-white/40 group-hover:text-white/70 transition-colors">
                  © {new Date().getFullYear()}
                </span>
                <span className="text-[9px] font-medium text-white/60 group-hover:text-white/90 transition-colors">
                  Rydhoz
                </span>
                <ExternalLink size={9} className="text-white/30 group-hover:text-white/60 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {activeSession && (
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