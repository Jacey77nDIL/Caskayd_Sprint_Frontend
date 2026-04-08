"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CallbackClient() {
    const router = useRouter();
    
    // UI states to show the user what is happening
    const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
    const [errorMessage, setErrorMessage] = useState("");
    
    // Use a ref to prevent strict mode from firing the API call twice
    const hasAttemptedVerification = useRef(false);

    useEffect(() => {
        const verifyPayment = async () => {
            // Stop if we already tried verifying
            if (hasAttemptedVerification.current) return;
            hasAttemptedVerification.current = true;

            // Get the required data from local storage
            const token = localStorage.getItem("accessToken");
            const reference = localStorage.getItem("pending_payment_reference");

            if (!token || !reference) {
                setStatus("error");
                setErrorMessage("Missing payment reference or authentication token.");
                
                return;
            }

            // Log what we are about to send to the backend
            
            
            try {
                const res = await fetch(`${BASE_URL}/payments/verify/${reference}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json().catch(() => ({}));
                
                // Log the exact response from the server
                

                if (res.ok && data.status === "SUCCESSFUL") {
                    // It worked! Clear the reference and update UI
                    localStorage.removeItem("pending_payment_reference");
                    setStatus("success");
                } else {
                    // Server returned an error or non-successful status
                    setStatus("error");
                    setErrorMessage(data.message || "Payment verification failed or is still pending.");
                }
            } catch (error) {
                // Log network or unexpected errors
                
                
                setStatus("error");
                setErrorMessage("A network error occurred while verifying your payment.");
            }
        };

        verifyPayment();
    }, []);

    // Send the user back to their chat
    const handleReturn = () => {
        router.push("/business/messages"); 
    };

    return (
        <div className={`min-h-screen w-full flex items-center justify-center bg-[#F8F9FB] p-4 ${inter.className}`}>
            <div className="bg-white max-w-md w-full rounded-[2rem] p-8 shadow-xl border border-gray-100 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
                
                {status === "verifying" && (
                    <>
                        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment...</h1>
                        <p className="text-gray-500 text-sm">Please hold on while we confirm your transaction with the bank. Do not close this page.</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                            <CheckCircleIcon className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                        <p className="text-gray-500 text-sm mb-8">Your payment has been secured in escrow. You can now return to the conversation.</p>
                        <button 
                            onClick={handleReturn}
                            className="w-full bg-[#5B4DFF] hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md"
                        >
                            Return to Messages
                        </button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                            <XCircleIcon className="w-10 h-10 text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
                        <p className="text-gray-500 text-sm mb-8">{errorMessage}</p>
                        <button 
                            onClick={handleReturn}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition-colors"
                        >
                            Go Back to Chat
                        </button>
                    </>
                )}

            </div>
        </div>
    );
}