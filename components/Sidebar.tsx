"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Squares2X2Icon, 
  GlobeAltIcon, 
  ChatBubbleLeftRightIcon, 
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";

interface SidebarProps {
    className?: string;
    onClose?: () => void;
    role?: "business" | "creator"; // Added Role Prop
}

const SidebarItem = ({ icon: Icon, label, href, onClick }: { icon: any, label: string, href: string, onClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        isActive 
        ? "text-emerald-600 font-semibold bg-emerald-50" 
        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-6 h-6" />
      <span>{label}</span>
    </Link>
  );
};

export default function Sidebar({ className = "", onClose, role = "business" }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push(`/${role}/login`);
  };

  const menuItems = role === "business" ? [
      { label: "Dashboard", href: "/business/dashboard", icon: Squares2X2Icon },
      { label: "Discover", href: "/business/discover", icon: GlobeAltIcon },
      { label: "Messages", href: "/business/messages", icon: ChatBubbleLeftRightIcon },
  ] : [
      { label: "Dashboard", href: "/creator/dashboard", icon: Squares2X2Icon },
      { label: "Find Jobs", href: "/creator/jobs", icon: BriefcaseIcon }, // Different for Creator
      { label: "Messages", href: "/creator/messages", icon: ChatBubbleLeftRightIcon },
  ];

  return (
    <aside className={`flex flex-col justify-between p-6 bg-white h-full ${className}`}>
      <div>
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-extrabold text-black">Caskayd</h1>
            {onClose && (
                <button onClick={onClose} className="md:hidden p-1 rounded-full hover:bg-gray-100">
                    <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
            )}
        </div>
        
        <nav className="space-y-2">
            {menuItems.map((item) => (
                <SidebarItem 
                    key={item.label}
                    href={item.href} 
                    icon={item.icon} 
                    label={item.label} 
                    onClick={onClose} 
                />
            ))}
        </nav>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold">
             {role === "business" ? "HP" : "ME"}
          </div>
          <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{role === "business" ? "Business User" : "Creator User"}</p>
              <p className="text-xs text-gray-500 truncate">{role === "business" ? "Marketing Director" : "Content Creator"}</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="w-4 h-4" />
          Logout
        </button>
        
        <p className="text-[10px] text-gray-400 mt-4 text-center">© 2026 Caskayd Enterprises</p>
      </div>
    </aside>
  );
}