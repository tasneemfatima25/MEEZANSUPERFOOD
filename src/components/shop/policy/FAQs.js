import React, { useState } from "react";

const faqsData = [
  {
    question: "What is Meezan Super Food?",
    answer:
      "Meezan Super Food is a premium grocery and food delivery platform offering high-quality, fresh, and organic products directly to your doorstep.",
  },
  {
    question: "How can I place an order?",
    answer:
      "Simply browse our products, add items to your cart, and proceed to checkout. You can complete your order using any of our secure online payment options.",
  },
  {
    question: "Do you offer same-day delivery?",
    answer:
      "Yes! We offer same-day delivery in select areas. Delivery availability and timing may vary depending on your location.",
  },
  {
    question: "Can I cancel or modify my order?",
    answer:
      "Orders can be modified or canceled within 30 minutes of placement. After that, cancellations depend on the order status. Please contact our support team for assistance.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major debit and credit cards, UPI, wallets, and cash on delivery (COD) in eligible locations.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Absolutely. We use modern encryption and security practices to ensure your personal and payment information remains protected.",
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-[#F9FAF9] text-[#2C2C2C] min-h-screen py-16 px-6 sm:px-10 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-[#708A58]">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-sm text-gray-500 mb-10">
          Find answers to the most common questions about our services.
        </p>

        <div className="space-y-4">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left focus:outline-none"
              >
                <span className="font-semibold text-lg text-[#2C2C2C]">
                  {faq.question}
                </span>
                <span
                  className={`transform transition-transform duration-300 text-[#708A58] ${
                    activeIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-40 px-5 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          Still have questions? Contact us at{" "}
          <a
            href="mailto:support@meezansuperfood.com"
            className="text-[#708A58] underline"
          >
            support@meezansuperfood.com
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default FAQs;
