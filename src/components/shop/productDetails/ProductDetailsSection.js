import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailsContext } from "./index";
import { LayoutContext } from "../layout";
import Submenu from "./Submenu";
import ProductDetailsSectionTwo from "./ProductDetailsSectionTwo";

import { getSingleProduct } from "./FetchApi";
import { cartListProduct } from "../partials/FetchApi";

import { isWishReq, unWishReq, isWish } from "../home/Mixins";
import { updateQuantity, slideImage, addToCart, cartList } from "./Mixins";
import { totalCost } from "../partials/Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const ProductDetailsSection = (props) => {
  let { id } = useParams();

  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData, dispatch: layoutDispatch } =
    useContext(LayoutContext); // Layout Context

  const sProduct = layoutData.singleProductDetail;
  const [pImages, setPimages] = useState(null);
  const [count, setCount] = useState(0); // Slide change state

  const [quantitiy, setQuantitiy] = useState(1); // Increse and decrese quantity state
  const [, setAlertq] = useState(false); // Alert when quantity greater than stock

  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  ); // Wishlist State Control

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getSingleProduct(id);
      setTimeout(() => {
        if (responseData.Product) {
          layoutDispatch({
            type: "singleProductDetail",
            payload: responseData.Product,
          }); // Dispatch in layout context
          setPimages(responseData.Product.pImages);
          dispatch({ type: "loading", payload: false });
          layoutDispatch({ type: "inCart", payload: cartList() }); // This function change cart in cart state
        }
        if (responseData.error) {
          console.log(responseData.error);
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
    fetchCartProduct(); // Updating cart total
  };

  const fetchCartProduct = async () => {
    try {
      let responseData = await cartListProduct();
      if (responseData && responseData.Products) {
        layoutDispatch({ type: "cartProduct", payload: responseData.Products }); // Layout context Cartproduct fetch and dispatch
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ background: '#FFFFFF' }}>
        <svg
          className="w-12 h-12 animate-spin"
          style={{ color: '#708A58' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  } else if (!sProduct) {
    return <div className="text-center py-20" style={{ color: '#2C2C2C', background: '#FFFFFF' }}>No product found</div>;
  }
  return (
    <Fragment>
      <Submenu
        value={{
          categoryId: sProduct.pCategory._id,
          product: sProduct.pName,
          category: sProduct.pCategory.cName,
        }}
      />
      <section className="py-12 px-4 md:px-12" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden" style={{
                background: '#FFFFFF',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                {/* Top Colored Line */}
                <div style={{
                  height: '6px',
                  background: 'linear-gradient(90deg, #708A58 0%, #D4A574 100%)'
                }}></div>

                <img
                  className="w-full h-96 object-cover"
                  src={`${apiURL}/uploads/products/${sProduct.pImages[count]}`}
                  alt="Product"
                />

                {/* Navigation Arrows */}
                <div className="absolute inset-0 flex justify-between items-center px-4">
                  <button
                    onClick={(e) => slideImage("decrease", null, count, setCount, pImages)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      style={{ color: '#2C2C2C' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => slideImage("increase", null, count, setCount, pImages)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      style={{ color: '#2C2C2C' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-4">
                {sProduct.pImages && sProduct.pImages.slice(0, 2).map((image, idx) => (
                  <img
                    key={idx}
                    onClick={(e) => slideImage("increase", idx, count, setCount, pImages)}
                    className={`${count === idx ? 'opacity-100 ring-4' : 'opacity-50'} cursor-pointer w-24 h-24 object-cover rounded-xl transition-all duration-300 hover:opacity-100`}
                    style={{
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      ringColor: '#708A58'
                    }}
                    src={`${apiURL}/uploads/products/${image}`}
                    alt={`Thumbnail ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              {/* Product Name & Wishlist */}
              <div className="flex justify-between items-start">
                <h1 className="text-4xl font-bold" style={{ color: '#2C2C2C', fontFamily: 'Georgia, serif' }}>
                  {sProduct.pName}
                </h1>
                <button className="transition-all duration-300 hover:scale-110">
                  <svg
                    onClick={(e) => isWishReq(e, sProduct._id, setWlist)}
                    className={`${isWish(sProduct._id, wList) && "hidden"} w-7 h-7 cursor-pointer`}
                    style={{ color: '#D4A574' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <svg
                    onClick={(e) => unWishReq(e, sProduct._id, setWlist)}
                    className={`${!isWish(sProduct._id, wList) && "hidden"} w-7 h-7 cursor-pointer`}
                    style={{ color: '#D4A574' }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold" style={{ color: '#D4A574' }}>
                Rs. {sProduct.pPrice}
              </div>

              {/* Description */}
              <div className="text-lg leading-relaxed" style={{ color: '#666666' }}>
                {sProduct.pDescription}
              </div>

              {/* Stock Warning */}
              {+quantitiy === +sProduct.pQuantity && (
                <div className="px-4 py-2 rounded-lg text-sm font-semibold" style={{
                  background: 'rgba(255, 107, 107, 0.1)',
                  color: '#ff6b6b'
                }}>
                  ⚠ Stock limited - Only {sProduct.pQuantity} items remaining
                </div>
              )}

              {/* Quantity Selector */}
              <div className="p-6 rounded-2xl" style={{
                background: '#FFFFFF',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                border: `2px solid ${+quantitiy === +sProduct.pQuantity ? '#ff6b6b' : 'rgba(112, 138, 88, 0.3)'}`
              }}>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold" style={{ color: +quantitiy === +sProduct.pQuantity ? '#ff6b6b' : '#2C2C2C' }}>
                    Quantity
                  </span>

                  {/* Quantity Controls */}
                  {sProduct.pQuantity !== 0 ? (
                    <Fragment>
                      {layoutData.inCart == null || (layoutData.inCart !== null && layoutData.inCart.includes(sProduct._id) === false) ? (
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={(e) => updateQuantity("decrease", sProduct.pQuantity, quantitiy, setQuantitiy, setAlertq)}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            style={{
                              background: 'rgba(112, 138, 88, 0.2)',
                              color: '#2C2C2C'
                            }}
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <span className="text-2xl font-bold" style={{ color: '#2C2C2C', minWidth: '40px', textAlign: 'center' }}>
                            {quantitiy}
                          </span>
                          <button
                            onClick={(e) => updateQuantity("increase", sProduct.pQuantity, quantitiy, setQuantitiy, setAlertq)}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            style={{
                              background: 'rgba(112, 138, 88, 0.2)',
                              color: '#2C2C2C'
                            }}
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4 opacity-50">
                          <button disabled className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(112, 138, 88, 0.2)', color: '#2C2C2C' }}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <span className="text-2xl font-bold" style={{ color: '#2C2C2C', minWidth: '40px', textAlign: 'center' }}>{quantitiy}</span>
                          <button disabled className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(112, 138, 88, 0.2)', color: '#2C2C2C' }}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </Fragment>
                  ) : (
                    <div className="flex items-center space-x-4 opacity-50">
                      <button disabled className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(112, 138, 88, 0.2)', color: '#2C2C2C' }}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <span className="text-2xl font-bold" style={{ color: '#2C2C2C', minWidth: '40px', textAlign: 'center' }}>{quantitiy}</span>
                      <button disabled className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(112, 138, 88, 0.2)', color: '#2C2C2C' }}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              {sProduct.pQuantity !== 0 ? (
                <Fragment>
                  {layoutData.inCart !== null && layoutData.inCart.includes(sProduct._id) === true ? (
                    <button
                      disabled
                      className="w-full py-4 rounded-full text-white text-lg font-semibold uppercase cursor-not-allowed opacity-75"
                      style={{
                        background: '#708A58',
                        boxShadow: '0 4px 15px rgba(168,197,160,0.3)'
                      }}
                    >
                      ✓ In Cart
                    </button>
                  ) : (
                    <button
                      onClick={(e) => addToCart(sProduct._id, quantitiy, sProduct.pPrice, layoutDispatch, setQuantitiy, setAlertq, fetchData, totalCost)}
                      className="w-full py-4 rounded-full text-white text-lg font-semibold uppercase transition-all duration-300 hover:scale-105"
                      style={{
                        background: '#708A58',
                        boxShadow: '0 4px 15px rgba(168,197,160,0.4)'
                      }}
                    >
                      Add to Cart
                    </button>
                  )}
                </Fragment>
              ) : (
                <button
                  disabled
                  className="w-full py-4 rounded-full text-white text-lg font-semibold uppercase cursor-not-allowed opacity-50"
                  style={{
                    background: '#999999',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }}
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Product Details Section two */}
      <ProductDetailsSectionTwo />
    </Fragment>
  );
};

export default ProductDetailsSection;
