"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar"; // Added Sidebar
import { Bars3Icon } from "@heroicons/react/24/outline";

const inter = Inter({ subsets: ["latin"] });

export default function BusinessDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/business/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;

  return (
    <div className={`flex min-h-screen bg-gray-50 ${inter.className}`}>
      
      {/* Sidebar Desktop */}
      <div className="hidden md:block w-64 fixed h-full z-20">
        <Sidebar role="business" className="border-r border-gray-200" />
      </div>

      {/* Sidebar Mobile */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <Sidebar role="business" onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 w-full">
        
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-indigo-900">Dashboard</h1>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-white rounded-lg shadow-sm">
                <Bars3Icon className="w-6 h-6 text-gray-700" />
            </button>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100 mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💼</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Control Center</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Welcome back. Manage your influencer campaigns and track performance here.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { label: "Active Campaigns", value: "3", sub: "+1 this week", color: "text-emerald-600 bg-emerald-50" },
                { label: "Total Spent", value: "₦450,000", sub: "Lifetime", color: "text-gray-500" },
                { label: "Creators Hired", value: "12", sub: "View All", color: "text-indigo-600 bg-indigo-50" }
            ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{item.value}</p>
                    <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${item.color.includes('bg') ? item.color : 'text-gray-400'}`}>
                        {item.sub}
                    </span>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}