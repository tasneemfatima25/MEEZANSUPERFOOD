import React, { Fragment } from "react";
import Layout from "../layout";

const ShippingInfoContent = () => {
  return (
    <div className="bg-[#F9FAF9] text-[#2C2C2C] min-h-screen py-16 px-6 sm:px-10 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10 mt-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-[#708A58]">
          Shipping Information
        </h1>
        <p className="text-center text-sm text-gray-500 mb-10">
          
        </p>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            At <span className="font-semibold">Meezan Super Food</span>, we are committed
            to delivering your orders safely and on time. Here's everything you need to know
            about our shipping process.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            1. Delivery Areas
          </h2>
          <p>
            We currently deliver across major cities and towns. Delivery availability
            may vary based on your location. Please enter your pincode at checkout
            to confirm if we deliver to your area.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            2. Delivery Time
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-3">
            <li>
              <span className="font-medium">Same-Day Delivery:</span> Available
              for orders placed before 12 PM in select locations.
            </li>
            <li>
              <span className="font-medium">Standard Delivery:</span> 2-5 business
              days for most locations.
            </li>
            <li>
              <span className="font-medium">Express Delivery:</span> 1-2 business
              days (additional charges may apply).
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            3. Shipping Charges
          </h2>
          <p>
            Shipping charges are calculated based on your location and order value.
            We offer <span className="font-semibold">free shipping</span> on orders
            above Rs. 500 in select areas.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            4. Order Tracking
          </h2>
          <p>
            Once your order is shipped, you will receive a tracking number via email
            or SMS. You can track your order in real-time through our website or the
            courier partner's website.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            5. Packaging
          </h2>
          <p>
            We ensure that all products are carefully packed to prevent damage during
            transit. Fresh and perishable items are packed with appropriate cooling
            or insulation to maintain quality.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            6. Delivery Issues
          </h2>
          <p>
            If you face any issues with delivery or receive a damaged product, please
            contact our customer support team immediately at{" "}
            <a
              href="mailto:support@meezansuperfood.com"
              className="text-[#708A58] underline"
            >
              support@meezansuperfood.com
            </a>{" "}
            or call us at <span className="font-semibold">+91 9219725401</span>.
          </p>

          <h2 className="text-2xl font-semibold text-[#708A58] mt-8">
            7. Contact Us
          </h2>
          <p>
            For any shipping-related queries, feel free to reach out to us at{" "}
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

const ShippingInfo = () => {
  return (
    <Fragment>
      <Layout children={<ShippingInfoContent />} />
    </Fragment>
  );
};

export default ShippingInfo;
