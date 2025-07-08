import { useEffect } from "react";

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  adStyle?: React.CSSProperties;
  className?: string;
}

export function AdSense({
  adSlot,
  adFormat = "auto",
  adStyle = { display: "block", textAlign: "center" },
  className = "",
}: AdSenseProps) {
  useEffect(() => {
    try {
      // Load AdSense script if not already loaded
      if (!window.adsbygoogle) {
        const script = document.createElement("script");
        script.async = true;
        script.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.setAttribute("data-ad-client", "ca-pub-XXXXXXXXXXXXXXX");
        document.head.appendChild(script);
      }

      // Push ad after component mounts
      setTimeout(() => {
        if (window.adsbygoogle) {
          (window.adsbygoogle as any[]).push({});
        }
      }, 100);
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Specialized component for banner ads before form
export function AdSenseBanner({ adSlot }: { adSlot: string }) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="text-center mb-2">
        <span className="text-xs text-slate-400 uppercase tracking-wide">
          Publicidade
        </span>
      </div>
      <AdSense
        adSlot={adSlot}
        adFormat="auto"
        className="min-h-[100px] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center"
        adStyle={{
          display: "block",
          textAlign: "center",
          minHeight: "100px",
        }}
      />
    </div>
  );
}

// Specialized component for content ads after results
export function AdSenseContent({ adSlot }: { adSlot: string }) {
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <div className="text-center mb-2">
        <span className="text-xs text-slate-400 uppercase tracking-wide">
          Publicidade
        </span>
      </div>
      <AdSense
        adSlot={adSlot}
        adFormat="auto"
        className="min-h-[120px] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center"
        adStyle={{
          display: "block",
          textAlign: "center",
          minHeight: "120px",
        }}
      />
    </div>
  );
}

// Mobile anchor/sticky ad component
export function AdSenseMobileAnchor({ adSlot }: { adSlot: string }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg">
      <div className="text-center py-1">
        <span className="text-xs text-slate-400 uppercase tracking-wide">
          Publicidade
        </span>
      </div>
      <AdSense
        adSlot={adSlot}
        adFormat="auto"
        className="min-h-[60px] max-h-[100px] overflow-hidden"
        adStyle={{
          display: "block",
          textAlign: "center",
          minHeight: "60px",
          maxHeight: "100px",
        }}
      />
    </div>
  );
}
