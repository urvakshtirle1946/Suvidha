import { Facebook, Instagram, Linkedin } from "lucide-react"

function StackedCircularFooter() {
    return (
        <div className="w-full flex justify-center pb-8 px-4">
            <footer className="w-full max-w-[800px] bg-[#0a0a0a] text-white rounded-[24px] py-4 px-6 flex flex-col items-center shadow-2xl border border-[#1f1f1f]">

                {/* Top Row: Logo & Text */}
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="bg-black border border-gray-800 rounded flex items-center justify-center w-6 h-6 shadow-[0_0_10px_rgba(37,99,235,0.4)]">
                        <span className="text-white font-bold text-[10px] leading-none">Z</span>
                    </div>
                    <span className="text-lg font-bold tracking-tight mt-[1px]">zelp</span>
                </div>

                {/* Middle Row: Social Icons & Built By */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Facebook className="h-[14px] w-[14px]" strokeWidth={2} />
                        <span className="sr-only">Facebook</span>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <svg
                            role="img"
                            viewBox="0 0 24 24"
                            className="h-[14px] w-[14px] fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.15H5.078z" />
                        </svg>
                        <span className="sr-only">X (Twitter)</span>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Instagram className="h-[14px] w-[14px]" strokeWidth={2} />
                        <span className="sr-only">Instagram</span>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Linkedin className="h-[14px] w-[14px]" strokeWidth={2} />
                        <span className="sr-only">LinkedIn</span>
                    </a>

                    <span className="text-gray-600 text-[10px] hidden sm:block">|</span>

                    <div className="text-center text-[10px] text-gray-500 font-medium tracking-wide">
                        Built with <span className="text-red-500">❤️</span> by{' '}
                        <a
                            href="https://www.linkedin.com/in/urvaksh-tirle"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-gray-400 hover:text-white transition-colors"
                        >
                            Urvaksh
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export { StackedCircularFooter }
