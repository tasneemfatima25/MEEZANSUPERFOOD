import React, { Fragment, useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../layout";
import { LayoutContext } from "../layout";
import { productByCategory } from "../../admin/products/FetchApi";
import { cartListProduct } from "../partials/FetchApi";
import { totalCost } from "../partials/Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const Submenu = ({ category }) => {
  const history = useHistory();
  return (
    <Fragment>
      {/* Breadcrumb Section */}
      <section className="px-6 pt-24 pb-12 md:px-12 md:pt-32 lg:pt-28" style={{
        background: 'linear-gradient(180deg, #F5F9F3 0%, #FFFFFF 100%)'
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 text-base md:text-lg mb-6">
            <span
              className="cursor-pointer transition-colors duration-200 hover:underline font-medium"
              style={{ color: '#708A58' }}
              onClick={(e) => history.push("/")}
            >
              Home
            </span>
            <span style={{ color: '#D4A574', fontSize: '20px' }}>›</span>
            <span className="font-semibold" style={{ color: '#2C2C2C' }}>{category}</span>
          </div>

          {/* Category Title */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{
              color: '#2C2C2C',
              fontFamily: 'Georgia, serif',
              lineHeight: '1.2'
            }}>
              {category}
            </h1>
            <div style={{
              width: '100px',
              height: '5px',
              background: 'linear-gradient(90deg, #708A58 0%, #D4A574 100%)',
              borderRadius: '3px',
              marginBottom: '20px'
            }}></div>

            {/* Engaging Description */}
            <p className="text-lg md:text-xl leading-relaxed mb-4" style={{
              color: '#4A4A4A',
              maxWidth: '900px',
              lineHeight: '1.8'
            }}>
              Discover the wholesome goodness of our premium <span className="font-semibold" style={{ color: '#708A58' }}>{category}</span> collection.
              Each product is carefully selected to bring you the finest quality, nutritional value, and authentic taste
              that Meezan Super Food is known for.
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2" style={{
                background: 'rgba(112,138,88,0.1)',
                borderRadius: '25px',
                border: '1px solid rgba(112,138,88,0.2)'
              }}>
                <svg className="w-5 h-5" style={{ color: '#708A58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold" style={{ color: '#708A58' }}>100% Natural</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2" style={{
                background: 'rgba(212,165,116,0.1)',
                borderRadius: '25px',
                border: '1px solid rgba(212,165,116,0.2)'
              }}>
                <svg className="w-5 h-5" style={{ color: '#D4A574' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-semibold" style={{ color: '#D4A574' }}>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2" style={{
                background: 'rgba(112,138,88,0.1)',
                borderRadius: '25px',
                border: '1px solid rgba(112,138,88,0.2)'
              }}>
                <svg className="w-5 h-5" style={{ color: '#708A58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold" style={{ color: '#708A58' }}>Fresh & Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const AllProduct = ({ products }) => {
  const history = useHistory();
  const { dispatch } = useContext(LayoutContext);
  const [cartItems, setCartItems] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const category =
    products && products.length > 0 ? products[0].pCategory.cName : "";

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  useEffect(() => {
    if (products) {
      applyFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, sortBy, priceRange, availability, searchQuery]);

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(p =>
        p.pName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.pDescription && p.pDescription.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by price range
    if (priceRange !== "all") {
      if (priceRange === "0-500") {
        filtered = filtered.filter(p => p.pPrice <= 500);
      } else if (priceRange === "500-1000") {
        filtered = filtered.filter(p => p.pPrice > 500 && p.pPrice <= 1000);
      } else if (priceRange === "1000-2000") {
        filtered = filtered.filter(p => p.pPrice > 1000 && p.pPrice <= 2000);
      } else if (priceRange === "2000+") {
        filtered = filtered.filter(p => p.pPrice > 2000);
      }
    }

    // Filter by availability
    if (availability === "instock") {
      filtered = filtered.filter(p => p.pQuantity > 0);
    } else if (availability === "outofstock") {
      filtered = filtered.filter(p => p.pQuantity <= 0);
    }

    // Sort products
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.pPrice - b.pPrice);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.pPrice - a.pPrice);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.pName.localeCompare(b.pName));
    }

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setSortBy("default");
    setPriceRange("all");
    setAvailability("all");
    setSearchQuery("");
  };

  return (
    <Fragment>
      <Submenu category={category} />
      <section className="px-6 pb-24" style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)'
      }}>
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 text-base rounded-2xl transition-all duration-300"
                style={{
                  border: '2px solid #E5E7EB',
                  color: '#2C2C2C',
                  outline: 'none',
                  background: '#FFFFFF',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#708A58';
                  e.target.style.boxShadow = '0 4px 20px rgba(112,138,88,0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
              />
              <svg
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: '#708A58' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" style={{ color: '#666666' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filters Section */}
          <div className="mb-10">
            <div className="p-8" style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAF9 100%)',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(112,138,88,0.15)',
              border: '2px solid rgba(112,138,88,0.1)'
            }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4" style={{
                borderBottom: '2px solid rgba(112,138,88,0.2)'
              }}>
                <div className="flex items-center gap-3">
                  <div style={{
                    width: '6px',
                    height: '32px',
                    background: 'linear-gradient(180deg, #708A58 0%, #D4A574 100%)',
                    borderRadius: '3px'
                  }}></div>
                  <h3 className="font-bold text-2xl" style={{
                    color: '#2C2C2C',
                    fontFamily: 'Georgia, serif'
                  }}>
                    Refine Your Search
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold" style={{ color: '#708A58' }}>
                    {filteredProducts.length}
                  </span>
                  <span className="text-sm" style={{ color: '#666666' }}>
                    of {products ? products.length : 0} products
                  </span>
                </div>
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-bold mb-3" style={{ color: '#2C2C2C' }}>
                    <svg className="inline w-4 h-4 mr-2" style={{ color: '#708A58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300"
                    style={{
                      border: '2px solid #E5E7EB',
                      color: '#2C2C2C',
                      cursor: 'pointer',
                      outline: 'none',
                      background: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#708A58'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  >
                    <option value="default">Default Order</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-bold mb-3" style={{ color: '#2C2C2C' }}>
                    <svg className="inline w-4 h-4 mr-2" style={{ color: '#D4A574' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300"
                    style={{
                      border: '2px solid #E5E7EB',
                      color: '#2C2C2C',
                      cursor: 'pointer',
                      outline: 'none',
                      background: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#D4A574'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  >
                    <option value="all">All Prices</option>
                    <option value="0-500">Under Rs. 500</option>
                    <option value="500-1000">Rs. 500 - Rs. 1,000</option>
                    <option value="1000-2000">Rs. 1,000 - Rs. 2,000</option>
                    <option value="2000+">Above Rs. 2,000</option>
                  </select>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-bold mb-3" style={{ color: '#2C2C2C' }}>
                    <svg className="inline w-4 h-4 mr-2" style={{ color: '#708A58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Availability
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300"
                    style={{
                      border: '2px solid #E5E7EB',
                      color: '#2C2C2C',
                      cursor: 'pointer',
                      outline: 'none',
                      background: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#708A58'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  >
                    <option value="all">All Products</option>
                    <option value="instock">In Stock</option>
                    <option value="outofstock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex justify-end">
                <button
                  onClick={resetFilters}
                  className="px-8 py-3 text-sm font-bold rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #708A58 0%, #5A7A55 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(112,138,88,0.3)'
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="group cursor-pointer transition-all duration-300"
                    style={{
                      background: '#FFFFFF',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Top Colored Line */}
                    <div style={{
                      height: '6px',
                      background: `linear-gradient(90deg, ${index % 2 === 0 ? '#708A58' : '#D4A574'} 0%, ${index % 2 === 0 ? '#708A58' : '#D4A574'} 100%)`
                    }}></div>

                    {/* Product Image */}
                    <div
                      className="relative overflow-hidden"
                      onClick={() => history.push(`/products/${product._id}`)}
                    >
                      <img
                        className="w-full h-64 object-cover"
                        src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                        alt={product.pName}
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

                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <svg
                          className="w-5 h-5 fill-current"
                          style={{ color: '#D4A574' }}
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span className="ml-2 text-sm" style={{ color: '#666666' }}>
                          ({product.pRatings ? product.pRatings.length : 0})
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold" style={{ color: '#D4A574' }}>
                          Rs. {product.pPrice}
                        </span>
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();

                            if (product.pQuantity <= 0) {
                              return;
                            }

                            const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
                            const existingItemIndex = currentCart.findIndex(item => item.id === product._id);

                            let updatedCart;

                            if (existingItemIndex !== -1) {
                              const currentQty = currentCart[existingItemIndex].quantitiy;

                              if (currentQty >= product.pQuantity) {
                                return;
                              }

                              updatedCart = [...currentCart];
                              updatedCart[existingItemIndex] = {
                                ...updatedCart[existingItemIndex],
                                quantitiy: currentQty + 1
                              };
                            } else {
                              const newCartItem = {
                                id: product._id,
                                quantitiy: 1,
                                price: product.pPrice
                              };
                              updatedCart = [...currentCart, newCartItem];
                            }

                            localStorage.setItem("cart", JSON.stringify(updatedCart));
                            setCartItems(updatedCart);

                            const cartIds = updatedCart.map(item => item.id);
                            dispatch({ type: "inCart", payload: cartIds });

                            try {
                              const responseData = await cartListProduct();
                              if (responseData && responseData.Products) {
                                dispatch({ type: "cartProduct", payload: responseData.Products });
                                dispatch({ type: "cartTotalCost", payload: totalCost() });
                              }
                            } catch (error) {
                              console.log("Error updating cart:", error);
                            }
                          }}
                          disabled={product.pQuantity <= 0}
                          className="px-5 py-2 text-sm font-semibold"
                          style={{
                            background: 'transparent',
                            border: product.pQuantity <= 0 ? '2px solid #EF4444' : '2px solid #708A58',
                            color: product.pQuantity <= 0 ? '#EF4444' : '#708A58',
                            cursor: product.pQuantity <= 0 ? 'not-allowed' : 'pointer',
                            opacity: product.pQuantity <= 0 ? '0.8' : '1'
                          }}>
                          {product.pQuantity <= 0
                            ? 'Out of Stock'
                            : (() => {
                                const cartItem = cartItems.find(item => item.id === product._id);
                                return cartItem ? 'Add to Cart +1' : 'Add to Cart';
                              })()
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-24">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-2xl font-semibold" style={{ color: '#2C2C2C' }}>No Products Found</p>
                <p className="text-lg mt-2" style={{ color: '#666666' }}>Try browsing other categories</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const PageComponent = () => {
  const [products, setProducts] = useState(null);
  const { catId } = useParams();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await productByCategory(catId);
      if (responseData && responseData.Products) {
        setProducts(responseData.Products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <AllProduct products={products} />
    </Fragment>
  );
};

const ProductByCategory = (props) => {
  return (
    <Fragment>
      <Layout children={<PageComponent />} />
    </Fragment>
  );
};

export default ProductByCategory;
