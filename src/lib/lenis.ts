import Lenis from 'lenis';

let lenis: Lenis | null = null;

export function initLenis(): Lenis {
  if (typeof window === 'undefined') {
    throw new Error('Lenis can only be initialized in the browser');
  }

  if (lenis) return lenis;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    lerp: prefersReducedMotion ? 1 : 0.1,
  });

  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  lenis.on('scroll', (e: { progress: number; velocity: number; direction: number }) => {
    window.dispatchEvent(
      new CustomEvent('lenis-scroll', {
        detail: {
          progress: e.progress,
          velocity: e.velocity,
          direction: e.direction,
        },
      })
    );
  });

  document.documentElement.classList.add('lenis');

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function destroyLenis(): void {
  if (lenis) {
    lenis.destroy();
    lenis = null;
    document.documentElement.classList.remove('lenis');
  }
}
