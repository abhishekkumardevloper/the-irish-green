import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

const EXPERIENCE_CARDS: ExperienceCard[] = [
  {
    id: 'exp-1',
    title: 'COZY INDOOR DINING',
    description:
      'Warm lighting, wooden interiors, and the perfect corner table waiting for you.',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
  },
  {
    id: 'exp-2',
    title: 'OUTDOOR OPEN-AIR',
    description:
      'Dine under the sky. Where breeze, greenery, and good food come together.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  },
  {
    id: 'exp-3',
    title: 'FAMILY & FRIENDS',
    description: 'Long tables, laughter, and food that brings everyone together.',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80',
  },
  {
    id: 'exp-4',
    title: 'CELEBRATIONS',
    description:
      'From birthdays to anniversaries, we make every occasion unforgettable.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      const headingLines = headingRef.current?.querySelectorAll('.heading-line');
      if (headingLines) {
        gsap.fromTo(
          headingLines,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Cards clip-path stagger reveal
      const cards = cardsRef.current?.querySelectorAll('.exp-card');
      if (cards) {
        gsap.fromTo(
          cards,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
            opacity: 0,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
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
      className="bg-[#0B0F0C] section-padding overflow-hidden"
      aria-label="Dining experiences at The Irish Green"
    >
      {/* Heading */}
      <div ref={headingRef} className="mb-16 px-4 md:px-8 lg:px-12">
        <div className="heading-line overflow-hidden">
          <h2
            className="font-['Cormorant_Garamond'] font-bold text-[clamp(2.5rem,7vw,7rem)] leading-[0.9] text-[#F3EBDD] tracking-tight uppercase"
            aria-label="Come for the food. Stay for the moments."
          >
            COME FOR THE FOOD.
          </h2>
        </div>
        <div className="heading-line overflow-hidden mt-1">
          <p className="font-['Cormorant_Garamond'] italic text-[clamp(2rem,5.5vw,5.5rem)] leading-[0.95] text-[#F3EBDD] tracking-tight">
            STAY FOR THE{' '}
            <span className="text-gold-gradient">MOMENTS.</span>
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 px-4 md:px-8 lg:px-12"
        role="list"
        aria-label="Experience types"
      >
        {EXPERIENCE_CARDS.map((card) => (
          <ExperienceCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}

// ─── Individual Experience Card ───────────────────────────────────────────────

interface ExperienceCardProps {
  card: ExperienceCard;
}

function ExperienceCard({ card }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, {
      opacity: 0.35,
      duration: 0.45,
      ease: 'power2.out',
    });
    gsap.to(imageRef.current, {
      scale: 1.06,
      duration: 0.65,
      ease: 'power2.out',
    });
    gsap.to(titleRef.current, {
      y: -8,
      duration: 0.45,
      ease: 'power2.out',
    });
    gsap.to(arrowRef.current, {
      x: 4,
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.to(cardRef.current, {
      boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
      duration: 0.45,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.55,
      ease: 'power2.inOut',
    });
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.65,
      ease: 'power2.inOut',
    });
    gsap.to(titleRef.current, {
      y: 0,
      duration: 0.45,
      ease: 'power2.inOut',
    });
    gsap.to(arrowRef.current, {
      x: 0,
      duration: 0.4,
      ease: 'power2.inOut',
    });
    gsap.to(cardRef.current, {
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      duration: 0.45,
      ease: 'power2.inOut',
    });
  };

  return (
    <div
      ref={cardRef}
      className="exp-card relative overflow-hidden cursor-pointer"
      style={{
        minHeight: 'clamp(300px, 50vh, 600px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
      data-cursor="view"
      role="listitem"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`${card.title}: ${card.description}`}
      tabIndex={0}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {/* Background image */}
      <img
        ref={imageRef}
        src={card.image}
        alt={card.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transformOrigin: 'center center' }}
      />

      {/* Dark gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(11,15,12,0.92) 0%, rgba(11,15,12,0.5) 45%, rgba(11,15,12,0.1) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Mobile min-height helper */}
      <div className="relative h-full" style={{ minHeight: 'clamp(300px, 60vw, 600px)' }}>
        {/* Bottom-left content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1">
              <h3
                ref={titleRef}
                className="font-['Cormorant_Garamond'] font-bold text-[#F3EBDD] uppercase tracking-widest text-xl md:text-2xl lg:text-3xl mb-2 leading-tight"
              >
                {card.title}
              </h3>
              <p className="text-[#F3EBDD]/70 text-sm md:text-base font-['Inter'] leading-snug max-w-xs">
                {card.description}
              </p>
            </div>

            {/* Gold arrow button */}
            <div
              ref={arrowRef}
              className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#B89A63] flex items-center justify-center"
              style={{ background: 'rgba(184,154,99,0.15)' }}
              aria-hidden="true"
            >
              <span className="text-[#B89A63] text-lg font-light leading-none">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
