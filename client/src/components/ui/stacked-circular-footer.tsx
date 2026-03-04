import { Facebook, Instagram, Linkedin } from "lucide-react"

function StackedCircularFooter() {
    return (
        <div className="w-full flex justify-center pb-8 px-4">
            <footer className="w-full max-w-[1000px] bg-[#0a0a0a] text-white rounded-[20px] py-3 px-8 flex flex-col items-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-[#1f1f1f]">

                {/* Logo Section */}
                <div className="flex items-center justify-center gap-2 mb-1 mt-1">
                    <img src="/favicon.ico" alt="Zelp Logo" className="w-[20px] h-[20px] object-contain rounded" />
                    <span className="text-[18px] font-bold tracking-tight">zelp</span>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center flex-wrap gap-4 text-gray-400 mb-1">
                    <a href="#" className="hover:text-white transition-colors">
                        <Facebook className="h-[14px] w-[14px]" strokeWidth={2} />
                        <span className="sr-only">Facebook</span>
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
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
                    <a href="#" className="hover:text-white transition-colors">
                        <Instagram className="h-[14px] w-[14px]" strokeWidth={2} />
                        <span className="sr-only">Instagram</span>
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        <Linkedin className="h-[14px] w-[14px]" strokeWidth={2} />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                </div>

                {/* Built by Urvaksh */}
                <div className="text-center mt-0 mb-0">
                    <p className="text-[10px] text-gray-500 font-medium tracking-wide">
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
