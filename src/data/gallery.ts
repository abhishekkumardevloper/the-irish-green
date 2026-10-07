export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'interior' | 'food' | 'outdoor' | 'people' | 'details';
  featured?: boolean;
  width?: number;
  height?: number;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85',
    alt: 'The Irish Green restaurant interior with warm ambient lighting',
    category: 'interior',
    featured: true,
    width: 1200,
    height: 800,
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85',
    alt: 'Elegant dining setup with candle lighting',
    category: 'interior',
    width: 800,
    height: 1200,
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
    alt: 'Signature pizza fresh from the stone oven',
    category: 'food',
    featured: true,
    width: 800,
    height: 800,
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=85',
    alt: 'Rich paneer dish with aromatic gravy',
    category: 'food',
    width: 800,
    height: 600,
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85',
    alt: 'Outdoor seating area with natural greenery',
    category: 'outdoor',
    featured: true,
    width: 1200,
    height: 800,
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=800&q=85',
    alt: 'Food styling - beautiful plating',
    category: 'food',
    width: 800,
    height: 1000,
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=85',
    alt: 'Friends celebrating at The Irish Green',
    category: 'people',
    width: 800,
    height: 600,
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=85',
    alt: 'Chocolate lava cake - signature dessert',
    category: 'food',
    featured: true,
    width: 800,
    height: 800,
  },
  {
    id: 'g9',
    src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=85',
    alt: 'Restaurant bar with warm golden lighting',
    category: 'interior',
    width: 800,
    height: 600,
  },
  {
    id: 'g10',
    src: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=85',
    alt: 'Signature mocktails and beverages',
    category: 'food',
    width: 800,
    height: 1000,
  },
  {
    id: 'g11',
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=85',
    alt: 'Beautiful restaurant exterior at dusk',
    category: 'outdoor',
    width: 1200,
    height: 800,
  },
  {
    id: 'g12',
    src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=85',
    alt: 'Cozy corner table perfect for intimate dining',
    category: 'interior',
    width: 800,
    height: 1200,
  },
  {
    id: 'g13',
    src: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=85',
    alt: 'Fresh pasta with herbs',
    category: 'food',
    width: 800,
    height: 600,
  },
  {
    id: 'g14',
    src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=85',
    alt: 'Birthday celebration arrangement',
    category: 'people',
    width: 800,
    height: 800,
  },
  {
    id: 'g15',
    src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=85',
    alt: 'Restaurant table details with elegant setting',
    category: 'details',
    width: 800,
    height: 600,
  },
  {
    id: 'g16',
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85',
    alt: 'Artisan coffee service',
    category: 'food',
    width: 800,
    height: 1000,
  },
];
