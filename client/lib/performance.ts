// Performance monitoring for Core Web Vitals
export function initPerformanceMonitoring() {
  // Only run in production and in browser
  if (typeof window === "undefined" || process.env.NODE_ENV !== "production") {
    return;
  }

  // Largest Contentful Paint (LCP)
  const observeLCP = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      // Track LCP to analytics
      if (window.gtag) {
        window.gtag("event", "lcp", {
          value: Math.round(lastEntry.startTime),
          custom_parameter: "core_web_vitals",
        });
      }
    });

    observer.observe({ type: "largest-contentful-paint", buffered: true });
  };

  // First Input Delay (FID)
  const observeFID = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (window.gtag) {
          window.gtag("event", "fid", {
            value: Math.round(entry.processingStart - entry.startTime),
            custom_parameter: "core_web_vitals",
          });
        }
      });
    });

    observer.observe({ type: "first-input", buffered: true });
  };

  // Cumulative Layout Shift (CLS)
  const observeCLS = () => {
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      for (const entry of entries) {
        if (!(entry as any).hadRecentInput) {
          const firstSessionEntry = clsEntries[0];
          const lastSessionEntry = clsEntries[clsEntries.length - 1];

          if (
            !firstSessionEntry ||
            (entry.startTime - lastSessionEntry.startTime < 1000 &&
              entry.startTime - firstSessionEntry.startTime < 5000)
          ) {
            clsEntries.push(entry);
            clsValue += (entry as any).value;
          }
        }
      }

      // Track CLS to analytics
      if (window.gtag) {
        window.gtag("event", "cls", {
          value: Math.round(clsValue * 1000),
          custom_parameter: "core_web_vitals",
        });
      }
    });

    observer.observe({ type: "layout-shift", buffered: true });
  };

  // Initialize observers
  try {
    observeLCP();
    observeFID();
    observeCLS();
  } catch (error) {
    console.warn("Performance monitoring not supported:", error);
  }
}

// Track page navigation for SPA
export function trackPageView(url: string, title: string) {
  if (window.gtag) {
    window.gtag("config", "GA_MEASUREMENT_ID", {
      page_title: title,
      page_location: url,
    });
  }
}

// Add global type declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
