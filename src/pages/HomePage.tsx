import { useEffect } from 'react';
import HeroSection from '../sections/HeroSection';
import StorySection from '../sections/StorySection';
import FoodCategorySection from '../sections/FoodCategorySection';
import SignatureDishes from '../sections/SignatureDishes';
import ExperienceSection from '../sections/ExperienceSection';
import GallerySection from '../sections/GallerySection';
import ReviewsSection from '../sections/ReviewsSection';
import ReservationSection from '../sections/ReservationSection';
import EventsSection from '../sections/EventsSection';
import LocationSection from '../sections/LocationSection';
import Footer from '../sections/Footer';

export default function HomePage() {
  useEffect(() => {
    document.title = 'The Irish Green | Restaurant in Sector 76, Noida';
  }, []);

  return (
    <main>
      <section id="home">
        <HeroSection />
      </section>
      <section id="our-story">
        <StorySection />
      </section>
      <section id="menu-preview">
        <FoodCategorySection />
      </section>
      <section id="signature">
        <SignatureDishes />
      </section>
      <section id="experience">
        <ExperienceSection />
      </section>
      <section id="gallery">
        <GallerySection />
      </section>
      <section id="reviews">
        <ReviewsSection />
      </section>
      <section id="reservation">
        <ReservationSection />
      </section>
      <section id="events">
        <EventsSection />
      </section>
      <section id="location">
        <LocationSection />
      </section>
      <Footer />
    </main>
  );
}
