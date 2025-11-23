import React, { Fragment } from "react";
import Layout from "../layout";

const PrivacyPolicyContent = () => {
  return (
    <div className="bg-[#F9FAF9] text-[#2C2C2C] min-h-screen py-16 px-6 sm:px-10 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10 mt-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-[#708A58]">
          Privacy Policy
        </h1>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            At <span className="font-semibold">Meezan Super Food</span>, your
            privacy is our top priority. This Privacy Policy explains how we
            collect, use, and protect your personal information when you visit
            our website or use our services.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-3">
            <li>
              <span className="font-medium">Personal Information:</span> Name,
              email, phone number, delivery address, and payment details.
            </li>
            <li>
              <span className="font-medium">Usage Data:</span> Pages visited,
              items viewed, IP address, and device information to improve your
              shopping experience.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            2. How We Use Your Information
          </h2>
          <p>
            We use your data to process orders, improve user experience, send
            updates about offers, and ensure secure transactions.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            3. Cookies
          </h2>
          <p>
            We use cookies to enhance your browsing experience. You can choose
            to disable cookies in your browser settings, but some features may
            not work properly.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            4. Data Protection
          </h2>
          <p>
            Your information is securely stored and transmitted using modern
            encryption methods. We do not share your data with third parties
            except as required to complete your order (like payment gateways or
            delivery partners).
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            5. Your Rights
          </h2>
          <p>
            You have the right to request access, correction, or deletion of
            your personal data at any time by contacting us at{" "}
            <a
              href="mailto:support@meezansuperfood.com"
              className="text-[#708A58] underline"
            >
              support@meezansuperfood.com
            </a>
            .
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            6. Policy Updates
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated date.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            7. Contact Us
          </h2>
          <p>
            For any questions or concerns regarding this policy, reach out to us
            at{" "}
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

const PrivacyPolicy = () => {
  return (
    <Fragment>
      <Layout children={<PrivacyPolicyContent />} />
    </Fragment>
  );
};

export default PrivacyPolicy;
