import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";

import { cartListProduct } from "../partials/FetchApi";
import { getBrainTreeToken, getPaymentProcess } from "./FetchApi";
import { fetchData, fetchbrainTree, pay } from "./Action";

import DropIn from "braintree-web-drop-in-react";

const apiURL = process.env.REACT_APP_API_URL;

export const CheckoutComponent = (props) => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: false,
    success: false,
    clientToken: null,
    instance: {},
  });

  useEffect(() => {
    fetchData(cartListProduct, dispatch);
    fetchbrainTree(getBrainTreeToken, setState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen" style={{ background: '#FFFFFF' }}>
        <svg
          className="w-12 h-12 animate-spin"
          style={{ color: '#708A58' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        <p className="mt-4 text-lg" style={{ color: '#666666' }}>Please wait until finish...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <section className="py-12 px-4 md:px-12 mt-20" style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
        minHeight: '100vh'
      }}>
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold" style={{ color: '#2C2C2C', fontFamily: 'Georgia, serif' }}>
              Checkout
            </h1>
            <p className="text-lg mt-2" style={{ color: '#666666' }}>
              Review your order and complete payment
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Products List */}
            <div>
              <CheckoutProducts products={data.cartProduct} />
            </div>

            {/* Payment Form */}
            <div>
              {state.clientToken !== null ? (
                <div className="p-8 rounded-3xl" style={{
                  background: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}>
                  {/* Top Colored Line */}
                  <div style={{
                    height: '6px',
                    background: 'linear-gradient(90deg, #708A58 0%, #D4A574 100%)',
                    marginBottom: '24px',
                    borderRadius: '3px'
                  }}></div>

                  <h2 className="text-2xl font-bold mb-6" style={{ color: '#2C2C2C', fontFamily: 'Georgia, serif' }}>
                    Payment Details
                  </h2>

                  {state.error && (
                    <div className="mb-4 px-4 py-3 rounded-xl" style={{
                      background: 'rgba(255, 107, 107, 0.1)',
                      border: '1px solid rgba(255, 107, 107, 0.3)',
                      color: '#ff6b6b'
                    }}>
                      {state.error}
                    </div>
                  )}

                  {/* Delivery Address */}
                  <div className="mb-6">
                    <label htmlFor="address" className="block text-base font-semibold mb-2" style={{ color: '#2C2C2C' }}>
                      Delivery Address <span style={{ color: '#D4A574' }}>*</span>
                    </label>
                    <input
                      value={state.address}
                      onChange={(e) =>
                        setState({
                          ...state,
                          address: e.target.value,
                          error: false,
                        })
                      }
                      onFocus={(e) => e.target.style.borderColor = '#708A58'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(112, 138, 88, 0.3)'}
                      type="text"
                      id="address"
                      className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                      style={{
                        border: '2px solid rgba(112, 138, 88, 0.3)',
                        color: '#2C2C2C',
                        background: '#FAFAFA'
                      }}
                      placeholder="Enter your full delivery address..."
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-base font-semibold mb-2" style={{ color: '#2C2C2C' }}>
                      Phone Number <span style={{ color: '#D4A574' }}>*</span>
                    </label>
                    <input
                      value={state.phone}
                      onChange={(e) =>
                        setState({
                          ...state,
                          phone: e.target.value,
                          error: false,
                        })
                      }
                      onFocus={(e) => e.target.style.borderColor = '#708A58'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(112, 138, 88, 0.3)'}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                      style={{
                        border: '2px solid rgba(112, 138, 88, 0.3)',
                        color: '#2C2C2C',
                        background: '#FAFAFA'
                      }}
                      placeholder="+91 9219725401"
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <label className="block text-base font-semibold mb-3" style={{ color: '#2C2C2C' }}>
                      Payment Method
                    </label>
                    <div style={{
                      border: '2px solid rgba(112, 138, 88, 0.3)',
                      borderRadius: '12px',
                      padding: '16px'
                    }}>
                      <DropIn
                        options={{
                          authorization: state.clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => (state.instance = instance)}
                      />
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={(e) =>
                      pay(
                        data,
                        dispatch,
                        state,
                        setState,
                        getPaymentProcess,
                        totalCost,
                        history
                      )
                    }
                    className="w-full px-6 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-105"
                    style={{
                      background: '#708A58',
                      boxShadow: '0 4px 15px rgba(112,138,88,0.4)'
                    }}
                  >
                    Complete Payment
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 px-8 rounded-3xl" style={{
                  background: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                }}>
                  <svg
                    className="w-12 h-12 animate-spin"
                    style={{ color: '#708A58' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                  <p className="mt-4 text-lg" style={{ color: '#666666' }}>Loading payment options...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="p-8 rounded-3xl mb-6" style={{
        background: '#FFFFFF',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        {/* Top Colored Line */}
        <div style={{
          height: '6px',
          background: 'linear-gradient(90deg, #708A58 0%, #D4A574 100%)',
          marginBottom: '24px',
          borderRadius: '3px'
        }}></div>

        <h2 className="text-2xl font-bold mb-6" style={{ color: '#2C2C2C', fontFamily: 'Georgia, serif' }}>
          Order Summary
        </h2>

        <div className="space-y-4">
          {products !== null && products.length > 0 ? (
            products.map((product, index) => {
              return (
                <div
                  key={index}
                  className="p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: '#FAF8F5',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <img
                      onClick={(e) => history.push(`/products/${product._id}`)}
                      className="w-20 h-20 rounded-xl object-cover cursor-pointer transition-transform duration-300 hover:scale-110"
                      style={{ border: '2px solid #F0F0F0' }}
                      src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                      alt={product.pName}
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-2" style={{ color: '#2C2C2C' }}>
                        {product.pName}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span style={{ color: '#666666' }}>Price: </span>
                          <span style={{ color: '#708A58', fontWeight: '600' }}>Rs. {product.pPrice}</span>
                        </div>
                        <div>
                          <span style={{ color: '#666666' }}>Qty: </span>
                          <span style={{ color: '#708A58', fontWeight: '600' }}>{quantity(product._id)}</span>
                        </div>
                        <div className="col-span-2">
                          <span style={{ color: '#666666' }}>Subtotal: </span>
                          <span style={{ color: '#D4A574', fontWeight: '700', fontSize: '16px' }}>
                            Rs. {subTotal(product._id, product.pPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <svg
                className="w-16 h-16 mb-4"
                style={{ color: '#D4D4D4' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-lg font-semibold" style={{ color: '#2C2C2C' }}>
                No products found
              </p>
            </div>
          )}
        </div>

        {/* Total */}
        {products && products.length > 0 && (
          <div className="mt-6 pt-6" style={{ borderTop: '2px solid #F0F0F0' }}>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold" style={{ color: '#2C2C2C' }}>
                Total Amount
              </span>
              <span className="text-2xl font-bold" style={{ color: '#708A58' }}>
                Rs. {totalCost()}
              </span>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;
