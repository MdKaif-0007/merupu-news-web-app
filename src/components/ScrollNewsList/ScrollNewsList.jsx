import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScrollNewsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const page = 2;

  const fetchNews = async () => {
    try {
      const endpoint = `https://merupu-news.onrender.com/api/news/isBreaking?page=${page}`;
      const response = await fetch(endpoint);
      const result = await response.json();
      setData(result.docs || []);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleClick = (article) => {
    navigate(`/api/news/${article._id}`, { state: { article } });
  };

  return (
    <div className="w-full px-6 pt-6 pb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Suggestions</h2>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : data.length > 0 ? (
        <div className="flex flex-col gap-4">
          {data.map((item) => (
            <div
              key={item._id}
              onClick={() => handleClick(item)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
            >
              <div className="p-4">
                <h3 className="text-lg text-gray-700 font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">
                 {item.author} • {new Date(item.publishedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No news found.</p>
      )}
    </div>
  );
};

export default ScrollNewsList;











// import React, { useEffect, useRef, useState } from 'react'
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';

// const ScrollNewsList = () => {
//   const scrollRef = useRef(null);
//   const navigate = useNavigate();

//   const scrollLeft = () => {
//     scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
//   };

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const page = 2;

//   const fetchNews = async () => {
//     try {
//       const endpoint = `https://merupu-news.onrender.com/api/news/isBreaking?page=${page}`;
//       const response = await fetch(endpoint);
//       const result = await response.json();
//       setData(result.docs || []);
//     } catch (error) {
//       console.error("Failed to fetch news:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   const handleClick = (article) => {
//     navigate(`/api/news/${article._id}`, { state: { article } });
//   };

//   return (
//     <div className="relative w-full px-16 pt-6 pb-4">
//       <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
//         {loading ? (
//           <p className="text-white">Loading...</p>
//         ) : data.length > 0 ? (
//           data.map((item) => (
//             <div
//               onClick={() => handleClick(item)}
//               key={item._id}
//               className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
//             >
//               <img
//                 src={item.url || "https://via.placeholder.com/300x200"}
//                 alt={item.title}
//                 className="w-full h-40 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg text-gray-600 font-semibold line-clamp-2">{item.title}</h3>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-white">No news found.</p>
//         )}
//       </div>

//       <button onClick={scrollLeft} className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full p-2 shadow z-10">
//         <FaChevronLeft size={20} className='text-black' />
//       </button>

//       <button onClick={scrollRight} className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full p-2 shadow z-10">
//         <FaChevronRight size={20} className='text-black' />
//       </button>
//     </div>
//   );
// };

// export default ScrollNewsList;











// import React, { useEffect, useRef, useState } from 'react'
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';


// const ScrollNewsList = () => {

//      const scrollRef = useRef(null);

//   const scrollLeft = () => {
//     scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
//   };

//  const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const page = 2; // Start from page 2

//   // ✅ Fetch News Data Function
//   const fetchNews = async () => {
//     try {
//       const endpoint = `https://merupu-news.onrender.com/api/news/isBreaking?page=${page}`;
//       const response = await fetch(endpoint);
//       const result = await response.json();
//       setData(result.docs || []); // Adjust according to API shape
//     } catch (error) {
//       console.error("Failed to fetch news:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   const navigate = useNavigate();

//   //  const handleClick = (article) => {
//   //   navigate(`/api/news/${article._id}`, { state: { article } });
//   // };

//     const handleClick = (article) => {
//   const url = `/api/news/${article._id}`;
//  window.open(url, '_blank');
//    //navigate(url);
// };

//   return (
//  <div className="relative w-full px-16 pt-6 pb-4">
//       {/* Scrollable Container */}
//         <div
//         ref={scrollRef}
//         className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
//       >
//         {loading ? (
//           <p className="text-white">Loading...</p>
//         ) : data.length > 0 ? (
//           data.map((item) => (
//             <div
//               onClick={() => handleClick(item)}
//               key={item._id}
//               className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden"
//             >
//               <img
//                 src={item.url|| "https://via.placeholder.com/300x200"}
//                 alt={item.title}
//                 className="w-full h-40 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg text-gray-600 font-semibold line-clamp-2">{item.title}</h3>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-white">No news found.</p>
//         )}
//       </div>

//       {/* Left Arrow */}
//       <button
//         onClick={scrollLeft}
//         className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full p-2 shadow z-10"
//       >
//         <FaChevronLeft size={20} className='text-black'/>
//       </button>

//       {/* Right Arrow */}
//       <button
//         onClick={scrollRight}
//         className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full p-2 shadow z-10"
//       >
//        <FaChevronRight size={20} className='text-black'/>
//       </button>
//     </div>
//   )
// }

// export default ScrollNewsList
