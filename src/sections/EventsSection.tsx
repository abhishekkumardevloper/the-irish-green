import { useRef, useState, useId, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { events, type Event } from '../data/events';

gsap.registerPlugin(ScrollTrigger);

/* ─── Enquiry Modal ──────────────────────────────────────── */
interface EnquiryValues {
  name: string;
  phone: string;
  eventType: string;
  date: string;
  message: string;
}

const EVENT_TYPES = [
  'Birthday', 'Anniversary', 'Family Gathering',
  'Corporate Dinner', 'Small Celebration', 'Private Buyout', 'Other',
];

function EnquiryModal({ onClose }: { onClose: () => void }) {
  const uid = useId();
  const [values, setValues] = useState<EnquiryValues>({
    name: '', phone: '', eventType: '', date: '', message: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 22, stiffness: 200 } },
    exit: { opacity: 0, y: 20, scale: 0.97, transition: { duration: 0.2 } },
  };

  const inputCls =
    'w-full bg-transparent px-0 py-2 text-sm border-b border-[rgba(184,154,99,0.3)] focus:border-[var(--irish-gold)] focus:outline-none transition-colors duration-300 text-[var(--irish-cream)] placeholder:text-[rgba(243,235,221,0.3)]';

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ background: 'rgba(11,15,12,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        variants={panelVariants}
        className="w-full max-w-lg rounded-sm relative"
        style={{ background: 'var(--irish-forest)', border: '1px solid rgba(184,154,99,0.25)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close enquiry form"
          className="absolute top-4 right-4 text-xl leading-none transition-colors duration-200"
          style={{ color: 'rgba(243,235,221,0.4)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--irish-gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(243,235,221,0.4)')}
        >
          ✕
        </button>

        <div className="p-8 md:p-10">
          {!sent ? (
            <>
              <p
                className="text-[10px] tracking-[0.25em] uppercase mb-2"
                style={{ color: 'var(--irish-gold)', fontFamily: "'Inter', sans-serif" }}
              >
                Private Events
              </p>
              <h3
                id="enquiry-title"
                className="text-2xl md:text-3xl mb-8 font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--irish-cream)' }}
              >
                Plan Your Celebration
              </h3>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <div>
                  <label htmlFor={`${uid}-e-name`} className="block text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--irish-gold)' }}>Name</label>
                  <input id={`${uid}-e-name`} name="name" type="text" required value={values.name} onChange={handleChange} placeholder="Your name" className={inputCls} />
                </div>
                <div>
                  <label htmlFor={`${uid}-e-phone`} className="block text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--irish-gold)' }}>Phone</label>
                  <input id={`${uid}-e-phone`} name="phone" type="tel" required value={values.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className={inputCls} />
                </div>
                <div>
                  <label htmlFor={`${uid}-e-type`} className="block text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--irish-gold)' }}>Event Type</label>
                  <select id={`${uid}-e-type`} name="eventType" required value={values.eventType} onChange={handleChange} className={inputCls} style={{ background: 'var(--irish-forest)', borderRadius: 0 }}>
                    <option value="" disabled>Select type</option>
                    {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor={`${uid}-e-date`} className="block text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--irish-gold)' }}>Preferred Date</label>
                  <input id={`${uid}-e-date`} name="date" type="date" value={values.date} onChange={handleChange} className={inputCls} style={{ colorScheme: 'dark' }} />
                </div>
                <div>
                  <label htmlFor={`${uid}-e-msg`} className="block text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--irish-gold)' }}>Message</label>
                  <textarea id={`${uid}-e-msg`} name="message" rows={3} value={values.message} onChange={handleChange} placeholder="Tell us about your event…" className={`${inputCls} resize-none`} />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center mt-2"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <><span className="spinner" aria-hidden="true" /><span>Sending…</span></>
                  ) : (
                    <span>Send Enquiry →</span>
                  )}
                </button>
              </form>
            </>
          ) : (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 18, stiffness: 200 }}
            >
              <div
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mb-6"
                style={{ borderColor: 'var(--irish-gold)' }}
                aria-hidden="true"
              >
                <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                  <path d="M7 18.5L14 25.5L29 11" stroke="var(--irish-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-2xl mb-3 font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--irish-cream)' }}>
                Enquiry Received!
              </h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(243,235,221,0.55)' }}>
                Our events team will be in touch with you shortly.
              </p>
              <button onClick={onClose} className="btn-ghost">
                <span>Close</span>
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Event Card ─────────────────────────────────────────── */
function EventCard({ event }: { event: Event }) {
  return (
    <article
      className="flex-shrink-0 w-80 md:w-96 rounded-sm overflow-hidden group transition-all duration-500"
      style={{ background: 'var(--irish-black)', border: '1px solid rgba(184,154,99,0.12)' }}
      aria-label={event.title}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden img-zoom">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: 'linear-gradient(to top, rgba(11,15,12,0.85) 0%, rgba(11,15,12,0.2) 60%, transparent 100%)' }}
        />
        {/* Icon */}
        <span
          className="absolute inset-0 flex items-center justify-center text-5xl transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        >
          {event.icon}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        <h3
          className="text-xl font-semibold mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--irish-cream)' }}
        >
          {event.title}
        </h3>
        <p className="text-xs leading-relaxed mb-5" style={{ color: 'rgba(243,235,221,0.5)' }}>
          {event.description}
        </p>

        {/* Features */}
        <ul className="flex flex-col gap-1.5 mb-6" aria-label={`${event.title} features`}>
          {event.features.map(f => (
            <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(243,235,221,0.65)' }}>
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: 'var(--irish-gold)' }}
                aria-hidden="true"
              />
              {f}
            </li>
          ))}
        </ul>

        <button className="btn-ghost" aria-label={`Enquire about ${event.title}`}>
          <span>Enquire Now</span>
          <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const openEnquiry = useCallback(() => setEnquiryOpen(true), []);
  const closeEnquiry = useCallback(() => setEnquiryOpen(false), []);

  useGSAP(() => {
    if (!headingRef.current) return;

    gsap.fromTo(
      headingRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      },
    );
  }, { scope: sectionRef });

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: 'var(--irish-ivory)' }}
      aria-labelledby="events-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p
            className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: 'var(--irish-gold)', fontFamily: "'Inter', sans-serif" }}
          >
            Celebrate With Us
          </p>
          <h2
            id="events-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--irish-black)' }}
          >
            Every Occasion Deserves<br />
            <em>a Perfect Setting.</em>
          </h2>
        </div>

        {/* Cards — horizontal scroll on desktop, stacked on mobile */}
        <div
          ref={scrollRef}
          className="flex flex-col md:flex-row md:overflow-x-auto gap-5 pb-4 -mx-6 px-6 md:snap-x md:snap-mandatory"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--irish-gold) transparent' }}
          data-lenis-prevent
          role="list"
          aria-label="Event types"
        >
          {events.map(event => (
            <div key={event.id} role="listitem" className="md:snap-start md:snap-always">
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p
            className="text-xl md:text-2xl italic mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: 'rgba(11,15,12,0.55)',
            }}
          >
            Planning something special?
          </p>
          <button
            onClick={openEnquiry}
            className="btn-primary"
            aria-label="Open event planning enquiry form"
          >
            <span>Plan Your Celebration</span>
          </button>
        </div>
      </div>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {enquiryOpen && <EnquiryModal onClose={closeEnquiry} />}
      </AnimatePresence>
    </section>
  );
}
