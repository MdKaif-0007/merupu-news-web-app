import React, { useEffect, useRef, useState } from "react";

const GoogleAd = () => {
  const adRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAd = () => {
      try {
        if (window.adsbygoogle && adRef.current) {
          window.adsbygoogle.push({});
        }
      } catch (e) {
        console.error("AdSense error:", e);
        setError(e.message || "Ad failed to load");
      }
    };

    const timeout = setTimeout(loadAd, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "100%",
          height: "auto",
          minHeight: "280px",
          overflow: "hidden",
        }}
        data-ad-client="ca-pub-6358427229469529"
        data-ad-slot="1184119920"
        data-ad-format="fluid"
        data-full-width-responsive="true"
      ></ins>

      {error && (
        <div className="text-sm text-red-500 mt-2 text-center">{error}</div>
      )}
    </>
  );
};

export default GoogleAd;
