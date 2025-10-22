import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sitemap() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 sm:px-12 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-[#708A58] mb-6 text-center"
        >
          Sitemap
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 text-center mb-10"
        >
          Easily navigate through all the important sections of our website.
        </motion.p>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Category 1 */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl font-semibold text-[#708A58] mb-4">
              Main Pages
            </h2>
            <ul className="space-y-3">
              {[
                { to: "/", label: "🏠 Home" },
                { to: "/about", label: "👩‍💻 About Us" },
                { to: "/contact", label: "📞 Contact Us" },
                { to: "/faq", label: "❓ FAQs" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="hover:underline hover:text-[#708A58]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Category 2 */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl font-semibold text-[#708A58] mb-4">
              Policies & Legal
            </h2>
            <ul className="space-y-3">
              {[
                { to: "/privacy-policy", label: "🔒 Privacy Policy" },
                { to: "/terms-of-service", label: "📜 Terms of Service" },
                { to: "/refund-policy", label: "💰 Refund Policy" },
                { to: "/shipping-policy", label: "🚚 Shipping Policy" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="hover:underline hover:text-[#708A58]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Category 3 */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl font-semibold text-[#708A58] mb-4">
              Explore
            </h2>
            <ul className="space-y-3">
              {[
                { to: "/products", label: "🛍️ Products" },
                { to: "/categories", label: "🗂️ Categories" },
                { to: "/offers", label: "🎁 Offers" },
                { to: "/blog", label: "📰 Blog" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="hover:underline hover:text-[#708A58]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-16 text-sm text-gray-500"
        >
          © {new Date().getFullYear()} Meezan. All Rights Reserved.
        </motion.div>
      </div>
    </div>
  );
}
