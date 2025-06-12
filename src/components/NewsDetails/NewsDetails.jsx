import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import GoogleAd from "../GoogleAd/GoogleAd";
import ScrollNewsList from "../ScrollNewsList/ScrollNewsList";
import { FaXTwitter } from "react-icons/fa6";
import {
  IoShareSocial,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoWhatsapp
} from 'react-icons/io5';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
//import { RWebShare } from "react-web-share"; // ✅ Correct


const NewsDetails = () => {
  const imageRef = useRef(null);
  const { id } = useParams();
  const location = useLocation();

  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!article);
  const [error, setError] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError("");

      try {
        if (location.state?.article && location.state.article._id === id) {
          setArticle(location.state.article);
          return;
        }

        const res = await fetch(`https://merupu-news.onrender.com/api/news/${id}`);
        if (!res.ok) throw new Error("Failed to fetch article.");
        const result = await res.json();
        if (!result || Object.keys(result).length === 0) {
          throw new Error("Article not found.");
        }
        setArticle(result);
      } catch (err) {
        setError(err.message || "Error loading article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, location.state]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-800">Loading article...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  if (!article) {
    return <p className="text-center mt-10 text-red-600">No article found.</p>;
  }

  const { title, author, publishedAt, url, videoUrl, content } = article;

  const handleImageClick = () => {
    if (imageRef.current && document.fullscreenEnabled) {
      imageRef.current.requestFullscreen().catch((err) =>
        console.error("Failed to enter fullscreen mode:", err)
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-center w-full gap-4 px-4 py-6">
        <aside className="hidden w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] lg:sticky lg:top-4 rounded md:flex justify-center">
          <GoogleAd />
        </aside>

        <main className="w-full lg:w-3/5 max-w-3xl space-y-6">
          <h1 className="text-gray-900 text-3xl font-bold">{title}</h1>
          <p className="text-gray-700 font-semibold text-sm">
            <span className='text-gray-800'>{author}</span> • {new Date(publishedAt).toLocaleString()}
          </p>

          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Share</h3>
            <div className="flex flex-wrap gap-4">
              {/* <RWebShare
                data={{
                  text: title,
                  url: currentUrl,
                  title: title,
                }}
                onClick={() => console.log("Shared successfully!")}
              >
                <div
                  className="bg-gray-100 w-10 h-10 rounded-xs flex items-center justify-center cursor-pointer text-black hover:scale-105 shadow-lg transition-transform"
                  title="Share or Copy Link"
                >
                  <IoShareSocial size={20} />
                </div>
              </RWebShare> */}

              <FacebookShareButton url={currentUrl} quote={title}>
                <div className="bg-blue-600 w-10 h-10 flex items-center justify-center text-white hover:scale-105 shadow-lg rounded-xs transition-transform">
                  <IoLogoFacebook size={20} />
                </div>
              </FacebookShareButton>

              <TwitterShareButton url={currentUrl} title={title}>
                <div className="bg-black w-10 h-10 flex items-center justify-center text-white hover:scale-105 shadow-lg rounded-xs transition-transform">
                  <FaXTwitter size={20} />
                </div>
              </TwitterShareButton>

              <WhatsappShareButton url={currentUrl} title={title} separator=" :: ">
                <div className="bg-green-500 w-10 h-10 flex items-center justify-center text-white hover:scale-105 shadow-lg rounded-xs transition-transform">
                  <IoLogoWhatsapp size={20} />
                </div>
              </WhatsappShareButton>
            </div>
          </div>

          {videoUrl ? (
            <video
              src={videoUrl}
              className="w-full h-[300px] md:h-[400px] object-cover rounded-md shadow"
              controls
              poster={url}
            />
          ) : (
            url && (
              <img
                ref={imageRef}
                src={url}
                alt={title}
                onClick={handleImageClick}
                className="w-full h-[300px] md:h-[400px] object-cover rounded-md shadow hover:scale-102 transition duration-300 cursor-pointer"
                loading="eager"
              />
            )
          )}

          <p className="text-lg text-gray-700 leading-relaxed">{content}</p>

          <div>
            <ScrollNewsList />
          </div>
        </main>

        <aside className="hidden w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] lg:sticky lg:top-4 rounded md:flex justify-center">
          <GoogleAd />
        </aside>
      </div>
    </div>
  );
};

export default NewsDetails;





// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import GoogleAd from "../GoogleAd/GoogleAd";
// import ScrollNewsList from "../ScrollNewsList/ScrollNewsList";
// import { FaXTwitter } from "react-icons/fa6";
// import {
//   IoShareSocial,
//   IoLogoFacebook,
//   IoLogoTwitter,
//   IoLogoWhatsapp
// } from 'react-icons/io5';

// const NewsDetails = () => {
//   const imageRef = useRef(null);
//   const { id } = useParams();
//   const location = useLocation();

//   const [article, setArticle] = useState(location.state?.article || null);
//   const [loading, setLoading] = useState(!article);
//   const [error, setError] = useState("");
//   const [currentUrl, setCurrentUrl] = useState("");

//   useEffect(() => {
//     // Set current URL after component mounts (client-side)
//     setCurrentUrl(window.location.href);
//   }, []);

//   useEffect(() => {
//     const fetchArticle = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         if (location.state?.article && location.state.article._id === id) {
//           setArticle(location.state.article);
//           return;
//         }

//         const res = await fetch(`https://merupu-news.onrender.com/api/news/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch article.");
//         const result = await res.json();
//         if (!result || Object.keys(result).length === 0) {
//           throw new Error("Article not found.");
//         }
//         setArticle(result);
//       } catch (err) {
//         setError(err.message || "Error loading article.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticle();
//   }, [id, location.state]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [id]);

//   const getShareUrls = () => {
//     if (!article || !currentUrl) return {};

//     const encodedUrl = encodeURIComponent(currentUrl);
//     const title = encodeURIComponent(article.title);

//     return {
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
//       twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${title}`,
//       whatsapp: `https://wa.me/?text=${title}%0A${encodedUrl}`
//     };
//   };

//   const shareUrls = getShareUrls();

//   const handleNativeShare = async () => {
//     if (!article || !currentUrl) return;

//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: article.title,
//           url: currentUrl,
//         });
//       } else {
//         // Fallback to clipboard
//         await navigator.clipboard.writeText(currentUrl);
//         alert("Link copied to clipboard!");
//       }
//     } catch (err) {
//       console.log("Error sharing:", err);
//       // Fallback to clipboard if sharing fails
//       try {
//         await navigator.clipboard.writeText(currentUrl);
//         alert("Link copied to clipboard!");
//       } catch (clipboardErr) {
//         console.log("Clipboard access failed:", clipboardErr);
//         alert("Sharing failed. Please copy the URL manually.");
//       }
//     }
//   };

//   if (loading) {
//     return <p className="text-center mt-10 text-gray-800">Loading article...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-10 text-red-600">{error}</p>;
//   }

//   if (!article) {
//     return <p className="text-center mt-10 text-red-600">No article found.</p>;
//   }

//   const { title, author, publishedAt, url, videoUrl, content } = article;

//   const handleImageClick = () => {
//     if (imageRef.current && document.fullscreenEnabled) {
//       imageRef.current.requestFullscreen().catch((err) =>
//         console.error("Failed to enter fullscreen mode:", err)
//       );
//     }
//   };

//   return (
//     <div>
//       <Helmet>
//         <title>{title}</title>
//         {/* Open Graph tags for social media sharing */}
//         <meta property="og:title" content={title} />
//         {/* <meta property="og:image" content={url || ''} /> */}
//         <meta property="og:image" content={url || "https://news.merupulu.com/default-og-image.jpg"} />
//         <meta property="og:url" content={currentUrl} />
//         <meta property="og:type" content="article" />
//         <meta property="og:site_name" content="Merupu News" />
        
//         {/* Twitter Card tags */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={title} />
//         <meta name="twitter:image" content={url || ''} />
//         <meta name="twitter:site" content="@MerupuNews" />
        
//         {/* Additional meta tags for better sharing */}
//         <meta property="article:author" content={author} />
//         <meta property="article:published_time" content={publishedAt} />
        
//         {/* Ensure image is accessible */}
//         <link rel="preload" as="image" href={url} />
//       </Helmet>

//       <div className="flex flex-col lg:flex-row justify-center w-full gap-4 px-4 py-6">
//         <aside className="hidden w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] lg:sticky lg:top-4 rounded md:flex justify-center">
//           <GoogleAd />
//         </aside>

//         <main className="w-full lg:w-3/5 max-w-3xl space-y-6">
//           <h1 className="text-gray-900 text-3xl font-bold">{title}</h1>
//           <p className="text-gray-700 font-semibold text-sm">
//             <span className='text-gray-800'>{author}</span> • {new Date(publishedAt).toLocaleString()}
//           </p>

//           <div className="mb-12">
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">Share</h3>
//             <div className="flex flex-wrap gap-4">
//               <div
//                 onClick={handleNativeShare}
//                 className="bg-gray-100 w-10 h-10 rounded-xs flex items-center justify-center cursor-pointer text-black hover:scale-105 shadow-lg transition-transform"
//                 title="Share or Copy Link"
//               >
//                 <IoShareSocial size={20} />
//               </div>

//               <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
//                 <div className="bg-blue-600 w-10 h-10 flex items-center justify-center text-white hover:scale-105 shadow-lg rounded-xs transition-transform">
//                   <IoLogoFacebook size={20} />
//                 </div>
//               </a>

//               <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
//                 <div className="bg-black w-10 h-10 flex items-center justify-center text-white hover:scale-105 shadow-lg rounded-xs transition-transform">
//                   <FaXTwitter size={20} />
//                 </div>
//               </a>

//               <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp">
//                 <div className="bg-green-500 w-10 h-10 flex items-center justify-center text-white hover:scale-105 shadow-lg rounded-xs transition-transform">
//                   <IoLogoWhatsapp size={20} />
//                 </div>
//               </a>
//             </div>
//           </div>

//           {videoUrl ? (
//             <video
//               src={videoUrl}
//               className="w-full h-[300px] md:h-[400px] object-cover rounded-md shadow"
//               controls
//               poster={url} // Use article image as video poster
//             />
//           ) : (
//             url && (
//               <img
//                 ref={imageRef}
//                 src={url}
//                 alt={title}
//                 onClick={handleImageClick}
//                 className="w-full h-[300px] md:h-[400px] object-cover rounded-md shadow hover:scale-102 transition duration-300 cursor-pointer"
//                 loading="eager" // Load image immediately for sharing
//                 // crossOrigin="anonymous" // Help with CORS issues
//               />
//             )
//           )}

//           <p className="text-lg text-gray-700 leading-relaxed">{content}</p>

//           <div>
//             <ScrollNewsList />
//           </div>
//         </main>

//         <aside className="hidden w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] lg:sticky lg:top-4 rounded md:flex justify-center">
//           <GoogleAd />
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default NewsDetails;









// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import GoogleAd from "../GoogleAd/GoogleAd";
// import ScrollNewsList from "../ScrollNewsList/ScrollNewsList";
// import { FaXTwitter } from "react-icons/fa6";
// import { 
//   IoShareSocial, 
//   IoLogoFacebook, 
//   IoLogoTwitter, 
//   IoLogoWhatsapp, 
//   IoLogoInstagram, 
//   IoLogoLinkedin 
// } from 'react-icons/io5';
// import { MdKeyboardArrowRight } from "react-icons/md";

// const NewsDetails = () => {
//     const imageRef = useRef(null);
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [article, setArticle] = useState(location.state?.article || null);
//   const [loading, setLoading] = useState(!article);
//   const [error, setError] = useState("");


//   useEffect(() => {
//     const fetchArticle = async () => {
//       setLoading(true);
//       setError("");
//       setArticle(null);

//       try {
//         if (location.state?.article && location.state.article._id === id) {
//           setArticle(location.state.article);
//           return;
//         }

//         const res = await fetch(`https://merupu-news.onrender.com/api/news/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch article.");
//         const result = await res.json();
//         if (!result || Object.keys(result).length === 0) {
//           throw new Error("Article not found.");
//         }
//         setArticle(result);
//       } catch (err) {
//         setError(err.message || "Error loading article.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticle();
//   }, [id, location.state]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [id]);


//   const getShareUrls = () => {
//   if (!article) return {};

//   const currentUrl = encodeURIComponent(window.location.href);
//   const title = encodeURIComponent(article.title);
//   const description = encodeURIComponent(
//     (article.content?.substring(0, 150) || "") + "..."
//   );
//   const imageUrl = encodeURIComponent(article.url || "");

//   return {
//     facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${title}%0A${description}%0A${imageUrl}`,
//     twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}%0A${imageUrl}`,
//     whatsapp: `https://wa.me/?text=${title}%0A${description}%0A${currentUrl}%0A${imageUrl}`,
    
//   };
// };

// const shareUrls = getShareUrls();



//   const handleNativeShare = async () => {
//   if (!article) return;

//   const currentUrl = window.location.href;
//   const imageUrl = article.url;

//   try {
//     if (navigator.canShare && navigator.canShare({ files: [] }) && imageUrl) {
//       const response = await fetch(imageUrl);
//       const blob = await response.blob();
//       const file = new File([blob], "article-image.jpg", { type: blob.type });

//       if (navigator.canShare({ files: [file] })) {
//         await navigator.share({
//           title: article.title,
//           text: article.content?.substring(0, 150) + "...",
//           url: currentUrl,
//           files: [file],
//         });
//         return;
//       }
//     }

//     // Fallback for browsers that don't support image sharing
//     if (navigator.share) {
//       await navigator.share({
//         title: article.title,
//         text: article.content?.substring(0, 150) + "...",
//         url: currentUrl,
//       });
//     } else {
//       await navigator.clipboard.writeText(currentUrl);
//       alert("Link copied to clipboard!");
//     }
//   } catch (err) {
//     console.log("Error sharing:", err);
//     alert("Sharing failed.");
//   }
// };


  

//   if (loading) {
//     return <p className="text-center mt-10 text-gray-800">Loading article...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-10 text-red-600">{error}</p>;
//   }

//   if (!article) {
//     return <p className="text-center mt-10 text-red-600">No article found.</p>;
//   }

//   const { title, author, publishedAt, url, videoUrl, content } = article;


 

// const handleImageClick = () => {
//   if (imageRef.current) {
//     if (document.fullscreenEnabled) {
//       imageRef.current.requestFullscreen().catch((err) =>
//         console.error("Failed to enter fullscreen mode:", err)
//       );
//     }
//   }
// };


//   return (
//     <div>
//       <div className="flex flex-col lg:flex-row justify-center w-full gap-4 px-4 py-6">

//         <aside className="hidden w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] lg:sticky lg:top-4 rounded md:flex justify-center">
//           <GoogleAd />
//         </aside>

//         <main className="w-full lg:w-3/5 max-w-3xl space-y-6">
//           {/* <button
//             onClick={() => navigate("/")}
//             className="mb-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-600"
//           >
//             ← Home
//           </button> */}

//           <h1 className="text-gray-900 text-3xl font-bold">{title}</h1>
//           <p className="text-gray-700 font-semibold text-sm">
//             <span className='text-gray-800'>{author}</span> • {new Date(publishedAt).toLocaleString()}
//           </p>

//           {/* Social sharing section */}
//           <div className="mb-12">
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">Share</h3>
//             <div className="flex flex-wrap gap-4">
//               <div 
//                 onClick={handleNativeShare}
//                 className="bg-gray-100 
//                   w-10 h-10 rounded-xs flex items-center justify-center cursor-pointer text-black
//                   transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
//                 title="Share or Copy Link"
//               >
//                 <IoShareSocial size={20} />
//               </div>
//               <a
//                 href={shareUrls.facebook}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 title="Share on Facebook"
//               >
//                 <div className="bg-blue-600 
//                   w-10 h-10 rounded-xs flex items-center justify-center cursor-pointer text-white
//                   transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
//                   <IoLogoFacebook size={20} />
//                 </div>
//               </a>
              
//               <a
//                 href={shareUrls.twitter}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 title="Share on Twitter/X"
//               >
//                 <div className="bg-slate-900 
//                   w-10 h-10 rounded-xs flex items-center justify-center cursor-pointer text-white
//                   transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
//                   <FaXTwitter size={20}/>
//                 </div>
//               </a>
              
//               <a
//                 href={shareUrls.whatsapp}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 title="Share on WhatsApp"
//               >
//                 <div className="bg-green-500 
//                   w-10 h-10 rounded-xs flex items-center justify-center cursor-pointer text-white
//                   transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
//                   <IoLogoWhatsapp size={20} />
//                 </div>
//               </a>
//             </div>
//           </div>

//           {videoUrl ? (
//             <video
//               src={videoUrl}
//               className="w-full h-[300px] md:h-[400px] object-cover rounded-md shadow transform transition duration-300"
//               controls
//             />
//           ) : (
//             url && (
//               <img
//                 ref={imageRef}
//                 src={url}
//                 alt={title}
//                 onClick={handleImageClick}
//                 className="w-full h-[300px] md:h-[400px] object-cover rounded-md shadow transform transition duration-300 hover:scale-102"
//               />
//             )
//           )}

//           <p className="text-lg text-gray-700 leading-relaxed">{content}</p>

//           <div>
//             <ScrollNewsList />
//           </div>

//         </main>

//         <aside className="hidden w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] lg:sticky lg:top-4 rounded md:flex justify-center">
//           <GoogleAd />
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default NewsDetails;






// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import GoogleAd from "../GoogleAd/GoogleAd";
// import ScrollNewsList from "../ScrollNewsList/ScrollNewsList";
// import { FaXTwitter } from "react-icons/fa6";
//  import { 
//   IoShareSocial, 
//   IoLogoFacebook, 
//   IoLogoTwitter, 
//   IoLogoWhatsapp, 
//   IoLogoInstagram, 
//   IoLogoLinkedin 
// } from 'react-icons/io5';


// const NewsDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [article, setArticle] = useState(location.state?.article || null);
//   const [loading, setLoading] = useState(!article);
//   const [error, setError] = useState("");

//   useEffect(() => {
//   const fetchArticle = async () => {
//     setLoading(true);
//     setError("");
//     setArticle(null); // Clear previous article before loading new one

//     try {
//       // If article was passed through state, use it directly
//       if (location.state?.article && location.state.article._id === id) {
//         setArticle(location.state.article);
//         return;
//       }

//       // Otherwise fetch by ID
//       const res = await fetch(`https://merupu-news.onrender.com/api/news/${id}`);
//       if (!res.ok) throw new Error("Failed to fetch article.");
//       const result = await res.json();
//       if (!result || Object.keys(result).length === 0) {
//         throw new Error("Article not found.");
//       }
//       setArticle(result);
//     } catch (err) {
//       setError(err.message || "Error loading article.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchArticle();
// }, [id, location.state]);


// useEffect(() => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// }, [id]);


//   // These are now safe to keep AFTER hooks
//   if (loading) {
//     return <p className="text-center mt-10 text-gray-800">Loading article...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-10 text-red-600">{error}</p>;
//   }

//   if (!article) {
//     return <p className="text-center mt-10 text-red-600">No article found.</p>;
//   }

//   const { title, author, publishedAt, url, videoUrl, content } = article;

//   return (
//     <div>
//       <div className="flex flex-col lg:flex-row justify-center w-full gap-4 px-4 py-6">

//         <aside className="w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] lg:sticky lg:top-4 rounded flex justify-center">
//           <GoogleAd />
//         </aside>

//         <main className="w-full lg:w-3/5 max-w-3xl space-y-6">
//           <button
//             onClick={() => navigate("/")}
//             className="mb-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-600"
//           >
//             ← Home
//           </button>

//            {/* social link */}
//         <div className="mb-12">
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">Share</h3>
//           <div className="flex flex-wrap gap-4">
//             <div className="bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 
//               w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-white
//               transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
//               <IoShareSocial size={20} />
//             </div>
            
//             <div className="bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 
//               w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-white
//               transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
//               <IoLogoFacebook size={20} />
//             </div>
            
//             <div className="bg-gradient-to-br from-slate-900 to-black hover:from-slate-800 hover:to-gray-900 
//               w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-white
//               transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
//               <FaXTwitter size={20}/>
//             </div>
            
//             <div className="bg-gradient-to-br from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 
//               w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-white
//               transform transition-all duration-300 hover:scale-105  shadow-lg hover:shadow-2xl">
//               <IoLogoWhatsapp size={20} />
//             </div>
            
         
//           </div>
//         </div>

//           <h1 className="text-gray-900 text-3xl font-bold">{title}</h1>
//           <p className="text-gray-700 font-semibold text-sm">
//              <span className='text-gray-800'>{author}</span> • {new Date(publishedAt).toLocaleString()}
//           </p>

//           {videoUrl ? (
//             <video
//               src={videoUrl}
//               className="w-full h-[300px] md:h-[400px] object-cover rounded-md shadow transform transition duration-300"
//               controls
//             />
//           ) : (
//             url && (
//               <img
//                 src={url}
//                 alt={title}
//                 className="w-full h-[300px] md:h-[400px] object-cover rounded-md shadow transform transition duration-300 hover:scale-102"
//               />
//             )
//           )}

//           <p className="text-lg text-gray-700 leading-relaxed">{content}</p>


//         <div>
//           <ScrollNewsList />
//         </div>

//         </main>

//         <aside className="w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] lg:sticky lg:top-4 rounded flex justify-center">
//           <GoogleAd />
//         </aside>
//       </div>

     
//     </div>
//   );
// };

// export default NewsDetails;


   {/* <div className="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 hover:from-pink-400 hover:via-red-400 hover:to-yellow-400 
              w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer text-white
              transform transition-all duration-300 hover:scale-110  shadow-lg hover:shadow-2xl">
              <IoLogoInstagram size={20} />
            </div>
            
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 
             w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer text-white
              transform transition-all duration-300 hover:scale-110  shadow-lg hover:shadow-2xl">
              <IoLogoLinkedin size={20} />
            </div> */}


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const NewsDetail = () => {
//   const { id } = useParams(); // Get article ID from URL

//   const navigate = useNavigate();

//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         const res = await fetch(`/api/news/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch article.");
//         const result = await res.json();
//         setArticle(result);
//       } catch (err) {
//         setError(err.message || "Error loading article.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticle();
//   }, [id]);

//   if (loading) {
//     return <p className="text-center mt-10 text-gray-500">Loading article...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-10 text-red-600">{error}</p>;
//   }

//   if (!article) {
//     return <p className="text-center mt-10 text-red-600">No article found.</p>;
//   }

//   const { title, author, publishedAt, url, content } = article;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         ← Back
//       </button>

//       <h1 className="text-3xl font-bold">{title}</h1>
//       <p className="text-gray-500 text-sm">
//         {author} • {new Date(publishedAt).toLocaleString()}
//       </p>

//       {url && (
//         <img
//           src={url}
//           alt="News"
//           className="w-full h-[400px] object-cover rounded-md shadow"
//         />
//       )}

//       <p className="text-lg text-gray-700 leading-relaxed">{content}</p>
//     </div>
//   );
// };

// export default NewsDetail;
