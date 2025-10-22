import React, { Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../index";
import { cartListProduct } from "./FetchApi";
import { isAuthenticate } from "../auth/fetchApi";
import { cartList } from "../productDetails/Mixins";
import { subTotal, quantity, totalCost } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const CartModal = () => {
  const history = useHistory();

  const { data, dispatch } = useContext(LayoutContext);
  const products = data.cartProduct;

  const cartModalOpen = () =>
    dispatch({ type: "cartModalToggle", payload: !data.cartModal });

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await cartListProduct();
      if (responseData && responseData.Products) {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "cartTotalCost", payload: totalCost() });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartProduct = (id) => {
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    if (cart.length !== 0) {
      cart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      fetchData();
      dispatch({ type: "inCart", payload: cartList() });
      dispatch({ type: "cartTotalCost", payload: totalCost() });
    }
    if (cart.length === 0) {
      dispatch({ type: "cartProduct", payload: null });
      fetchData();
      dispatch({ type: "inCart", payload: cartList() });
    }
  };

  return (
    <Fragment>
      {/* Overlay */}
      <div
        onClick={cartModalOpen}
        className={`${
          !data.cartModal ? "hidden" : ""
        } fixed top-0 z-30 w-full h-full bg-black opacity-50 transition-opacity duration-300`}
      />
      {/* Cart Modal Start */}
      <section
        className={`${
          !data.cartModal ? "hidden" : ""
        } fixed z-40 inset-0 flex items-start justify-end`}
      >
        <div
          style={{
            background: '#FFFFFF',
            boxShadow: '-4px 0 20px rgba(0,0,0,0.15)'
          }}
          className="w-full md:w-5/12 lg:w-4/12 h-full flex flex-col justify-between animate-slide-in"
        >
          {/* Header */}
          <div className="p-6 flex justify-between items-center" style={{
            borderBottom: '2px solid #F0F0F0'
          }}>
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6"
                style={{ color: '#708A58' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h2 className="text-2xl font-bold" style={{ color: '#2C2C2C', fontFamily: 'Georgia, serif' }}>
                Shopping Cart
              </h2>
            </div>
            {/* Close Button */}
            <button
              onClick={cartModalOpen}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(112, 138, 88, 0.1)',
                color: '#708A58'
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Products List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ background: '#FAF8F5' }}>
            {products && products.length !== 0 ? (
              products.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: '#FFFFFF',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  {/* Top Colored Line */}
                  <div style={{
                    height: '4px',
                    background: 'linear-gradient(90deg, #708A58 0%, #D4A574 100%)',
                    marginBottom: '16px',
                    borderRadius: '2px'
                  }}></div>

                  <div className="flex space-x-4">
                    {/* Product Image */}
                    <img
                      className="w-20 h-20 rounded-xl object-cover"
                      style={{ border: '2px solid #F0F0F0' }}
                      src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                      alt={item.pName}
                    />

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-base mb-1" style={{ color: '#2C2C2C' }}>
                          {item.pName}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm">
                          <span style={{ color: '#666666' }}>
                            Qty: <span style={{ color: '#708A58', fontWeight: '600' }}>{quantity(item._id)}</span>
                          </span>
                          <span style={{ color: '#666666' }}>•</span>
                          <span style={{ color: '#D4A574', fontWeight: '700' }}>
                            Rs. {subTotal(item._id, item.pPrice)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeCartProduct(item._id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{
                        background: 'rgba(255, 107, 107, 0.1)',
                        color: '#ff6b6b'
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <svg
                  className="w-24 h-24 mb-4"
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
                <p className="text-xl font-semibold mb-2" style={{ color: '#2C2C2C' }}>
                  Your cart is empty
                </p>
                <p className="text-sm" style={{ color: '#666666' }}>
                  Add some products to get started!
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 space-y-4" style={{
            borderTop: '2px solid #F0F0F0',
            background: '#FFFFFF'
          }}>
            {/* Total */}
            {data.cartTotalCost && (
              <div className="flex justify-between items-center px-4 py-3 rounded-xl" style={{
                background: '#FAF8F5'
              }}>
                <span className="text-lg font-semibold" style={{ color: '#2C2C2C' }}>
                  Total
                </span>
                <span className="text-2xl font-bold" style={{ color: '#708A58' }}>
                  Rs. {data.cartTotalCost}
                </span>
              </div>
            )}

            {/* Buttons */}
            <button
              onClick={cartModalOpen}
              className="w-full px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105"
              style={{
                background: 'transparent',
                border: '2px solid #708A58',
                color: '#708A58'
              }}
            >
              Continue Shopping
            </button>

            {data.cartTotalCost ? (
              isAuthenticate() ? (
                <button
                  onClick={() => {
                    history.push("/checkout");
                    cartModalOpen();
                  }}
                  className="w-full px-6 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: '#708A58',
                    boxShadow: '0 4px 15px rgba(112,138,88,0.4)'
                  }}
                >
                  Proceed to Checkout
                </button>
              ) : (
                <button
                  onClick={() => {
                    history.push("/");
                    cartModalOpen();
                    dispatch({
                      type: "loginSignupError",
                      payload: !data.loginSignupError,
                    });
                    dispatch({
                      type: "loginSignupModalToggle",
                      payload: !data.loginSignupModal,
                    });
                  }}
                  className="w-full px-6 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: '#708A58',
                    boxShadow: '0 4px 15px rgba(112,138,88,0.4)'
                  }}
                >
                  Login to Checkout
                </button>
              )
            ) : (
              <button
                disabled
                className="w-full px-6 py-4 rounded-full text-white font-bold text-lg opacity-50 cursor-not-allowed"
                style={{
                  background: '#999999'
                }}
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </section>
      {/* Cart Modal End */}
    </Fragment>
  );
};

export default CartModal;
