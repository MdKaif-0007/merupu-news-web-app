import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsSection from '../NewsSection/NewsSection';
import NewsDetail from '../NewsDetails/NewsDetails';
import AllNews from '../AllNews/AllNews';
import GoogleAd from '../GoogleAd/GoogleAd';

const Home = () => {

     const footerRef = useRef();
  const leftAdRef = useRef();

  useEffect(() => {
    const adBox = leftAdRef.current;
    if (!adBox) return;

    // Prevent main page scroll when scrolling inside ad box
    const onWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = adBox;
      const delta = e.deltaY;

      // Scrolling up at the top or down at the bottom should allow main page scroll,
      // else prevent it.
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      if (
        (delta < 0 && !isAtTop) || // scrolling up and NOT at top
        (delta > 0 && !isAtBottom) // scrolling down and NOT at bottom
      ) {
        e.stopPropagation();
        // Prevent main page scroll by preventing default only if you want
        // e.preventDefault();
      }
      // Else allow scroll to propagate (to scroll main page)
    };

    adBox.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      adBox.removeEventListener('wheel', onWheel);
    };
  }, []);

  const handleAdScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      footerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="flex flex-col lg:flex-row px-4 lg:px-10 py-6 gap-4">

  {/* Left Ad Box - Sticky on large screens */}
  <aside
  ref={leftAdRef}
 onScroll={handleAdScroll}
  className="w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] rounded  flex justify-center lg:sticky lg:top-4">
    <GoogleAd /> 
  </aside>

  {/* Main News Content - Remains scrollable */}
  <main className="w-full lg:flex-1 space-y-8">
    <NewsSection category="breaking-news" />
    {/* Add more NewsSection components if needed */}
     <div ref={footerRef}></div>
  </main>

  {/* Right Ad Box - Sticky on large screens */}
  <aside className="w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] rounded  flex justify-center lg:sticky lg:top-4">
    <GoogleAd /> 
  </aside>

</div>

  );
};

export default Home;









   {/* Main Content */}
      {/* <main className="w-full lg:flex-1 space-y-8 bg-black text-white p-4 rounded">
        {articles.map((article) => (
          <div key={article.id} className="flex flex-col md:flex-row gap-4">
            <img
              src={article.image}
              alt="News"
              className="w-full md:w-1/2 h-auto rounded object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold leading-snug text-gray-400 hover:text-orange-700 cursor-pointer">
                {article.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {article.author} - {article.date}
              </p>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <button 
                onClick={() => navigate(`/news/${article.id}`, { state: { article } })}
              className="bg-orange-700 hover:bg-orange-600 text-white px-4 py-2 text-sm font-semibold rounded">
                Read more
              </button>
            </div>
          </div>
        ))}
      </main> */}