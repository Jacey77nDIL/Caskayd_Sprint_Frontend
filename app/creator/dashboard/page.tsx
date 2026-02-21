"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function CreatorDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/creator/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/creator/login");
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black">Loading...</div>;
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Caskayd Creator</h1>
        <button 
          onClick={handleLogout}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to your Dashboard!</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            You have successfully logged in. This is where your campaigns, analytics, and earnings will appear.
          </p>
        </div>

        {/* Dummy Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
                { label: "Total Earnings", value: "₦0.00" },
                { label: "Active Campaigns", value: "0" },
                { label: "Profile Views", value: "12" }
            ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}