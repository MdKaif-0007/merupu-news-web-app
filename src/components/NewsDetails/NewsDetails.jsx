import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import GoogleAd from "../GoogleAd/GoogleAd";
import ScrollNewsList from "../ScrollNewsList/ScrollNewsList";

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!article);
  const [error, setError] = useState("");

  // ✅ Safe to call useEffect early
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);

  // useEffect(() => {
  //   if (article) return;

  //   const fetchArticle = async () => {
  //     setLoading(true);
  //     setError("");

  //     try {
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
  // }, [article, id]);


  useEffect(() => {
  const fetchArticle = async () => {
    setLoading(true);
    setError("");
    setArticle(null); // Clear previous article before loading new one

    try {
      // If article was passed through state, use it directly
      if (location.state?.article && location.state.article._id === id) {
        setArticle(location.state.article);
        return;
      }

      // Otherwise fetch by ID
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




  // ✅ These are now safe to keep AFTER hooks
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
          {/* <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-[#b6261b]"
          >
            ← Back
          </button> */}

          <h1 className="text-gray-900 text-3xl font-bold">{title}</h1>
          <p className="text-gray-800 text-sm">
            {author} • {new Date(publishedAt).toLocaleString()}
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
        </main>

        <aside className="w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] lg:sticky lg:top-4 rounded flex justify-center">
          <GoogleAd />
        </aside>
      </div>

      <div>
        <ScrollNewsList />
      </div>
    </div>
  );
};

export default NewsDetails;


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
