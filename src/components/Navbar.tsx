import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Types ──────────────────────────────────────────── */
interface NavItem {
  label: string;
  href: string;
  isRoute?: boolean;
}

/* ── Data ──────────────────────────────────────────── */
const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Our Story', href: '#story' },
  { label: 'Menu', href: '/menu', isRoute: true },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

/* ── Framer Motion Variants ─────────────────────────── */
const drawerVariants: Variants = {
  closed: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.5, ease: [0.87, 0, 0.13, 1] as [number, number, number, number] },
  },
  open: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.55, ease: [0.87, 0, 0.13, 1] as [number, number, number, number] },
  },
};

const linkVariants: Variants = {
  closed: { opacity: 0, y: 24 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.07,
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

/* ── Leaf SVG Logo ──────────────────────────────────── */
function GoldLeaf({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
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

/* ── Main Component ─────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  /* GSAP scroll detection */
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 80,
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });
    return () => trigger.kill();
  }, []);

  /* Active section detection via IntersectionObserver */
  useEffect(() => {
    const sectionIds = NAV_ITEMS.filter((n) => !n.isRoute).map((n) =>
      n.href.replace('#', '')
    );
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [location.pathname]);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  /* Smooth scroll handler */
  const handleSamePageNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith('#')) return;
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      closeDrawer();
    },
    [closeDrawer]
  );

  const isActive = (item: NavItem) => {
    if (item.isRoute) return location.pathname === item.href;
    return activeSection === item.href.replace('#', '');
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        role="navigation"
        aria-label="Main navigation"
        initial={false}
        animate={scrolled ? 'scrolled' : 'top'}
        variants={{
          top: {
            backgroundColor: 'rgba(11,15,12,0)',
            borderBottomColor: 'rgba(184,154,99,0)',
          },
          scrolled: {
            backgroundColor: 'rgba(18,59,42,0.97)',
            borderBottomColor: 'rgba(184,154,99,0.3)',
          },
        }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          borderBottom: '1px solid transparent',
          transition: 'border-bottom-color 0.35s ease, backdrop-filter 0.35s ease',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[72px]">

            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-2 flex-shrink-0"
              aria-label="The Irish Green — Home"
              data-cursor="button"
            >
              <GoldLeaf className="text-[#B89A63]" />
              <div className="flex flex-col">
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '18px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    lineHeight: 1,
                    color: '#F3EBDD',
                    textTransform: 'uppercase',
                  }}
                >
                  The Irish Green
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '7px',
                    fontWeight: 500,
                    letterSpacing: '0.25em',
                    color: '#B89A63',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                  }}
                >
                  Fine Dining · Noida
                </span>
              </div>
            </Link>

            {/* ── Desktop nav links ── */}
            <ul
              className="hidden xl:flex items-center gap-7"
              role="list"
            >
              {NAV_ITEMS.map((item) => {
                const active = isActive(item);
                return (
                  <li key={item.label}>
                    {item.isRoute ? (
                      <Link
                        to={item.href}
                        data-cursor="button"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '10px',
                          fontWeight: 600,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: active ? '#B89A63' : 'rgba(243,235,221,0.75)',
                          textDecoration: 'none',
                          transition: 'color 0.25s ease',
                          position: 'relative',
                          paddingBottom: '3px',
                        }}
                        className="nav-link"
                      >
                        {item.label}
                        {active && (
                          <motion.span
                            layoutId="nav-underline"
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: '1px',
                              background: '#B89A63',
                            }}
                          />
                        )}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        data-cursor="button"
                        onClick={(e) => handleSamePageNav(e, item.href)}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '10px',
                          fontWeight: 600,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: active ? '#B89A63' : 'rgba(243,235,221,0.75)',
                          textDecoration: 'none',
                          transition: 'color 0.25s ease',
                          position: 'relative',
                          paddingBottom: '3px',
                        }}
                        className="nav-link"
                      >
                        {item.label}
                        {active && (
                          <motion.span
                            layoutId="nav-underline"
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: '1px',
                              background: '#B89A63',
                            }}
                          />
                        )}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* ── Right: Book CTA + Hamburger ── */}
            <div className="flex items-center gap-4">
              {/* Book a Table — desktop */}
              <a
                href="#reservation"
                onClick={(e) => handleSamePageNav(e, '#reservation')}
                data-cursor="button"
                className="btn-primary hidden lg:inline-flex"
                aria-label="Book a table"
              >
                <span>Book a Table</span>
              </a>

              {/* Hamburger — mobile/tablet */}
              <button
                onClick={() => setDrawerOpen((v) => !v)}
                className="xl:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 relative"
                aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={drawerOpen}
                data-cursor="button"
              >
                <motion.span
                  animate={
                    drawerOpen
                      ? { rotate: 45, y: 7, backgroundColor: '#B89A63' }
                      : { rotate: 0, y: 0, backgroundColor: '#F3EBDD' }
                  }
                  transition={{ duration: 0.3 }}
                  style={{ display: 'block', width: 22, height: 1.5, borderRadius: 1, transformOrigin: 'center' }}
                />
                <motion.span
                  animate={
                    drawerOpen
                      ? { opacity: 0, x: -8 }
                      : { opacity: 1, x: 0, backgroundColor: '#F3EBDD' }
                  }
                  transition={{ duration: 0.2 }}
                  style={{ display: 'block', width: 22, height: 1.5, borderRadius: 1, backgroundColor: '#F3EBDD' }}
                />
                <motion.span
                  animate={
                    drawerOpen
                      ? { rotate: -45, y: -7, backgroundColor: '#B89A63' }
                      : { rotate: 0, y: 0, backgroundColor: '#F3EBDD' }
                  }
                  transition={{ duration: 0.3 }}
                  style={{ display: 'block', width: 22, height: 1.5, borderRadius: 1, transformOrigin: 'center' }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="mobile-drawer"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[190] flex flex-col xl:hidden"
            style={{ background: '#123B2A' }}
          >
            {/* Noise texture overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none noise-overlay opacity-30"
            />

            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 h-[72px] border-b flex-shrink-0" style={{ borderColor: 'rgba(184,154,99,0.2)' }}>
              <Link
                to="/"
                onClick={closeDrawer}
                className="flex items-center gap-2"
                aria-label="The Irish Green — Home"
              >
                <GoldLeaf className="text-[#B89A63]" />
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '18px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: '#F3EBDD',
                    textTransform: 'uppercase',
                  }}
                >
                  The Irish Green
                </span>
              </Link>

              <button
                onClick={closeDrawer}
                aria-label="Close menu"
                className="w-10 h-10 flex items-center justify-center"
                style={{ color: '#B89A63' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Drawer links */}
            <nav className="flex-1 flex flex-col justify-center px-8 py-12" aria-label="Mobile navigation">
              <ul role="list" className="space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.label}
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    {item.isRoute ? (
                      <Link
                        to={item.href}
                        onClick={closeDrawer}
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: 'clamp(2.2rem, 6vw, 3rem)',
                          fontWeight: 500,
                          fontStyle: 'italic',
                          letterSpacing: '0.02em',
                          color: isActive(item) ? '#B89A63' : '#F3EBDD',
                          textDecoration: 'none',
                          display: 'block',
                          lineHeight: 1.2,
                          paddingTop: '8px',
                          paddingBottom: '8px',
                        }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          handleSamePageNav(e, item.href);
                          closeDrawer();
                        }}
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: 'clamp(2.2rem, 6vw, 3rem)',
                          fontWeight: 500,
                          fontStyle: 'italic',
                          letterSpacing: '0.02em',
                          color: isActive(item) ? '#B89A63' : '#F3EBDD',
                          textDecoration: 'none',
                          display: 'block',
                          lineHeight: 1.2,
                          paddingTop: '8px',
                          paddingBottom: '8px',
                        }}
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>

              {/* Divider */}
              <div
                aria-hidden="true"
                style={{
                  width: '100%',
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(184,154,99,0.5), transparent)',
                  margin: '2.5rem 0',
                }}
              />

              {/* CTA inside drawer */}
              <motion.div
                custom={NAV_ITEMS.length}
                variants={linkVariants}
                initial="closed"
                animate="open"
              >
                <a
                  href="#reservation"
                  onClick={(e) => {
                    handleSamePageNav(e, '#reservation');
                    closeDrawer();
                  }}
                  className="btn-primary inline-flex"
                  aria-label="Book a table"
                >
                  <span>Book a Table</span>
                </a>
              </motion.div>

              {/* Contact info */}
              <motion.div
                custom={NAV_ITEMS.length + 1}
                variants={linkVariants}
                initial="closed"
                animate="open"
                style={{ marginTop: '2rem' }}
              >
                <a
                  href="tel:+919355113111"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: 400,
                    letterSpacing: '0.1em',
                    color: 'rgba(243,235,221,0.5)',
                    textDecoration: 'none',
                  }}
                  aria-label="Call us at +91 93551 13111"
                >
                  +91 93551 13111
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
