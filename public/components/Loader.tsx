"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-sm bg-white/60">
      
      {/* Animated Logo/Spinner */}
      <div className="relative w-16 h-16">
        {/* Outer Ring (Indigo) */}
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full animate-pulse"></div>
        {/* Spinning Ring (Emerald) */}
        <div className="absolute inset-0 border-4 border-t-emerald-500 border-r-transparent border-b-indigo-600 border-l-transparent rounded-full animate-spin"></div>
      </div>
      
      {/* Loading Text */}
      <p className="mt-4 text-sm font-semibold text-gray-500 animate-pulse tracking-widest">
        CASKAYD
      </p>
    </div>
  );
}