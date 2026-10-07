import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { restaurant } from '../data/restaurant';

gsap.registerPlugin(ScrollTrigger);

/* ─── Botanical SVG leaf ─────────────────────────────────── */
interface LeafProps {
  style?: React.CSSProperties;
}

function Leaf({ style }: LeafProps) {
  return (
    <svg
      viewBox="0 0 60 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={style}
    >
      <path
        d="M30 10 C30 10 10 40 10 70 C10 95 20 110 30 115 C40 110 50 95 50 70 C50 40 30 10 30 10Z"
        fill="rgba(27,90,58,0.35)"
      />
      <line x1="30" y1="10" x2="30" y2="115" stroke="rgba(184,154,99,0.3)" strokeWidth="0.8" />
      <line x1="30" y1="40" x2="18" y2="55" stroke="rgba(184,154,99,0.2)" strokeWidth="0.6" />
      <line x1="30" y1="55" x2="42" y2="68" stroke="rgba(184,154,99,0.2)" strokeWidth="0.6" />
      <line x1="30" y1="68" x2="19" y2="82" stroke="rgba(184,154,99,0.2)" strokeWidth="0.6" />
    </svg>
  );
}

/* ─── Social Icons ───────────────────────────────────────── */
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 3" />
      <path d="M12 8a4 4 0 1 0 4 4" />
    </svg>
  );
}

interface SocialButtonProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

