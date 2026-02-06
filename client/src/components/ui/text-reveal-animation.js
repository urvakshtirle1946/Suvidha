'use client';

export function TextReveal({ word, textColor, brandYellow }) {
  const WORD = word || "Zelp";
  
  return (
    <div style={{ display: 'inline-block' }}>
      <div>
        <h1 className="reveal-h1" style={{ margin: 0, padding: 0 }}>
          {WORD.split("").map((char, i) => {
            let charColor = textColor || 'var(--brand)';
            if (WORD === "Zelp" && i < 1) {
              charColor = brandYellow || 'var(--brand-yellow)';
            }
            
            return (
              <span 
                style={{ 
                   color: charColor,
                   animationDelay: `calc(0.08s * ${i})`
                }}
                key={i}>
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </h1>
      </div>
    </div>
  );
}
