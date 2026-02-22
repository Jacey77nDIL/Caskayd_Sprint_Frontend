"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  XMarkIcon, 
  PaperClipIcon, 
  CalendarIcon, 
  CurrencyDollarIcon,
  Squares2X2Icon
} from "@heroicons/react/24/outline";
import Sidebar from "@/components/Sidebar"; 
import Loader from "@/components/Loader"; // Using your shared Loader

const inter = Inter({ subsets: ["latin"] });
const BASE_URL = "http://localhost:3000";

// --- CONFIGURATION ---
const FILTER_OPTIONS = {
  niche: ["fitness", "education", "fashion", "beauty", "tech", 
  "lifestyle", "business", "travel", "education", "Food", "entertainment"],
  // Mapping frontend labels to backend query values if needed
  price: [
      { label: "Under ₦50k", value: "50000" },
      { label: "Under ₦100k", value: "100000" },
      { label: "Under ₦500k", value: "500000" },
      { label: "₦500k+", value: "500001" }
  ],
  platform: ["instagram", "tiktok"]
};

// --- COMPONENTS ---

const FilterDropdown = ({ label, options, onSelect }: { label: string, options: any[], onSelect: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm font-medium transition-all ${isOpen ? 'text-indigo-600 ring-2 ring-indigo-100' : 'text-gray-700 hover:bg-gray-50'}`}
      >
        {label}
        <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`absolute top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-30 transition-all duration-200 origin-top ${isOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}`}>
        <div className="py-2">
          {options.map((option, idx) => {
            const displayLabel = typeof option === 'object' ? option.label : option;
            const returnValue = typeof option === 'object' ? option.value : option;
            
            return (
                <button 
                  key={idx} 
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  onClick={() => { onSelect(returnValue); setIsOpen(false); }}
                >
                  {displayLabel}
                </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Creator Card - Updated to use Real Data Structure
const CreatorCard = ({ creator, onInvite }: { creator: any, onInvite: (c: any) => void }) => {
    // Default to first available platform or instagram
    // NOTE: Backend needs to send 'metrics' as an object/array. Adjusting based on Day 2 spec.
    const platform = creator.metrics?.platform || "instagram"; 
    
    return (
        <div className="relative group aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 bg-gray-200">
            {creator.profileImage ? (
                <Image 
                    src={creator.profileImage} 
                    alt={creator.username || "Creator"} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                    No Image
                </div>
            )}
            
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>

            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <button 
                    onClick={(e) => { e.stopPropagation(); onInvite(creator); }}
                    className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-xs font-medium hover:bg-white/25 transition-colors backdrop-blur-sm"
                >
                    + Invite
                </button>
                
                <div className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20">
                     {/* Dynamic Icon based on platform */}
                     {platform === 'tiktok' ? (
                         <span className="text-xs font-bold text-white">TT</span>
                     ) : (
                         <span className="text-xs font-bold text-white">IG</span>
                     )}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                <p className="font-bold text-lg mb-1">{creator.username || "Unknown"}</p>
                <p className="text-xs text-gray-300 mb-2 truncate">{creator.bio}</p>
                
                <div className="flex items-center gap-2 text-xs text-gray-200 mb-2">
                    <span className="bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
                        {creator.metrics?.followers ? `${(creator.metrics.followers / 1000).toFixed(1)}k` : "0"} Follows
                    </span>
                    <span className="bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
                        {creator.metrics?.avgLikes ? `${(creator.metrics.avgLikes / 1000).toFixed(1)}k` : "0"} Likes
                    </span>
                </div>
                
                <div className="flex justify-between items-center text-xs font-medium border-t border-white/20 pt-2 mt-2">
                    <span className="text-gray-100">
                        {creator.finance?.pricePerPost ? `₦${creator.finance.pricePerPost.toLocaleString()}` : "N/A"}
                    </span>
                    <span className="text-emerald-400">
                        Eng: {creator.metrics?.engagementRate || "0"}%
                    </span>
                </div>
            </div>
        </div>
    );
};

// --- INVITE MODAL (Kept same layout) ---
const InviteModal = ({ isOpen, onClose, creator }: { isOpen: boolean, onClose: () => void, creator: any }) => {
    if (!isOpen || !creator) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">Invite {creator.username}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                        <XMarkIcon className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    {/* ... (Same modal content as before) ... */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Initial Message</label>
                        <textarea rows={3} placeholder={`Hi ${creator.username}, we'd love to work with you...`} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 resize-none text-sm placeholder-gray-400"></textarea>
                    </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Cancel</button>
                    <button className="px-6 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all shadow-lg">Send Invite</button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function DiscoverPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  
  // REAL DATA STATE
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // FILTERS STATE
  const [filters, setFilters] = useState({
      niche: "",
      price: "", // maps to maxPrice or minPrice logic
      platform: ""
  });

  // FETCH CREATORS ON LOAD & FILTER CHANGE
  useEffect(() => {
      const fetchCreators = async () => {
          setLoading(true);
          try {
              // Construct Query String
              const params = new URLSearchParams();
              if (filters.niche) params.append("niche", filters.niche.toLowerCase());
              // Example logic for price filtering (adjust based on actual backend param name)
              if (filters.price) params.append("maxPrice", filters.price); 
              
              // Backend Endpoint: GET /creator
              const res = await fetch(`${BASE_URL}/creator?${params.toString()}`, {
                  headers: {
                      // Add Auth token if required for browsing, otherwise public
                      "Authorization": `Bearer ${localStorage.getItem("accessToken")}` 
                  }
              });
              
              if (res.ok) {
                  const data = await res.json();
                  console.log("res =>",res)
                  console.log("data =>",data)
                  setCreators(data); // Assuming data is an array of creators
              }
          } catch (error) {
              console.error("Failed to fetch creators", error);
          } finally {
              setLoading(false);
          }
      };

      fetchCreators();
  }, [filters]);

  const openInviteModal = (creator: any) => {
      setSelectedCreator(creator);
      setIsModalOpen(true);
  };

  const handleFilterSelect = (type: string, value: string) => {
      setFilters(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className={`flex min-h-screen bg-white ${inter.className} overflow-x-hidden`}>
      
      <InviteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        creator={selectedCreator} 
      />

      <div className="hidden md:block w-64 fixed h-full z-20">
        <Sidebar className="border-r border-gray-100" />
      </div>

      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      <main className="flex-1 md:ml-64 w-full p-4 md:p-6 bg-white min-h-screen">
        
        <div className="md:hidden flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-black">Caskayd</h1>
            <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
                <Squares2X2Icon className="w-6 h-6 text-gray-700" />
            </button>
        </div>

        <div className="bg-[#EBEBFF] min-h-[calc(100vh-3rem)] rounded-[2rem] p-6 md:p-10 relative">
            
            <div className="flex flex-col items-center mb-10 space-y-6">
                <div className="relative w-full max-w-lg">
                    <MagnifyingGlassIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Search creators..." className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700" />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-gray-500 font-medium">Filters</span>
                    <div className="flex flex-wrap justify-center gap-3">
                        <FilterDropdown 
                            label={filters.niche || "Niche"} 
                            options={FILTER_OPTIONS.niche} 
                            onSelect={(val) => handleFilterSelect("niche", val)} 
                        />
                        <FilterDropdown 
                            label="Price" 
                            options={FILTER_OPTIONS.price} 
                            onSelect={(val) => handleFilterSelect("price", val)} 
                        />
                        {/* Reset Filter Button (Optional) */}
                        {(filters.niche || filters.price) && (
                            <button 
                                onClick={() => setFilters({ niche: "", price: "", platform: "" })}
                                className="px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* CONTENT AREA */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                </div>
            ) : creators.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {creators.map((creator: any) => (
                        <CreatorCard key={creator.id || Math.random()} creator={creator} onInvite={openInviteModal} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-lg font-semibold">No creators found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                </div>
            )}

        </div>
      </main>
    </div>
  );
}