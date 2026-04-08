import AuthGuard from "@/components/AuthGuard";

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            {/* The AuthGuard will now protect dashboard, wallet, messages, etc. */}
            {children}
        </AuthGuard>
    );
}