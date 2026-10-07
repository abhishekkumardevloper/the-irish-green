export interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  isFeatured?: boolean;
  isSignature?: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot';
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
}

export const menuCategories: MenuCategory[] = [
  { id: 'soups', name: 'Soups', description: 'Warm, comforting bowls', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80', icon: '🍜' },
  { id: 'salads', name: 'Salads', description: 'Fresh & vibrant greens', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', icon: '🥗' },
  { id: 'starters', name: 'Starters', description: 'The perfect beginning', image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800&q=80', icon: '🥘' },
  { id: 'tandoori', name: 'Tandoori', description: 'Clay oven specialities', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80', icon: '🔥' },
  { id: 'chinese', name: 'Chinese', description: 'Wok-tossed flavours', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80', icon: '🥢' },
  { id: 'indian-main', name: 'Indian Main Course', description: 'Rich gravies & curries', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', icon: '🍛' },
  { id: 'breads', name: 'Indian Breads', description: 'Freshly baked, clay oven', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80', icon: '🫓' },
  { id: 'rice-noodles', name: 'Rice & Noodles', description: 'Fragrant & satisfying', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80', icon: '🍚' },
  { id: 'pizza', name: 'Pizza', description: 'Stone-baked perfection', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', icon: '🍕' },
  { id: 'pasta', name: 'Pasta', description: 'Italian comfort classics', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80', icon: '🍝' },
  { id: 'continental', name: 'Continental', description: 'European inspirations', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80', icon: '🍽️' },
  { id: 'burgers', name: 'Burgers & Sandwiches', description: 'Stacked & satisfying', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', icon: '🍔' },
  { id: 'wraps', name: 'Wraps', description: 'Rolled & ready', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80', icon: '🌯' },
  { id: 'thali', name: 'Thali', description: 'Complete Indian feast', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80', icon: '🍱' },
  { id: 'coffee', name: 'Coffee', description: 'Artisanal brews', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80', icon: '☕' },
  { id: 'tea', name: 'Tea', description: 'Soothing & aromatic', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80', icon: '🍵' },
  { id: 'shakes', name: 'Shakes', description: 'Thick & indulgent', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80', icon: '🥤' },
  { id: 'smoothies', name: 'Smoothies', description: 'Fresh & wholesome', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80', icon: '🥝' },
  { id: 'mocktails', name: 'Mocktails', description: 'Crafted, vibrant sips', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80', icon: '🍹' },
  { id: 'special-drinks', name: 'Special Drinks', description: 'House signatures', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80', icon: '✨' },
  { id: 'desserts', name: 'Desserts', description: 'Sweet finales', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80', icon: '🍮' },
];

export const menuItems: MenuItem[] = [
  // Soups
  { id: 'soup-1', category: 'soups', name: 'Tomato Basil Soup', description: 'Classic roasted tomato with fresh basil and cream', price: 189, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80', isVeg: true },
  { id: 'soup-2', category: 'soups', name: 'Hot & Sour Soup', description: 'Tangy Indo-Chinese broth with vegetables', price: 179, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80', isVeg: true },
  { id: 'soup-3', category: 'soups', name: 'Sweet Corn Veg Soup', description: 'Creamy corn soup with vegetable medley', price: 169, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80', isVeg: true },

  // Salads
  { id: 'salad-1', category: 'salads', name: 'Green Garden Salad', description: 'Fresh lettuce, cucumber, cherry tomatoes with house dressing', price: 229, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', isVeg: true },
  { id: 'salad-2', category: 'salads', name: 'Caesar Salad', description: 'Romaine, croutons, parmesan, classic Caesar dressing', price: 269, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80', isVeg: true },
  { id: 'salad-3', category: 'salads', name: 'Greek Salad', description: 'Olives, feta, bell peppers, cucumber, oregano', price: 289, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80', isVeg: true },

  // Starters
  { id: 'starter-1', category: 'starters', name: 'Irish Mezze Platter', description: 'A curated selection of our finest appetisers — hummus, pita, stuffed mushrooms, paneer tikka bites', price: 549, image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&q=80', isVeg: true, isFeatured: true, isSignature: true, tags: ['Signature', 'Must Try'] },
  { id: 'starter-2', category: 'starters', name: 'Chilli Potato', description: 'Crispy fried potatoes tossed in Indo-Chinese spicy sauce', price: 249, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80', isVeg: true, isFeatured: true, tags: ['Popular'] },
  { id: 'starter-3', category: 'starters', name: 'Paneer Tikka', description: 'Marinated cottage cheese grilled in tandoor with peppers & onions', price: 349, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=600&q=80', isVeg: true, isFeatured: true, tags: ['Bestseller'] },
  { id: 'starter-4', category: 'starters', name: 'Veg Spring Rolls', description: 'Crispy rolls stuffed with seasoned vegetables', price: 219, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80', isVeg: true },
  { id: 'starter-5', category: 'starters', name: 'Stuffed Mushrooms', description: 'Button mushrooms stuffed with cheese and herbs, baked golden', price: 299, image: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&q=80', isVeg: true },

  // Tandoori
  { id: 'tandoori-1', category: 'tandoori', name: 'Tandoori Paneer Tikka', description: 'Marinated paneer in classic tandoori masala, smoky and charred', price: 369, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=600&q=80', isVeg: true, isFeatured: true },
  { id: 'tandoori-2', category: 'tandoori', name: 'Malai Soya Chaap', description: 'Tender soya chaap in creamy malai marinade', price: 329, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80', isVeg: true },
  { id: 'tandoori-3', category: 'tandoori', name: 'Tandoori Mushroom', description: 'Jumbo mushrooms marinated and grilled in tandoor', price: 299, image: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&q=80', isVeg: true },

  // Chinese
  { id: 'chinese-1', category: 'chinese', name: 'Veg Fried Rice', description: 'Wok-tossed rice with seasonal vegetables and soy', price: 249, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80', isVeg: true },
  { id: 'chinese-2', category: 'chinese', name: 'Hakka Noodles', description: 'Classic Hakka noodles with vegetables, Indo-Chinese style', price: 259, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80', isVeg: true },
  { id: 'chinese-3', category: 'chinese', name: 'Paneer Manchurian', description: 'Crispy paneer in tangy Manchurian sauce', price: 319, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', isVeg: true, isFeatured: true },
  { id: 'chinese-4', category: 'chinese', name: 'Chilli Paneer Dry', description: 'Paneer cubes tossed with bell peppers in chilli sauce', price: 329, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', isVeg: true },

  // Indian Main Course
  { id: 'indian-1', category: 'indian-main', name: 'Dal Irish Green', description: 'Our signature slow-cooked black lentils — a family recipe, rich and indulgent', price: 349, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80', isVeg: true, isFeatured: true, isSignature: true, tags: ['Signature', 'Must Try'] },
  { id: 'indian-2', category: 'indian-main', name: 'Paneer Butter Masala', description: 'Cottage cheese in rich, creamy tomato-butter gravy', price: 349, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80', isVeg: true, isFeatured: true, tags: ['Bestseller'] },
  { id: 'indian-3', category: 'indian-main', name: 'Kadai Paneer', description: 'Paneer with peppers in aromatic kadai masala', price: 349, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80', isVeg: true },
  { id: 'indian-4', category: 'indian-main', name: 'Palak Paneer', description: 'Cottage cheese in fresh spinach gravy', price: 339, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80', isVeg: true },
  { id: 'indian-5', category: 'indian-main', name: 'Shahi Paneer', description: 'Royal cottage cheese in cashew cream gravy', price: 369, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80', isVeg: true },
  { id: 'indian-6', category: 'indian-main', name: 'Veg Kofta Curry', description: 'Fried vegetable dumplings in spiced gravy', price: 329, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80', isVeg: true },

  // Breads
  { id: 'bread-1', category: 'breads', name: 'Butter Naan', description: 'Soft leavened bread with butter', price: 59, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', isVeg: true },
  { id: 'bread-2', category: 'breads', name: 'Garlic Naan', description: 'Naan topped with garlic and fresh coriander', price: 69, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', isVeg: true },
  { id: 'bread-3', category: 'breads', name: 'Lachha Paratha', description: 'Flaky layered whole wheat paratha', price: 79, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', isVeg: true },
  { id: 'bread-4', category: 'breads', name: 'Cheese Kulcha', description: 'Stuffed cheese bread from tandoor', price: 109, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', isVeg: true },

  // Rice & Noodles
  { id: 'rice-1', category: 'rice-noodles', name: 'Veg Biryani', description: 'Fragrant basmati rice with seasonal vegetables and whole spices', price: 299, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80', isVeg: true, isFeatured: true },
  { id: 'rice-2', category: 'rice-noodles', name: 'Paneer Biryani', description: 'Aromatic basmati with cottage cheese and saffron', price: 349, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80', isVeg: true },
  { id: 'rice-3', category: 'rice-noodles', name: 'Veg Pulao', description: 'Light vegetable rice with whole spices', price: 249, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80', isVeg: true },

  // Pizza
  { id: 'pizza-1', category: 'pizza', name: 'Margherita', description: 'Classic tomato sauce, mozzarella, fresh basil', price: 299, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', isVeg: true },
  { id: 'pizza-2', category: 'pizza', name: 'Paneer Tikka Pizza', description: 'Tandoori paneer, peppers, onion, tikka sauce base', price: 399, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', isVeg: true, isFeatured: true, tags: ['Popular'] },
  { id: 'pizza-3', category: 'pizza', name: 'Garden Delight Pizza', description: 'Loaded veggie pizza with mushrooms, olives, peppers', price: 349, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', isVeg: true },
  { id: 'pizza-4', category: 'pizza', name: 'Cheese Burst Pizza', description: 'Double cheese with your choice of toppings', price: 429, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', isVeg: true, isFeatured: true },

  // Pasta
  { id: 'pasta-1', category: 'pasta', name: 'Penne Arrabbiata', description: 'Penne in spicy tomato-garlic sauce with fresh herbs', price: 299, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=80', isVeg: true, isFeatured: true },
  { id: 'pasta-2', category: 'pasta', name: 'Pasta Alfredo', description: 'Fettuccine in rich, creamy parmesan sauce', price: 329, image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=600&q=80', isVeg: true },
  { id: 'pasta-3', category: 'pasta', name: 'Pasta Aglio Olio', description: 'Classic garlic-olive oil spaghetti with chilli flakes', price: 289, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=80', isVeg: true },
  { id: 'pasta-4', category: 'pasta', name: 'Pink Sauce Pasta', description: 'Creamy tomato-based pink sauce with vegetables', price: 319, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=80', isVeg: true },

  // Continental
  { id: 'continental-1', category: 'continental', name: 'Veg Steak with Grilled Veggies', description: 'Grilled cottage cheese steak with seasonal vegetables and sauce', price: 429, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', isVeg: true },
  { id: 'continental-2', category: 'continental', name: 'Mushroom Stroganoff', description: 'Creamy mushroom in rich continental style', price: 369, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80', isVeg: true },

  // Burgers
  { id: 'burger-1', category: 'burgers', name: 'Classic Veg Burger', description: 'Crispy veg patty with lettuce, tomato, cheese', price: 229, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', isVeg: true },
  { id: 'burger-2', category: 'burgers', name: 'Paneer Cheese Burger', description: 'Spiced paneer patty with melted cheese and chipotle mayo', price: 279, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', isVeg: true, isFeatured: true },
  { id: 'burger-3', category: 'burgers', name: 'Club Sandwich', description: 'Triple decker with veggies, cheese and sauces', price: 249, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80', isVeg: true },

  // Wraps
  { id: 'wrap-1', category: 'wraps', name: 'Paneer Tikka Wrap', description: 'Tandoori paneer in a toasted wrap with mint chutney', price: 249, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80', isVeg: true },
  { id: 'wrap-2', category: 'wraps', name: 'Veg Shawarma', description: 'Grilled vegetables in a pita wrap with garlic sauce', price: 229, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80', isVeg: true },

  // Thali
  { id: 'thali-1', category: 'thali', name: 'Irish Green Special Thali', description: 'Dal, 2 sabzis, raita, rice, 2 rotis, papad and dessert', price: 449, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80', isVeg: true, isSignature: true, tags: ['Value', 'Complete Meal'] },

  // Coffee
  { id: 'coffee-1', category: 'coffee', name: 'Cappuccino', description: 'Espresso with steamed milk and thick foam', price: 159, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', isVeg: true, isFeatured: true },
  { id: 'coffee-2', category: 'coffee', name: 'Cold Coffee', description: 'Chilled coffee blended with milk and ice cream', price: 189, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', isVeg: true },
  { id: 'coffee-3', category: 'coffee', name: 'Irish Coffee', description: 'Our signature coffee with a special Irish Green touch', price: 219, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', isVeg: true, isSignature: true, tags: ['Signature'] },
  { id: 'coffee-4', category: 'coffee', name: 'Caramel Latte', description: 'Smooth latte with golden caramel drizzle', price: 199, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', isVeg: true },

  // Tea
  { id: 'tea-1', category: 'tea', name: 'Masala Chai', description: 'Indian spiced tea with ginger and cardamom', price: 79, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80', isVeg: true },
  { id: 'tea-2', category: 'tea', name: 'Green Tea', description: 'Light and refreshing Japanese green tea', price: 99, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80', isVeg: true },
  { id: 'tea-3', category: 'tea', name: 'Lemon Ginger Tea', description: 'Zesty fresh ginger with lemon and honey', price: 109, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80', isVeg: true },

  // Shakes
  { id: 'shake-1', category: 'shakes', name: 'Oreo Shake', description: 'Thick oreo cookie milkshake with vanilla ice cream', price: 199, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', isVeg: true, isFeatured: true },
  { id: 'shake-2', category: 'shakes', name: 'Mango Shake', description: 'Fresh mango blended with milk and cream', price: 179, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', isVeg: true },
  { id: 'shake-3', category: 'shakes', name: 'Chocolate Fudge Shake', description: 'Rich chocolate milkshake with fudge ripple', price: 209, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', isVeg: true },

  // Smoothies
  { id: 'smoothie-1', category: 'smoothies', name: 'Green Detox Smoothie', description: 'Spinach, apple, ginger, lemon — our signature wellness blend', price: 189, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&q=80', isVeg: true, isSignature: true },
  { id: 'smoothie-2', category: 'smoothies', name: 'Berry Blast', description: 'Mixed berries, banana and yogurt', price: 199, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&q=80', isVeg: true },

  // Mocktails
  { id: 'mocktail-1', category: 'mocktails', name: 'Irish Breeze', description: 'Cucumber, mint, lime, soda — our signature mocktail', price: 179, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80', isVeg: true, isSignature: true, tags: ['Signature', 'Must Try'] },
  { id: 'mocktail-2', category: 'mocktails', name: 'Virgin Mojito', description: 'Fresh mint, lime, sugar, soda', price: 159, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80', isVeg: true, isFeatured: true },
  { id: 'mocktail-3', category: 'mocktails', name: 'Watermelon Cooler', description: 'Fresh watermelon juice with mint and lemon', price: 149, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80', isVeg: true },
  { id: 'mocktail-4', category: 'mocktails', name: 'Blue Lagoon', description: 'Lemonade with blue curacao syrup and soda', price: 169, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80', isVeg: true },

  // Special Drinks
  { id: 'special-1', category: 'special-drinks', name: 'The Irish Green Signature', description: 'A secret recipe — refreshing, unique, absolutely unforgettable', price: 229, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80', isVeg: true, isSignature: true, tags: ['Signature', 'Chef\'s Special'] },

  // Desserts
  { id: 'dessert-1', category: 'desserts', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten centre, served with vanilla ice cream', price: 249, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80', isVeg: true, isFeatured: true, isSignature: true, tags: ['Must Try'] },
  { id: 'dessert-2', category: 'desserts', name: 'Gulab Jamun', description: 'Classic rose-flavoured milk solids in sugar syrup', price: 129, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80', isVeg: true },
  { id: 'dessert-3', category: 'desserts', name: 'Tiramisu', description: 'Italian classic with espresso-soaked ladyfingers and mascarpone', price: 269, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80', isVeg: true, isFeatured: true },
  { id: 'dessert-4', category: 'desserts', name: 'Panna Cotta', description: 'Italian cream dessert with berry coulis', price: 239, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80', isVeg: true },
  { id: 'dessert-5', category: 'desserts', name: 'Brownie with Ice Cream', description: 'Warm walnut brownie with two scoops of vanilla', price: 229, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80', isVeg: true },
];

export const featuredDishes = menuItems.filter(item => item.isFeatured).slice(0, 8);
export const signatureDishes = menuItems.filter(item => item.isSignature);
