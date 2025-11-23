import React, { Fragment } from "react";
import Layout from "../layout";

const ReturnsContent = () => {
  return (
    <div className="bg-[#F9FAF9] text-[#2C2C2C] min-h-screen py-16 px-6 sm:px-10 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10 mt-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-[#708A58]">
          Returns & Refund Policy
        </h1>
        <p className="text-center text-sm text-gray-500 mb-10">
          
        </p>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            At <span className="font-semibold">Meezan Super Food</span>, customer
            satisfaction is our priority. If you're not completely satisfied with
            your purchase, we're here to help with returns and refunds.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            1. Return Eligibility
          </h2>
          <p>
            To be eligible for a return, your item must be:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-3">
            <li>Unused and in the same condition that you received it</li>
            <li>In the original packaging with all tags and labels intact</li>
            <li>Accompanied by the original receipt or proof of purchase</li>
            <li>Returned within 7 days of delivery</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            2. Non-Returnable Items
          </h2>
          <p>
            The following items cannot be returned:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-3">
            <li>Perishable goods (fresh fruits, vegetables, dairy products)</li>
            <li>Opened food packages or consumables</li>
            <li>Products without original packaging or proof of purchase</li>
            <li>Items marked as "non-returnable" at the time of purchase</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            3. How to Initiate a Return
          </h2>
          <p>
            To start a return, please follow these steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-3">
            <li>Contact our customer support team at{" "}
              <a
                href="mailto:support@meezansuperfood.com"
                className="text-[#708A58] underline"
              >
                support@meezansuperfood.com
              </a>{" "}
              or call <span className="font-semibold">+91 9219725401</span>
            </li>
            <li>Provide your order number and reason for return</li>
            <li>Our team will guide you through the return process</li>
            <li>Pack the item securely in its original packaging</li>
            <li>Ship the item back to the address provided by our team</li>
          </ol>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            4. Refund Process
          </h2>
          <p>
            Once we receive and inspect your returned item, we will notify you
            of the approval or rejection of your refund.
          </p>
          <p className="mt-3">
            If approved, your refund will be processed within 7-10 business days
            and automatically applied to your original payment method. Please note
            that shipping charges are non-refundable.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            5. Exchanges
          </h2>
          <p>
            We only replace items if they are defective or damaged. If you need
            to exchange a product, please contact us at{" "}
            <a
              href="mailto:support@meezansuperfood.com"
              className="text-[#708A58] underline"
            >
              support@meezansuperfood.com
            </a>{" "}
            and send the item back to us.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            6. Damaged or Defective Items
          </h2>
          <p>
            If you receive a damaged or defective product, please contact us
            immediately with photos of the product and packaging. We will arrange
            for a replacement or full refund at no additional cost.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            7. Contact Us
          </h2>
          <p>
            For any questions about returns and refunds, please reach out to us at{" "}
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

const Returns = () => {
  return (
    <Fragment>
      <Layout children={<ReturnsContent />} />
    </Fragment>
  );
};

export default Returns;
