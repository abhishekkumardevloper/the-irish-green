import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reviews, type Review } from '../data/reviews';

gsap.registerPlugin(ScrollTrigger);

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-lg leading-none select-none"
          style={{ color: i < rating ? '#B89A63' : '#B89A6340' }}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ─── Source Badge ─────────────────────────────────────────────────────────────

function SourceBadge({ source }: { source: Review['source'] }) {
  const colors: Record<Review['source'], { bg: string; text: string }> = {
    Google: { bg: '#4285F420', text: '#4285F4' },
    Zomato: { bg: '#E2391720', text: '#E23917' },
    Direct: { bg: '#B89A6320', text: '#B89A63' },
  };
  const c = colors[source];

  return (
    <span
      className="inline-block px-2 py-0.5 rounded-sm text-[10px] font-['Inter'] font-semibold tracking-widest uppercase"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {source}
    </span>
  );
}

// ─── Review Card ──────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  return (
    <motion.article
      className="flex-shrink-0 bg-white rounded-sm p-7 md:p-8 flex flex-col gap-4 select-none"
      style={{
        minWidth: '380px',
        maxWidth: '460px',
        border: '1px solid rgba(184,154,99,0.25)',
        boxShadow: '0 4px 24px rgba(18,59,42,0.08)',
      }}
      whileHover={{ scale: 1.025, boxShadow: '0 8px 40px rgba(18,59,42,0.14)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      aria-label={`Review by ${review.author}`}
    >
      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Review text */}
      <blockquote className="flex-1">
        <p className="font-['Cormorant_Garamond'] italic text-lg md:text-xl text-[#123B2A] leading-relaxed">
          &ldquo;{review.review}&rdquo;
        </p>
      </blockquote>

      {/* Author row */}
      <footer className="flex items-center gap-3 pt-2 border-t border-[#B89A63]/15">
        {/* Initials circle */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(184,154,99,0.15)', border: '1px solid rgba(184,154,99,0.4)' }}
          aria-hidden="true"
        >
          <span className="font-['Cormorant_Garamond'] font-bold text-sm text-[#B89A63]">
            {review.initials}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-['Inter'] font-semibold text-sm text-[#123B2A] truncate">
            {review.author}
          </p>
          <p className="font-['Inter'] text-xs text-[#7C967D] mt-0.5">{review.date}</p>
        </div>
        <SourceBadge source={review.source} />
      </footer>
    </motion.article>
  );
}

// ─── Marquee Track ────────────────────────────────────────────────────────────

function ReviewsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);
  // Duplicate for infinite loop
  const loopedReviews = [...reviews, ...reviews];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2; // half because duplicated

    animRef.current = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: reviews.length * 8,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => {
      animRef.current?.kill();
    };
  }, []);

  const pauseScroll = () => animRef.current?.pause();
  const resumeScroll = () => animRef.current?.resume();

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={pauseScroll}
      onMouseLeave={resumeScroll}
      onFocus={pauseScroll}
      onBlur={resumeScroll}
      aria-label="Scrolling customer reviews"
    >
      <div
        ref={trackRef}
        className="flex gap-5 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {loopedReviews.map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`} review={review} />
        ))}
      </div>
    </div>
  );
}

// ─── Google Icon ──────────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      role="img"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ─── Reviews Section ──────────────────────────────────────────────────────────

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading stagger reveal
      const lines = headingRef.current?.querySelectorAll('.heading-line');
      if (lines) {
        gsap.fromTo(
          lines,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // CTA reveal
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAF7EF] section-padding overflow-hidden"
      aria-label="Customer reviews and testimonials"
      id="reviews"
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className="px-4 md:px-8 lg:px-12 mb-14"
      >
        {/* Line 1: left-aligned */}
        <div className="heading-line overflow-hidden">
          <h2 className="font-['Cormorant_Garamond'] font-bold text-[clamp(2rem,5.5vw,5.5rem)] text-[#123B2A] leading-[0.95] uppercase tracking-tight">
            THEY CAME FOR DINNER.
          </h2>
        </div>
        {/* Line 2: offset right, italic, gold */}
        <div className="heading-line overflow-hidden flex md:justify-end mt-1 md:mt-2">
          <p className="font-['Cormorant_Garamond'] italic text-[clamp(1.8rem,5vw,5rem)] text-[#B89A63] leading-[0.95] tracking-tight">
            THEY LEFT WITH MEMORIES.
          </p>
        </div>

        {/* Decorative rule */}
        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#123B2A]/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#B89A63]" aria-hidden="true" />
          <div className="h-px w-16 bg-[#B89A63]/40" />
        </div>
      </div>

      {/* Scrolling reviews marquee */}
      <div className="mb-14">
        <ReviewsMarquee />
      </div>

      {/* CTA row */}
      <div
        ref={ctaRef}
        className="px-4 md:px-8 lg:px-12 flex flex-col sm:flex-row items-center gap-4"
      >
        <a
          href="https://g.page/r/the-irish-green/review"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline flex items-center gap-2.5 text-[#123B2A] border-[#123B2A] hover:bg-[#123B2A] hover:text-[#F3EBDD]"
          aria-label="Share your experience on Google Reviews (opens in new tab)"
        >
          <GoogleIcon />
          <span>Share your experience</span>
        </a>
        <p className="text-[#7C967D] font-['Inter'] text-sm">
          Your words help us grow.
        </p>
      </div>
    </section>
  );
}
