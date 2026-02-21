import Link from "next/link";
import { Inter } from "next/font/google";

// Initialize the font
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`min-h-screen flex flex-col bg-white relative overflow-hidden ${inter.className}`}>
      
      {/* BACKGROUND GLOWS (Static) */}
      <div className="absolute top-0 right-0 w-75 md:w-125 h-75 md:h-125 bg-indigo-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-100 md:w-150 h-100 md:h-150 bg-emerald-50 rounded-full blur-3xl opacity-60 translate-y-1/3 -translate-x-1/4 -z-10 pointer-events-none"></div>

      {/* --- HEADER --- */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center relative z-20">
        
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-tight text-black mb-2 md:mb-0">
          Caskayd
        </div>

        {/* Auth Links */}
        <nav className="flex items-center gap-3 md:gap-6 font-medium text-sm md:text-base w-full md:w-auto justify-center">
          
          <Link 
            href="/business/login" 
            className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 md:bg-transparent md:text-indigo-600 md:p-0 hover:bg-indigo-100 md:hover:bg-transparent md:hover:text-indigo-800 transition-all"
          >
            <span className="md:hidden">Business Login</span>
            <span className="hidden md:inline">Log in as Business</span>
          </Link>

          <Link 
            href="/creator/login" 
            className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 md:bg-transparent md:text-emerald-600 md:p-0 hover:bg-emerald-100 md:hover:bg-transparent md:hover:text-emerald-800 transition-all"
          >
            <span className="md:hidden">Creator Login</span>
            <span className="hidden md:inline">Log in as Creator</span>
          </Link>

        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <main className="grow flex flex-col items-center justify-center px-4 text-center mt-2 md:-mt-10 relative z-10">
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.15] max-w-4xl">
          Connect Brands With Top <br className="hidden sm:block" />
          <span className="text-indigo-600 block sm:inline mt-2 sm:mt-0">Content Creators</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed px-2">
          Scale your ROI with data-driven creator partnerships. Our platform
          helps you find, manage and track high-performing content at scale.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Link 
            href="/business/signup"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all transform hover:-translate-y-0.5 text-center flex justify-center items-center"
          >
            Hire a Creator
          </Link>
          
          <Link 
            href="/creator/signup"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-all transform hover:-translate-y-0.5 text-center flex justify-center items-center"
          >
            Join as a creator
          </Link>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full py-8 text-center text-sm text-gray-500 border-t border-gray-100 mt-auto relative z-10 bg-white/50 backdrop-blur-sm">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-4 font-medium text-gray-600 px-4">
          <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
        </div>
        <p className="px-4">© 2026 Caskayd Enterprises. All rights reserved</p>
      </footer>

    </div>
  );
}