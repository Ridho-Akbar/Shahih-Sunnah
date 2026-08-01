// src/components/dzikir-step-modal.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import type { Dzikir } from "@/data/dzikir";
import { X, BookOpen, CheckCircle, Clock, Play, ChevronLeft, ChevronRight, Check, RotateCcw } from "lucide-react";
import { dzikirList } from "@/data/dzikir";

interface Props {
  dzikirs: Dzikir[];
  counts: Record<number, number>;
  onUpdateCount: (index: number, count: number) => void;
  onClose: () => void;
  session: "morning" | "evening";
}

const statusIcon: Record<string, React.ReactNode> = {
  shahih: <CheckCircle className="w-3 h-3" />,
  hasan: <Clock className="w-3 h-3" />,
  dhaif: <X className="w-3 h-3" />,
  dishahihkan: <BookOpen className="w-3 h-3" />,
};

const sessionStyle = {
  morning: { 
    bg: "bg-amber-500/10", 
    border: "border-amber-500/20", 
    text: "text-amber-400", 
    accent: "border-amber-400/30", 
    gradient: "from-amber-500/20 to-transparent",
    button: "bg-amber-500 hover:bg-amber-400 text-black"
  },
  evening: { 
    bg: "bg-indigo-500/10", 
    border: "border-indigo-500/20", 
    text: "text-indigo-400", 
    accent: "border-indigo-400/30",
    gradient: "from-indigo-500/20 to-transparent",
    button: "bg-indigo-500 hover:bg-indigo-400 text-white"
  },
};

export default function DzikirStepModal({ dzikirs, counts, onUpdateCount, onClose, session }: Props) {
  const [step, setStep] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const dzikir = dzikirs[step];
  const index = dzikirList.indexOf(dzikir);
  const count = counts[index] || 0;
  const targetCount = dzikir.count ?? 1;
  const currentRound = Math.floor(count / targetCount) + 1;
  const isLast = step === dzikirs.length - 1;
  const style = sessionStyle[session];

  // Calculate progress percentage for the bar
  const progressPercent = Math.min((count / targetCount) * 100, 100);

  const handleIncrement = () => {
    const newCount = count + 1;
    onUpdateCount(index, newCount);
    if (targetCount > 1 && newCount % targetCount === 0) {
      setShowConfirm(true);
      // Optional: Add vibration feedback here if supported
      if (navigator.vibrate) navigator.vibrate(50);
    }
  };

  const handleNext = () => { if (step < dzikirs.length - 1) setStep(step + 1); };
  const handlePrev = () => { if (step > 0) setStep(step - 1); };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (showConfirm) {
      if (e.code === "Enter" || e.code === "Space") { e.preventDefault(); setShowConfirm(false); }
      return;
    }
    if (e.code === "Space" || e.code === "Enter") { e.preventDefault(); handleIncrement(); }
    if (e.code === "ArrowRight") { e.preventDefault(); handleNext(); }
    if (e.code === "ArrowLeft") { e.preventDefault(); handlePrev(); }
    if (e.code === "Escape") onClose();
  }, [count, step, showConfirm]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 ">
      <div className="absolute inset-0 transition-opacity" onClick={onClose} />
      
      <div className={`relative w-full sm:max-w-lg bg-[#1a1a1a] border rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh] animate-in slide-in-from-bottom-10 fade-in duration-200 overflow-hidden ${style.border}`}>
        
        {/* Top Progress Bar */}
        <div className="h-1 w-full bg-neutral-800">
          <div 
            className={`h-full transition-all duration-300 ${session === 'morning' ? 'bg-amber-500' : 'bg-indigo-500'}`} 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>

        {/* Header */}
        <div className="shrink-0 px-5 py-4 flex items-center justify-between border-b border-white/10 bg-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-2 py-1 rounded-md ${style.bg} ${style.text} border ${style.border}`}>
              {step + 1} / {dzikirs.length}
            </span>
            <span className="text-sm text-white/60 truncate max-w-[150px] sm:max-w-none">{dzikir.title}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="overflow-y-auto no-scrollbar flex-1 px-5 py-5 space-y-6">
          
          {/* Arabic Text Area */}
          <div className={`relative rounded-xl p-6 text-center overflow-hidden border ${style.border}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-50`} />
            <p className="relative text-2xl sm:text-3xl leading-[2.2] font-arabic text-white dir-rtl drop-shadow-sm">
              {dzikir.arabic}
            </p>
          </div>

          {/* Details Accordion Style */}
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/5">
              <p className={`text-[10px] ${style.text} uppercase tracking-widest mb-2 font-bold`}>Latin</p>
              <p className="text-sm text-neutral-300 italic leading-relaxed">{dzikir.latin}</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/5">
              <p className={`text-[10px] ${style.text} uppercase tracking-widest mb-2 font-bold`}>Arti</p>
              <p className="text-sm text-neutral-200 leading-relaxed">&ldquo;{dzikir.translation}&rdquo;</p>
            </div>

            <div className="bg-neutral-800/50 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={14} className={style.text} />
                <p className={`text-xs font-bold ${style.text}`}>DALIL</p>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed mb-2">&ldquo;{dzikir.evidence}&rdquo;</p>
              <div className="flex items-center gap-2 text-[10px] text-neutral-500 pt-2 border-t border-white/5">
                <span>{dzikir.source}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
                <span className={style.text}>{dzikir.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer: Counter & Nav */}
        <div className="shrink-0 bg-[#151515] border-t border-white/10 pb-safe">
          
          {/* Counter Section */}
          <div className="px-5 py-4">
            {!showConfirm ? (
              <div className="flex items-center gap-4">
                {/* Count Display */}
                <div className="flex flex-col items-center justify-center min-w-[70px]">
                  <span className={`text-3xl font-bold tabular-nums ${style.text}`}>{count}</span>
                  {targetCount > 1 && (
                    <span className="text-[10px] text-white/40 font-medium mt-1">
                      Putaran {currentRound}
                    </span>
                  )}
                </div>

                {/* Big Action Button */}
                <button 
                  onClick={handleIncrement}
                  className={`flex-1 h-14 rounded-xl flex items-center justify-center gap-2 font-bold text-base transition-all active:scale-95 shadow-lg ${style.button}`}
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>HITUNG ({targetCount})</span>
                </button>
              </div>
            ) : (
              /* Confirmation Overlay inside Footer */
              <div className={`p-4 rounded-xl border ${style.border} ${style.bg} text-center animate-in zoom-in-95 duration-200`}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ${style.text}`}>
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`font-bold ${style.text}`}>Target Tercapai!</p>
                    <p className="text-xs text-white/60 mt-1">Total: {count}x • Lanjut ke dzikir berikutnya?</p>
                  </div>
                  <button 
                    onClick={() => setShowConfirm(false)} 
                    className="mt-2 px-6 py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors"
                  >
                    Lanjutkan
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between px-5 py-3 bg-black/20 border-t border-white/5">
            <button 
              onClick={handlePrev} 
              disabled={step === 0} 
              className="flex items-center gap-1 text-xs font-medium text-white/50 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} /> Sebelumnya
            </button>
            
            <button 
              onClick={handleNext} 
              disabled={isLast} 
              className="flex items-center gap-1 text-xs font-medium text-white/50 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
            >
              Selanjutnya <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}