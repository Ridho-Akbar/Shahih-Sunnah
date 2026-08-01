// src/app/not-found.tsx
import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        
        {/* Icon & Error Code */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
          <div className="relative flex flex-col items-center">
            <SearchX size={64} className="text-white/20 mb-4" />
            <h1 className="text-7xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter">
              404
            </h1>
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-white">Halaman Tidak Ditemukan</h2>
          <p className="text-white/60 leading-relaxed">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman tersebut telah dipindahkan atau dihapus.
          </p>
          
          {/* Action Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 mt-8 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home size={18} />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Footer Quote */}
        <div className="absolute bottom-8 left-0 right-0 px-4">
          <p className="text-xs text-white/30 italic">
            &quot;Dan barangsiapa yang bertawakkal kepada Allah, niscaya Allah akan mencukupkan keperluannya.&quot; (QS. At-Talaq: 3)
          </p>
        </div>
      </div>
    </div>
  );
}