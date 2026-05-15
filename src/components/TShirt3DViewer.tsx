"use client";

import { useRef, useEffect, useState } from "react";
import type * as ThreeType from "three";

export default function TShirt3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const colorUpdaterRef = useRef<((c: string) => void) | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let cleanup: (() => void) | undefined;

    async function initThree() {
      try {
        const THREE = await import("three");
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
        type Three = typeof THREE;

        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight || 500;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf5f0e8);

        // Camera
        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
        camera.position.set(3, 2, 5);
        camera.lookAt(0, 0, 0);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.5;
        controls.minDistance = 3;
        controls.maxDistance = 10;
        controls.target.set(0, 0.5, 0);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(5, 8, 5);
        dirLight.castShadow = true;
        scene.add(dirLight);

        const fillLight = new THREE.DirectionalLight(0xffeedd, 0.4);
        fillLight.position.set(-3, 1, 3);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
        rimLight.position.set(0, -2, -4);
        scene.add(rimLight);

        // Ground shadow plane
        const groundGeo = new THREE.PlaneGeometry(6, 6);
        const groundMat = new THREE.ShadowMaterial({ opacity: 0.15 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.3;
        ground.receiveShadow = true;
        scene.add(ground);

        // Create a simple T-shirt shape using BoxGeometry and custom geometry
        function createTShirt(colorHex: string) {
          const group = new THREE.Group();

          // Body (main torso)
          const bodyGeo = new THREE.BoxGeometry(1.6, 1.2, 0.6);
          const bodyMat = new THREE.MeshStandardMaterial({
            color: colorHex,
            roughness: 0.7,
            metalness: 0,
          });
          const body = new THREE.Mesh(bodyGeo, bodyMat);
          body.position.y = 0.2;
          body.castShadow = true;
          group.add(body);

          // Left sleeve
          const sleeveGeo = new THREE.BoxGeometry(0.5, 0.3, 0.5);
          const sleeveMat = new THREE.MeshStandardMaterial({
            color: colorHex,
            roughness: 0.7,
            metalness: 0,
          });
          const leftSleeve = new THREE.Mesh(sleeveGeo, sleeveMat);
          leftSleeve.position.set(-1.0, 0.3, 0);
          leftSleeve.rotation.z = 0.2;
          leftSleeve.castShadow = true;
          group.add(leftSleeve);

          // Right sleeve
          const rightSleeve = new THREE.Mesh(sleeveGeo.clone(), sleeveMat);
          rightSleeve.position.set(1.0, 0.3, 0);
          rightSleeve.rotation.z = -0.2;
          rightSleeve.castShadow = true;
          group.add(rightSleeve);

          // Collar (small rounded area)
          const collarGeo = new THREE.BoxGeometry(0.4, 0.08, 0.3);
          const collarMat = new THREE.MeshStandardMaterial({
            color: colorHex,
            roughness: 0.6,
            metalness: 0,
          });
          const collar = new THREE.Mesh(collarGeo, collarMat);
          collar.position.set(0, 0.75, 0.35);
          collar.castShadow = true;
          group.add(collar);

          return group;
        }

        const tshirtGroup = createTShirt(color);
        scene.add(tshirtGroup);

        // Animation loop
        let animationId: number;
        function animate() {
          animationId = requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        // Resize handler
        const onResize = () => {
          if (!container) return;
          const w = container.clientWidth;
          const h = container.clientHeight || 500;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        setLoaded(true);

        cleanup = () => {
          cancelAnimationFrame(animationId);
          window.removeEventListener("resize", onResize);
          controls.dispose();
          renderer.dispose();
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
          scene.clear();
        };

        // Return a way to update color
        return { updateColor: (newColor: string) => {
          tshirtGroup.children.forEach((child) => {
            if (child instanceof (THREE as any).Mesh) {
              ((child as any).material as ThreeType.MeshStandardMaterial).color.set(newColor);
            }
          });
        }};
      } catch (err) {
        console.error("3D init failed:", err);
        setError(err instanceof Error ? err.message : "Failed to load 3D viewer");
        setLoaded(true);
      }
    }

    // Store color updater ref
    initThree().then((updater) => {
      if (updater) colorUpdaterRef.current = updater.updateColor;
    });

    return () => {
      cleanup?.();
    };
  }, []); // Only init once

  // Update 3D color when React state changes
  useEffect(() => {
    if (colorUpdaterRef.current) {
      colorUpdaterRef.current(color);
    }
  }, [color]);

  const colorOptions = [
    { label: "White", value: "#ffffff" },
    { label: "Black", value: "#1a1a1a" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div
        ref={containerRef}
        className="w-full lg:w-2/3 aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-cream shadow-inner"
      >
        {!loaded && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {error && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-8">
              <p className="text-warm-gray mb-2">3D Preview Temporarily Unavailable</p>
              <p className="text-sm text-warm-gray/60">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Color picker */}
      <div className="w-full lg:w-1/3">
        <h3 className="font-heading text-xl text-dark mb-4">
          Choose Your Color
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {colorOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setColor(opt.value)}
              className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                color === opt.value
                  ? "border-gold bg-gold/10"
                  : "border-light-gray hover:border-gold/50"
              }`}
            >
              <span
                className="block w-8 h-8 rounded-full mx-auto mb-1"
                style={{ backgroundColor: opt.value }}
              />
              <span className="text-[10px] uppercase tracking-wider text-dark">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-warm-gray leading-relaxed">
          Selecta color and contact us. We&apos;ll produce your custom
          design on premium garments with your chosen color.
        </p>
      </div>
    </div>
  );
}
