import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryImages, type GalleryImage } from '../data/gallery';

gsap.registerPlugin(ScrollTrigger);

type FilterCategory = 'all' | 'interior' | 'food' | 'outdoor' | 'people' | 'details';

const FILTER_TABS: { label: string; value: FilterCategory }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'INTERIOR', value: 'interior' },
  { label: 'FOOD', value: 'food' },
  { label: 'OUTDOOR', value: 'outdoor' },
  { label: 'PEOPLE', value: 'people' },
  { label: 'DETAILS', value: 'details' },
];

// Assign grid span classes to create asymmetric layout
const SPAN_PATTERNS: string[] = [
  'col-span-2 row-span-2', // wide + tall
  'col-span-1 row-span-1', // normal
  'col-span-1 row-span-2', // tall
  'col-span-1 row-span-1', // normal
  'col-span-1 row-span-1', // normal
  'col-span-2 row-span-1', // wide
  'col-span-1 row-span-1', // normal
  'col-span-1 row-span-2', // tall
  'col-span-1 row-span-1', // normal
  'col-span-2 row-span-1', // wide
  'col-span-1 row-span-1', // normal
  'col-span-1 row-span-1', // normal
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const current = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onNext, onPrev, onClose]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(11,15,12,0.95)', backdropFilter: 'blur(12px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery lightbox: ${current?.alt ?? 'Image'}`}
    >
      {/* Close button */}
      <button
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full border border-[#F3EBDD]/30 flex items-center justify-center text-[#F3EBDD] hover:border-[#B89A63] hover:text-[#B89A63] transition-colors"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 font-['Inter'] text-sm text-[#F3EBDD]/60 tracking-widest">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev button */}
      <button
        className="absolute left-4 md:left-8 z-10 w-11 h-11 rounded-full border border-[#F3EBDD]/20 flex items-center justify-center text-[#F3EBDD] hover:border-[#B89A63] hover:text-[#B89A63] transition-colors disabled:opacity-30"
        onClick={onPrev}
        aria-label="Previous image"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current?.id}
          className="relative max-w-5xl max-h-[80vh] mx-16 md:mx-24 w-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <img
            src={current?.src}
            alt={current?.alt ?? 'Gallery image'}
            className="max-h-[75vh] max-w-full object-contain rounded-sm shadow-2xl"
          />
          {/* Alt text overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-sm">
            <p className="text-[#F3EBDD]/80 text-sm font-['Inter']">{current?.alt}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      <button
        className="absolute right-4 md:right-8 z-10 w-11 h-11 rounded-full border border-[#F3EBDD]/20 flex items-center justify-center text-[#F3EBDD] hover:border-[#B89A63] hover:text-[#B89A63] transition-colors"
        onClick={onNext}
        aria-label="Next image"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Mobile swipe hint */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#F3EBDD]/30 text-xs font-['Inter'] tracking-wider md:hidden">
        ← swipe to navigate →
      </p>
    </motion.div>
  );
}

// ─── Gallery Item ─────────────────────────────────────────────────────────────

interface GalleryItemProps {
  image: GalleryImage;
  spanClass: string;
  index: number;
  onClick: () => void;
}

function GalleryItem({ image, spanClass, index, onClick }: GalleryItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver reveal
  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: (index % 4) * 0.1,
              ease: 'power3.out',
            }
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, { scale: 1.08, duration: 0.6, ease: 'power2.out' });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.6, ease: 'power2.inOut' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, ease: 'power2.inOut' });
  };

  return (
    <div
      ref={itemRef}
      className={`${spanClass} relative overflow-hidden cursor-pointer opacity-0`}
      style={{ minHeight: '180px' }}
      data-cursor="open"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`Open gallery image: ${image.alt}`}
    >
      <img
        ref={imgRef}
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transformOrigin: 'center center' }}
      />
      {/* Hover overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 opacity-0 flex items-end p-4"
        style={{ background: 'linear-gradient(to top, rgba(11,15,12,0.85) 0%, rgba(11,15,12,0.1) 100%)' }}
        aria-hidden="true"
      >
        <p className="text-[#F3EBDD]/90 text-xs font-['Inter'] leading-snug">{image.alt}</p>
      </div>
    </div>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredImages =
    activeFilter === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  const handleFilterChange = (filter: FilterCategory) => {
    if (filter === activeFilter || isAnimating) return;
    setIsAnimating(true);

    // Animate grid out
    if (gridRef.current) {
      gsap.to(gridRef.current.querySelectorAll('.gallery-item-wrapper'), {
        opacity: 0,
        scale: 0.96,
        duration: 0.25,
        stagger: 0.03,
        ease: 'power2.in',
        onComplete: () => {
          setActiveFilter(filter);
          setIsAnimating(false);
        },
      });
    } else {
      setActiveFilter(filter);
      setIsAnimating(false);
    }
  };

  // Heading reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = headingRef.current?.querySelectorAll('.heading-reveal');
      if (lines) {
        gsap.fromTo(
          lines,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredImages.length : null
    );
  }, [filteredImages.length]);
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null
    );
  }, [filteredImages.length]);

  return (
    <>
      <section
        ref={sectionRef}
        className="bg-[#0B0F0C] section-padding overflow-hidden"
        aria-label="Photo gallery of The Irish Green"
        id="gallery"
      >
        {/* Heading */}
        <div ref={headingRef} className="px-4 md:px-8 lg:px-12 mb-12">
          <div className="heading-reveal overflow-hidden">
            <p className="font-['Inter'] text-xs tracking-[0.3em] text-[#B89A63] uppercase mb-3">
              THE IRISH GREEN
            </p>
          </div>
          <div className="heading-reveal overflow-hidden">
            <h2 className="font-['Cormorant_Garamond'] font-semibold italic text-[clamp(2.5rem,6vw,5.5rem)] text-[#F3EBDD] leading-[1] tracking-tight">
              Through the Lens
            </h2>
          </div>
        </div>

        {/* Filter tabs */}
        <div
          className="px-4 md:px-8 lg:px-12 mb-10 flex flex-wrap gap-2 md:gap-6"
          role="tablist"
          aria-label="Filter gallery by category"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeFilter === tab.value}
              onClick={() => handleFilterChange(tab.value)}
              className={`
                relative font-['Inter'] text-xs md:text-sm tracking-widest uppercase pb-2 transition-colors duration-300
                ${activeFilter === tab.value ? 'text-[#B89A63]' : 'text-[#F3EBDD]/50 hover:text-[#F3EBDD]/80'}
              `}
            >
              {tab.label}
              {activeFilter === tab.value && (
                <motion.div
                  layoutId="gallery-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#B89A63]"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Asymmetric Grid */}
        <div
          ref={gridRef}
          className="px-4 md:px-8 lg:px-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[220px] gap-2 md:gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredImages.map((image, index) => (
                <div key={image.id} className="gallery-item-wrapper">
                  <GalleryItem
                    image={image}
                    spanClass={SPAN_PATTERNS[index % SPAN_PATTERNS.length]}
                    index={index}
                    onClick={() => openLightbox(index)}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filteredImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}
