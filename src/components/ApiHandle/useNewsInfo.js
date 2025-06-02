// import { useEffect, useState, useCallback } from "react";

// export function useNewsInfo(type = "breaking", category = null) {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const BASE_URL = "https://merupu-news.onrender.com/api/news";
//   const PROXY_URL = "https://cors-anywhere.herokuapp.com/"; // Optional, only if CORS issues occur

//   const getEndpoint = useCallback(() => {
//     if (type === "breaking") {
//       return `${BASE_URL}/isBreaking?page=${page}`;
//     } else if (type === "district") {
//       return `${BASE_URL}/district?districts=${category}&page=${page}`;
//     } else if (type === "all") {
//       return `${BASE_URL}?page=${page}`;
//     } else {
//       return `${BASE_URL}/isBreaking?page=${page}`;
//     }
//   }, [type, category, page]);

//   const fetchData = useCallback(() => {
//     const endpoint = getEndpoint();
//     const finalUrl = PROXY_URL + endpoint; // Comment this line if you don't need the proxy

//     setLoading(true);

//     fetch(finalUrl)
//       .then((res) => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then((result) => {
//         console.log("Fetched news:", result);
//         if (result.docs && result.docs.length > 0) {
//           setData((prev) => [...prev, ...result.docs]);
//           setHasMore(true);
//         } else {
//           setHasMore(false);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching news:", err);
//         setHasMore(false);
//       })
//       .finally(() => setLoading(false));
//   }, [getEndpoint]);

//   useEffect(() => {
//     setData([]);
//     setPage(1);
//     setHasMore(true);
//   }, [type, category]); // Reset when type or category changes

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const loadMore = () => {
//     if (!loading && hasMore) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   return { data, loading, hasMore, loadMore };
// }




//src/hooks/useNewsInfo.js
// import { useEffect, useState, useCallback } from "react";

// export function useNewsInfo() {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const BASE_URL = "https://merupu-news.onrender.com/api/news";
//   const PROXY_URL = "https://cors-anywhere.herokuapp.com/"; // Optional, only if CORS issues occur

//   const fetchData = useCallback(() => {
//     const endpoint = `${BASE_URL}/isBreaking?page=${page}`;
//     const finalUrl = PROXY_URL + endpoint; // Comment this line if you don’t need the proxy

//     setLoading(true);

//     fetch(finalUrl)
//       .then((res) => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then((result) => {
//         console.log("Fetched news:", result);
//         if (result.docs && result.docs.length > 0) {
//           setData((prev) => [...prev, ...result.docs]);
//           setHasMore(true);
//         } else {
//           setHasMore(false);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching news:", err);
//         setHasMore(false);
//       })
//       .finally(() => setLoading(false));
//   }, [page]);

//   useEffect(() => {
//     setData([]);
//     setPage(1);
//   }, []); // This can be changed to a `type` dependency if needed

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const loadMore = () => {
//     if (!loading && hasMore) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   return { data, loading, hasMore, loadMore };
// }







// src/hooks/useNewsData.js
// import { useEffect, useState, useCallback } from "react";

// export function useNewsInfo(typeOrDistrict = "breaking") {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const BASE_URL = "https://merupu-news.onrender.com/api/news";

//   const fetchData = useCallback(() => {
//     let endpoint = "";

//     if (typeOrDistrict === "breaking") {
//       endpoint = `${BASE_URL}/isBreaking?page=${page}`;
//     } else if (typeOrDistrict === "all") {
//       endpoint = `${BASE_URL}?page=${page}`;
//     } else {
//       endpoint = `${BASE_URL}/district?districts=${typeOrDistrict}&page=${page}`;
//     }

//     setLoading(true);

//     fetch(endpoint)
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result)
//         if (Array.isArray(result) && result.length > 0) {
//           setData((prev) => [...prev, ...result]);
//           setHasMore(true);
//         } else {
//           setHasMore(false);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching news:", err);
//         setHasMore(false);
//       })
//       .finally(() => setLoading(false));
//   }, [page, typeOrDistrict]);

//   useEffect(() => {
//     setData([]);       // Reset data on category change
//     setPage(1);        // Reset to first page
//   }, [typeOrDistrict]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const loadMore = () => {
//     if (!loading && hasMore) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   return { data, loading, hasMore, loadMore };
// }










// // src/hooks/useNewsData.js
// import { useEffect, useState } from "react";

// export function useNewsData(typeOrDistrict = "breaking") {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const BASE_URL = "https://merupu-news.onrender.com/api/news";

//   useEffect(() => {
//     let endpoint = "";

//     if (typeOrDistrict === "breaking") {
//       endpoint = `${BASE_URL}/isBreaking?page=1`;
//     } else if (typeOrDistrict === "all") {
//       endpoint = `${BASE_URL}?page=1`;
//     } else {
//       endpoint = `${BASE_URL}/district?districts=${typeOrDistrict}&page=1`;
//     }

//     setLoading(true);

//     fetch(endpoint)
//       .then((res) => res.json())
//       .then((result) => {
//         setData(result);
//         console.log("Fetched News:", result);
//       })
//       .catch((err) => {
//         console.error("Error fetching news:", err);
//         setData([]);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [typeOrDistrict]);

//   return { data, loading };
// }
