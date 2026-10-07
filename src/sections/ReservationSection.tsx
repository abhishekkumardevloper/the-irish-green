import { useRef, useState, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Types ──────────────────────────────────────────────── */
interface FormValues {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  request: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: string;
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

/* ─── Time slots ─────────────────────────────────────────── */
const TIME_SLOTS: string[] = (() => {
  const slots: string[] = [];
  for (let h = 12; h <= 22; h++) {
    for (const m of [0, 30]) {
      if (h === 22 && m === 30) break;
      const hour12 = h > 12 ? h - 12 : h;
      const ampm = h < 12 ? 'AM' : 'PM';
      const pad = (n: number) => String(n).padStart(2, '0');
      slots.push(`${pad(hour12)}:${pad(m)} ${ampm}`);
    }
  }
  return slots;
})();

const GUEST_OPTIONS = ['1–2', '3–4', '5–6', '7–8', '8+'];

/* ─── Helpers ────────────────────────────────────────────── */
function todayString(): string {
  return new Date().toISOString().split('T')[0];
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (values.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Enter at least 10 digits.';
  }
  if (!values.date) errors.date = 'Please select a date.';
  if (!values.time) errors.time = 'Please select a time.';
  if (!values.guests) errors.guests = 'Please select number of guests.';
  return errors;
}

/* ─── Sub-components ─────────────────────────────────────── */
interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-[10px] font-semibold tracking-[0.2em] uppercase"
        style={{ color: 'var(--irish-gold)' }}
      >
        {label}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-[11px] text-red-400 mt-0.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputBase =
  'w-full bg-transparent px-0 py-2 text-sm border-b border-[rgba(184,154,99,0.4)] focus:border-[var(--irish-gold)] focus:outline-none transition-colors duration-300 placeholder:text-[rgba(243,235,221,0.3)]';
const inputStyle: React.CSSProperties = { color: 'var(--irish-cream)', borderRadius: 0 };

/* ─── Success Modal ──────────────────────────────────────── */
function SuccessModal({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'rgba(18, 59, 42, 0.97)', backdropFilter: 'blur(16px)' }}
    >
      <motion.div
        className="text-center max-w-md"
        initial={{ scale: 0.85, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.1 }}
      >
        {/* Gold circle check */}
        <div
          className="w-20 h-20 rounded-full border-2 flex items-center justify-center mx-auto mb-8"
          style={{ borderColor: 'var(--irish-gold)' }}
          aria-hidden="true"
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path
              d="M7 18.5L14 25.5L29 11"
              stroke="var(--irish-gold)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3
          id="success-title"
          className="text-3xl md:text-4xl mb-4 font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--irish-cream)' }}
        >
          Your table request has been received.
        </h3>
        <p className="text-sm mb-2" style={{ color: 'var(--irish-gold)' }}>
          We look forward to welcoming you at The Irish Green.
        </p>
        <p className="text-xs mb-10" style={{ color: 'rgba(243,235,221,0.55)' }}>
          Our team will contact you shortly to confirm your reservation.
        </p>

        <button
          onClick={onReset}
          className="btn-primary"
          style={{ margin: '0 auto' }}
        >
          <span>Book Another Table</span>
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function ReservationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const [values, setValues] = useState<FormValues>({
    name: '', phone: '', date: '', time: '', guests: '', request: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  /* ─── GSAP entrance ─── */
  useGSAP(() => {
    if (!headingRef.current || !formRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { yPercent: 40, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      },
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      },
    );
  }, { scope: sectionRef });

  /* ─── Handlers ─── */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues(prev => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(values);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitState('loading');
    // Mock submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitState('success');
  }, [values]);

  const handleReset = useCallback(() => {
    setValues({ name: '', phone: '', date: '', time: '', guests: '', request: '' });
    setErrors({});
    setSubmitState('idle');
  }, []);

  return (
    <section
      id="reservation"
      ref={sectionRef}
      className="relative section-padding overflow-hidden noise-overlay"
      style={{ background: 'var(--irish-forest)' }}
      aria-labelledby="reservation-heading"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(184,154,99,1) 80px, rgba(184,154,99,1) 81px)',
        }}
      />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Heading block */}
        <div className="text-center mb-14 overflow-hidden">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: 'var(--irish-gold)', fontFamily: "'Inter', sans-serif" }}
          >
            Reservations
          </p>
          <h2
            ref={headingRef}
            id="reservation-heading"
            className="text-5xl md:text-7xl lg:text-8xl font-light leading-none mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--irish-cream)' }}
          >
            YOUR TABLE IS<br />WAITING.
          </h2>
          <p
            className="text-base italic"
            style={{ color: 'rgba(243,235,221,0.6)', fontFamily: "'Cormorant Garamond', serif" }}
          >
            Reserve your experience at The Irish Green
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-12 mx-auto"
          style={{ background: 'rgba(184,154,99,0.3)', maxWidth: '200px' }}
          aria-hidden="true"
        />

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          aria-label="Table reservation form"
        >
          <fieldset disabled={submitState === 'loading'} style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend className="sr-only">Reservation details</legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {/* Name */}
              <Field id={`${uid}-name`} label="Full Name" error={errors.name}>
                <input
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputBase}
                  style={inputStyle}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                />
              </Field>

              {/* Phone */}
              <Field id={`${uid}-phone`} label="Phone Number" error={errors.phone}>
                <input
                  id={`${uid}-phone`}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className={inputBase}
                  style={inputStyle}
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                />
              </Field>

              {/* Date */}
              <Field id={`${uid}-date`} label="Date" error={errors.date}>
                <input
                  id={`${uid}-date`}
                  name="date"
                  type="date"
                  min={todayString()}
                  value={values.date}
                  onChange={handleChange}
                  className={inputBase}
                  style={{
                    ...inputStyle,
                    colorScheme: 'dark',
                  }}
                  aria-required="true"
                  aria-invalid={!!errors.date}
                />
              </Field>

              {/* Time */}
              <Field id={`${uid}-time`} label="Time" error={errors.time}>
                <select
                  id={`${uid}-time`}
                  name="time"
                  value={values.time}
                  onChange={handleChange}
                  className={inputBase}
                  style={{ ...inputStyle, background: 'var(--irish-forest)' }}
                  aria-required="true"
                  aria-invalid={!!errors.time}
                >
                  <option value="" disabled>Select a time</option>
                  {TIME_SLOTS.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </Field>

              {/* Guests — full width */}
              <div className="md:col-span-2">
                <Field id={`${uid}-guests`} label="Number of Guests" error={errors.guests}>
                  <select
                    id={`${uid}-guests`}
                    name="guests"
                    value={values.guests}
                    onChange={handleChange}
                    className={inputBase}
                    style={{ ...inputStyle, background: 'var(--irish-forest)' }}
                    aria-required="true"
                    aria-invalid={!!errors.guests}
                  >
                    <option value="" disabled>Select guests</option>
                    {GUEST_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt} guests</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Special Request — full width */}
              <div className="md:col-span-2">
                <Field id={`${uid}-request`} label="Special Request (optional)">
                  <textarea
                    id={`${uid}-request`}
                    name="request"
                    rows={3}
                    value={values.request}
                    onChange={handleChange}
                    placeholder="Allergies, dietary needs, occasion, seating preference…"
                    className={`${inputBase} resize-none`}
                    style={{ ...inputStyle, paddingTop: '8px' }}
                  />
                </Field>
              </div>
            </div>

            {/* Error banner */}
            <AnimatePresence>
              {submitState === 'error' && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-400 text-center mt-6"
                >
                  Something went wrong. Please try again or WhatsApp us.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <div className="mt-10">
              <button
                type="submit"
                className="btn-primary w-full justify-center"
                aria-busy={submitState === 'loading'}
                disabled={submitState === 'loading'}
              >
                {submitState === 'loading' ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <span>Reserve Your Table →</span>
                )}
              </button>
            </div>
          </fieldset>
        </form>

        {/* WhatsApp fallback */}
        <p className="text-center mt-8 text-sm" style={{ color: 'rgba(243,235,221,0.45)' }}>
          Prefer WhatsApp?{' '}
          <a
            href="https://wa.me/919355113111?text=Hi%20The%20Irish%20Green%2C%20I%20would%20like%20to%20book%20a%20table."
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors duration-200"
            style={{ color: 'var(--irish-gold)' }}
            aria-label="Message us on WhatsApp to book a table"
          >
            Message us directly →
          </a>
        </p>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {submitState === 'success' && <SuccessModal onReset={handleReset} />}
      </AnimatePresence>
    </section>
  );
}
