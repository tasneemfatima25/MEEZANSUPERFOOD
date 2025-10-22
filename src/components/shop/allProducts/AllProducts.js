import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../layout";
import { getAllProduct } from "../../admin/products/FetchApi";

const apiURL = process.env.REACT_APP_API_URL;

const ProductCard = ({ product, history }) => {
  return (
    <div
      onClick={() => history.push(`/products/${product._id}`)}
      className="relative group cursor-pointer"
    >
      {/* Main Card with 3D Effect */}
      <div
        className="relative transition-all duration-500 transform group-hover:translate-y-[-8px] group-hover:shadow-2xl"
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}
      >
        {/* Top Colored Line */}
        <div style={{
          height: '6px',
          background: 'linear-gradient(90deg, #708A58 0%, #708A58 100%)'
        }}></div>

        {/* Image Container */}
        <div className="relative overflow-hidden" style={{ borderRadius: '0' }}>
          <img
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
            src={`${apiURL}/uploads/products/${product.pImages[0]}`}
            alt={product.pName}
          />

          {/* Gradient Overlay on Hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(168,197,160,0.15) 100%)'
            }}
          />

          {/* Offer Badge */}
          {product.pOffer && product.pOffer !== "0" && (
            <div
              className="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #D4A574 0%, #C9B896 100%)',
                borderRadius: '20px',
                boxShadow: '0 4px 15px rgba(212,165,116,0.4)'
              }}>
              {product.pOffer}% OFF
            </div>
          )}

          {/* Out of Stock Overlay */}
          {product.pStatus === "Inactive" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
              <span
                className="text-white font-bold px-4 py-2"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}>
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3
            className="font-bold text-xl mb-2 truncate"
            style={{
              color: '#2C2C2C',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
            {product.pName}
          </h3>

          <p className="text-sm text-gray-500 mb-5 truncate">
            {product.pDescription}
          </p>

          {/* Price and Button Row */}
          <div className="flex items-center justify-between">
            <div>
              <div
                className="text-2xl font-bold"
                style={{
                  color: '#D4A574',
                  fontFamily: 'Georgia, serif'
                }}>
                INR{product.pPrice}
              </div>
              {product.pOffer && product.pOffer !== "0" && (
                <div className="text-xs text-gray-400 line-through">
                  INR{Math.round(product.pPrice / (1 - product.pOffer / 100))}
                </div>
              )}
            </div>

            <button
              className="px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: '#708A58',
                borderRadius: '25px',
                boxShadow: '0 4px 15px rgba(168,197,160,0.3)'
              }}>
              View
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Shadow for 3D Depth */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 h-2 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)',
          filter: 'blur(10px)',
          transform: 'translateX(-50%) translateY(8px)'
        }}
      />
    </div>
  );
};

const ProductList = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      {/* Hero Section with 3D Text */}
      <section
        className="relative pt-32 pb-20 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)'
        }}>

        {/* Decorative Background Elements */}
        <div
          className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #708A58 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        <div
          className="absolute bottom-10 left-10 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #D4A574 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{
              color: '#2C2C2C',
              textShadow: '0 2px 8px rgba(0,0,0,0.08)',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.5px'
            }}>
            Our Products
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-6"
            style={{
              color: '#666666',
              textShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
            Discover our premium collection of natural and nutritious products
          </p>

          <div
            className="inline-block px-5 py-2 text-sm font-semibold"
            style={{
              background: '#708A58',
              color: '#FFFFFF',
              borderRadius: '25px',
              border: '1px solid rgba(168,197,160,0.3)',
              boxShadow: '0 4px 15px rgba(168,197,160,0.3)'
            }}>
            {products ? products.length : 0} Products Available
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section
        className="py-16 px-6"
        style={{
          background: 'linear-gradient(180deg, #FAF8F5 0%, #F5F5F5 100%)'
        }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products && products.length > 0 ? (
              products.map((item, index) => (
                <ProductCard key={index} product={item} history={history} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }}>
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-400">
                  No products found
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const AllProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      let responseData = await getAllProduct();
      if (responseData && responseData.Products) {
        setProducts(responseData.Products);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div
          className="flex items-center justify-center h-screen"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF8F5 100%)'
          }}>
          <div className="text-center">
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full animate-spin"
              style={{
                border: '3px solid rgba(168,197,160,0.2)',
                borderTopColor: '#708A58'
              }}
            />
            <p
              className="text-xl font-semibold"
              style={{
                color: '#4A4A4A',
                textShadow: '0 1px 4px rgba(0,0,0,0.1)'
              }}>
              Loading Products...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProductList products={products} />
    </Layout>
  );
};

export default AllProductsPage;
