import { useEffect, useRef, useState } from 'react';

type Dir = 'up' | 'down';

export function useScrollDirection(): Dir {
  const [dir, setDir] = useState<Dir>('up');
  const dirRef = useRef<Dir>('up');
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const START_AT = 64; // buffer near top (px)
    const TOL = 8; // jitter tolerance (px)
    const REVEAL_VEL = 0.05; // (~50 px/s)
    const HIDE_VEL = 0.05; // (~50 px/s)

    let lastY = window.scrollY;
    let lastT = performance.now();

    const tick = () => {
      raf.current = null;
      const now = performance.now();
      const y = window.scrollY;
      const dy = y - lastY;
      const dt = Math.max(1, now - lastT); // ms
      const v = Math.abs(dy) / dt; // px/ms

      lastY = y;
      lastT = now;

      // keep visible near the top
      if (y <= START_AT) {
        if (dirRef.current !== 'up') {
          dirRef.current = 'up';
          setDir('up');
        }
        return;
      }

      if (Math.abs(dy) < TOL) return;

      // block slow reveals
      if (dy < 0 && v < REVEAL_VEL) return;
      // block slow hides
      if (dy > 0 && v < HIDE_VEL) return;

      const next: Dir = dy > 0 ? 'down' : 'up';
      if (next !== dirRef.current) {
        dirRef.current = next;
        setDir(next);
      }
    };

    const onScroll = () => {
      if (raf.current != null) return;
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return dir;
}
