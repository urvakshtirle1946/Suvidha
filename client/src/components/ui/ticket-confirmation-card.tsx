import * as React from "react";
import { cn } from "@/lib/utils";

// --- SVG Icons ---

const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const MastercardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="36"
        height="24"
    >
        <circle cx="8" cy="12" r="7" fill="#EA001B"></circle>
        <circle cx="16" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8"></circle>
    </svg>
);


// --- Helper Components ---

const DashedLine = () => (
  <div
    className="w-full"
    style={{ width: '100%', borderTop: '2px dashed #e5e7eb' }}
    aria-hidden="true"
  />
);

const Barcode = ({ value }: { value: string }) => {
    const hashCode = (s: string) => s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    const seed = hashCode(value);
    const random = (s: number) => {
        const x = Math.sin(s) * 10000;
        return x - Math.floor(x);
    };

    const bars = Array.from({ length: 60 }).map((_, index) => {
        const rand = random(seed + index);
        const width = rand > 0.7 ? 2.5 : 1.5;
        return { width };
    });

    const spacing = 1.5;
    const totalWidth = bars.reduce((acc, bar) => acc + bar.width + spacing, 0) - spacing;
    const svgWidth = 250;
    const svgHeight = 70;
    let currentX = (svgWidth - totalWidth) / 2;

    return (
        <div className="flex flex-col items-center py-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }}>
             <svg
                xmlns="http://www.w3.org/2000/svg"
                width={svgWidth}
                height={svgHeight}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                aria-label={`Barcode for value ${value}`}
                className="fill-current text-foreground"
            >
                {bars.map((bar, index) => {
                    const x = currentX;
                    currentX += bar.width + spacing;
                    return (
                        <rect
                            key={index}
                            x={x}
                            y="10"
                            width={bar.width}
                            height="50"
                        />
                    );
                })}
            </svg>
            <p className="text-sm text-muted-foreground tracking-[0.3em] mt-2">{value}</p>
        </div>
    );
};

const ConfettiExplosion = () => {
  const confettiCount = 100;
  const colors = ["#ef4444", "#3b82f6", "#000", "#eab308", "#8b5cf6", "#f97316"];

  return (
    <>
      <style>
        {`
          @keyframes fall {
            0% {
                transform: translateY(-10vh) rotate(0deg);
                opacity: 1;
            }
            100% {
              transform: translateY(110vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}
      </style>
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: confettiCount }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-4"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${-20 + Math.random() * 10}%`,
              backgroundColor: colors[i % colors.length],
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `fall ${2.5 + Math.random() * 2.5}s ${Math.random() * 2}s linear forwards`,
            }}
          />
        ))}
      </div>
    </>
  );
};


// --- Main Ticket Component ---

export interface TicketProps extends React.HTMLAttributes<HTMLDivElement> {
  ticketId: string;
  amount: number;
  date: Date;
  cardHolder: string;
  last4Digits: string;
  barcodeValue: string;
  icon?: React.ReactNode;
}

const AnimatedTicket = React.forwardRef<HTMLDivElement, TicketProps>(
  (
    {
      className,
      ticketId,
      amount,
      date,
      cardHolder,
      last4Digits,
      barcodeValue,
      ...props
    },
    ref
  ) => {
    const [showConfetti, setShowConfetti] = React.useState(false);

    React.useEffect(() => {
      const mountTimer = setTimeout(() => setShowConfetti(true), 100);
      const unmountTimer = setTimeout(() => setShowConfetti(false), 6000);
      return () => {
        clearTimeout(mountTimer);
        clearTimeout(unmountTimer);
      };
    }, []);

    const formattedAmount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date).replace(',', ' •');

    return (
      <>
        {showConfetti && <ConfettiExplosion />}
        <div
          ref={ref}
          className={cn(
            "relative w-full max-w-sm bg-card text-card-foreground shadow-lg font-sans z-10",
            "animate-in fade-in-0 zoom-in-95 duration-500",
            className
          )}
          style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
          {...props}
        >
          {/* Ticket cut-out effect */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background" style={{ background: '#f4f6fb' }} />
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background" style={{ background: '#f4f6fb' }} />

          <div className="p-8 flex flex-col items-center text-center" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="p-3 bg-primary/10 rounded-full animate-in zoom-in-50 delay-300 duration-500" style={{ background: '#f3f4f6', padding: '12px' }}>
                  <CheckCircleIcon className="w-10 h-10 text-primary animate-in zoom-in-75 delay-500 duration-500" style={{ color: '#000000' }} />
              </div>
              <h1 className="text-2xl font-semibold mt-4" style={{ color: '#111827', margin: '16px 0 0 0' }}>Payment Successful!</h1>
              <p className="text-muted-foreground mt-1" style={{ color: '#6b7280', margin: '4px 0 0 0' }}>
                Your booking has been confirmed
              </p>
          </div>

          <div className="px-8 pb-8 space-y-6" style={{ padding: '0 32px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <DashedLine />

              <div className="grid grid-cols-2 gap-4 text-left" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                      <p className="text-xs text-muted-foreground uppercase" style={{ color: '#6b7280' }}>Booking ID</p>
                      <p className="font-mono font-medium" style={{ color: '#111827' }}>{ticketId}</p>
                  </div>
                  <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase" style={{ color: '#6b7280' }}>Amount Paid</p>
                      <p className="font-semibold text-lg" style={{ color: '#111827' }}>{formattedAmount}</p>
                  </div>
              </div>

              <div>
                  <p className="text-xs text-muted-foreground uppercase" style={{ color: '#6b7280' }}>Date & Time</p>
                  <p className="font-medium" style={{ color: '#111827' }}>{formattedDate}</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg flex items-center space-x-4" style={{ background: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '8px' }}>
                  <MastercardIcon />
                  <div>
                      <p className="font-semibold" style={{ color: '#111827', margin: 0 }}>{cardHolder}</p>
                      <p className="text-muted-foreground font-mono text-sm tracking-wider" style={{ color: '#6b7280', margin: 0 }}>•••• {last4Digits}</p>
                  </div>
              </div>

              <DashedLine />

              <Barcode value={barcodeValue} />
          </div>
        </div>
      </>
    );
  }
);

AnimatedTicket.displayName = "AnimatedTicket";

export { AnimatedTicket };
