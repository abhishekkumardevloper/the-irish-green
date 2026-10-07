import { useEffect, useRef } from 'react';

type EasingFunction = (t: number) => number;

interface UseTiltOptions {
  maxRotateX?: number;
  maxRotateY?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  disabled?: boolean;
}

export const useTilt = (options: UseTiltOptions = {}) => {
  const {
    maxRotateX = 4,
    maxRotateY = 4,
    perspective = 1000,
    scale = 1.02,
    speed = 400,
    disabled = false,
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !ref.current) return;

    const el = ref.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;

    const lerp = (start: number, end: number, amount: number) =>
      start + (end - start) * amount;

    const animate = () => {
      currentRotateX = lerp(currentRotateX, targetRotateX, speed / 10000);
      currentRotateY = lerp(currentRotateY, targetRotateY, speed / 10000);

      el.style.transform = `perspective(${perspective}px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) scale(${scale})`;
      rafId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      targetRotateX = (-mouseY / (rect.height / 2)) * maxRotateX;
      targetRotateY = (mouseX / (rect.width / 2)) * maxRotateY;
    };

    const handleMouseLeave = () => {
      targetRotateX = 0;
      targetRotateY = 0;
    };

    rafId = requestAnimationFrame(animate);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    el.style.transition = `transform ${speed}ms ease`;
    el.style.willChange = 'transform';

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.style.willChange = 'auto';
    };
  }, [maxRotateX, maxRotateY, perspective, scale, speed, disabled]);

  return ref;
};

export const useIsMobile = () => {
  const isMobile = useRef(false);
  useEffect(() => {
    isMobile.current = window.innerWidth < 768 || !window.matchMedia('(hover: hover)').matches;
  }, []);
  return isMobile.current;
};
