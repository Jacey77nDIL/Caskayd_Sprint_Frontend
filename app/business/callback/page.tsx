import { Metadata } from "next";
import CallbackClient from "./CallbackClient";

// Add SEO optimization to the page
export const metadata: Metadata = {
    title: "Verifying Payment | Your Platform Name",
    description: "Securely verifying your Flutterwave payment transaction.",
};

export default function BusinessCallbackPage() {
    // Render the client component where the actual logic lives
    return <CallbackClient />;
}