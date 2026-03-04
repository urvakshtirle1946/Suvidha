import { Facebook, Instagram, Linkedin } from "lucide-react"

function StackedCircularFooter() {
    return (
        <div className="w-full flex justify-center pb-8 px-4">
            <footer className="w-full max-w-[1000px] bg-[#0a0a0a] text-white rounded-[24px] py-6 px-8 flex flex-col items-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-[#1f1f1f]">

                {/* Logo Section */}
                <div className="flex items-center justify-center gap-2 mb-3 mt-1">
                    <img src="/favicon.ico" alt="Zelp Logo" className="w-[28px] h-[28px] object-contain rounded" />
                    <span className="text-[22px] font-bold tracking-tight mt-[1px]">zelp</span>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center flex-wrap gap-5 text-gray-400 mb-2">
                    <a href="#" className="hover:text-white transition-colors">
                        <Facebook className="h-[18px] w-[18px]" strokeWidth={2} />
                        <span className="sr-only">Facebook</span>
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        <svg
                            role="img"
                            viewBox="0 0 24 24"
                            className="h-[18px] w-[18px] fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.15H5.078z" />
                        </svg>
                        <span className="sr-only">X (Twitter)</span>
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        <Instagram className="h-[18px] w-[18px]" strokeWidth={2} />
                        <span className="sr-only">Instagram</span>
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        <Linkedin className="h-[18px] w-[18px]" strokeWidth={2} />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                </div>

                {/* Built by Urvaksh */}
                <div className="text-center mt-2 mb-1">
                    <p className="text-[12px] text-gray-500 font-medium tracking-wide">
                        Built with <span className="text-red-500">❤️</span> by{' '}
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
