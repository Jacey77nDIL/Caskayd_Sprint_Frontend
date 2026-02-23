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
  Squares2X2Icon
} from "@heroicons/react/24/outline";
import Sidebar from "@/components/Sidebar"; 

const inter = Inter({ subsets: ["latin"] });
const BASE_URL = "http://localhost:3000";

// --- CONFIGURATION ---
const FILTER_OPTIONS = {
  niche: ["fitness", "education", "fashion", "beauty", "tech", 
  "lifestyle", "business", "travel", "food", "entertainment"],
  price: [
      { label: "Under ₦50k", value: "50000" },
      { label: "Under ₦100k", value: "100000" },
      { label: "Under ₦500k", value: "500000" },
      { label: "₦500k+", value: "500001" }
  ],
  platform: ["instagram", "tiktok"]
};

// --- HELPER: Number Formatter ---
const formatNumber = (num: number) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
};

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
  </svg>
);

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.49-3.35-3.98-5.6-.54-2.49.42-5.18 2.45-6.83 1.98-1.63 4.81-1.82 7.01-.52.14.09.28.19.42.29-.01 1.33-.01 2.66-.01 4-.08-.03-.17-.07-.25-.11-.95-.49-2.05-.64-3.11-.42-1.18.24-2.19 1.05-2.67 2.17-.5 1.17-.37 2.54.34 3.59.83 1.25 2.51 1.74 3.94 1.13.92-.38 1.63-1.16 1.93-2.1.26-.81.25-1.68.25-2.53-.02-5.24-.02-10.49-.02-15.73z" />
  </svg>
);

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

// --- CREATOR CARD (UI PRESERVED, LOGIC UPDATED) ---
const CreatorCard = ({ creator, onInvite }: { creator: any, onInvite: (c: any) => void }) => {
    // 1. Platform Toggle State
    const [platform, setPlatform] = useState<"instagram" | "tiktok">("instagram");

    // 2. Toggle Handler
    const togglePlatform = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        setPlatform(prev => prev === "instagram" ? "tiktok" : "instagram");
    };

    // 3. Dynamic Data Selection based on Platform
    const handleUrl = platform === "instagram" ? creator.instagram : creator.tiktok;
    const followers = platform === "instagram" ? creator.instagramFollowers : creator.tiktokFollowers;
    const engagement = platform === "instagram" ? creator.instagramEngagementRate : creator.tiktokEngagementRate;

    // Helper to extract clean username handle
    const getHandle = () => {
        if (!handleUrl) return "Unknown";
        let clean = handleUrl.replace(/(^\w+:|^)\/\//, '').replace("www.", "");
        clean = clean.replace("instagram.com/", "").replace("tiktok.com/", "").replace("@", "");
        if(clean.endsWith("/")) clean = clean.slice(0, -1);
        return clean; // Removed @ to match your previous style, add back if needed
    };

    const handle = getHandle();

    return (
        <div className="relative group aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 bg-gray-200">
            {/* Image Handling */}
            {creator.profileImageUrl ? (
                <Image 
                    src={creator.profileImageUrl} 
                    alt={handle} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 flex-col gap-2">
                    <span>No Image</span>
                </div>
            )}
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

            {/* Top Row: Invite & Platform Toggle */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <button 
                    onClick={(e) => { e.stopPropagation(); onInvite(creator); }}
                    className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-xs font-medium hover:bg-white/25 transition-colors backdrop-blur-sm"
                >
                    + Invite
                </button>
                
                {/* Platform Toggle Icon */}
                <button 
                    onClick={togglePlatform}
                    className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 hover:bg-white/30 transition-colors z-20"
                >
                     {platform === 'tiktok' ? (
                         <TiktokIcon className="w-5 h-5 text-black" />
                     ) : (
                         <InstagramIcon className="w-5 h-5 text-pink-500" />
                     )}
                </button>
            </div>

            {/* Bottom Info Area */}
            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                <p className="font-bold text-lg mb-1">{handle}</p>
                <p className="text-xs text-gray-300 mb-2 truncate">{creator.bio || "No bio"}</p>
                
                {/* Stats Pills (Replaced Likes with Location) */}
                <div className="flex items-center gap-2 text-xs text-gray-200 mb-2">
                    <span className="bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
                        {formatNumber(followers)} Follows
                    </span>
                    <span className="bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
                        {creator.location || "Unknown"}
                    </span>
                </div>
                
                {/* Footer: Price & Engagement */}
                <div className="flex justify-between items-center text-xs font-medium border-t border-white/20 pt-2 mt-2">
                    <span className="text-gray-100">
                        {creator.pricePerPost ? `₦${Number(creator.pricePerPost).toLocaleString()}` : "N/A"}
                    </span>
                    <span className="text-emerald-400">
                        Eng: {engagement ? Number(engagement).toFixed(1) : "0"}%
                    </span>
                </div>
            </div>
        </div>
    );
};

// --- INVITE MODAL ---
const InviteModal = ({ isOpen, onClose, creator }: { isOpen: boolean, onClose: () => void, creator: any }) => {
    if (!isOpen || !creator) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">Invite Creator</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                        <XMarkIcon className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Initial Message</label>
                        <textarea rows={3} placeholder={`Hi, we'd love to work with you...`} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 resize-none text-sm placeholder-gray-400"></textarea>
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
                  console.log("data =>",data)
                  setCreators(data); 
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
                        <CreatorCard 
                          key={creator.id || Math.random()} 
                          creator={creator} 
                          onInvite={openInviteModal} 
                        />
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