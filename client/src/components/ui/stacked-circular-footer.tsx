import { Facebook, Instagram, Linkedin } from "lucide-react"

function StackedCircularFooter() {
    return (
        <div className="w-full flex justify-center pb-8 px-4 mt-8">
            <footer className="w-full max-w-[1000px] bg-white/40 backdrop-blur-lg rounded-2xl overflow-hidden py-4 px-6 md:px-10 flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-between shadow-sm border border-white/60 gap-y-4">

                {/* Left */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 mb-1">
                        <img
                            src="/favicon.ico"
                            alt="Zelp Logo"
                            className="w-[24px] h-[24px] rounded"
                        />
                        <span className="text-[20px] font-bold text-gray-900">
                            zelp
                        </span>
                    </div>

                    <p className="text-[12px] text-gray-500 font-medium text-center md:text-left">
                        © {new Date().getFullYear()} zelp. All rights reserved.
                    </p>
                </div>

                {/* Middle */}
                <div className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-gray-600">
                    <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4 text-gray-500">
                    <a href="#" className="hover:text-blue-600 hover:scale-110 transition-all p-2 bg-white/50 rounded-full shadow-sm">
                        <Facebook className="h-[16px] w-[16px]" />
                    </a>

                    <a href="#" className="hover:text-blue-600 hover:scale-110 transition-all p-2 bg-white/50 rounded-full shadow-sm">
                        <Linkedin className="h-[16px] w-[16px]" />
                    </a>

                    <a href="#" className="hover:text-black hover:scale-110 transition-all p-2 bg-white/50 rounded-full shadow-sm">
                        <Instagram className="h-[16px] w-[16px]" />
                    </a>
                </div>

            </footer>
        </div>
    )
}

export { StackedCircularFooter }