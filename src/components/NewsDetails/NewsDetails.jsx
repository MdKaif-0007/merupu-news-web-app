import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import GoogleAd from "../GoogleAd/GoogleAd";
import ScrollNewsList from "../ScrollNewsList/ScrollNewsList";
import { FaXTwitter } from "react-icons/fa6";
import { 
  IoShareSocial, 
  IoLogoFacebook, 
  IoLogoTwitter, 
  IoLogoWhatsapp, 
  IoLogoInstagram, 
  IoLogoLinkedin 
} from 'react-icons/io5';

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!article);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError("");
      setArticle(null);

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

  // Generate share URLs
  const getShareUrls = () => {
    if (!article) return {};

    const currentUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    const description = encodeURIComponent(article.content?.substring(0, 150) + '...' || '');
    
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${title}`,
      twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}&via=YourNewsHandle`,
      whatsapp: `https://wa.me/?text=${title}%20${currentUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}&title=${title}&summary=${description}`
    };
  };

  // Handle native share and clipboard copy
  const handleNativeShare = () => {
    if (!article) return;
    
    const currentUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content?.substring(0, 150) + '...',
        url: currentUrl
      }).catch(err => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(currentUrl).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  };

  // const handleInstagramShare = () => {
  //   navigator.clipboard.writeText(window.location.href).then(() => {
  //     alert('Link copied! You can now paste it in your Instagram story or bio.');
  //   });
  // };

  const shareUrls = getShareUrls();

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

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-center w-full gap-4 px-4 py-6">

        <aside className="w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] lg:sticky lg:top-4 rounded flex justify-center">
          <GoogleAd />
        </aside>

        <main className="w-full lg:w-3/5 max-w-3xl space-y-6">
          <button
            onClick={() => navigate("/")}
            className="mb-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-600"
          >
            ← Home
          </button>

          {/* Social sharing section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Share</h3>
            <div className="flex flex-wrap gap-4">
              <div 
                onClick={handleNativeShare}
                className="bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 
                  w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-white
                  transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
                title="Share or Copy Link"
              >
                <IoShareSocial size={20} />
              </div>
              
              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on Facebook"
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 
                  w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-white
                  transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
                  <IoLogoFacebook size={20} />
                </div>
              </a>
              
              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on Twitter/X"
              >
                <div className="bg-gradient-to-br from-slate-900 to-black hover:from-slate-800 hover:to-gray-900 
                  w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-white
                  transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
                  <FaXTwitter size={20}/>
                </div>
              </a>
              
              <a
                href={shareUrls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on WhatsApp"
              >
                <div className="bg-gradient-to-br from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 
                  w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-white
                  transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
                  <IoLogoWhatsapp size={20} />
                </div>
              </a>

              <a
                href={shareUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
              >
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 
                  w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-white
                  transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
                  <IoLogoLinkedin size={20} />
                </div>
              </a>
{/* 
              <div 
                onClick={handleInstagramShare}
                className="bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 
                  w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-white
                  transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
                title="Copy link for Instagram"
              >
                <IoLogoInstagram size={20} />
              </div> */}
            </div>
          </div>

          <h1 className="text-gray-900 text-3xl font-bold">{title}</h1>
          <p className="text-gray-700 font-semibold text-sm">
            <span className='text-gray-800'>{author}</span> • {new Date(publishedAt).toLocaleString()}
          </p>

          {videoUrl ? (
            <video
              src={videoUrl}
              className="w-full h-[300px] md:h-[400px] object-cover rounded-md shadow transform transition duration-300"
              controls
            />
          ) : (
            url && (
              <img
                src={url}
                alt={title}
                className="w-full h-[300px] md:h-[400px] object-cover rounded-md shadow transform transition duration-300 hover:scale-102"
              />
            )
          )}

          <p className="text-lg text-gray-700 leading-relaxed">{content}</p>

          <div>
            <ScrollNewsList />
          </div>

        </main>

        <aside className="w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] lg:sticky lg:top-4 rounded flex justify-center">
          <GoogleAd />
        </aside>
      </div>
    </div>
  );
};

export default NewsDetails;











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
