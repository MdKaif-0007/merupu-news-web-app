import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";

const NewsSection = ({ category }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    const endpoint = `https://merupu-news.onrender.com/api/news/isBreaking?page=${page}`;

    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to fetch news.");
      const result = await res.json();

      setData(result.docs || []);
      setTotalPages(result.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page, category]);

  const handleClick = (article) => {
    const url = `/api/news/${article._id}`;
    window.open(url, '_blank');
  };

  // const handleClick = (article) => {
  //   navigate(`/api/news/${article._id}`, { state: { article } });
  // };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Generate pagination numbers (like image)
  const renderPagination = () => {
    const maxVisiblePages = 7;
    let pages = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(1, page - 2);
      const end = Math.min(totalPages, page + 2);

      pages.push(1);
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) pages.push(i);
      }
      if (end < totalPages - 1) pages.push("...");
      if (totalPages !== 1) pages.push(totalPages);
    }

    return (
      <div className="flex justify-center text-black gap-2 mt-8 flex-wrap">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded bg-white text-gray-800 border-gray-300 hover:bg-gray-100  disabled:opacity-50 cursor-pointer"
        >
         <div className="flex items-center gap-1">
           <IoIosArrowRoundBack /> Prev
         </div>
        </button>
        {pages.map((p, i) => (
          <button
            key={i}
            onClick={() => typeof p === "number" && handlePageChange(p)}
            disabled={p === "..."}
            className={`px-3 py-1 border rounded cursor-pointer ${
              p === page ?  "bg-[#b6261b] text-white border-[#b6261b]"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded bg-white text-gray-800 border-gray-300 hover:bg-gray-100  disabled:opacity-50 cursor-pointer"
        >
          <div className="flex items-center gap-1">
           Next <IoIosArrowRoundForward />
         </div>
          
        </button>
      </div>
    );
  };

  useEffect(() => {
   window.scrollTo({ top: 0, behavior: "smooth" });
}, [page]);


  return (
    <div className="p-4">
      <h2 className="text-gray-900 text-xl font-bold capitalize mb-4">
        {category.replace(/-/g, " ")}
      </h2>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : loading && data.length === 0 ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : data.length === 0 ? (
        <p>No news available.</p>
      ) : (
        <div className="space-y-10">
          {data.map((item) => (
            <div
              key={item._id}
              onClick={() => handleClick(item)}
              className="flex flex-col md:flex-row items-start gap-4 cursor-pointer group"
            >
              {item.videoUrl ? (
                <div className="relative w-full md:w-1/2 h-60 rounded-md shadow overflow-hidden">
                  <video
                    src={item.videoUrl}
                    className="w-full h-full object-cover rounded-md"
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <FaPlayCircle size={60} className="text-white" />
                  </div>
                </div>
              ) : item.url ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full md:w-1/2 h-60 object-cover rounded-md shadow"
                />
              ) : null}
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#b6261b] transition">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 font-semibold mt-1">
                  <span className='text-gray-800'>{item.author}</span> • {new Date(item.publishedAt).toLocaleString(
                    "en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
                <p className="text-gray-600 mt-2">
                  {item.content?.substring(0, 120)}...
                </p>
                {/* <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(item);
                  }}
                  className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-[#b6261b] transition"
                >
                  Read more
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Control */}
      {data.length > 0 && renderPagination()}
    </div>
  );
};

export default NewsSection;


































// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaPlayCircle } from "react-icons/fa";

// const NewsSection = ({ category }) => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [error, setError] = useState(null);

//   const observer = useRef();
//   const lastNewsElementRef = useRef();
//   const navigate = useNavigate();
//   const footerRef = useRef();

//   const fetchNews = async () => {
//     setLoading(true);
//     setError(null);


//     const endpoint = `https://merupu-news.onrender.com/api/news/isBreaking?page=${page}`;

//     try {
//       const res = await fetch(endpoint);
//       if (!res.ok) throw new Error("Failed to fetch news.");
//       const result = await res.json();

//       if (result.docs && result.docs.length > 0) {
//         const newData = [...data, ...result.docs];
//         const uniqueData = Array.from(
//           new Map(newData.map((item) => [item._id, item])).values()
//         );
//         setData(uniqueData);
//         setHasMore(true);
//       } else {
//         setHasMore(false);
//       }
//     } catch (err) {
//       setError(err.message);
//       setHasMore(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setData([]);
//     setPage(1);
//     setHasMore(true);
//   }, [category]);

//   useEffect(() => {
//     fetchNews();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [category, page]);

//   // useEffect(() => {
//   //   if (loading) return;
//   //   if (observer.current) observer.current.disconnect();

//   //   observer.current = new IntersectionObserver(entries => {
//   //     if (entries[0].isIntersecting && hasMore) {
//   //       setPage(prev => prev + 1);
//   //     }
//   //   });

//   //   if (lastNewsElementRef.current) {
//   //     observer.current.observe(lastNewsElementRef.current);
//   //   }
//   // }, [loading, hasMore]);



//     useEffect(() => {
//     if (loading) return;

//     if (observer.current) observer.current.disconnect();

//     observer.current = new IntersectionObserver(
//       (entries) => {
//         const lastEntry = entries[0];
//         const footerEntry = entries[1];

//         const isLastVisible = lastEntry?.isIntersecting;
//         const isFooterVisible = footerEntry?.isIntersecting;

//         // Only load more if last element is visible AND footer is not visible
//         if (isLastVisible && hasMore && !isFooterVisible) {
//           setPage((prev) => prev + 1);
//         }
//       },
//       {
//         root: null,
//         threshold: 0.1,
//       }
//     );

//     if (lastNewsElementRef.current) {
//       observer.current.observe(lastNewsElementRef.current);
//     }
//     if (footerRef.current) {
//       observer.current.observe(footerRef.current);
//     }
//   }, [loading, hasMore]);



//   const handleClick = (article) => {
//   const url = `/api/news/${article._id}`;
//   window.open(url, '_blank');
// };

    

//   return (
//     <div className="p-4">
//       <h2 className="text-gray-900 text-xl font-bold capitalize mb-4">
//         {category.replace(/-/g, " ")}
//       </h2>

//       {error ? (
//         <p className="text-red-500">{error}</p>
//       ) : loading && data.length === 0 ? (
//           <div className="flex justify-center items-center py-10">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//       ) : data.length === 0 ? (
//         <p>No news available.</p>
//       ) : (
//         <div className="space-y-10">
//           {data.map((item, index) => {
//             const isLast = index === data.length - 1;
//             return (
//               <div
//                 key={`${item._id}-${index}`}
//                 onClick={() => handleClick(item)}
//                 ref={isLast ? lastNewsElementRef : null}
//                 className="flex flex-col md:flex-row items-start gap-4 cursor-pointer group"
//               >
//                {item.videoUrl ? (
//                     <div className="relative w-full md:w-1/2 h-60 rounded-md shadow overflow-hidden">
//                       <video
//                         src={item.videoUrl}
//                         className="w-full h-full object-cover rounded-md shadow transform transition duration-300"
//                         playsInline
//                       />

//                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                         <FaPlayCircle size={60} className="text-white" />
//                       </div>
//                     </div>
//                   ) : (
//                     item.url && (
//                       <img
//                         src={item.url}
//                         alt={item.title}
//                         className="w-full md:w-1/2 h-60 object-cover rounded-md shadow transform transition duration-300 hover:scale-102"
//                       />
//                     )
//                   )}
//                 <div className="flex-1">
//                   <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#b6261b] transition">
//                     {item.title}
//                   </h3>
//                   <p className="text-sm text-gray-800 mt-1">
//                     {item.author} • {new Date(item.publishedAt).toLocaleString()}
//                   </p>
//                   <p className="text-gray-700 mt-2">
//                     {item.content?.substring(0, 120)}...
//                   </p>
//                   <button
//                     onClick={(e) => {
//                       handleClick(item);
//                     }}
//                     className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-[#b6261b] transition cursor-pointer"
//                   >
//                     Read more
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {loading && data.length > 0 && (
//         <div className="mt-6 text-center">
//           <span className="text-gray-400">Loading more news...</span>
//         </div>
//       )}

//       {!hasMore && !loading && data.length > 0 && (
//         <p className="mt-4 text-gray-500 text-center">No more news to show.</p>
//       )}

//       <div ref={footerRef}></div>
//     </div>
//   );
// };

// export default NewsSection;











// import React, { useEffect, useRef } from "react";
// //import { useNewsInfo } from "../ApiHandle/useNewsInfo";
// import { useNavigate } from "react-router-dom";

// const NewsSection = ({ category }) => {
//   const { data, loading, hasMore, loadMore, error } = useNewsInfo(category);
//   const containerRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && data.length === 1 && containerRef.current) {
//       containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//     } else if (!loading && data.length > 1 && containerRef.current) {
//       const firstCard = containerRef.current.querySelector("div > div");
//       if (firstCard) {
//         firstCard.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   }, [loading, data]);

//   const handleClick = (article) => {
//     navigate(`/news/${article._id}`, { state: { article } });
//   };

//   return (
//     <div className="p-4" ref={containerRef}>
//       <h2 className="text-xl font-bold capitalize mb-4">
//         {category.replace(/-/g, " ")}
//       </h2>

//       {/* Error or No News */}
//       {error ? (
//         <p className="text-red-500">{error}</p>
//       ) : loading && data.length === 0 ? (
//         <p>Loading...</p>
//       ) : data.length === 0 ? (
//         <p>No news available.</p>
//       ) : (
// <div className="space-y-10">
//   {data.map((item, index) => (
//     <div
//       key={item._id}
//       onClick={() => handleClick(item)}
//       className="flex flex-col md:flex-row items-start gap-4 cursor-pointer group"
//     >
//       {/* Image */}
//       {item.url && (
//         <img
//           src={item.url}
//           alt={item.title}
//           className="w-full md:w-1/2 h-60 object-cover rounded-md shadow"
//         />
//       )}

//       {/* Content */}
//       <div className="flex-1">
//         <h3 className="text-lg md:text-xl font-bold text-gray-300 group-hover:text-blue-600 transition">
//           {item.title}
//         </h3>
//         <p className="text-sm text-gray-400 mt-1">
//           {item.author} &nbsp;–&nbsp;{" "}
//           {new Date(item.publishedAt).toLocaleDateString()}
//         </p>
//         <p className="text-gray-500 mt-2">
//           {item.content?.substring(0, 120)}...
//         </p>
//         <button className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
//           Read more
//         </button>
//       </div>
//     </div>
//   ))}
// </div>

//       )}

//       {loading && data.length > 0 && <p className="mt-4">Loading more news...</p>}

//       {!loading && hasMore && (
//         <button
//           onClick={loadMore}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//         >
//           Load More
//         </button>
//       )}

//       {!hasMore && !loading && data.length > 0 && (
//         <p className="mt-4 text-gray-500">No more news to show.</p>
//       )}
//     </div>
//   );
// };

// export default NewsSection;


