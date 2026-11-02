"use client";

import { useEffect, useRef } from "react";

export default function PortraitAtmosphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;
    const timer = window.setTimeout(async () => {
      try {
        const THREE = await import("three");
        if (cancelled || motionPreference.matches) return;

        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
        } catch {
          return; // The portrait is complete without WebGL.
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
        camera.position.z = 9;
        const geometry = new THREE.TorusGeometry(2.45, 0.62, 12, 64);
        const material = new THREE.MeshBasicMaterial({ color: 0xaa96ce, wireframe: true, transparent: true, opacity: 0.15, depthWrite: false });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.set(0.7, 0.45, -0.3);
        scene.add(mesh);

        let inView = true;
        let lostContext = false;
        let targetX = 0;
        let targetY = 0;
        let lastFrame = 0;
        const draw = (time: number) => {
          if (time - lastFrame < 33) return; // Decorative work is capped at 30fps.
          lastFrame = time;
          mesh.rotation.y = 0.45 + Math.sin(time * 0.00012) * 0.12 + targetX * 0.08;
          mesh.rotation.x = 0.7 + targetY * 0.08;
          renderer.render(scene, camera);
        };
        const syncLoop = () => {
          const active = inView && !document.hidden && !motionPreference.matches && !lostContext;
          renderer.setAnimationLoop(active ? draw : null);
        };
        const resize = () => {
          const { width, height } = container.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        const pointer = (event: PointerEvent) => {
          targetX = event.clientX / window.innerWidth - 0.5;
          targetY = event.clientY / window.innerHeight - 0.5;
        };
        const contextLost = (event: Event) => {
          event.preventDefault();
          lostContext = true;
          syncLoop();
        };
        const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; syncLoop(); });
        observer.observe(container);
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        window.addEventListener("pointermove", pointer, { passive: true });
        document.addEventListener("visibilitychange", syncLoop);
        motionPreference.addEventListener("change", syncLoop);
        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        resize();
        syncLoop();

        dispose = () => {
          renderer.setAnimationLoop(null);
          observer.disconnect();
          resizeObserver.disconnect();
          window.removeEventListener("pointermove", pointer);
          document.removeEventListener("visibilitychange", syncLoop);
          motionPreference.removeEventListener("change", syncLoop);
          renderer.domElement.removeEventListener("webglcontextlost", contextLost);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        // Keep decorative graphics optional if the deferred chunk fails.
      }
    }, 900);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      dispose?.();
    };
  }, []);

  return <div className="portrait-atmosphere" ref={mountRef} aria-hidden="true" />;
}
