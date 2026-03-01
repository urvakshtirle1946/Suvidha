'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

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
    <div className="flex h-screen w-screen overflow-hidden bg-[#09090b] font-sans selection:bg-emerald-500/30">
      
      {/* Left side content - Waitlist */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-8 z-10 w-full overflow-y-auto">
        {/* Subtle background glows */ }
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Secret Developer Access Button */}
        <button 
          onClick={() => setShowOTP(true)}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-50 bg-black/20 backdrop-blur-md border border-white/5 cursor-pointer p-2.5 rounded-full hover:bg-white/10"
          title="Developer Access"
        >
          <Lock size={18} />
        </button>

        <div className="w-full max-w-3xl mx-auto flex flex-col items-center mt-[-40px]">
          {/* Logo (4 hearts forming a cross) */}
          <div className="mb-10 flex items-center justify-center">
            <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 21L19 15.5C16.5 12.5 16.5 7.5 19.5 5C22 3 24 5 24 5C24 5 26 3 28.5 5C31.5 7.5 31.5 12.5 29 15.5L24 21Z" fill="#34d399"/>
              <path d="M24 27L29 32.5C31.5 35.5 31.5 40.5 28.5 43C26 45 24 43 24 43C24 43 22 45 19.5 43C16.5 40.5 16.5 35.5 19 32.5L24 27Z" fill="#34d399"/>
              <path d="M21 24L15.5 29C12.5 31.5 7.5 31.5 5 28.5C3 26 5 24 5 24C5 24 3 22 5 19.5C7.5 16.5 12.5 16.5 15.5 19L21 24Z" fill="#34d399"/>
              <path d="M27 24L32.5 19C35.5 16.5 40.5 16.5 43 19.5C45 22 43 24 43 24C43 24 45 26 43 28.5C40.5 31.5 35.5 31.5 32.5 29L27 24Z" fill="#34d399"/>
            </svg>
          </div>

          {/* Headings */}
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-bold tracking-tight text-center mb-2 leading-[1.1] !text-white" style={{ color: 'white' }}>
              Premium healthcare.
            </h1>
            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-bold tracking-tight text-center leading-[1.1] !text-[#34d399]" style={{ color: '#34d399' }}>
              Simplified.
            </h1>
          </div>

          {/* Custom LaunchList Form matching exactly the provided design */}
          <form className="launchlist-form flex w-full max-w-[420px] items-center gap-2 relative z-20" action="https://getlaunchlist.com/s/iCtHEk" method="POST">
            <input 
              type="email" 
              name="email"
              placeholder="you@email.com" 
              required
              className="w-full h-[52px] flex-1 bg-[#121214] border border-[#27272a] rounded-[16px] px-5 text-[15px] outline-none focus:border-[#34d399] transition-colors placeholder:text-[#52525b] shadow-inner tracking-wide"
              style={{ color: '#ffffff' }}
            />
            <button 
              type="submit" 
              className="h-[52px] bg-[#34d399] hover:bg-[#10b981] rounded-[16px] px-8 text-[16px] transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-[0_0_15px_rgba(52,211,153,0.15)] hover:shadow-[0_0_25px_rgba(52,211,153,0.3)] font-semibold tracking-wide cursor-pointer"
              style={{ color: '#000000' }}
            >
              Join <span>&rarr;</span>
            </button>
          </form>

        </div>
      </div>

      {/* Right side - Leaderboard iframe */}
      {/* Decreased width from 400-500px to 300-360px */}
      <div className="hidden md:block w-[300px] lg:w-[320px] xl:w-[360px] h-full bg-[#0f0f11] border-l border-[#27272a] relative z-20 flex-shrink-0">
        <iframe 
          scrolling="yes" 
          src="https://getlaunchlist.com/w/e/iCtHEk/leaderboard" 
          style={{ width: '100%', height: '100%', display: 'block', border: 'none' }}
          title="LaunchList Leaderboard"
        />
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
            <h2 className="text-xl font-semibold mb-2 tracking-tight" style={{ color: 'white' }}>Developer Access</h2>
            <p className="text-sm mb-8" style={{ color: '#a1a1aa' }}>Enter the access code to bypass the waitlist.</p>
            
            <div className="flex justify-center gap-2">
              {otpValues.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  style={{ color: 'white', backgroundColor: '#09090b' }}
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
