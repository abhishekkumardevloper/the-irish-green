import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredDishes, type MenuItem } from '../data/menu';
import { useTilt } from '../hooks/useTilt';

gsap.registerPlugin(ScrollTrigger);

// ─── VegIndicator ────────────────────────────────────────────────────────────

const VegIndicator = ({ isVeg }: { isVeg: boolean }) => (
  <span
    className="veg-indicator inline-flex items-center justify-center flex-shrink-0"
    title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
    aria-label={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
    style={{
      width: 16,
      height: 16,
      border: `1.5px solid ${isVeg ? '#1B5A3A' : '#C0392B'}`,
      borderRadius: 2,
    }}
  >
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: isVeg ? '#1B5A3A' : '#C0392B',
        display: 'block',
      }}
    />
  </span>
);

// ─── Signature Badge ─────────────────────────────────────────────────────────

const SignatureBadge = () => (
  <span
    className="absolute top-3 right-3 z-10 text-[10px] tracking-widest uppercase font-semibold
               px-2 py-1 rounded-full"
    style={{
      backgroundColor: 'rgba(184,154,99,0.18)',
      border: '1px solid rgba(184,154,99,0.6)',
      color: '#D4B896',
      fontFamily: 'Inter, sans-serif',
      backdropFilter: 'blur(8px)',
    }}
  >
    Signature
  </span>
);

// ─── Individual Dish Card ─────────────────────────────────────────────────────

interface DishCardProps {
  dish: MenuItem;
}

const DishCard = ({ dish }: DishCardProps) => {
  const tiltRef = useTilt({ maxRotateX: 4, maxRotateY: 4 });

  return (
    <article
      ref={tiltRef}
      className="group overflow-hidden rounded-sm will-change-transform"
      style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          '0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(184,154,99,0.35)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,154,99,0.35)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
      }}
      aria-label={dish.name}
    >
      {/* ── Image area ─────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ height: 300 }}
        data-cursor="view"
      >
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out
                     group-hover:scale-110"
          style={{ willChange: 'transform' }}
        />

        {/* Dark gradient over image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(26,26,26,0.55) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        {/* Signature badge */}
        {dish.isSignature && <SignatureBadge />}

        {/* Gold top border on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-400"
          style={{
            background: 'linear-gradient(90deg, transparent, #B89A63, transparent)',
            opacity: 0,
          }}
          aria-hidden="true"
          // We handle hover via JS for the card; this is a nice-to-have CSS fallback
        />
      </div>

      {/* ── Info area ──────────────────────────────────────────────────── */}
      <div className="p-5">
        {/* Top row: veg indicator + category */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <VegIndicator isVeg={dish.isVeg} />
          <span
            className="tag-pill text-[10px] tracking-widest uppercase"
            style={{
              backgroundColor: 'rgba(123,150,125,0.12)',
              color: '#7C967D',
              border: '1px solid rgba(123,150,125,0.25)',
              padding: '2px 8px',
              borderRadius: 999,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {dish.category.replace(/-/g, ' ')}
          </span>
          {dish.isSignature && (
            <span
              className="text-[10px] tracking-widest uppercase font-semibold px-2 py-0.5 rounded-full"
              style={{
                border: '1px solid rgba(184,154,99,0.45)',
                color: '#B89A63',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Signature
            </span>
          )}
        </div>

        {/* Dish name */}
        <h3
          className="mb-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#FAF7EF',
            lineHeight: 1.25,
          }}
        >
          {dish.name}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-snug mb-4 line-clamp-2"
          style={{
            color: 'rgba(243,235,221,0.55)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {dish.description}
        </p>

        {/* Price row */}
        <div className="flex items-center justify-between">
          <span
            className="text-lg font-semibold"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: '#B89A63',
            }}
            aria-label={`Price: ₹${dish.price}`}
          >
            ₹{dish.price}
          </span>

          {/* Tags */}
          {dish.tags && dish.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap justify-end">
              {dish.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: 'rgba(184,154,99,0.1)',
                    color: 'rgba(184,154,99,0.75)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SignatureDishes() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);

  // ── Heading animate in ────────────────────────────────────────────────────
  useEffect(() => {
    if (!headRef.current) return;

    const els = headRef.current.querySelectorAll<HTMLElement>('[data-sanim]');
    gsap.set(els, { opacity: 0, y: 24 });

    const tween = gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.14,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headRef.current,
        start: 'top 82%',
        once: true,
      },
    });

    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  // ── Cards stagger in ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll<HTMLElement>('article');
    gsap.set(cards, { opacity: 0, y: 50 });

    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: {
        each: 0.1,
        from: 'start',
      },
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="signature-dishes"
      aria-labelledby="signature-heading"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: '#0B0F0C' }}
    >
      {/* ── Noise texture overlay ─────────────────────────────────────────── */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Decorative background glow ───────────────────────────────────── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '60vw',
          height: '40vh',
          background: 'radial-gradient(ellipse at center, rgba(27,90,58,0.08) 0%, transparent 70%)',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Heading ───────────────────────────────────────────────────── */}
        <div ref={headRef} className="text-center mb-16">
          <p
            data-sanim
            className="text-xs tracking-[0.35em] uppercase font-semibold mb-4"
            style={{ color: '#B89A63', fontFamily: 'Inter, sans-serif' }}
          >
            Must Try
          </p>
          <h2
            id="signature-heading"
            data-sanim
            className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.05]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: '#FAF7EF',
              fontWeight: 600,
            }}
          >
            Dishes Worth
            <br />
            <em style={{ color: '#B89A63' }}>Remembering.</em>
          </h2>

          <div
            data-sanim
            className="mx-auto mt-6"
            style={{
              width: 48,
              height: 1,
              background: 'linear-gradient(90deg, transparent, #B89A63, transparent)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* ── Dish Grid ─────────────────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          }}
          role="list"
          aria-label="Signature and featured dishes"
        >
          {featuredDishes.map((dish) => (
            <div key={dish.id} role="listitem">
              <DishCard dish={dish} />
            </div>
          ))}
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <div className="text-center mt-16">
          <a
            href="#menu"
            className="btn-outline inline-flex items-center gap-3 group"
            aria-label="View the full menu"
          >
            <span>View Full Menu</span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
