import { useState, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems, menuCategories, type MenuItem, type MenuCategory } from '../data/menu';

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
type CategoryId = string | 'all';

/* ─────────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────────── */
const HEADER_IMAGE =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85';

const SPICE_MAP: Record<NonNullable<MenuItem['spiceLevel']>, string> = {
  mild: '🌶️',
  medium: '🌶️🌶️',
  hot: '🌶️🌶️🌶️',
};

const ALL_CATEGORY: MenuCategory = {
  id: 'all',
  name: 'All',
  description: 'Everything on the menu',
  image: '',
  icon: '🍽️',
};

const CATEGORIES = [ALL_CATEGORY, ...menuCategories];

/* ─────────────────────────────────────────────────────────────────────────────
   Veg Indicator  (green square with inner dot)
───────────────────────────────────────────────────────────────────────────── */
function VegIndicator({ isVeg }: { isVeg: boolean }) {
  return (
    <span
      role="img"
      aria-label={isVeg ? 'Vegetarian' : 'Non-vegetarian'}
      className="inline-flex items-center justify-center w-4 h-4 rounded-sm border-2 flex-shrink-0"
      style={{
        borderColor: isVeg ? '#22c55e' : '#ef4444',
        backgroundColor: 'transparent',
      }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: isVeg ? '#22c55e' : '#ef4444' }}
      />
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Menu Card
───────────────────────────────────────────────────────────────────────────── */
interface MenuCardProps {
  item: MenuItem;
  isFeaturedView?: boolean;
}

function MenuCard({ item, isFeaturedView = false }: MenuCardProps) {
  const cat = menuCategories.find((c) => c.id === item.category);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm
                 border border-[#e8e1d6] hover:shadow-xl
                 transition-all duration-300 hover:-translate-y-1"
      style={{ borderTopWidth: 0 }}
      aria-label={item.name}
    >
      {/* Gold top-border on hover */}
      <span
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#B89A63] z-10
                   scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
        aria-hidden="true"
      />

      {/* Image */}
      <div className="relative overflow-hidden h-[200px] flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark gradient at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/60 to-transparent" />

        {/* FEATURED badge (when shown in 'all' view) */}
        {isFeaturedView && item.isFeatured && (
          <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold tracking-widest
                           bg-[#B89A63] text-white rounded-full uppercase shadow">
            Featured
          </span>
        )}

        {/* Category badge */}
        {cat && (
          <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-medium tracking-wide
                           bg-white/80 text-[#7C967D] rounded-full backdrop-blur-sm">
            {cat.icon} {cat.name}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Tags row */}
        {item.isSignature && (
          <span className="self-start px-2 py-0.5 text-[10px] font-bold tracking-widest
                           border border-[#B89A63] text-[#B89A63] rounded-full uppercase">
            Signature
          </span>
        )}

        {/* Name + veg indicator */}
        <div className="flex items-center gap-2">
          <VegIndicator isVeg={item.isVeg} />
          <h3 className="font-['Cormorant_Garamond'] text-lg font-semibold text-[#123B2A] leading-tight">
            {item.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-[#5A5A5A] font-['Inter'] leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-medium tracking-wide
                           bg-[#F3EBDD] text-[#7C967D] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom row: spice level + price */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#F0EAE0]">
          <span className="text-sm" aria-label={`Spice level: ${item.spiceLevel ?? 'not specified'}`}>
            {item.spiceLevel ? SPICE_MAP[item.spiceLevel] : ''}
          </span>
          <span className="font-['Cormorant_Garamond'] text-xl font-bold text-[#B89A63]">
            ₹{item.price}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Veg Toggle
───────────────────────────────────────────────────────────────────────────── */
function VegToggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={active}
      aria-label="Veg only filter"
      className="flex items-center gap-2 select-none cursor-pointer group"
    >
      {/* Track */}
      <span
        className="relative inline-flex w-11 h-6 rounded-full transition-colors duration-300"
        style={{ backgroundColor: active ? '#1B5A3A' : '#D1C9BC' }}
      >
        {/* Thumb */}
        <motion.span
          layout
          animate={{ x: active ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 rounded-full shadow"
          style={{ backgroundColor: active ? '#B89A63' : '#fff' }}
        />
      </span>
      <span
        className="font-['Inter'] text-sm font-medium transition-colors duration-200"
        style={{ color: active ? '#1B5A3A' : '#7C967D' }}
      >
        Veg Only
      </span>
      {/* Green dot indicator */}
      <span
        className="w-3 h-3 rounded-sm border-2 inline-flex items-center justify-center"
        style={{ borderColor: '#22c55e' }}
        aria-hidden="true"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Empty State
───────────────────────────────────────────────────────────────────────────── */
function EmptyState() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="col-span-full flex flex-col items-center gap-4 py-20 text-center"
    >
      {/* Leaf SVG illustration */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="opacity-40"
      >
        <path
          d="M32 4C18 4 8 18 8 32c0 10 8 20 24 28C48 52 56 42 56 32 56 18 46 4 32 4z"
          fill="#7C967D"
        />
        <path d="M32 4 Q32 32 32 60" stroke="#123B2A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 20 Q20 28 14 36" stroke="#123B2A" strokeWidth="1" strokeLinecap="round" />
        <path d="M32 28 Q44 32 50 38" stroke="#123B2A" strokeWidth="1" strokeLinecap="round" />
      </svg>
      <p className="font-['Cormorant_Garamond'] text-2xl text-[#3A2418] font-semibold">
        No dishes found
      </p>
      <p className="font-['Inter'] text-sm text-[#7C967D]">
        Try adjusting your search or filter.
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sweep Line (gold horizontal sweep animation)
───────────────────────────────────────────────────────────────────────────── */
function SweepLine({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sweep"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0, originX: 1 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="h-[2px] bg-[#B89A63] w-full rounded-full my-2"
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MenuPage
───────────────────────────────────────────────────────────────────────────── */
export default function MenuPage() {
  /* ── document title ── */
  useMemo(() => {
    document.title = 'Menu | The Irish Green - Sector 76, Noida';
  }, []);

  /* ── state ── */
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('starters');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [isSweeping, setIsSweeping] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  /* ── category change with sweep animation ── */
  const handleCategoryChange = useCallback(
    (id: CategoryId) => {
      if (id === selectedCategory) return;
      setIsSweeping(true);
      setTimeout(() => {
        setSelectedCategory(id);
        setSearchQuery('');
        setIsSweeping(false);
      }, 200);
    },
    [selectedCategory],
  );

  /* ── filtered items (memoised) ── */
  const filteredItems = useMemo<MenuItem[]>(() => {
    let items = menuItems;

    if (selectedCategory !== 'all') {
      items = items.filter((i) => i.category === selectedCategory);
    } else {
      // featured first in 'all' view
      const featured = items.filter((i) => i.isFeatured);
      const rest = items.filter((i) => !i.isFeatured);
      items = [...featured, ...rest];
    }

    if (vegOnly) {
      items = items.filter((i) => i.isVeg);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q),
      );
    }

    return items;
  }, [selectedCategory, searchQuery, vegOnly]);

  /* ── scroll active tab into view ── */
  const scrollTabIntoView = useCallback((id: CategoryId) => {
    if (!tabsRef.current) return;
    const btn = tabsRef.current.querySelector<HTMLButtonElement>(
      `[data-catid="${id}"]`,
    );
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7EF' }}>
      {/* ── Back to Home ── */}
      <div className="absolute top-[72px] left-4 z-30 sm:top-[80px] sm:left-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-['Inter'] text-xs font-medium
                     text-[#FAF7EF] hover:text-[#B89A63] transition-colors duration-200
                     drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
          aria-label="Back to The Irish Green homepage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to The Irish Green
        </Link>
      </div>

      {/* ════════════════════════════════════════════════
          Page Header
      ════════════════════════════════════════════════ */}
      <header
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: '40vh', minHeight: '260px' }}
        aria-label="Menu page header"
      >
        {/* Background image */}
        <img
          src={HEADER_IMAGE}
          alt="The Irish Green restaurant ambience"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 text-center px-4"
        >
          <h1
            className="font-['Cormorant_Garamond'] font-semibold text-[#F3EBDD] tracking-[0.25em] uppercase"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
          >
            The Menu
          </h1>
          <p className="mt-3 font-['Cormorant_Garamond'] italic text-[#D4B896] text-lg sm:text-xl tracking-wide">
            Crafted with love. Served with care.
          </p>
          {/* Gold rule */}
          <div className="mt-5 mx-auto w-16 h-[1px] bg-[#B89A63]" aria-hidden="true" />
        </motion.div>
      </header>

      {/* ════════════════════════════════════════════════
          Sticky Category Tabs
      ════════════════════════════════════════════════ */}
      <nav
        className="sticky top-[64px] z-20 shadow-md"
        style={{ backgroundColor: '#123B2A' }}
        aria-label="Menu categories"
      >
        <div
          ref={tabsRef}
          className="flex overflow-x-auto scrollbar-none scroll-smooth snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: 'touch' }}
          role="tablist"
          aria-label="Dish categories"
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                aria-controls="menu-grid"
                data-catid={cat.id}
                onClick={() => {
                  handleCategoryChange(cat.id);
                  scrollTabIntoView(cat.id);
                }}
                className={`
                  relative flex-shrink-0 snap-start px-4 py-4
                  font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.12em]
                  transition-colors duration-200 whitespace-nowrap
                  ${isActive
                    ? 'text-[#B89A63]'
                    : 'text-[#7C967D] hover:text-[#B89A63]'
                  }
                `}
              >
                <span className="mr-1.5 text-sm" aria-hidden="true">
                  {cat.icon}
                </span>
                {cat.name}
                {/* Active gold underline */}
                {isActive && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B89A63]"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ════════════════════════════════════════════════
          Controls: Search + Veg Toggle
      ════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4" aria-label="Filter controls">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* Search bar */}
          <div className="relative flex-1 w-full max-w-md mx-auto sm:mx-0">
            {/* Search icon */}
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C967D]"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes…"
              aria-label="Search dishes"
              className="w-full pl-9 pr-4 py-2.5 bg-transparent border-b-2 border-[#B89A63]
                         font-['Inter'] text-sm text-[#123B2A] placeholder-[#7C967D]
                         focus:outline-none focus:border-[#1B5A3A] transition-colors duration-200"
            />
          </div>

          {/* Veg only toggle */}
          <VegToggle active={vegOnly} onToggle={() => setVegOnly((v) => !v)} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          Sweep Line + Results Count
      ════════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SweepLine visible={isSweeping} />

        {/* Results count */}
        {!isSweeping && (
          <motion.p
            key={`${selectedCategory}-${searchQuery}-${vegOnly}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-['Inter'] text-xs text-[#7C967D] mt-1 mb-5"
          >
            {filteredItems.length === 0
              ? 'No dishes found'
              : `${filteredItems.length} dish${filteredItems.length !== 1 ? 'es' : ''}`}
            {searchQuery ? ` for "${searchQuery}"` : ''}
          </motion.p>
        )}
      </div>

      {/* ════════════════════════════════════════════════
          Menu Grid
      ════════════════════════════════════════════════ */}
      <main
        id="menu-grid"
        role="tabpanel"
        aria-label={`Menu items for ${CATEGORIES.find((c) => c.id === selectedCategory)?.name ?? selectedCategory}`}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        {/* Featured section header for 'all' category */}
        <AnimatePresence mode="wait">
          {selectedCategory === 'all' && !searchQuery && filteredItems.some((i) => i.isFeatured) && !isSweeping && (
            <motion.div
              key="featured-header"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#123B2A]">
                Featured Dishes
              </h2>
              <div className="mt-1 w-10 h-[1px] bg-[#B89A63]" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {isSweeping ? (
            /* Loading skeleton pulse */
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden bg-white border border-[#e8e1d6] animate-pulse"
                >
                  <div className="h-[200px] bg-[#e8e1d6]" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-[#e8e1d6] rounded w-3/4" />
                    <div className="h-2 bg-[#e8e1d6] rounded w-full" />
                    <div className="h-2 bg-[#e8e1d6] rounded w-5/6" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : filteredItems.length === 0 ? (
            <motion.div
              key="empty-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1"
            >
              <EmptyState />
            </motion.div>
          ) : (
            <motion.div
              key={`${selectedCategory}-${vegOnly}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    isFeaturedView={selectedCategory === 'all'}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ════════════════════════════════════════════════
          Footer note
      ════════════════════════════════════════════════ */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-center">
        <p className="font-['Cormorant_Garamond'] italic text-[#7C967D] text-sm">
          All dishes are 100% vegetarian. Prices inclusive of taxes.
        </p>
        <div className="mt-3 mx-auto w-8 h-[1px] bg-[#B89A63]" aria-hidden="true" />
      </footer>
    </div>
  );
}
