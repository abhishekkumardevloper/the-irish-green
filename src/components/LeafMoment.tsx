import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTE = 'Good food tastes better when shared with good people.';

export default function LeafMoment() {
  const [open, setOpen] = useState(false);

  const openOverlay = () => setOpen(true);
  const closeOverlay = () => setOpen(false);

  return (
    <>
      {/* Floating leaf trigger — desktop only */}
      <motion.button
        onClick={openOverlay}
        className="hidden lg:flex fixed bottom-8 right-8 z-50 items-center justify-center"
        aria-label="A moment from The Irish Green"
        data-cursor="button"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.15 }}
        style={{
          width: 48,
          height: 48,
          background: 'rgba(18,59,42,0.75)',
          border: '1px solid rgba(184,154,99,0.5)',
          borderRadius: '50%',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          cursor: 'none',
        }}
      >
        <LeafSvg size={22} color="#B89A63" />
      </motion.button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="leaf-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={closeOverlay}
            className="fixed inset-0 z-[9000] flex items-center justify-center"
            style={{ background: '#0B0F0C', cursor: 'none' }}
            role="dialog"
            aria-modal="true"
            aria-label="A moment from The Irish Green"
          >
            {/* Subtle radial glow */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(18,59,42,0.65) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center text-center px-8 max-w-xl mx-auto"
            >
              {/* Gold leaf decoration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.25, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ marginBottom: '2rem' }}
              >
                <LeafSvg size={48} color="#B89A63" />
              </motion.div>

              {/* Decorative rule */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
                style={{
                  width: 80,
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, #B89A63, transparent)',
                  marginBottom: '2rem',
                  transformOrigin: 'center',
                }}
              />

              {/* Quote */}
              <motion.blockquote
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  lineHeight: 1.4,
                  color: '#F3EBDD',
                  marginBottom: '2rem',
                }}
              >
                &ldquo;{QUOTE}&rdquo;
              </motion.blockquote>

              {/* Decorative rule */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.55, duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
                style={{
                  width: 80,
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, #B89A63, transparent)',
                  marginBottom: '1.5rem',
                  transformOrigin: 'center',
                }}
              />

              {/* Attribution */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#B89A63',
                  marginBottom: '3rem',
                }}
              >
                The Irish Green
              </motion.p>

              {/* Close hint */}
              <motion.button
                onClick={closeOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                whileHover={{ opacity: 1 }}
                data-cursor="button"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#F3EBDD',
                  background: 'none',
                  border: 'none',
                  cursor: 'none',
                }}
                aria-label="Close"
              >
                Click anywhere to close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Leaf SVG icon ── */
function LeafSvg({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 20A7 7 0 0118 7h0a7 7 0 01-7 13z" />
      <path d="M11 20c0-5.5 3-9.5 7-13" />
      <path d="M11 20c-1-3.5 0-7 1-10" />
    </svg>
  );
}
