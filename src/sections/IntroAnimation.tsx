import { useEffect, useRef, useState, useCallback, forwardRef } from 'react';
import gsap from 'gsap';
import { markIntroSeen, useIntroStore } from '../hooks/useIntroStore';

// ─── Botanical Leaf SVG ──────────────────────────────────────────────────────
interface LeafProps {
  style?: React.CSSProperties;
}

const BotanicalLeaf = forwardRef<SVGSVGElement, LeafProps>(function BotanicalLeaf(
  { style },
  ref
) {
  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="-20 -60 60 70"
      style={{
        position: 'absolute',
        width: 64,
        height: 64,
        opacity: 0,
        pointerEvents: 'none',
        ...style,
      }}
    >
      <path
        d="M0,0 C-10,-30 20,-50 30,-40 C20,-20 10,-5 0,0"
        fill="#7C967D"
        opacity="0.65"
      />
      <path
        d="M0,0 C5,-15 15,-20 15,-20 C10,-10 5,-5 0,0"
        fill="#7C967D"
        opacity="0.3"
      />
    </svg>
  );
});

// ─── Split Characters ─────────────────────────────────────────────────────────
function SplitChars({ text }: { text: string }) {
  return (
    <span
      className="inline-flex"
      style={{ overflow: 'hidden' }}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="intro-char"
          style={{
            display: 'inline-block',
            opacity: 0,
            transform: 'translateY(110%)',
          }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function IntroAnimation() {
  const { hasSeenIntro } = useIntroStore();
  const [visible, setVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const lightDotRef = useRef<HTMLDivElement>(null);
  const lightGlowRef = useRef<HTMLDivElement>(null);
  const theWordRef = useRef<HTMLDivElement>(null);
  const mainWordRef = useRef<HTMLDivElement>(null);
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);

  // Four individual leaf refs
  const leaf1Ref = useRef<SVGSVGElement>(null);
  const leaf2Ref = useRef<SVGSVGElement>(null);
  const leaf3Ref = useRef<SVGSVGElement>(null);
  const leaf4Ref = useRef<SVGSVGElement>(null);

  const finishAndUnmount = useCallback(() => {
    markIntroSeen();
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => setVisible(false),
    });
  }, []);

  useEffect(() => {
    if (!visible) return;

    // ── Returning visitor: short fade ────────────────────────────────────────
    if (hasSeenIntro) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        delay: 0.05,
        ease: 'power2.out',
        onComplete: () => {
          markIntroSeen();
          setVisible(false);
        },
      });
      return;
    }

    // Show skip after 800ms
    const skipTimer = setTimeout(() => setShowSkip(true), 800);

    const theChars = theWordRef.current?.querySelectorAll<HTMLElement>('.intro-char') ?? [];
    const mainChars = mainWordRef.current?.querySelectorAll<HTMLElement>('.intro-char') ?? [];
    const leaves = [leaf1Ref.current, leaf2Ref.current, leaf3Ref.current, leaf4Ref.current].filter(
      Boolean
    ) as SVGSVGElement[];

    const tl = gsap.timeline({ onComplete: finishAndUnmount });

    // Stage 1 – Full black (default)

    // Stage 2 – Tiny warm light dot
    tl.set(lightDotRef.current, { opacity: 0, scale: 0 })
      .to(lightDotRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.4,
      });

    // Stage 3 – Ambient glow expands
    tl.to(
      lightGlowRef.current,
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.1'
    );

    // Stage 4a – 'THE' staggered char reveal
    tl.to(
      theChars,
      { opacity: 1, y: '0%', duration: 0.55, ease: 'power3.out', stagger: 0.055 },
      '+=0.1'
    );

    // Stage 4b – 'IRISH GREEN' letter reveal
    tl.to(
      mainChars,
      { opacity: 1, y: '0%', duration: 0.7, ease: 'expo.out', stagger: 0.04 },
      '-=0.3'
    );

    // Stage 5 – Botanical leaves appear
    tl.to(leaves, { opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.45');

    // Stage 6 – Door panels slide outward (expo easing, 0.9s)
    tl.to(doorLeftRef.current, { x: '-100%', duration: 0.9, ease: 'expo.inOut', delay: 0.55 });
    tl.to(doorRightRef.current, { x: '100%', duration: 0.9, ease: 'expo.inOut' }, '<');

    // Brief pause before onComplete fires finishAndUnmount → Stage 7
    tl.to({}, { duration: 0.15 });

    return () => {
      clearTimeout(skipTimer);
      tl.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-label="Opening cinematic animation"
      aria-live="polite"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0B0F0C',
        overflow: 'hidden',
      }}
    >
      {/* ── Background image (visible when doors slide open) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(11,15,12,0.45) 0%, rgba(11,15,12,0.75) 100%)',
          }}
        />
      </div>

      {/* ── Ambient glow ── */}
      <div
        ref={lightGlowRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%) scale(0.3)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center,rgba(184,154,99,0.18) 0%,rgba(184,154,99,0.05) 50%,transparent 75%)',
          opacity: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── Warm light dot ── */}
      <div
        ref={lightDotRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%) scale(0)',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#D4B896',
          boxShadow: '0 0 20px 8px rgba(212,184,150,0.6)',
          opacity: 0,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Text stage ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 2,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {/* Botanical leaves */}
        <BotanicalLeaf
          ref={leaf1Ref}
          style={{
            top: 'calc(50% - 115px)',
            left: 'calc(50% - 195px)',
            transform: 'rotate(-40deg) scale(1.5)',
          }}
        />
        <BotanicalLeaf
          ref={leaf2Ref}
          style={{
            top: 'calc(50% - 120px)',
            left: 'calc(50% + 145px)',
            transform: 'rotate(140deg) scale(1.3)',
          }}
        />
        <BotanicalLeaf
          ref={leaf3Ref}
          style={{
            top: 'calc(50% + 60px)',
            left: 'calc(50% - 170px)',
            transform: 'rotate(210deg) scale(1.0)',
          }}
        />
        <BotanicalLeaf
          ref={leaf4Ref}
          style={{
            top: 'calc(50% + 55px)',
            left: 'calc(50% + 120px)',
            transform: 'rotate(30deg) scale(1.15)',
          }}
        />

        {/* 'THE' */}
        <div
          ref={theWordRef}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
            fontWeight: 400,
            letterSpacing: '0.55em',
            color: '#B89A63',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            overflow: 'hidden',
          }}
        >
          <SplitChars text="THE" />
        </div>

        {/* 'IRISH GREEN' */}
        <div
          ref={mainWordRef}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(3.5rem, 9vw, 7rem)',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: '#F3EBDD',
            lineHeight: 1,
            textTransform: 'uppercase',
            overflow: 'hidden',
          }}
        >
          <SplitChars text="IRISH GREEN" />
        </div>

        {/* Thin gold rule */}
        <div
          style={{
            marginTop: '1.5rem',
            width: 80,
            height: 1,
            background: 'linear-gradient(to right, transparent, #B89A63, transparent)',
          }}
        />
      </div>

      {/* ── Left door panel ── */}
      <div
        ref={doorLeftRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          backgroundColor: '#0B0F0C',
          zIndex: 3,
          willChange: 'transform',
        }}
      />

      {/* ── Right door panel ── */}
      <div
        ref={doorRightRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          backgroundColor: '#0B0F0C',
          zIndex: 3,
          willChange: 'transform',
        }}
      />

      {/* ── Skip button ── */}
      {showSkip && !hasSeenIntro && (
        <button
          onClick={finishAndUnmount}
          className="btn-ghost"
          aria-label="Skip the opening animation"
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.75rem',
            zIndex: 10000,
            fontSize: '9px',
            letterSpacing: '0.22em',
            color: 'rgba(243,235,221,0.4)',
            paddingTop: '6px',
            paddingBottom: '6px',
          }}
        >
          SKIP
          <span className="arrow" style={{ marginLeft: 3, display: 'inline-block' }}>
            →
          </span>
        </button>
      )}
    </div>
  );
}
