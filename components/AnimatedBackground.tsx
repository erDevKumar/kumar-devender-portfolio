'use client';

interface AnimatedBackgroundProps {
  time: number;
  hue: number;
}

export default function AnimatedBackground({ time, hue }: AnimatedBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.08),transparent_60%)] animate-pulse-slow"
        style={{ animationDuration: '4s' }}
      />
      <div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl animate-float transition-all duration-700"
        style={{ 
          animationDelay: '1s',
          transform: `translate(${Math.sin(time) * 20}px, ${Math.cos(time) * 20}px)`,
          background: `radial-gradient(circle, hsl(${hue}, 60%, 50%) 0%, transparent 70%)`,
          opacity: 0.15
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl animate-float transition-all duration-700"
        style={{ 
          animationDelay: '2s',
          transform: `translate(${Math.cos(time) * -20}px, ${Math.sin(time) * 20}px)`,
          background: `radial-gradient(circle, hsl(${(hue + 60) % 360}, 60%, 50%) 0%, transparent 70%)`,
          opacity: 0.15
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-float-slow transition-all duration-1000"
        style={{ 
          animationDelay: '0.5s',
          transform: `translate(calc(-50% + ${Math.sin(time * 0.5) * 30}px), calc(-50% + ${Math.cos(time * 0.5) * 30}px))`,
          background: `radial-gradient(circle, hsl(${(hue + 120) % 360}, 50%, 40%) 0%, transparent 70%)`,
          opacity: 0.1
        }}
      />
    </div>
  );
}

