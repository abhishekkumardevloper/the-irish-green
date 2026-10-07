import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import MobileFloatBar from './components/MobileFloatBar';
import PageTransition from './components/PageTransition';
import IntroAnimation from './sections/IntroAnimation';
import LeafMoment from './components/LeafMoment';
import { useIntroStore } from './hooks/useIntroStore';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const { hasSeenIntro } = useIntroStore();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => { lenis.raf(time * 1000); });
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <LeafMoment />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              {!hasSeenIntro && <IntroAnimation />}
              <HomePage />
            </PageTransition>
          } />
          <Route path="/menu" element={
            <PageTransition>
              <MenuPage />
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>

      <MobileFloatBar />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
