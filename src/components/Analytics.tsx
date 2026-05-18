"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface AnalyticsProps {
  /** Google Analytics Measurement ID (G-XXXXXXXXXX) */
  gaId?: string;
}

/**
 * GA4 追踪组件（内部使用 useSearchParams）
 * 已在下方用 Suspense 包裹
 */
function AnalyticsInner({ gaId }: AnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId || gaId === "G-XXXXXXXXXX") return;

    if (!(window as any).gtag) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function () {
        (window as any).dataLayer.push(arguments);
      };
      (window as any).gtag("js", new Date());
      (window as any).gtag("config", gaId);
    }
  }, [gaId]);

  useEffect(() => {
    if (!gaId || gaId === "G-XXXXXXXXXX" || !(window as any).gtag) return;

    (window as any).gtag("event", "page_view", {
      page_path: pathname + (searchParams?.toString() ? `?${searchParams}` : ""),
    });
  }, [pathname, searchParams, gaId]);

  return null;
}

/**
 * GA4 追踪组件（Suspense 包裹，兼容静态导出）
 */
export default function Analytics(props: AnalyticsProps) {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner {...props} />
    </Suspense>
  );
}
