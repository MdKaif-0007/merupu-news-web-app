import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 text-gray-800">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold underline underline-offset-8 decoration-gray-800 mb-2">
            Privacy Policy – Merupu Telugu News Website
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Effective Date: [09/06/2025]
          </p>
        </div>

        {/* Introduction */}
        <p className="text-lg leading-relaxed">
          At <strong>Merupu</strong> (
          <a
            href="https://merupu.merupulu.com/"
            className="text-blue-600 "
            target="_blank"
            rel="noopener noreferrer"
          >
            https://news.merupulu.com/
          </a>
          ), we value your privacy and are committed to protecting your personal
          information. This policy outlines how we collect, use, and safeguard
          the data you provide while browsing our website.
        </p>

        {/* Sections */}
        <div className="space-y-6 text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-1">
              Information We Collect:
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Personal data you submit via forms (e.g., name, email)</li>
              <li>
                Non-personal data like IP address, browser type, and usage
                statistics through cookies and analytics tools
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-1">
              How We Use Your Data:
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To provide and improve your browsing experience</li>
              <li>To respond to queries or feedback</li>
              <li>To personalize content and show relevant information</li>
              <li>To analyze traffic and trends for site optimization</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-1">
              Data Security:
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                We do not share or sell your personal data to third parties
              </li>
              <li>
                All data is handled through secure methods using trusted tools
                like Google Analytics
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-1">
              Cookies:
            </h2>
            <p>
              We use cookies to track anonymous usage patterns and improve
              functionality. You can manage cookie preferences through your
              browser settings.
            </p>
          </div>

          <div>
            <p>
              By using this website, you agree to this Privacy Policy. <br />
              For questions, contact:{" "}
              <a href="mailto:contact@merupulu.com" className="text-blue-600">
                contact@merupulu.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
