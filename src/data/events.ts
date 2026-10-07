export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  features: string[];
}

export const events: Event[] = [
  {
    id: 'birthdays',
    title: 'Birthdays',
    description: 'Make every birthday unforgettable. Let us craft a celebration as special as the person.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    icon: '🎂',
    features: ['Customised décor', 'Dedicated table', 'Special cake arrangement', 'Photography-friendly setup'],
  },
  {
    id: 'anniversaries',
    title: 'Anniversaries',
    description: 'Relive your love story over a perfect dinner, set in our most romantic corner of The Irish Green.',
    image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80',
    icon: '💍',
    features: ['Intimate table setting', 'Floral arrangement', 'Candle-lit ambiance', 'Personalised menu'],
  },
  {
    id: 'family',
    title: 'Family Gatherings',
    description: 'There\'s no better place to gather the whole family than around a table full of flavour.',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80',
    icon: '👨‍👩‍👧‍👦',
    features: ['Large table bookings', 'Family menu options', 'Kids-friendly area', 'Flexible seating'],
  },
  {
    id: 'corporate',
    title: 'Corporate Dinners',
    description: 'Impress your clients and reward your team. Professional ambiance, exceptional food.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    icon: '💼',
    features: ['Private section', 'Custom menu', 'Presentation setup', 'Dedicated service'],
  },
  {
    id: 'celebrations',
    title: 'Small Celebrations',
    description: 'Promotions, achievements, reunions — every win deserves a special dinner.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
    icon: '🥂',
    features: ['Curated menu', 'Special décor', 'Group packages', 'Personalised touches'],
  },
  {
    id: 'private',
    title: 'Private Events',
    description: 'Exclusive buy-out options available. Your event, your rules, our expertise.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    icon: '✨',
    features: ['Full venue buy-out', 'Custom branding', 'Bespoke menu', 'Event coordination'],
  },
];
