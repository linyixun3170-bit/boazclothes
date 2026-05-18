"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Lenis 平滑滚动组件
 * 给页面整体滚动添加阻尼感
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // 同步 ScrollTrigger 与 Lenis
    // GSAP ScrollTrigger plugin does not automatically sync
    // We handle this by calling lenis directly

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
