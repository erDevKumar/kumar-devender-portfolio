import { useState, useEffect } from 'react';

export function useAnimatedGradient(offset = 0, speed = 10) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime((prev) => prev + 0.02), 16);
    return () => clearInterval(interval);
  }, []);

  const getGradient = (hue1: number, hue2: number, hue3: number) => {
    const h1 = ((time * speed + hue1 + offset) % 360);
    const h2 = ((time * speed + hue2 + offset) % 360);
    const h3 = ((time * speed + hue3 + offset) % 360);
    return `linear-gradient(135deg, hsl(${h1}, 60%, 88%) 0%, hsl(${h2}, 55%, 85%) 50%, hsl(${h3}, 50%, 87%) 100%)`;
  };

  return { time, getGradient };
}

