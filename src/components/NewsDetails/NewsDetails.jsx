import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import GoogleAd from "../GoogleAd/GoogleAd";
import ScrollNewsList from "../ScrollNewsList/ScrollNewsList";
import { FaXTwitter } from "react-icons/fa6";
import {
  IoShareSocial,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoWhatsapp,
} from "react-icons/io5";

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

        const res = await fetch(
          `https://merupu-news.onrender.com/api/news/${id}`
        );
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

  const getShareUrls = () => {
    if (!article || !id) return {};

    const shareLink = `https://merupu.news/share/news/${id}`;
    const encodedUrl = encodeURIComponent(shareLink);
    const title = encodeURIComponent(article.title);

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${title}`,
      whatsapp: `https://wa.me/?text=${title}%0A${encodedUrl}`,
    };
  };

  const shareUrls = getShareUrls();

  const handleNativeShare = async () => {
    if (!article || !id) return;

    const shareLink = `https://merupu.news/share/news/${id}`;
    const shareTitle = `${article.title}`;

    try {
      if (navigator.share) {
        const shareData = {
          //title: shareTitle,
          text: shareTitle,
          url: shareLink,
        };

        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.log("Error sharing:", err);
      // Fallback to clipboard if sharing fails
      try {
        await navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard!");
      } catch (clipboardErr) {
        console.log("Clipboard access failed:", clipboardErr);
        alert("Sharing failed. Please copy the URL manually.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  if (!article) {
    return <p className="text-center mt-10 text-red-600">No article found.</p>;
  }

  const {
    title,
    author,
    publishedAt,
    url,
    videoUrl,
    content,
    additionalContent,
    keywords,
  } = article;

  const handleImageClick = () => {
    if (imageRef.current && document.fullscreenEnabled) {
      imageRef.current
        .requestFullscreen()
        .catch((err) => console.error("Failed to enter fullscreen mode:", err));
    }
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        {/* Open Graph tags for social media sharing */}
        <meta property="og:title" content={title} />
        <meta property="og:image" content={url || ""} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Merupu News" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={url || ""} />
        <meta name="twitter:site" content="@MerupuNews" />

        {/* Additional meta tags for better sharing */}
        <meta property="article:author" content={author} />
        <meta property="article:published_time" content={publishedAt} />

        {/* Meta description for SEO */}
        <meta
          name="description"
          content={article.content?.substring(0, 150) || title}
        />

        {/* Meta keywords for SEO */}
        {keywords && <meta name="keywords" content={keywords} />}

        {/* Ensure image is accessible */}
        <link rel="preload" as="image" href={url} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: title,
            image: [url],
            author: {
              "@type": "Person",
              name: author,
            },
            publisher: {
              "@type": "Organization",
              name: "Merupu News",
              logo: {
                "@type": "ImageObject",
                url: "https://firebasestorage.googleapis.com/v0/b/merupu-production.appspot.com/o/test%2F1751307621070_merupu%20logo.webp?alt=media&token=41b47897-ac39-4bd6-8413-e644cae690b9",
              },
            },
            datePublished: publishedAt,
            description: article.content?.substring(0, 150) || title,
            keywords: keywords,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": currentUrl,
            },
          })}
        </script>
      </Helmet>

      <div className="flex flex-col lg:flex-row justify-center w-full gap-4 px-4 py-6">
        <aside className="hidden w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] lg:sticky lg:top-4 rounded md:flex justify-center">
          <GoogleAd />
        </aside>

        <main className="w-full lg:w-3/5 max-w-3xl space-y-6">
          <h1 className="text-gray-900 text-3xl font-bold">{title}</h1>
          <p className="text-gray-700 font-semibold text-sm">
            <span className="text-gray-800">{author}</span> •{" "}
            {new Date(publishedAt).toLocaleString()}
          </p>

          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Share</h3>
            <div className="flex flex-wrap gap-4">
              <div
                onClick={handleNativeShare}
                className="bg-gray-100 w-10 h-10 rounded-xs flex items-center justify-center cursor-pointer text-black hover:scale-105 shadow-lg transition-transform"
                title="Share or Copy Link"
              >
                <IoShareSocial size={20} />
              </div>

              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <div className="bg-blue-600 w-10 h-10 flex items-center justify-center text-white hover:scale-105 shadow-lg rounded-xs transition-transform">
                  <IoLogoFacebook size={20} />
                </div>
              </a>

              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
              >
                <div className="bg-black w-10 h-10 flex items-center justify-center text-white hover:scale-105 shadow-lg rounded-xs transition-transform">
                  <FaXTwitter size={20} />
                </div>
              </a>

              <a
                href={shareUrls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
              >
                <div className="bg-green-500 w-10 h-10 flex items-center justify-center text-white hover:scale-105 shadow-lg rounded-xs transition-transform">
                  <IoLogoWhatsapp size={20} />
                </div>
              </a>
            </div>
          </div>

          {videoUrl ? (
            <video
              src={videoUrl}
              className="w-full h-[300px] md:h-[400px] object-cover rounded-md shadow"
              controls
              poster={url} // Use article image as video poster
            />
          ) : (
            url && (
              <img
                ref={imageRef}
                src={url}
                alt={title}
                onClick={handleImageClick}
                className="w-full h-[300px] md:h-[400px] object-cover rounded-md shadow hover:scale-102 transition duration-300 cursor-pointer"
                //loading="eager" // Load image immediately for sharing
                // crossOrigin="anonymous" // Help with CORS issues
              />
            )
          )}

          <p className="text-lg text-gray-700 leading-relaxed">{content}</p>

          {additionalContent &&
            additionalContent.split("\r\n\r\n").map((para, index, arr) => {
              const trimmedPara = para.trim();

              // Detect headings
              const isHeading =
                trimmedPara.endsWith(":") ||
                (trimmedPara.length < 60 &&
                  index + 1 < arr.length &&
                  arr[index + 1].trim().length > 100);

              return (
                <p
                  key={index}
                  className={`leading-relaxed mb-4 ${
                    isHeading
                      ? "text-xl font-bold text-gray-900"
                      : "text-lg text-gray-700"
                  }`}
                >
                  {trimmedPara}
                </p>
              );
            })}

          {keywords && keywords.trim() && (
            <div className="flex flex-wrap gap-2">
              {keywords
                .split(",")
                .map((word) => word.trim())
                .filter((word) => word.length > 0)
                .map((word, index) => (
                  <p
                    key={index}
                    className="px-4 py-1 bg-gray-300 rounded-full cursor-pointer italic"
                  >
                    {"# " + word}
                  </p>
                ))}
            </div>
          )}

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
