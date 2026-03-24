"use client";

import { WifiIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation"; // Add this

export default function OfflinePage() {
  const router = useRouter(); // Initialize router

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] p-6 text-center">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
        <WifiIcon className="w-10 h-10 text-indigo-600 opacity-60" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">You are offline</h1>
      <p className="text-gray-500 max-w-sm mb-8">
        It looks like you've lost your internet connection. Check your network settings and try again.
      </p>
      
      {/* Wrap buttons in a column */}
      <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-700 transition-colors shadow-md cursor-pointer"
          >
            Try Again
          </button>
          
          <button 
            onClick={() => router.back()} // Sends them to their previous cached page
            className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <ArrowLeftIcon className="w-5 h-5" /> Stay Offline
          </button>
      </div>
    </div>
  );
}