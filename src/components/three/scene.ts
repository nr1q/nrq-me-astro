import vertexShader from '@/shaders/vertex.glsl?raw';
import fragmentShader from '@/shaders/fragment.glsl?raw';

export async function initScene(canvas: HTMLCanvasElement): Promise<() => void> {
  const THREE = await import('three');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const ratio = window.innerWidth / window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 100);
  camera.position.y = 0;
  camera.position.z = 3.5;
  // camera.position.z = window.matchMedia('(width < 55em)').matches ? 1.75 : 1.5;

  const geometry = new THREE.PlaneGeometry(4 * ratio, 10 / (ratio), 64, 64);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
      uVelocity: { value: 0 },
    },
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let scrollProgress = 0;
  let scrollVelocity = 0;

  function onLenisScroll(e: Event) {
    const detail = (e as CustomEvent).detail;
    scrollProgress = detail.progress ?? 0;
    scrollVelocity = detail.velocity ?? 0;
  }

  window.addEventListener('lenis-scroll', onLenisScroll);

  let resizeTimeout: number | undefined;
  function onResize() {
    if (resizeTimeout) window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 100);
  }

  window.addEventListener('resize', onResize);

  let animationId: number;
  let startTime = performance.now();
  let didEmitReady = false;

  function animate() {
    animationId = requestAnimationFrame(animate);

    const elapsed = (performance.now() - startTime) * 0.001;

    if (!prefersReducedMotion) {
      material.uniforms.uTime.value = elapsed;
      material.uniforms.uScrollProgress.value += (scrollProgress - material.uniforms.uScrollProgress.value) * 0.01;
      material.uniforms.uVelocity.value += (scrollVelocity - material.uniforms.uVelocity.value) * 0.07;
    }

    renderer.render(scene, camera);

    if (!didEmitReady) {
      didEmitReady = true;
      (window as any).__heroCanvasReady = true;
      window.dispatchEvent(new CustomEvent('hero:canvas-ready'));
    }
  }

  animate();

  return function destroy() {
    cancelAnimationFrame(animationId);
    window.removeEventListener('lenis-scroll', onLenisScroll);
    window.removeEventListener('resize', onResize);
    if (resizeTimeout) window.clearTimeout(resizeTimeout);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
