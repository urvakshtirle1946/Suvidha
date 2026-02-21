"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
    const router = useRouter();

    return (
        <section className="bg-white font-serif min-h-screen flex items-center justify-center">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-full sm:w-10/12 md:w-8/12 text-center">
                        {/* Using a reliable Unsplash image as a fallback since the Dribbble one might be hotlink-protected or unavailable */}
                        <div
                            className="bg-[url('https://images.unsplash.com/photo-1584824486509-11459466a200?q=80&w=2070&auto=format&fit=crop')] h-[250px] sm:h-[350px] md:h-[400px] bg-center bg-no-repeat bg-contain"
                            aria-hidden="true"
                        >
                            <h1 className="text-center text-black text-6xl sm:text-7xl md:text-8xl pt-6 sm:pt-8 drop-shadow-md">
                                404
                            </h1>
                        </div>

                        <div className="mt-[-50px]">
                            <h3 className="text-2xl text-black sm:text-3xl font-bold mb-4">
                                Looks like you're lost
                            </h3>
                            <p className="mb-6 text-black sm:mb-5">
                                The page you are looking for is not available!
                            </p>

                            <Button
                                variant="default"
                                onClick={() => router.push("/")}
                                className="my-5 bg-green-600 hover:bg-green-700 text-white"
                            >
                                Go to Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
