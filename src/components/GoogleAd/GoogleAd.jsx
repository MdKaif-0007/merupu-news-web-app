import React, { useEffect, useRef, useState } from 'react'

const GoogleAd = () => {

     const adRef = useRef(null);
     const [error, setError] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        if (window.adsbygoogle && adRef.current) {
          window.adsbygoogle.push({});
        }
      } catch (e) {
        console.error('AdSense error:', e);
        setError(e.message || 'Ad failed to load');
      }
    }, 500); // Delay to ensure visibility

    return () => clearTimeout(timeout);
  }, []);




  return (
       <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block", width: "100%" }}
      data-ad-client="ca-pub-0000000000000000"
      data-ad-slot="0000000000"                  
      data-ad-format="auto"
      data-full-width-responsive="true"
     >
     </ins>
  )
}

export default GoogleAd


//      useEffect(() => {
//     try {
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     } catch (e) {
//       console.error("AdSense error", e);
//     }
//   }, []);


//     const adRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new ResizeObserver(([entry]) => {
//       const width = entry.contentRect.width;
//       if (width > 0) {
//         setIsVisible(true);
//       }
//     });

//     if (adRef.current) {
//       observer.observe(adRef.current);
//     }

//     return () => {
//       if (adRef.current) observer.unobserve(adRef.current);
//     };
//   }, []);

//   useEffect(() => {
//     if (isVisible && adRef.current) {
//       try {
//         (window.adsbygoogle = window.adsbygoogle || []).push({});
//       } catch (e) {
//         console.error("AdSense error", e);
//       }
//     }
//   }, [isVisible]);
