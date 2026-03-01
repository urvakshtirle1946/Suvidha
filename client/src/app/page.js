'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export default function WaitlistPage() {
  const router = useRouter();
  const [showOTP, setShowOTP] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleOTPChange = (index, val) => {
    // Only allow alphanumeric digits
    if (val && !/^[a-zA-Z0-9]$/.test(val)) return;
    
    const newOtp = [...otpValues];
    newOtp[index] = val;
    setOtpValues(newOtp);

    // Auto-advance to next input
    if (val && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Check if full OTP validates
    if (newOtp.join("") === "Zelp26") {
      router.push('/home');
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace logic to move backward
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-emerald-500/30">
      {/* Subtle background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Secret Developer Access Button */}
      <button 
        onClick={() => setShowOTP(true)}
        className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-50 bg-transparent border-none cursor-pointer p-2 rounded-full hover:bg-white/5"
        title="Developer Access"
      >
        <Lock size={20} />
      </button>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 w-full max-w-5xl mx-auto pt-24 pb-16 z-10 relative">
        
        {/* Logo (4 hearts forming a cross) */}
        <div className="mb-10 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Top */}
            <path d="M24 21L19 15.5C16.5 12.5 16.5 7.5 19.5 5C22 3 24 5 24 5C24 5 26 3 28.5 5C31.5 7.5 31.5 12.5 29 15.5L24 21Z" fill="#34d399"/>
            {/* Bottom */}
            <path d="M24 27L29 32.5C31.5 35.5 31.5 40.5 28.5 43C26 45 24 43 24 43C24 43 22 45 19.5 43C16.5 40.5 16.5 35.5 19 32.5L24 27Z" fill="#34d399"/>
            {/* Left */}
            <path d="M21 24L15.5 29C12.5 31.5 7.5 31.5 5 28.5C3 26 5 24 5 24C5 24 3 22 5 19.5C7.5 16.5 12.5 16.5 15.5 19L21 24Z" fill="#34d399"/>
            {/* Right */}
            <path d="M27 24L32.5 19C35.5 16.5 40.5 16.5 43 19.5C45 22 43 24 43 24C43 24 45 26 43 28.5C40.5 31.5 35.5 31.5 32.5 29L27 24Z" fill="#34d399"/>
          </svg>
        </div>

        {/* Headings */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold tracking-tight text-center mb-1 text-white leading-tight">
            Stop designing.
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold tracking-tight text-center text-[#34d399] leading-tight">
            Start shipping.
          </h1>
        </div>

        <p className="text-[#a1a1aa] text-center text-base md:text-lg max-w-lg mb-10 leading-relaxed font-medium">
          No more boilerplate. No more blank files. Just clean, ready-to-use, beautiful code.
        </p>

        {/* LaunchList Form Widget Container */}
        <div className="w-full max-w-md mb-8 relative z-20">
          <div className="launchlist-widget" data-key-id="iCtHEk" data-height="180px"></div>
        </div>

        {/* Waitlist Badge */}
        <div className="flex items-center gap-2 bg-[#18181b] border border-[#27272a] rounded-full px-4 py-1.5 mb-8 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#34d399] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
          <span className="text-xs text-[#a1a1aa] font-medium">Join <span className="text-[#f4f4f5] font-semibold">10,000+</span> others on the waitlist</span>
        </div>

        {/* Link */}
        <p className="text-sm text-[#71717a] mb-20 font-medium">
          Already have questions?{' '}
          <Link href="#" className="text-[#3b82f6] hover:text-[#60a5fa] underline decoration-[#3b82f6]/30 underline-offset-4 transition-colors">
            Chat with us on Discord
          </Link>
        </p>

        {/* Leaderboard Section */}
        <div className="w-full bg-[#0f0f11] border border-[#27272a] rounded-2xl overflow-hidden min-h-[400px] shadow-2xl relative z-20">
          <iframe 
            scrolling="yes" 
            src="https://getlaunchlist.com/w/e/iCtHEk/leaderboard" 
            style={{ width: '100%', height: '500px', display: 'block', border: 'none' }}
            title="LaunchList Leaderboard"
          />
        </div>

      </div>

      {/* Developer OTP Modal Overlay */}
      {showOTP && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-[#18181b] border border-[#27272a] p-8 rounded-2xl shadow-2xl text-center relative max-w-sm w-full">
            <button 
              onClick={() => { setShowOTP(false); setOtpValues(["", "", "", "", "", ""]); }}
              className="absolute top-4 right-4 text-[#71717a] hover:text-white transition-colors bg-transparent border-none cursor-pointer text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-tight">Developer Access</h2>
            <p className="text-sm text-[#a1a1aa] mb-8">Enter the access code to bypass the waitlist.</p>
            
            <div className="flex justify-center gap-2">
              {otpValues.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-11 h-12 text-center text-lg font-semibold text-white border border-[#3f3f46] rounded-xl outline-none transition-all bg-[#09090b] focus:border-[#34d399] focus:ring-1 focus:ring-[#34d399] focus:bg-[#09090b]"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
