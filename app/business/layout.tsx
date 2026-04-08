import AuthGuard from "@/components/AuthGuard";

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            {/* The AuthGuard will now protect discover, messages, settings, etc. */}
            {/* But it will explicitly ignore the login and signup pages inside this folder */}
            {children}
        </AuthGuard>
    );
}