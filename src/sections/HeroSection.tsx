import { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useIntroStore } from '../hooks/useIntroStore';

// ─── Constants ───────────────────────────────────────────────────────────────
const BG_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=85';

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=The+Irish+Green+Sector+76+Noida';

// ─── Large decorative leaf shapes ────────────────────────────────────────────
interface DecorLeafProps {
  style?: React.CSSProperties;
  viewBox?: string;
  path: string;
  depth: number; // used externally via data-depth attribute
}

function DecorLeaf({ style, viewBox = '0 0 200 260', path, depth }: DecorLeafProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      className="hero-leaf absolute pointer-events-none select-none"
      data-depth={depth}
      style={{
        opacity: 0.12,
        color: '#7C967D',
        fill: '#7C967D',
        willChange: 'transform',
        ...style,
      }}
    >
      <path d={path} />
    </svg>
  );
}

// ─── Scroll Indicator ─────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      aria-label="Scroll down to discover more"
      role="complementary"
    >
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '8px',
          fontWeight: 600,
          letterSpacing: '0.22em',
          color: 'rgba(243,235,221,0.4)',
          textTransform: 'uppercase',
        }}
      >
        Scroll to Discover
      </span>
      {/* Animated bouncing line */}
      <div
        style={{
          width: 1,
          height: 40,
          background:
            'linear-gradient(to bottom, rgba(184,154,99,0.7), transparent)',
          animation: 'scrollLineBounce 2s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes scrollLineBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

// ─── Social Links ─────────────────────────────────────────────────────────────
function SocialLinks() {
  return (
    <div
      className="absolute bottom-8 left-8 hidden md:flex flex-col items-start gap-3"
      aria-label="Social media links"
    >
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="The Irish Green on Instagram"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '8px',
          fontWeight: 600,
          letterSpacing: '0.22em',
          color: 'rgba(243,235,221,0.45)',
          textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'color 0.3s ease',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        }}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#B89A63')}
        onMouseLeave={(e) =>
          ((e.target as HTMLElement).style.color = 'rgba(243,235,221,0.45)')
        }
      >
        Instagram
      </a>
      <div
        aria-hidden="true"
        style={{
          width: 1,
          height: 24,
          background: 'rgba(184,154,99,0.3)',
          alignSelf: 'center',
        }}
      />
      <a
        href="https://www.zomato.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="The Irish Green on Zomato"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '8px',
          fontWeight: 600,
          letterSpacing: '0.22em',
          color: 'rgba(243,235,221,0.45)',
          textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'color 0.3s ease',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        }}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#B89A63')}
        onMouseLeave={(e) =>
          ((e.target as HTMLElement).style.color = 'rgba(243,235,221,0.45)')
        }
      >
        Zomato
      </a>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroSection() {
  const { hasSeenIntro } = useIntroStore();

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const parallaxTargetRef = useRef({ bgX: 0, bgY: 0, textX: 0, textY: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Text reveal refs
  const textElementsRef = useRef<HTMLElement[]>([]);
  const addTextRef = useCallback((el: HTMLElement | null) => {
    if (el && !textElementsRef.current.includes(el)) {
      textElementsRef.current.push(el);
    }
  }, []);

  // ── Entry animations ────────────────────────────────────────────────────────
  useEffect(() => {
    const bg = bgRef.current;
    const elements = textElementsRef.current;

    if (!bg || elements.length === 0) return;

    // Delay slightly if intro hasn't been seen yet (wait for doors to open)
    const delay = hasSeenIntro ? 0.2 : 3.2;

    // Background zoom from 1.15 → 1.0
    gsap.fromTo(
      bg,
      { scale: 1.15 },
      { scale: 1.0, duration: 2.5, ease: 'power3.out', delay }
    );

    // Text elements slide up + fade in
    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        delay: delay + 0.3,
      }
    );
  }, [hasSeenIntro]);

  // ── Parallax mouse effect ────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      // Normalised -0.5 to 0.5
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
    };

    section.addEventListener('mousemove', handleMouseMove, { passive: true });

    // lerp loop
    const LERP = 0.065;
    const tick = () => {
      const target = parallaxTargetRef.current;
      const mouse = mouseRef.current;

      // background moves opposite to cursor (±15px)
      const bgTargetX = -mouse.x * 15;
      const bgTargetY = -mouse.y * 15;
      target.bgX += (bgTargetX - target.bgX) * LERP;
      target.bgY += (bgTargetY - target.bgY) * LERP;

      // text moves very slightly (±3px)
      const textTargetX = mouse.x * 3;
      const textTargetY = mouse.y * 3;
      target.textX += (textTargetX - target.textX) * LERP;
      target.textY += (textTargetY - target.textY) * LERP;

      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${target.bgX}px, ${target.bgY}px) scale(1.0)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate(${target.textX}px, ${target.textY}px)`;
      }

      // Move leaves at different depths
      const leaves = section.querySelectorAll<SVGElement>('.hero-leaf');
      leaves.forEach((leaf) => {
        const depth = parseFloat(leaf.dataset.depth ?? '1');
        const lx = mouse.x * depth;
        const ly = mouse.y * depth;
        leaf.style.transform = `translate(${lx}px, ${ly}px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative noise-overlay"
      style={{ height: '100vh', overflow: 'hidden' }}
      aria-label="Hero — The Irish Green Restaurant"
    >
      {/* ── Background image ── */}
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-15px', // extra space so parallax doesn't reveal edges
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
          zIndex: 0,
        }}
      >
        {/* Dark overlay gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(11,15,12,0.4) 0%, rgba(11,15,12,0.7) 100%)',
          }}
        />
      </div>

      {/* ── Decorative large botanical leaves ── */}
      {/* Top-left corner */}
      <DecorLeaf
        depth={5}
        style={{
          top: '-40px',
          left: '-30px',
          width: 320,
          height: 400,
          transform: 'rotate(-20deg)',
        }}
        viewBox="0 0 200 260"
        path="M100,250 C40,200 -20,120 10,50 C40,-20 120,0 140,60 C160,120 170,180 100,250 Z"
      />
      {/* Bottom-right corner */}
      <DecorLeaf
        depth={8}
        style={{
          bottom: '-60px',
          right: '-40px',
          width: 280,
          height: 360,
          transform: 'rotate(160deg)',
        }}
        viewBox="0 0 200 260"
        path="M100,250 C40,200 -20,120 10,50 C40,-20 120,0 140,60 C160,120 170,180 100,250 Z"
      />
      {/* Top-right — smaller accent */}
      <DecorLeaf
        depth={5}
        style={{
          top: '60px',
          right: '60px',
          width: 140,
          height: 180,
          transform: 'rotate(40deg)',
        }}
        viewBox="0 0 200 260"
        path="M100,250 C60,190 20,110 50,50 C80,-10 150,20 155,80 C160,140 140,200 100,250 Z"
      />

      {/* ── Center content ── */}
      <div
        ref={contentRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 2,
          willChange: 'transform',
          padding: '0 1.5rem',
        }}
      >
        {/* Location tag */}
        <p
          ref={addTextRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.35em',
            color: '#B89A63',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            opacity: 0,
          }}
          aria-label="Location: Sector 76, Noida"
        >
          — Sector 76, Noida —
        </p>

        {/* Main restaurant name */}
        <h1
          ref={addTextRef}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(4rem, 10vw, 9rem)',
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: '#F3EBDD',
            lineHeight: 1,
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            opacity: 0,
          }}
        >
          The Irish Green
        </h1>

        {/* Italic gold divider rule */}
        <div
          ref={addTextRef}
          aria-hidden="true"
          style={{
            width: 'min(220px, 60%)',
            height: '1px',
            background:
              'linear-gradient(to right, transparent, #B89A63 30%, #D4B896 50%, #B89A63 70%, transparent)',
            marginBottom: '1.5rem',
            opacity: 0,
          }}
        />

        {/* Tagline */}
        <p
          ref={addTextRef}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.15rem, 2.5vw, 1.65rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(243,235,221,0.85)',
            letterSpacing: '0.02em',
            marginBottom: '1.25rem',
            opacity: 0,
          }}
        >
          Where Good Food Meets Good Times
        </p>

        {/* Cuisine tags */}
        <p
          ref={addTextRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(7px, 1vw, 9px)',
            fontWeight: 600,
            letterSpacing: '0.25em',
            color: 'rgba(184,154,99,0.7)',
            textTransform: 'uppercase',
            marginBottom: '2.75rem',
            opacity: 0,
          }}
        >
          North Indian&nbsp;&nbsp;·&nbsp;&nbsp;Chinese&nbsp;&nbsp;·&nbsp;&nbsp;Continental&nbsp;&nbsp;·&nbsp;&nbsp;Italian&nbsp;&nbsp;·&nbsp;&nbsp;Café
        </p>

        {/* CTA Buttons */}
        <div
          ref={addTextRef}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
          style={{ opacity: 0 }}
        >
          {/* Book a Table */}
          <a
            href="#reservation"
            className="btn-primary"
            aria-label="Book a table at The Irish Green"
          >
            <span>Book a Table</span>
          </a>

          {/* Explore Menu */}
          <Link
            to="/menu"
            className="btn-outline"
            aria-label="Explore our menu"
          >
            Explore Menu
          </Link>

          {/* Get Directions */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            aria-label="Get directions to The Irish Green on Google Maps"
          >
            Get Directions
            <span className="arrow">→</span>
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />

      {/* ── Social links ── */}
      <SocialLinks />
    </section>
  );
}
