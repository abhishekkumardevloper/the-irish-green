import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ─────────────────────────────────────────────────────────────────

interface StatItem {
  value: string;
  label: string;
  numericEnd: number;
  suffix: string;
  prefix: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────

const STATS: StatItem[] = [
  { value: '50+',      label: 'Dishes',         numericEnd: 50,  suffix: '+', prefix: '' },
  { value: '7',        label: 'Cuisines',        numericEnd: 7,   suffix: '',  prefix: '' },
  { value: '2020',     label: 'Est.',            numericEnd: 2020,suffix: '',  prefix: '' },
  { value: '∞',        label: 'Smiles Created',  numericEnd: 0,   suffix: '∞', prefix: '' },
];

const PARAGRAPHS = [
  "Nestled in the heart of Sector 76, The Irish Green was born from a simple belief — that a great meal is always better when shared. Our warm, plant-filled interiors invite you to slow down, connect, and savour every moment.",
  "From family Sunday lunches to intimate celebrations, from casual catch-ups to meaningful dinners, we've built a space where every table has a story. Our kitchen draws from North India's rich culinary traditions, Italian classics, Pan-Asian flavours, and the best of continental cuisine.",
  "We don't just serve food. We create moments.",
];

// ─── Sub-components ─────────────────────────────────────────────────────────

const GoldCornerAccent = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const corners: Record<string, string> = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0 rotate-90',
    bl: 'bottom-0 left-0 -rotate-90',
    br: 'bottom-0 right-0 rotate-180',
  };
  return (
    <svg
      className={`absolute ${corners[position]} w-8 h-8 pointer-events-none z-10`}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 30 L2 2 L30 2" stroke="#B89A63" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

const LeafSVG = () => (
  <svg
    viewBox="0 0 60 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute -bottom-6 -right-5 w-14 h-20 z-20 drop-shadow-md"
    aria-hidden="true"
  >
    <path
      d="M30 78 C30 78 5 55 5 30 C5 13.43 16.19 2 30 2 C43.81 2 55 13.43 55 30 C55 55 30 78 30 78Z"
      fill="#1B5A3A"
      opacity="0.85"
    />
    <path
      d="M30 78 C30 78 30 40 30 2"
      stroke="#7C967D"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path d="M30 25 C20 22 12 28 12 28" stroke="#7C967D" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
    <path d="M30 40 C40 37 48 43 48 43" stroke="#7C967D" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
    <path d="M30 55 C22 52 16 57 16 57" stroke="#7C967D" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// ─── Animated Counter ────────────────────────────────────────────────────────

const AnimatedStat = ({ stat }: { stat: StatItem }) => {
  const numRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numRef.current || !wrapRef.current) return;

    // Infinity symbol — no count-up, just fade in
    if (stat.suffix === '∞') return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: stat.numericEnd,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: wrapRef.current,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.textContent =
            stat.prefix +
            Math.round(obj.val).toString() +
            stat.suffix;
        }
      },
    });

    return () => { tween.kill(); };
  }, [stat]);

  return (
    <div ref={wrapRef} className="text-center px-4">
      <span
        ref={numRef}
        className="block text-3xl md:text-4xl font-bold"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: '#B89A63' }}
        aria-label={stat.value}
      >
        {stat.suffix === '∞' ? '∞' : stat.prefix + '0' + stat.suffix}
      </span>
      <span
        className="block text-xs tracking-widest uppercase mt-1 opacity-60"
        style={{ color: '#123B2A', fontFamily: 'Inter, sans-serif' }}
      >
        {stat.label}
      </span>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function StorySection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgWrapRef  = useRef<HTMLDivElement>(null);
  const imgRef      = useRef<HTMLImageElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const linesRef    = useRef<HTMLDivElement>(null);

  // ── GSAP: image parallax ──────────────────────────────────────────────────
  useEffect(() => {
    if (!imgRef.current || !sectionRef.current) return;

    const tween = gsap.to(imgRef.current, {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    });

    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  // ── GSAP: text lines stagger in ───────────────────────────────────────────
  useEffect(() => {
    if (!linesRef.current) return;

    const lines = linesRef.current.querySelectorAll<HTMLElement>('[data-anim="line"]');

    gsap.set(lines, { opacity: 0, x: 40 });

    const tween = gsap.to(lines, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: linesRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-label="Our Story"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#FAF7EF' }}
    >
      {/* ── Watermark ─────────────────────────────────────────────────────── */}
      <span
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none
                   text-[clamp(4rem,14vw,12rem)] italic font-bold whitespace-nowrap z-0"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: '#123B2A',
          opacity: 0.04,
          letterSpacing: '-0.02em',
        }}
      >
        Since 2020
      </span>

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT: Image ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-80px' }}
            className="relative flex justify-center order-2 lg:order-1"
          >
            {/* Portrait frame */}
            <div
              ref={imgWrapRef}
              className="relative overflow-hidden"
              style={{
                width: 'min(420px, 100%)',
                aspectRatio: '4/5',
                border: '1px solid rgba(184,154,99,0.4)',
              }}
            >
              {/* Corner accents */}
              <GoldCornerAccent position="tl" />
              <GoldCornerAccent position="tr" />
              <GoldCornerAccent position="bl" />
              <GoldCornerAccent position="br" />

              {/* Parallax image — slightly oversized so it can travel */}
              <img
                ref={imgRef}
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85"
                alt="The Irish Green dining ambiance — warm lighting, beautiful food"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full object-cover"
                style={{ height: '115%', top: '-7.5%' }}
              />

              {/* Subtle warm vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(58,36,24,0.25) 0%, transparent 50%)',
                }}
              />
            </div>

            {/* Leaf element overlapping frame */}
            <LeafSVG />
          </motion.div>

          {/* ── RIGHT: Text ─────────────────────────────────────────────── */}
          <div
            ref={textRef}
            className="order-1 lg:order-2 flex flex-col gap-6"
          >
            <div ref={linesRef}>
              {/* Label */}
              <p
                data-anim="line"
                className="text-xs tracking-[0.35em] uppercase font-semibold mb-4"
                style={{ color: '#B89A63', fontFamily: 'Inter, sans-serif' }}
              >
                Our Story
              </p>

              {/* Heading */}
              <h2
                data-anim="line"
                className="text-[clamp(2.4rem,5vw,4rem)] leading-[1.1] mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: '#123B2A',
                  fontWeight: 600,
                }}
              >
                More than a meal.
                <br />
                <em style={{ fontStyle: 'italic' }}>It's an experience.</em>
              </h2>

              {/* Gold divider */}
              <div
                data-anim="line"
                className="mb-6"
                style={{ width: 24, height: 1, backgroundColor: '#B89A63' }}
                aria-hidden="true"
              />

              {/* Body paragraphs */}
              {PARAGRAPHS.map((para, i) => (
                <p
                  key={i}
                  data-anim="line"
                  className={`text-base leading-relaxed ${i < PARAGRAPHS.length - 1 ? 'mb-4' : 'mb-8'} ${
                    i === PARAGRAPHS.length - 1 ? 'font-semibold italic' : ''
                  }`}
                  style={{
                    color: i === PARAGRAPHS.length - 1 ? '#123B2A' : '#3A2418',
                    opacity: i === PARAGRAPHS.length - 1 ? 1 : 0.78,
                    fontFamily: i === PARAGRAPHS.length - 1
                      ? "'Cormorant Garamond', serif"
                      : 'Inter, sans-serif',
                    fontSize: i === PARAGRAPHS.length - 1 ? '1.25rem' : undefined,
                  }}
                >
                  {para}
                </p>
              ))}

              {/* CTA */}
              <div data-anim="line">
                <a
                  href="#menu"
                  className="btn-ghost inline-flex items-center gap-2 group"
                  aria-label="Explore our full menu and world"
                >
                  <span>EXPLORE OUR WORLD</span>
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Row ───────────────────────────────────────────────────── */}
        <div
          className="max-w-7xl mx-auto mt-20 lg:mt-24"
          aria-label="Quick facts about The Irish Green"
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 px-6 md:px-12"
            style={{
              borderTop: '1px solid rgba(184,154,99,0.25)',
              borderBottom: '1px solid rgba(184,154,99,0.25)',
            }}
          >
            {STATS.map((stat) => (
              <AnimatedStat key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}