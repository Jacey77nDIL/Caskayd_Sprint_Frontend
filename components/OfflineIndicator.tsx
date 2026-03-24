"use client";

import { useState, useEffect } from "react";
import { WifiIcon } from "@heroicons/react/24/outline";

export default function OfflineIndicator() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        // Set initial state
        setIsOffline(!navigator.onLine);

        // Listeners to instantly catch network changes
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    if (!isOffline) return null;

    return (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-xs font-bold py-1.5 px-4 z-[200] flex items-center justify-center gap-2 shadow-md animate-in slide-in-from-top-4">
            <WifiIcon className="w-4 h-4" />
            You are currently offline. Viewing cached data.
        </div>
    );
}