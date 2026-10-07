import { useState, useEffect } from 'react';

const STORAGE_KEY = 'irish-intro-seen';

let _hasSeenIntro = false;
let _listeners: Array<() => void> = [];

// Initialize from sessionStorage
try {
  _hasSeenIntro = sessionStorage.getItem(STORAGE_KEY) === 'true';
} catch {
  _hasSeenIntro = false;
}

function notifyListeners() {
  _listeners.forEach(fn => fn());
}

export function markIntroSeen() {
  _hasSeenIntro = true;
  try { sessionStorage.setItem(STORAGE_KEY, 'true'); } catch {}
  notifyListeners();
}

export function resetIntro() {
  _hasSeenIntro = false;
  try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
  notifyListeners();
}

export function useIntroStore() {
  const [hasSeenIntro, setHasSeenIntro] = useState(_hasSeenIntro);

  useEffect(() => {
    const listener = () => setHasSeenIntro(_hasSeenIntro);
    _listeners.push(listener);
    return () => {
      _listeners = _listeners.filter(l => l !== listener);
    };
  }, []);

  return {
    hasSeenIntro,
    markIntroSeen,
    resetIntro,
  };
}
