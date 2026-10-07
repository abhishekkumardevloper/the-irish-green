export interface Review {
  id: string;
  author: string;
  initials: string;
  rating: number;
  review: string;
  date: string;
  source: 'Google' | 'Zomato' | 'Direct';
}

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Priya S.',
    initials: 'PS',
    rating: 5,
    review: 'Absolutely loved the ambiance! The greenery, the warm lighting — it felt like stepping into a different world. Dal Irish Green is a must try. Will definitely come back!',
    date: 'October 2024',
    source: 'Google',
  },
  {
    id: 'r2',
    author: 'Rahul M.',
    initials: 'RM',
    rating: 5,
    review: 'Celebrated our anniversary here and it was perfect. The staff was incredibly warm, the food was outstanding, and the place looked absolutely gorgeous. The chocolate lava cake — wow!',
    date: 'September 2024',
    source: 'Google',
  },
  {
    id: 'r3',
    author: 'Sneha K.',
    initials: 'SK',
    rating: 5,
    review: 'Best restaurant in Sector 76 without a doubt. The paneer tikka was smoky and delicious, and the Irish Breeze mocktail is something I think about every day. The outdoor seating is beautiful.',
    date: 'August 2024',
    source: 'Zomato',
  },
  {
    id: 'r4',
    author: 'Arjun V.',
    initials: 'AV',
    rating: 5,
    review: 'Took my family here for a Sunday lunch and everyone was impressed. The pizza is incredible, kids loved the shakes, and the parents loved the North Indian food. A place for everyone.',
    date: 'October 2024',
    source: 'Google',
  },
  {
    id: 'r5',
    author: 'Meera T.',
    initials: 'MT',
    rating: 5,
    review: 'The vibes here are unmatched in Noida. Its the kind of place that makes you want to stay for hours. Food quality is consistently excellent. The Irish Green Signature drink is amazing.',
    date: 'September 2024',
    source: 'Google',
  },
  {
    id: 'r6',
    author: 'Karan B.',
    initials: 'KB',
    rating: 5,
    review: 'Came for a corporate dinner and was thoroughly impressed. Private dining was well arranged, service was prompt, and the food was exceptional. Perfect for professional gatherings.',
    date: 'July 2024',
    source: 'Google',
  },
  {
    id: 'r7',
    author: 'Ananya R.',
    initials: 'AR',
    rating: 5,
    review: 'Every dish we tried was a 10/10. The interiors are so photogenic — we ended up with a hundred photos! The Irish Mezze Platter is an absolute must before your mains.',
    date: 'August 2024',
    source: 'Zomato',
  },
];
