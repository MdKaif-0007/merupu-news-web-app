import React, { useEffect } from 'react';

const About = () => {
     useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);

  return (
    <div className="min-h-screen px-4 py-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold underline underline-offset-8 decoration-blue-600">
            About Us – Merupu Telugu News Portal
          </h1>
        </div>

        {/* Introduction */}
        <div className="text-lg leading-relaxed space-y-4">
          <p>
            Welcome to <strong>Merupu</strong> – your trusted source for Telugu news from Telangana, Andhra Pradesh, and beyond.
            We bring you the latest breaking news, political developments, cinema and movie updates, health tips, technology trends, job alerts, and lifestyle content — all in one place and in the Telugu language.
          </p>

          <p>
            Our goal is to deliver accurate, fast, and relevant news for Telugu-speaking audiences across the globe.
            Whether you're looking for regional headlines, national updates, or international affairs,
            <strong> Merupu</strong> keeps you informed with real-time news backed by reliable sources.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-blue-600">Why Choose Merupu?</h2>
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>✅ Telugu-first approach with easy-to-read content</li>
            <li>✅ 24/7 news updates from verified sources</li>
            <li>✅ Dedicated categories for politics, movies, health, jobs, and lifestyle</li>
            <li>✅ Mobile-friendly design for easy reading on the go</li>
            <li>✅ Ethical journalism with no sensationalism</li>
          </ul>
        </div>

        {/* Closing Statement */}
        <p className="text-lg">
          <strong>Merupu</strong> is more than just a news website — it’s your daily companion for credible news in Telugu.
        </p>
      </div>
    </div>
  );
};

export default About;
