import { Icons } from "@/components/ui/icons"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

function StackedCircularFooter() {
    return (
        <div className="w-full flex justify-center pb-8 px-4">
            <footer className="w-full max-w-[1000px] bg-[#09090b] text-white rounded-[24px] pt-16 pb-12 px-6 flex flex-col items-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-[#27272a]">
                {/* Logo Section */}
                <div className="mb-14 flex items-center justify-center gap-2">
                    <img src="/favicon.ico" alt="Zelp Logo" className="w-[34px] h-[34px] rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
                    <span className="text-[22px] font-bold tracking-tight mt-1">zelp</span>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center flex-wrap gap-8 text-gray-400">
                    <a href="#" className="hover:text-white transition-colors">
                        <Facebook className="h-5 w-5" />
                        <span className="sr-only">Facebook</span>
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        <svg
                            role="img"
                            viewBox="0 0 24 24"
                            className="h-5 w-5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.15H5.078z" />
                        </svg>
                        <span className="sr-only">X (Twitter)</span>
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                </div>

                {/* Built by Urvaksh */}
                <div className="text-center mt-12 mb-[-1rem]">
                    <p className="text-xs text-gray-500 font-medium tracking-wide">
                        Built with ❤️ by{' '}
                        <a
                            href="https://www.linkedin.com/in/urvaksh-tirle"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-gray-400 hover:text-white transition-colors"
                        >
                            Urvaksh
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    )
}

export { StackedCircularFooter }
