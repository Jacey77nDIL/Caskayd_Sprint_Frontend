"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function BusinessDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/business/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/business/login");
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black">Loading...</div>;
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-900">Caskayd Business</h1>
        <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700 font-medium">
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100 mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💼</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Control Center</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Welcome back. Manage your influencer campaigns and track performance here.
          </p>
        </div>

        {/* Dummy Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500 font-medium">Active Campaigns</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full mt-2 inline-block">+1 this week</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500 font-medium">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">₦450,000</p>
                <span className="text-xs text-gray-500 mt-2 inline-block">Lifetime</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500 font-medium">Creators Hired</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
                <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full mt-2 inline-block">View All</span>
            </div>
        </div>
      </main>
    </div>
  );
}