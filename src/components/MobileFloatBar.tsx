import { motion } from 'framer-motion';

const WA_URL =
  'https://wa.me/919355113111?text=Hi%20The%20Irish%20Green%2C%20I%20would%20like%20to%20enquire%20about%20a%20table.';

export default function MobileFloatBar() {
  return (
    <motion.div
      className="mobile-float-bar lg:hidden"
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
      aria-label="Quick actions"
      style={{
        background: 'rgba(18, 59, 42, 0.85)',
        borderTop: '1px solid rgba(184, 154, 99, 0.35)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-stretch divide-x" style={{ divideColor: 'rgba(184,154,99,0.2)' }}>
        {/* BOOK TABLE */}
        <a
          href="#reservation"
          data-cursor="button"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 transition-colors duration-200"
          style={{ color: '#B89A63' }}
          aria-label="Book a table"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '8px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#B89A63',
              textTransform: 'uppercase',
            }}
          >
            Book Table
          </span>
        </a>

        {/* CALL */}
        <a
          href="tel:+919355113111"
          data-cursor="button"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 transition-colors duration-200"
          style={{ color: '#F3EBDD' }}
          aria-label="Call us"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '8px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: 'rgba(243,235,221,0.8)',
              textTransform: 'uppercase',
            }}
          >
            Call
          </span>
        </a>

        {/* WHATSAPP */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="button"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 transition-colors duration-200"
          style={{ color: '#F3EBDD' }}
          aria-label="Chat on WhatsApp"
        >
          {/* WhatsApp icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '8px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: 'rgba(243,235,221,0.8)',
              textTransform: 'uppercase',
            }}
          >
            WhatsApp
          </span>
        </a>
      </div>
    </motion.div>
  );
}
