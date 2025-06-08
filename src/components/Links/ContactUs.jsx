import React, { useEffect } from 'react';

const ContactUs = () => {
   useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);

  return (
    <div className="min-h-screen px-4 py-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold underline underline-offset-8 decoration-blue-500 mb-4">
            Contact Us – We’d Love to Hear From You
          </h1>
          <p className="text-lg">
            Have feedback, suggestions, or news tips?<br />
            Get in touch with the <strong>Merupu Telugu News</strong> team.
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-2">
          <p><strong>Email:</strong> <a href="mailto:contact@merupulu.com" className="text-blue-600 dark:text-blue-400">contact@merupulu.com</a></p>
          <p><strong>Website:</strong> <a href="https://merupu.merupulu.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400">https://merupu.merupulu.com</a></p>
          <p><strong>Based in:</strong> Telangana, India</p>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="mb-4 text-lg">You can also use the form below to reach out directly for inquiries, partnerships, corrections, or advertising.</p>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input type="text" placeholder="Your Name" className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea rows="4" placeholder="Write your message here..." className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