function SocialButton({ href, label, children }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group w-9 h-9 flex items-center justify-center transition-all duration-300"
      style={{
        border: '1px solid rgba(243,235,221,0.2)',
        color: 'rgba(243,235,221,0.5)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.background = 'var(--irish-gold)';
        el.style.borderColor = 'var(--irish-gold)';
        el.style.color = 'var(--irish-black)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.background = 'transparent';
        el.style.borderColor = 'rgba(243,235,221,0.2)';
        el.style.color = 'rgba(243,235,221,0.5)';
      }}
    >
      {children}
    </a>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!displayRef.current) return;

    gsap.fromTo(
      displayRef.current.children,
      { yPercent: 50, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.4,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        },
      },
    );
  }, { scope: footerRef });

  const navLinks: Array<{ label: string; href: string }> = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Story', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Events', href: '#events' },
    { label: 'Contact', href: '#location' },
  ];

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative overflow-hidden"
      style={{ background: 'var(--irish-black)' }}
      aria-label="Site footer"
    >
      {/* ── Floating botanical leaves ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <Leaf
          style={{
            position: 'absolute',
            width: '80px',
            top: '5%',
            left: '3%',
            opacity: 0.4,
            animation: 'leaf-float 8s ease-in-out infinite',
            animationDelay: '0s',
          }}
        />
        <Leaf
          style={{
            position: 'absolute',
            width: '60px',
            top: '20%',
            right: '5%',
            opacity: 0.25,
            transform: 'rotate(-30deg)',
            animation: 'leaf-float 10s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />
        <Leaf
          style={{
            position: 'absolute',
            width: '100px',
            bottom: '15%',
            left: '8%',
            opacity: 0.2,
            transform: 'rotate(15deg)',
            animation: 'leaf-float 12s ease-in-out infinite',
            animationDelay: '4s',
          }}
        />
        <Leaf
          style={{
            position: 'absolute',
            width: '50px',
            bottom: '25%',
            right: '10%',
            opacity: 0.3,
            transform: 'rotate(-50deg)',
            animation: 'leaf-float 9s ease-in-out infinite',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* ── Leaf animation keyframes ── */}
      <style>{`
        @keyframes leaf-float {
          0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
          33%       { transform: translateY(-12px) rotate(calc(var(--r, 0deg) + 4deg)); }
          66%       { transform: translateY(6px) rotate(calc(var(--r, 0deg) - 3deg)); }
        }
      `}</style>

      {/* ── Top drama block ── */}
      <div
        className="relative border-b pt-20 pb-16 px-6 overflow-hidden"
        style={{ borderColor: 'rgba(184,154,99,0.12)' }}
      >
        <div ref={displayRef} className="max-w-7xl mx-auto text-center">
          <p
            className="text-sm italic mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: 'rgba(243,235,221,0.5)',
            }}
          >
            SEE YOU AT
          </p>
          <h2
            className="leading-none font-light mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: 'var(--irish-cream)',
              fontSize: 'clamp(3rem, 10vw, 9rem)',
            }}
            aria-label="The Irish Green"
          >
            THE IRISH GREEN
            <span style={{ color: 'var(--irish-gold)' }}>.</span>
          </h2>
          <p
            className="text-base italic"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: 'var(--irish-gold)',
            }}
          >
            {restaurant.subTagline}
          </p>
        </div>
      </div>

      {/* ── Middle grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 – Brand */}
          <div>
            <p
              className="text-lg font-semibold mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--irish-cream)' }}
            >
              {restaurant.name}
            </p>
            <p className="text-xs leading-relaxed mb-1" style={{ color: 'rgba(243,235,221,0.45)' }}>
              {restaurant.address.line1}
            </p>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(243,235,221,0.45)' }}>
              {restaurant.address.line2}
            </p>
            <a
              href={`tel:${restaurant.phoneRaw}`}
              className="text-xs transition-colors duration-200"
              style={{ color: 'rgba(243,235,221,0.45)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--irish-gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(243,235,221,0.45)')}
            >
              {restaurant.phone}
            </a>
          </div>

          {/* Col 2 – Quick links */}
          <nav aria-label="Footer navigation">
            <p
              className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-5"
              style={{ color: 'var(--irish-gold)', fontFamily: "'Inter', sans-serif" }}
            >
              Quick Links
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-xs transition-colors duration-200"
                    style={{ color: 'rgba(243,235,221,0.45)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--irish-cream)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(243,235,221,0.45)')}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 – Hours */}
          <div>
            <p
              className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-5"
              style={{ color: 'var(--irish-gold)', fontFamily: "'Inter', sans-serif" }}
            >
              Opening Hours
            </p>
            <dl className="flex flex-col gap-3">
              {restaurant.hours.map(({ days, time }) => (
                <div key={days}>
                  <dt className="text-[10px] mb-0.5" style={{ color: 'rgba(243,235,221,0.35)' }}>{days}</dt>
                  <dd className="text-xs" style={{ color: 'rgba(243,235,221,0.65)' }}>{time}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Col 4 – Social */}
          <div>
            <p
              className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-5"
              style={{ color: 'var(--irish-gold)', fontFamily: "'Inter', sans-serif" }}
            >
              Follow Us
            </p>
            <div className="flex gap-2">
              <SocialButton href={restaurant.social.instagram} label="Follow The Irish Green on Instagram">
                <InstagramIcon />
              </SocialButton>
              <SocialButton href={restaurant.social.facebook} label="Follow The Irish Green on Facebook">
                <FacebookIcon />
              </SocialButton>
              <SocialButton href={restaurant.social.google} label="Find The Irish Green on Google">
                <GoogleIcon />
              </SocialButton>
            </div>

            <p className="text-xs mt-6 leading-relaxed" style={{ color: 'rgba(243,235,221,0.3)' }}>
              Tag us in your experience<br />
              <span style={{ color: 'var(--irish-gold)' }}>@theirishgreen</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(184,154,99,0.2)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] order-2 sm:order-1" style={{ color: 'rgba(243,235,221,0.3)' }}>
            © 2024 The Irish Green. All rights reserved.
          </p>

          {/* Veg indicator — center */}
          <div className="order-1 sm:order-2 flex items-center gap-2" aria-label="Veg-friendly options available">
            <span className="veg-indicator" aria-hidden="true" />
            <span className="text-[10px]" style={{ color: 'rgba(243,235,221,0.35)' }}>
              Veg-friendly options available
            </span>
          </div>

          <p className="text-[10px] order-3" style={{ color: 'rgba(243,235,221,0.3)' }}>
            Sector 76, Noida, Uttar Pradesh
          </p>
        </div>
      </div>
    </footer>
  );
}
