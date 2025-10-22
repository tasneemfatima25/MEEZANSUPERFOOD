import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import Layout from "../layout";
import { LayoutContext } from "../layout";
import homeImage from "../../../assets/images/try.png"
import { getAllProduct } from "../../admin/products/FetchApi";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroBanner = () => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      let responseData = await getAllProduct();
      if (responseData && responseData.Products) {
        setProducts(responseData.Products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [products]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 + products.length) % products.length);
  };

  const getVisibleProducts = () => {
    if (products.length === 0) return [];
    return products.slice(currentIndex, currentIndex + 6);
  };

  return (
    <div className="relative overflow-x-hidden" style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: '#FFFFFF'
    }}>

      {/* Full Screen Background Image Hero Section */}
      <div className="relative h-[800px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0" style={{
          backgroundColor: '#FAF8F5'
        }}>
          <img
            src={homeImage}
            alt="Home Background"
            className="w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
              transform: 'scale(1.00)',
              opacity: '0.9'
            }}
          />
        </div>

        {/* Text Content Overlay */}
        <div className="relative h-full flex items-center justify-center px-6 z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1
              className="text-7xl text-white md:text-9xl font-bold leading-tight"
              style={{
                textShadow: `
                  2px 2px 0px #46583D,
                  4px 4px 0px #46583D,
                  6px 6px 0px #34482A,
                  8px 8px 0px #34482A,
                  10px 10px 15px rgba(0,0,0,0.6)
                `,
                fontFamily: 'Georgia, serif',
              }}
            >
              Meezan<br />Super Food
            </h1>

            <button
              className="px-12 py-5 rounded-full font-semibold text-lg relative overflow-hidden transition-all duration-200 hover:scale-105 active:translate-y-2"
              style={{
                background: '#708A58',
                color: '#FFFFFF',
                boxShadow: `
                  0 6px 0 #5A7A55,
                  0 12px 20px rgba(90,122,85,0.5)
                `,
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              <span className="relative z-10">Explore Products</span>
              <div
                className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%)',
                }}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products Grid */}
      <div className="relative px-6 pb-24 pt-10" style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)'
      }}>
        <h2 className="text-5xl font-bold text-center mb-4" style={{
          color: '#2C2C2C',
          fontFamily: 'Georgia, serif',
          textShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          Our Products
        </h2>
        <p className="text-center text-lg mb-16" style={{ color: '#666666' }}>
          Discover our handpicked selection of natural and healthy products
        </p>

        {/* Products Grid with Navigation */}
        <div className="relative max-w-7xl mx-auto">
          {/* Previous Button */}
          {products.length > 6 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: '#708A58',
                color: '#FFFFFF',
                boxShadow: '0 4px 15px rgba(112,138,88,0.4)'
              }}
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getVisibleProducts().map((product, idx) => {
            const apiURL = process.env.REACT_APP_API_URL;
            const imageUrl = product.pImages && product.pImages.length > 0
              ? `${apiURL}/uploads/products/${product.pImages[0]}`
              : homeImage;

            return (
              <div
                key={product._id}
                className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2"
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
                  background: `linear-gradient(90deg, ${idx % 2 === 0 ? '#708A58' : '#D4A574'} 0%, ${idx % 2 === 0 ? '#708A58' : '#D4A574'} 100%)`
                }}></div>

                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={product.pName}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {product.pOffer > 0 && (
                    <div
                      className="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white"
                      style={{
                        background: '#D4A574',
                        borderRadius: '20px',
                        boxShadow: '0 4px 15px rgba(212,165,116,0.4)'
                      }}>
                      {product.pOffer}% OFF
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 truncate" style={{ color: '#2C2C2C' }}>
                    {product.pName}
                  </h3>
                  <p className="text-sm mb-4 line-clamp-2" style={{ color: '#666666' }}>
                    {product.pDescription}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold" style={{ color: '#D4A574' }}>
                      Rs. {product.pPrice}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        let cart = JSON.parse(localStorage.getItem("cart")) || [];
                        const isInCart = cart.find(item => item.id === product._id);

                        if (!isInCart) {
                          cart.push({
                            id: product._id,
                            quantitiy: 1,
                            price: product.pPrice
                          });
                          localStorage.setItem("cart", JSON.stringify(cart));
                          dispatch({ type: "addToCart", payload: cart });
                          dispatch({ type: "cartProduct", payload: products });
                        }
                      }}
                      className="px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                      style={{
                        background: '#708A58',
                        borderRadius: '25px',
                        boxShadow: '0 4px 15px rgba(112,138,88,0.3)'
                      }}>
                      {data.inCart && data.inCart.includes(product._id) ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>

          {/* Next Button */}
          {products.length > 6 && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: '#708A58',
                color: '#FFFFFF',
                boxShadow: '0 4px 15px rgba(112,138,88,0.4)'
              }}
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}
        </div>

        {/* View More Button - Show only if more than 6 products */}
        {products.length > 6 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => history.push('/products')}
              className="px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{
                background: '#708A58',
                color: '#FFFFFF',
                boxShadow: '0 4px 15px rgba(168,197,160,0.4)'
              }}
            >
              View More Products
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const HomePage = () => {
  return (
    <Fragment>
      <Layout children={<HeroBanner />} />
    </Fragment>
  );
};

export default HomePage
