import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuCategories, type MenuCategory } from '../data/menu';

gsap.registerPlugin(ScrollTrigger);

// ─── Category Card ───────────────────────────────────────────────────────────

interface CategoryCardProps {
  category: MenuCategory;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="relative flex-shrink-0 overflow-hidden cursor-pointer group"
      style={{
        width: 'clamp(280px, 400px, 400px)',
        height: '80vh',
        minHeight: 480,
        maxHeight: 700,
        borderRadius: 2,
      }}
      data-cursor="view"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${category.name} — ${category.description}`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url(${category.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          willChange: 'transform',
        }}
        role="img"
        aria-label={category.name}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(11,15,12,0.75) 0%, rgba(11,15,12,0.15) 55%, transparent 100%)'
            : 'linear-gradient(to top, rgba(11,15,12,0.88) 0%, rgba(11,15,12,0.25) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Index number — decorative */}
      <span
        className="absolute top-6 right-6 text-xs font-mono tracking-widest select-none"
        style={{ color: 'rgba(184,154,99,0.55)' }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <span
        className="absolute top-6 left-6 text-2xl"
        aria-hidden="true"
      >
        {category.icon}
      </span>

      {/* Bottom content */}
      <div
        className="absolute bottom-0 left-0 right-0 p-7 transition-all duration-500"
        style={{ transform: hovered ? 'translateY(-8px)' : 'translateY(0)' }}
      >
        <h3
          className="text-white mb-1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
            fontWeight: 600,
            lineHeight: 1.1,
          }}
        >
          {category.name}
        </h3>

        <p
          className="text-sm mb-4 transition-opacity duration-400"
          style={{
            color: 'rgba(243,235,221,0.7)',
            fontFamily: 'Inter, sans-serif',
            opacity: hovered ? 0.9 : 0.6,
          }}
        >
          {category.description}
        </p>

        {/* Discover indicator */}
        <div
          className="flex items-center gap-2 transition-all duration-400"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
          }}
          aria-hidden="true"
        >
          <div
            className="w-6 h-px"
            style={{ backgroundColor: '#B89A63' }}
          />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: '#B89A63', fontFamily: 'Inter, sans-serif' }}
          >
            Discover
          </span>
          <span style={{ color: '#B89A63' }}>→</span>
        </div>
      </div>

      {/* Gold left border on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 transition-opacity duration-400"
        style={{
          backgroundColor: '#B89A63',
          opacity: hovered ? 1 : 0,
        }}
        aria-hidden="true"
      />
    </article>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function FoodCategorySection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const pinWrapRef    = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);
  const headingRef    = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ── Detect mobile ─────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── GSAP pinned horizontal scroll (desktop) ───────────────────────────────
  useEffect(() => {
    if (isMobile || !sectionRef.current || !pinWrapRef.current || !trackRef.current) return;

    // Card track width — sum of all cards + gaps
    const CARD_WIDTH  = 400;
    const CARD_GAP    = 24;
    const LEFT_PAD    = 100;
    const totalWidth  = menuCategories.length * CARD_WIDTH + (menuCategories.length - 1) * CARD_GAP + LEFT_PAD * 2;
    const scrollDist  = totalWidth - window.innerWidth;

    if (scrollDist <= 0) return;

    trackRef.current.style.width = `${totalWidth}px`;

    const tween = gsap.to(trackRef.current, {
      x: -scrollDist,
      ease: 'none',
      scrollTrigger: {
        trigger: pinWrapRef.current,
        start: 'top top',
        end: `+=${scrollDist}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isMobile]);

  // ── Heading animate in ────────────────────────────────────────────────────
  useEffect(() => {
    if (!headingRef.current) return;

    const els = headingRef.current.querySelectorAll<HTMLElement>('[data-hanim]');
    gsap.set(els, { opacity: 0, y: 20 });
    const tween = gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 85%',
        once: true,
      },
    });

    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  // ── Mobile layout ─────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="categories"
        aria-label="Food categories"
        style={{ backgroundColor: '#0B0F0C' }}
        className="py-16"
      >
        {/* Heading */}
        <div ref={headingRef} className="text-center px-5 mb-10">
          <p
            data-hanim
            className="text-xs tracking-[0.35em] uppercase mb-3 font-semibold"
            style={{ color: '#B89A63', fontFamily: 'Inter, sans-serif' }}
          >
            Menu
          </p>
          <h2
            data-hanim
            className="text-[clamp(2rem,8vw,3rem)] leading-tight mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: '#FAF7EF',
              fontWeight: 600,
            }}
          >
            A Table Full of Flavour
          </h2>
          <p
            data-hanim
            className="text-sm italic"
            style={{ color: '#7C967D', fontFamily: "'Cormorant Garamond', serif" }}
          >
            Explore our world of cuisine
          </p>
        </div>

        {/* Swipe carousel */}
        <div
          className="overflow-x-auto flex gap-5 pb-4"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 20,
            paddingRight: 20,
            scrollbarWidth: 'none',
          }}
          role="list"
          aria-label="Food category cards"
        >
          {menuCategories.map((cat, i) => (
            <div
              key={cat.id}
              style={{ scrollSnapAlign: 'start', width: '85vw', flexShrink: 0 }}
              role="listitem"
            >
              <CategoryCard category={cat} index={i} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── Desktop pinned layout ─────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="categories"
      aria-label="Food categories"
      style={{ backgroundColor: '#0B0F0C' }}
    >
      {/* Static heading above the pin zone */}
      <div
        ref={headingRef}
        className="text-center pt-24 pb-10 relative z-10"
        style={{ backgroundColor: '#0B0F0C' }}
      >
        <p
          data-hanim
          className="text-xs tracking-[0.35em] uppercase mb-3 font-semibold"
          style={{ color: '#B89A63', fontFamily: 'Inter, sans-serif' }}
        >
          Menu
        </p>
        <h2
          data-hanim
          className="text-[clamp(2.5rem,5vw,4.5rem)] leading-tight mb-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: '#FAF7EF',
            fontWeight: 600,
          }}
        >
          A Table Full of Flavour
        </h2>
        <p
          data-hanim
          className="text-base italic"
          style={{ color: '#7C967D', fontFamily: "'Cormorant Garamond', serif" }}
        >
          Explore our world of cuisine
        </p>
      </div>

      {/* Pinned scrolling zone */}
      <div
        ref={pinWrapRef}
        className="overflow-hidden"
        style={{ height: '100vh' }}
        aria-label="Horizontally scrollable food categories"
      >
        <div
          ref={trackRef}
          className="flex items-center h-full"
          style={{ gap: 24, paddingLeft: 100, paddingRight: 100 }}
          role="list"
        >
          {menuCategories.map((cat, i) => (
            <div key={cat.id} role="listitem">
              <CategoryCard category={cat} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="flex items-center justify-center gap-3 pb-8 pt-4 relative z-10"
        style={{ backgroundColor: '#0B0F0C' }}
        aria-hidden="true"
      >
        <div
          className="w-10 h-px animate-pulse"
          style={{ backgroundColor: '#B89A63', opacity: 0.45 }}
        />
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: '#7C967D', fontFamily: 'Inter, sans-serif', opacity: 0.55 }}
        >
          Scroll to explore
        </span>
        <div
          className="w-10 h-px animate-pulse"
          style={{ backgroundColor: '#B89A63', opacity: 0.45 }}
        />
      </div>
    </section>
  );
}
