import { Facebook, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CenteredLightFooter() {
    return (
        <footer className="w-full bg-white/80 backdrop-blur-md text-gray-900 py-14 px-6 sm:px-12 rounded-[32px] mt-12 mb-10 max-w-7xl mx-auto shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)]">

            {/* Hero Section */}
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">

                <img
                    src="/logo.png"
                    alt="Zelp Logo"
                    className="h-10 w-auto rounded-md mb-6"
                />

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Book your medical tests today.
                </h2>

                <p className="text-gray-500 text-[16px] mb-8">
                    Healthcare with the least amount of effort starting now.
                </p>

                <Button className="rounded-full h-11 px-7 bg-[#4f46e5] hover:bg-[#4338ca] text-white shadow-lg shadow-indigo-500/30 font-semibold transition-transform hover:scale-105">
                    Get Started
                </Button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mt-10 pt-6 w-full">
                <div className="flex items-center justify-between max-w-5xl mx-auto px-6 flex-wrap gap-4">

                    {/* Social Icons */}
                    <div className="flex items-center gap-5 text-gray-500">
                        <Link href="#" className="hover:text-gray-900 transition-colors">
                            <Facebook className="h-5 w-5 stroke-[1.5px]" />
                        </Link>

                        <Link href="#" className="hover:text-gray-900 transition-colors">
                            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
                            </svg>
                        </Link>

                        <Link href="#" className="hover:text-gray-900 transition-colors">
                            <Instagram className="h-5 w-5 stroke-[1.5px]" />
                        </Link>

                        <Link href="#" className="hover:text-gray-900 transition-colors">
                            <Linkedin className="h-5 w-5 stroke-[1.5px]" />
                        </Link>
                    </div>

                    {/* Copyright */}
                    <p className="text-gray-500 text-[13px]">
                        © {new Date().getFullYear()} Zelp. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    )
}
