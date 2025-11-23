import React, { Fragment } from "react";
import Layout from "../layout";

const TermsOfServiceContent = () => {
  return (
    <div className="bg-[#F9FAF9] text-[#2C2C2C] min-h-screen py-16 px-6 sm:px-10 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10 mt-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-[#708A58]">
          Terms of Service
        </h1>
        <p className="text-center text-sm text-gray-500 mb-10">
          
        </p>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Welcome to <span className="font-semibold">Meezan Super Food</span>!  
            By accessing or using our website, you agree to comply with and be
            bound by the following Terms of Service. Please read them carefully
            before using our services.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            1. Use of Our Services
          </h2>
          <p>
            You agree to use our website and services only for lawful purposes.
            You must not use our platform to distribute harmful, offensive, or
            fraudulent content or engage in unauthorized activities.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            2. Account Responsibilities
          </h2>
          <p>
            When you create an account with us, you are responsible for
            maintaining the confidentiality of your login credentials and for
            all activities under your account. Please notify us immediately of
            any unauthorized access or use.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            3. Orders and Payments
          </h2>
          <p>
            All orders placed through our website are subject to availability
            and confirmation. Prices and offers may change without prior notice.
            Payment must be completed before dispatch of any order.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            4. Refunds and Cancellations
          </h2>
          <p>
            Refunds or cancellations are handled in accordance with our Refund
            Policy. Once an order is processed or dispatched, cancellation may
            not be possible. Please review product details carefully before
            placing an order.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            5. Intellectual Property
          </h2>
          <p>
            All content on this website — including logos, text, graphics,
            images, and product information — is the property of{" "}
            <span className="font-semibold">Meezan Super Food</span> and is
            protected by applicable copyright and trademark laws. Unauthorized
            use or reproduction is strictly prohibited.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            6. Limitation of Liability
          </h2>
          <p>
            We strive to ensure accurate product details and seamless service,
            but <span className="font-semibold">Meezan Super Food</span> shall
            not be liable for indirect, incidental, or consequential damages
            arising from use of our website or products.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            7. Changes to Terms
          </h2>
          <p>
            We may update or modify these Terms of Service at any time. Changes
            will be effective immediately upon posting on this page. Please
            check regularly to stay informed.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            8. Contact Us
          </h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:support@meezansuperfood.com"
              className="text-[#708A58] underline"
            >
              support@meezansuperfood.com
            </a>
            .
          </p>
        </section>

        <div className="mt-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Meezan Super Food. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

const TermsOfService = () => {
  return (
    <Fragment>
      <Layout children={<TermsOfServiceContent />} />
    </Fragment>
  );
};

export default TermsOfService;
