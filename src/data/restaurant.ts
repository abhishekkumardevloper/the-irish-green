export const restaurant = {
  name: 'The Irish Green',
  tagline: 'Where Good Food Meets Good Times',
  subTagline: 'Good food. Great company. Green moments.',
  address: {
    line1: 'Sector 76',
    line2: 'Noida, Uttar Pradesh',
    full: 'Sector 76, Noida, Uttar Pradesh',
    mapUrl: 'https://www.google.com/maps/search/The+Irish+Green+Sector+76+Noida',
    embedUrl: 'https://maps.google.com/maps?q=sector+76+noida&output=embed',
    lat: 28.5843,
    lng: 77.3894,
  },
  phone: '+91 93551 13111',
  phoneRaw: '+919355113111',
  whatsapp: '+919355113111',
  whatsappMessage: 'Hi The Irish Green, I would like to enquire about a table.',
  email: 'hello@theirishgreen.in',
  hours: [
    { days: 'Monday – Thursday', time: '12:00 PM – 11:00 PM' },
    { days: 'Friday – Saturday', time: '12:00 PM – 12:00 AM' },
    { days: 'Sunday', time: '11:00 AM – 11:00 PM' },
  ],
  social: {
    instagram: 'https://www.instagram.com/theirishgreen',
    facebook: 'https://www.facebook.com/theirishgreen',
    google: 'https://g.page/theirishgreen',
    zomato: 'https://www.zomato.com/noida/the-irish-green',
    swiggy: 'https://www.swiggy.com',
  },
  cuisines: ['North Indian', 'Chinese', 'Continental', 'Italian', 'Café'],
  features: [
    'Indoor Dining',
    'Outdoor Seating',
    'Private Events',
    'Family Gatherings',
    'Celebrations',
    'Cozy Ambiance',
  ],
  bookingUrl: '#reservation',
};

export type Restaurant = typeof restaurant;
