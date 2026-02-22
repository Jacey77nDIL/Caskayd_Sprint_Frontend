import Link from "next/link";
import { Inter } from "next/font/google";

// Initialize the font
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden ${inter.className}`}>
      
      {/* --- BACKGROUND GRADIENT MESH --- */}
      <div className="absolute inset-0 z-0 bg-[#F8F9FA]">
        {/* Top Right Purple Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        {/* Bottom Left Green Glow */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-50/80 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      </div>

      {/* --- HEADER --- */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-20">
        
        {/* Logo */}
        <div className="text-xl md:text-2xl font-extrabold text-black tracking-tight">
          Caskayd Enterprises
        </div>

        {/* Auth Links (Text Only) */}
        <nav className="flex items-center gap-6 text-sm md:text-base font-medium">
          <Link 
            href="/business/login" 
            className="text-indigo-600 hover:text-indigo-800 hover:underline transition-all"
          >
            Log in as Business
          </Link>

          <Link 
            href="/creator/login" 
            className="text-emerald-600 hover:text-emerald-800 hover:underline transition-all"
          >
            Log in as Creator
          </Link>
        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <main className="grow flex flex-col items-center justify-center px-4 relative z-10 py-10">
        
        {/* White Glassmorphism Card */}
        <div className="w-full max-w-5xl bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl rounded-[2.5rem] p-8 md:p-20 text-center mx-auto">
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Connect Brands With Top <br className="hidden md:block" />
            <span className="text-indigo-500">Content Creators</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Scale your ROI with data-driven creator partnerships. Our platform
            helps you find, manage and track high-performing content at scale.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Link 
              href="/business/signup"
              className="min-w-[180px] px-8 py-3.5 bg-indigo-500 text-white font-semibold rounded-lg shadow-md shadow-indigo-200 hover:bg-indigo-600 transition-all transform hover:-translate-y-0.5 text-center"
            >
              Hire a Creator
            </Link>
            
            <Link 
              href="/creator/signup"
              className="min-w-[180px] px-8 py-3.5 bg-emerald-500 text-white font-semibold rounded-lg shadow-md shadow-emerald-200 hover:bg-emerald-600 transition-all transform hover:-translate-y-0.5 text-center"
            >
              Join as a creator
            </Link>
          </div>

        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full py-8 text-center text-xs text-slate-500 relative z-10">
        
        <p>© 2026 Caskayd Enterprises. All rights reserved</p>
      </footer>

    </div>
  );
}