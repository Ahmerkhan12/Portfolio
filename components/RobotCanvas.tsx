"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface RobotCanvasProps {
  onLoad?: () => void;
  isVisible?: boolean;
}

export default function RobotCanvas({ onLoad, isVisible = true }: RobotCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const isVisibleRef = useRef(isVisible);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 7.2);

    // 2. WebGL Renderer with Optimal Settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. Cyberpunk Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Purple Key Light (from left)
    const purpleLight = new THREE.DirectionalLight(0xa855f7, 3.5);
    purpleLight.position.set(-5, 3, 5);
    scene.add(purpleLight);

    // Cyan Rim Light (from right)
    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
    cyanLight.position.set(5, 2, 4);
    scene.add(cyanLight);

    // Top White Specular Spot
    const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
    topLight.position.set(0, 6, 2);
    scene.add(topLight);

    // Soft Bottom Bounce
    const bottomLight = new THREE.PointLight(0xa855f7, 2.0, 10);
    bottomLight.position.set(0, -3, 2);
    scene.add(bottomLight);

    // 4. Model Loading
    let robotGroup: THREE.Group | null = null;
    const loader = new GLTFLoader();

    loader.load(
      "/cyber_robot.glb",
      (gltf) => {
        robotGroup = gltf.scene;

        // Auto-center and normalize size
        const box = new THREE.Box3().setFromObject(robotGroup);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        robotGroup.position.x = -center.x;
        robotGroup.position.y = -center.y - 0.2;
        robotGroup.position.z = -center.z;

        // Scale to fit nicely in viewport
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.6 / maxDim;
        robotGroup.scale.set(scale, scale, scale);

        // Enhance materials
        robotGroup.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = false;
            mesh.receiveShadow = false;

            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat) {
              if (mat.name.includes("Neon") || mat.name.includes("Glow") || mat.name.includes("Core") || mat.name.includes("Eye")) {
                mat.emissiveIntensity = 2.5;
              }
            }
          }
        });

        // Add to a pivot group for smooth rotation
        const pivot = new THREE.Group();
        pivot.add(robotGroup);
        scene.add(pivot);

        setLoading(false);
        onLoad?.();
      },
      undefined,
      (err) => {
        console.warn("Error loading cyber_robot.glb:", err);
        setLoading(false);
        onLoad?.();
      }
    );

    // 5. Mouse Interaction Tracking
    let targetRotationY = 0;
    let targetRotationX = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = -(e.clientY / innerHeight) * 2 + 1;

      targetRotationY = x * 0.45;
      targetRotationX = -y * 0.25;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 6. Smooth Animation Loop (Halts completely when invisible)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth interpolation (lerp) toward target mouse position
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;

      if (robotGroup) {
        // Floating levitation oscillation
        robotGroup.position.y = -0.2 + Math.sin(elapsed * 1.8) * 0.08;

        // Apply mouse-driven rotation + subtle breathing sway
        robotGroup.rotation.y = currentRotationY + Math.sin(elapsed * 0.8) * 0.04;
        robotGroup.rotation.x = currentRotationX + Math.cos(elapsed * 1.2) * 0.02;
        robotGroup.rotation.z = -currentRotationY * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    window.addEventListener("resize", handleResize);

    // 8. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onLoad]);

  return (
    <div className="w-full h-full relative contain-render">
      <div
        ref={mountRef}
        className={`w-full h-full transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        } ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{
          visibility: isVisible ? "visible" : "hidden",
        }}
      />
    </div>
  );
}
