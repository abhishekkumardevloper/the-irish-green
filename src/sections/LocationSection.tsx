import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { restaurant } from '../data/restaurant';

gsap.registerPlugin(ScrollTrigger);

/* ─── Icons ──────────────────────────────────────────────── */
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.27-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headingRef.current) return;

    // Heading rise
    gsap.fromTo(
      headingRef.current,
      { yPercent: 30, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      },
    );

    // Info panel slide
    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
          },
        },
      );
    }

    // Map fade
    if (mapRef.current) {
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 80%',
          },
        },
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: 'var(--irish-black)' }}
      aria-labelledby="location-heading"
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[20vw] font-bold leading-none tracking-widest whitespace-nowrap"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: 'rgba(255,255,255,0.015)',
            userSelect: 'none',
          }}
        >
          NOIDA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-16 overflow-hidden">
          <p
            className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: 'var(--irish-gold)', fontFamily: "'Inter', sans-serif" }}
          >
            Location
          </p>
          <h2
            ref={headingRef}
            id="location-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--irish-cream)' }}
          >
            FIND YOUR WAY TO<br />
            <span style={{ color: 'var(--irish-gold)' }}>THE IRISH GREEN</span>
          </h2>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Map — first on mobile as second via order */}
          <div
            ref={mapRef}
            className="order-2 lg:order-1 rounded-sm overflow-hidden"
            style={{ height: '400px', border: '1px solid rgba(184,154,99,0.2)' }}
          >
            <iframe
              title="The Irish Green location map"
              src={restaurant.address.embedUrl}
              width="100%"
              height="100%"
              style={{
                border: 'none',
                filter: 'sepia(20%) contrast(1.1) brightness(0.9)',
                display: 'block',
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Map showing The Irish Green location in Sector 76, Noida"
            />
          </div>

          {/* Info panel */}
          <div
            ref={infoRef}
            className="order-1 lg:order-2 flex flex-col justify-center gap-8"
          >
            <div>
              <h3
                className="text-3xl md:text-4xl font-semibold mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--irish-cream)' }}
              >
                {restaurant.name}
              </h3>

              {/* Address */}
              <address className="not-italic flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--irish-gold)' }}>
                    <PinIcon />
                  </span>
                  <div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--irish-cream)' }}>
                      {restaurant.address.line1}<br />
                      {restaurant.address.line2}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span style={{ color: 'var(--irish-gold)' }}>
                    <PhoneIcon />
                  </span>
                  <a
                    href={`tel:${restaurant.phoneRaw}`}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'var(--irish-cream)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--irish-gold)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--irish-cream)')}
                  >
                    {restaurant.phone}
                  </a>
                </div>
              </address>
            </div>

            {/* Hours */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span style={{ color: 'var(--irish-gold)' }}>
                  <ClockIcon />
                </span>
                <p
                  className="text-[10px] tracking-[0.25em] uppercase font-semibold"
                  style={{ color: 'var(--irish-gold)', fontFamily: "'Inter', sans-serif" }}
                >
                  Opening Hours
                </p>
              </div>

              <dl className="flex flex-col gap-3">
                {restaurant.hours.map(({ days, time }) => (
                  <div
                    key={days}
                    className="flex items-center justify-between py-2"
                    style={{ borderBottom: '1px solid rgba(184,154,99,0.12)' }}
                  >
                    <dt className="text-xs" style={{ color: 'rgba(243,235,221,0.55)' }}>{days}</dt>
                    <dd className="text-xs" style={{ color: 'var(--irish-cream)' }}>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={restaurant.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label="Get directions to The Irish Green on Google Maps"
              >
                <span>Get Directions</span>
              </a>
              <a
                href={`tel:${restaurant.phoneRaw}`}
                className="btn-outline"
                aria-label={`Call The Irish Green at ${restaurant.phone}`}
              >
                <span>Call Now</span>
              </a>
              <a
                href="#reservation"
                className="btn-ghost"
                aria-label="Book a table at The Irish Green"
              >
                <span>Book a Table</span>
                <span className="arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
