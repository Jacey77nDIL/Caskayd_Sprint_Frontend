"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    
    // We start as false so we don't accidentally flash protected content
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // 1. Figure out if the user is currently on a login or signup page
        const isPublicRoute = pathname.includes("/login") || pathname.includes("/signup");

        // 2. Look for the JWT in local storage
        const token = localStorage.getItem("accessToken");

        if (!token && !isPublicRoute) {
            // 3. No token found, and they are trying to view a protected page.
            // Figure out which side of the app they are on to send them to the right login.
            if (pathname.startsWith("/business")) {
                router.replace("/business/login");
            } else if (pathname.startsWith("/creator")) {
                router.replace("/creator/login");
            } else {
                // Fallback just in case
                router.replace("/"); 
            }
        } else {
            // 4. Either they have a token, or they are on a public route. Let them in!
            setIsAuthorized(true);
        }
    }, [router, pathname]);

    // Show absolutely nothing until we verify they belong here. 
    // This prevents the "Flash of Unauthenticated Content" (FOUC).
    // Note: You can replace `null` with your `<Loader />` component if you want a spinning wheel here.
    if (!isAuthorized) {
        return null; 
    }

    return <>{children}</>;
}