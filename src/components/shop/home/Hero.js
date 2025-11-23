import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import Layout from "../layout";
import { LayoutContext } from "../layout";
import slide1 from "../../../assets/images/slide1.png"
import slide2 from "../../../assets/images/slide2.png"
import slide3 from "../../../assets/images/slide3.png"
import slide4 from "../../../assets/images/slide4.png"
import { getAllCategory } from "../../admin/categories/FetchApi";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroBanner = () => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const heroSlides = [slide1, slide2, slide3, slide4];

  useEffect(() => {
    fetchCategories();
  }, []);

  // Auto-slide hero images every 4 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  useEffect(() => {
    applyFilters();
  }, [categories, searchQuery, sortBy]);

  const fetchCategories = async () => {
    try {
      let responseData = await getAllCategory();
      if (responseData && responseData.Categories) {
        setCategories(responseData.Categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyFilters = () => {
    let filtered = [...categories];

    // Search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(cat =>
        cat.cName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cat.cDescription && cat.cDescription.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
    if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.cName.localeCompare(b.cName));
    } else if (sortBy === "name-desc") {
      filtered.sort((a, b) => b.cName.localeCompare(a.cName));
    }

    setFilteredCategories(filtered);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSortBy("default");
  };

  return (
    <div className="relative overflow-x-hidden" style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: '#FFFFFF'
    }}>

      {/* Full Screen Background Image Hero Section */}
      <div className="relative h-[800px] w-full overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0" style={{
          backgroundColor: '#FFFFFF'
        }}>
          {heroSlides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Hero Slide ${index + 1}`}
              className="absolute w-full h-full transition-opacity duration-1000"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
                opacity: currentSlide === index ? '0.9' : '0',
                zIndex: currentSlide === index ? 1 : 0
              }}
            />
          ))}
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
              onClick={() => history.push('/products')}
              className="px-12 py-5 rounded-full font-semibold text-lg relative overflow-hidden transition-all duration-200 hover:scale-105 active:translate-y-2 cursor-pointer"
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

      {/* Featured Categories Grid */}
      <div className="relative px-6 pb-24 pt-16" style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F9F3 100%)'
      }}>
        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6" style={{
            color: '#2C2C2C',
            fontFamily: 'Georgia, serif',
            textShadow: '0 2px 12px rgba(0,0,0,0.1)'
          }}>
            Shop by Category
          </h2>
          <p className="text-center text-lg md:text-xl mb-4 px-4" style={{
            color: '#4A4A4A',
            maxWidth: '800px',
            margin: '0 auto 16px',
            lineHeight: '1.7'
          }}>
            Browse our carefully curated categories to find exactly what you need. From ancient grains and superfoods
            to natural sweeteners and premium oils — each category is filled with <span className="font-semibold" style={{ color: '#708A58' }}>quality products</span> that
            bring health and vitality to your table.
          </p>

          <div className="flex justify-center mb-6">
            <div style={{
              width: '120px',
              height: '5px',
              background: 'linear-gradient(90deg, #708A58 0%, #D4A574 100%)',
              borderRadius: '3px'
            }}></div>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="flex items-center gap-2 px-4 py-2" style={{
              background: 'rgba(112,138,88,0.1)',
              borderRadius: '25px',
              border: '1px solid rgba(112,138,88,0.2)'
            }}>
              <svg className="w-4 h-4" style={{ color: '#708A58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold" style={{ color: '#708A58' }}>100% Authentic</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2" style={{
              background: 'rgba(212,165,116,0.1)',
              borderRadius: '25px',
              border: '1px solid rgba(212,165,116,0.2)'
            }}>
              <svg className="w-4 h-4" style={{ color: '#D4A574' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-sm font-semibold" style={{ color: '#D4A574' }}>Trusted Quality</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2" style={{
              background: 'rgba(112,138,88,0.1)',
              borderRadius: '25px',
              border: '1px solid rgba(112,138,88,0.2)'
            }}>
              <svg className="w-4 h-4" style={{ color: '#708A58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm font-semibold" style={{ color: '#708A58' }}>Made with Love</span>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {categories && categories.length > 0 ? (
              categories.map((category, idx) => {
                const apiURL = process.env.REACT_APP_API_URL;
                const imageUrl = category.cImage
                  ? `${apiURL}/uploads/categories/${category.cImage}`
                  : slide1;

                return (
                  <div
                    key={category._id}
                    onClick={() => history.push(`/products/category/${category._id}`)}
                    className="group cursor-pointer transition-all duration-500"
                    style={{
                      background: '#FFFFFF',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                      border: '2px solid rgba(112,138,88,0.1)',
                      overflow: 'hidden',
                      borderRadius: '16px'
                    }}
                  >
                    {/* Category Image with Overlay */}
                    <div className="relative overflow-hidden" style={{ height: '280px' }}>
                      <img
                        src={imageUrl}
                        alt={category.cName}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{
                          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
                          opacity: '0.6'
                        }}
                      ></div>
                      {/* Category Name on Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                        <h3 className="text-3xl font-bold text-white mb-2" style={{
                          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                          fontFamily: 'Georgia, serif'
                        }}>
                          {category.cName}
                        </h3>
                        {category.cDescription && (
                          <p className="text-sm text-white line-clamp-2 opacity-90" style={{
                            textShadow: '0 1px 5px rgba(0,0,0,0.5)'
                          }}>
                            {category.cDescription}
                          </p>
                        )}
                      </div>
                      {/* Decorative Corner */}
                      <div
                        className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: idx % 2 === 0 ? '#708A58' : '#D4A574',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                        }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>

                    {/* Hover Effect Bottom Bar */}
                    <div
                      className="transition-all duration-500 group-hover:scale-x-100"
                      style={{
                        height: '6px',
                        background: `linear-gradient(90deg, ${idx % 2 === 0 ? '#708A58' : '#D4A574'} 0%, ${idx % 2 === 0 ? '#5A7A55' : '#C49564'} 100%)`,
                        transform: 'scaleX(0)',
                        transformOrigin: 'left'
                      }}
                    ></div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">🏷️</div>
                <p className="text-2xl font-semibold" style={{ color: '#2C2C2C' }}>No Categories Available</p>
                <p className="text-lg mt-2" style={{ color: '#666666' }}>Check back soon for new categories</p>
              </div>
            )}
          </div>
        </div>
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
