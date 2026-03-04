import { Icons } from "@/components/ui/icons"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

function StackedCircularFooter() {
    return (
        <div className="w-full flex justify-center pb-8 px-4">
            <footer className="w-full max-w-[1000px] bg-black text-white rounded-[24px] py-16 px-6 flex flex-col items-center">
                {/* Logo Section */}
                <div className="mb-8 flex items-center justify-center gap-3">
                    {/* Custom Logo rendering similar to the S icon in the image */}
                    <div className="bg-blue-600 rounded-lg w-8 h-8 flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                        Z
                    </div>
                    <span className="text-xl font-bold tracking-tight">zelp</span>
                </div>

                {/* Navigation Links */}
                <nav className="mb-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-gray-300">
                    <a href="#" className="hover:text-white transition-colors">Homepage</a>
                    <a href="#" className="hover:text-white transition-colors">Products</a>
                    <a href="#" className="hover:text-white transition-colors">Services</a>
                    <a href="#" className="hover:text-white transition-colors">About Us</a>
                    <a href="#" className="hover:text-white transition-colors">Contact Us</a>
                </nav>

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
