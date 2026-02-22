"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Bars3Icon, MagnifyingGlassIcon,ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Dummy Conversations
const CONVERSATIONS = [
    { id: 1, name: "Sarah Chang", msg: "Hey! I received the brief.", time: "2m ago", active: true },
    { id: 2, name: "David K.", msg: "Is the price negotiable?", time: "1h ago", active: false },
    { id: 3, name: "Lisa Arts", msg: "Video has been uploaded!", time: "1d ago", active: false },
];

export default function MessagesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`flex min-h-screen bg-white ${inter.className}`}>
      
      {/* Sidebar Desktop */}
      <div className="hidden md:block w-64 fixed h-full z-20">
        <Sidebar role="business" className="border-r border-gray-100" />
      </div>

      {/* Sidebar Mobile */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <Sidebar role="business" onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col h-screen">
        
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-100">
            <h1 className="text-lg font-bold">Messages</h1>
            <button onClick={() => setIsMobileMenuOpen(true)}><Bars3Icon className="w-6 h-6" /></button>
        </div>

        <div className="flex flex-1 overflow-hidden">
            {/* Chat List */}
            <div className="w-full md:w-80 border-r border-gray-100 flex flex-col">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search messages" className="w-full pl-9 pr-4 py-2bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {CONVERSATIONS.map((chat) => (
                        <div key={chat.id} className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${chat.active ? 'bg-indigo-50/50' : ''}`}>
                            <div className="flex justify-between mb-1">
                                <span className="font-semibold text-sm text-gray-900">{chat.name}</span>
                                <span className="text-xs text-gray-400">{chat.time}</span>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{chat.msg}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window (Empty State for Dummy) */}
            <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gray-50 text-center p-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <ChatBubbleLeftRightIcon className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Select a conversation</h3>
                <p className="text-sm text-gray-500">Choose a creator from the list to start chatting.</p>
            </div>
        </div>
      </main>
    </div>
  );
}