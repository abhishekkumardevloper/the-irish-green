import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Don't mount on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const wrapper = wrapperRef.current;
    const text = textRef.current;

    if (!dot || !ring || !wrapper || !text) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      // Dot tracks instantly
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.1);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.1);
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Cursor state helpers
    const setExpanded = (label: string, size: number) => {
      text.textContent = label;
      wrapper.classList.add('cursor-expanded');
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
    };

    const setButton = () => {
      wrapper.classList.remove('cursor-expanded');
      ring.style.width = '20px';
      ring.style.height = '20px';
      text.textContent = '';
    };

    const resetCursor = () => {
      wrapper.classList.remove('cursor-expanded');
      ring.style.width = '36px';
      ring.style.height = '36px';
      text.textContent = '';
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorEl) {
        const type = cursorEl.dataset.cursor;
        if (type === 'view') setExpanded('VIEW', 70);
        else if (type === 'open') setExpanded('OPEN', 70);
        else if (type === 'button') setButton();
      } else if (
        target.closest('a, button') &&
        !target.closest('[data-cursor]')
      ) {
        setButton();
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement | null;
      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorEl && !cursorEl.contains(related)) {
        resetCursor();
      } else if (
        target.closest('a, button') &&
        !target.closest('[data-cursor]')
      ) {
        resetCursor();
      }
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    // Hide cursor when leaving window
    const onMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onMouseEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '0.7';
    };
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="custom-cursor"
      aria-hidden="true"
    >
      {/* Dot — instant follow */}
      <div ref={dotRef} className="cursor-dot" style={{ position: 'fixed', top: 0, left: 0 }} />

      {/* Ring — lerp follow */}
      <div ref={ringRef} className="cursor-ring" style={{ position: 'fixed', top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span ref={textRef} className="cursor-text" />
      </div>
    </div>
  );
}
