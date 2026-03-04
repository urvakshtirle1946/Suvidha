import { Facebook, Instagram, Linkedin, Mail } from "lucide-react"

function StackedCircularFooter() {
    return (
        <div className="w-full flex justify-center pb-8 px-4 mt-8">
            <footer className="w-full max-w-[1000px] bg-white/40 backdrop-blur-lg rounded-[24px] overflow-hidden py-4 px-6 md:px-10 flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-between shadow-sm border border-white/60 gap-y-4">

                {/* Left: Logo & Copyright */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 mb-1">
                        <img src="/favicon.ico" alt="Zelp Logo" className="w-[24px] h-[24px] object-contain rounded drop-shadow-sm" />
                        <span className="text-[20px] font-bold tracking-tight text-gray-900">zelp</span>
                    </div>
                    <p className="text-[12px] text-gray-500 font-medium">
                        © {new Date().getFullYear()} zelp. All rights reserved.
                    </p>
                </div>

                {/* Middle: Minimal Links */}
                <div className="hidden lg:flex items-center flex-wrap justify-center gap-6 text-[13px] font-medium text-gray-600">
                    <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
                </div>

                {/* Right: Social Icons */}
                <div className="flex items-center justify-center flex-wrap gap-4 text-gray-500">
                    <a href="#" className="hover:text-blue-600 hover:scale-110 transition-all p-2 bg-white/50 rounded-full shadow-sm">
                        <Facebook className="h-[16px] w-[16px]" strokeWidth={2} />
                        <span className="sr-only">Facebook</span>
                    </a>
                    <a href="#" className="hover:text-blue-600 hover:scale-110 transition-all p-2 bg-white/50 rounded-full shadow-sm">
                        <svg
                            role="img"
                            viewBox="0 0 24 24"
                            className="h-[16px] w-[16px] fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.15H5.078z" />
                        </svg>
                        <span className="sr-only">X (Twitter)</span>
                    </a>
                    <a href="#" className="hover:text-blue-600 hover:scale-110 transition-all p-2 bg-white/50 rounded-full shadow-sm">
                        <Linkedin className="h-[16px] w-[16px]" strokeWidth={2} />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href="#" className="hover:text-black hover:scale-110 transition-all p-2 bg-white/50 rounded-full shadow-sm">
                        <Instagram className="h-[16px] w-[16px]" strokeWidth={2} />
                        <span className="sr-only">Instagram</span>
                    </a>
                </div>

            </footer>
        </div>
    )
}

export { StackedCircularFooter }
