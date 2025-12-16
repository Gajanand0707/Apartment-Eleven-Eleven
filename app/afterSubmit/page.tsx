"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import form from "../../public/form.jpg";

export default function AfterSubmitPage() {
    const router = useRouter();
    const [count, setCount] = useState(5);

    useEffect(() => {
        if (count <= 0) return;
        const t = setInterval(() => {
            setCount((c) => c - 1);
        }, 1000);
        return () => clearInterval(t);
    }, [count]);

    useEffect(() => {
        if (count <= 0) {
            // final redirect
            router.push("/");
        }
    }, [count, router]);

    return (
        <div className="relative w-full min-h-screen">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image src={form} alt="form submitted" fill className="object-cover" />
            </div>

            {/* Optional dim overlay for contrast */}
            <div className="absolute inset-0 z-10 bg-black/35" />

            {/* Centered text over image */}
            <div className="relative z-20 flex items-center justify-center min-h-screen px-6">
                <p className="text-center text-4xl md:text-7xl font-goudy-old backdrop-blur-sm text-white ">
                    Thank you for reaching out to us.
                    <br />
                    We’ll get back to you within 72 hours.
                </p>
            </div>

            {/* Bottom countdown / redirect line */}
            <div className="fixed bottom-6 left-0 right-0 flex justify-center z-30">
                <div className="bg-black/60 text-white text-xl md:text-2xl py-2 px-4 rounded-lg font-goudy backdrop-blur-sm">
                    <span>Redirecting to </span>
                    <button
                        onClick={() => router.push("/")}
                        className="underline ml-1 mr-2"
                    >
                        home
                    </button>
                    <span> in {count} second{count === 1 ? "" : "s"}.</span>
                </div>
            </div>
        </div>
    );
}