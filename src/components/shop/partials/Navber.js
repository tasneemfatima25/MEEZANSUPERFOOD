import React, { Fragment, useContext, useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { logout } from "./Action";
import { LayoutContext } from "../index";
import { isAdmin } from "../auth/fetchApi";
import { ShoppingCart, User } from "lucide-react";
import "./style.css";

const Navber = () => {
  const history = useHistory();
  const location = useLocation();
  const { data, dispatch } = useContext(LayoutContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleHamburger = () =>
    dispatch({ type: "hamburgerToggle", payload: !data.navberHamburger });
  const toggleLoginModal = () =>
    dispatch({ type: "loginSignupModalToggle", payload: !data.loginSignupModal });
  const toggleCartModal = () =>
    dispatch({ type: "cartModalToggle", payload: !data.cartModal });

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact-us" },
  ];

  return (
    <Fragment>
      {/* Top Offer Bar */}
<div className="fixed top-0 left-0 w-full z-40 bg-[#708A58] text-white text-sm font-medium text-center py-2 overflow-hidden whitespace-nowrap">
  <div className="inline-block animate-[marquee_15s_linear_infinite]">
    🎉 Free Delivery on Orders Above ₹499 • Use Code <span className="font-semibold">MEEZAN10</span> for 10% OFF • New Arrivals Available Now 🚚
  </div>
</div>
      <nav
        className="fixed mt-8 w-full z-30 transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex-shrink-0 font-bold text-3xl cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                color: '#2C2C2C',
                textShadow: '0 2px 10px rgba(168,197,160,0.3)',
                fontFamily: 'Georgia, serif'
              }}
              onClick={() => history.push("/")}
            >
              MEEZAN SUPER FOOD
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex space-x-2">
              {navLinks.map((link) => (
                <span
                  key={link.path}
                  className="px-5 py-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: location.pathname === link.path ? '#708A58' : 'transparent',
                    color: location.pathname === link.path ? '#FFFFFF' : '#2C2C2C',
                    fontWeight: location.pathname === link.path ? '600' : '500',
                    boxShadow: location.pathname === link.path ? '0 4px 15px rgba(168,197,160,0.4)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== link.path) {
                      e.target.style.backgroundColor = 'rgba(112, 138, 88, 0.2)';
                      e.target.style.color = '#2C2C2C';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== link.path) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#2C2C2C';
                    }
                  }}
                  onClick={() => history.push(link.path)}
                >
                  {link.name}
                </span>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {localStorage.getItem("jwt") ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: 'rgba(112, 138, 88, 0.2)',
                      color: '#2C2C2C',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}
                  >
                    <User className="w-5 h-5" />
                  </button>
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl py-2" style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                      border: '1px solid rgba(112, 138, 88, 0.3)'
                    }}>
                      {!isAdmin() ? (
                        <>
                          <span
                            onClick={() => history.push("/user/orders")}
                            className="block px-4 py-2 cursor-pointer transition-all duration-200"
                            style={{ color: '#2C2C2C' }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'rgba(112, 138, 88, 0.2)';
                              e.target.style.color = '#2C2C2C';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#2C2C2C';
                            }}
                          >
                            My Orders
                          </span>
                          <span
                            onClick={() => history.push("/user/profile")}
                            className="block px-4 py-2 cursor-pointer transition-all duration-200"
                            style={{ color: '#2C2C2C' }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'rgba(112, 138, 88, 0.2)';
                              e.target.style.color = '#2C2C2C';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#2C2C2C';
                            }}
                          >
                            My Account
                          </span>
                          <span
                            onClick={() => logout()}
                            className="block px-4 py-2 cursor-pointer transition-all duration-200"
                            style={{ color: '#ff6b6b' }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                            }}
                          >
                            Logout
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            onClick={() => history.push("/admin/dashboard")}
                            className="block px-4 py-2 cursor-pointer transition-all duration-200"
                            style={{ color: '#2C2C2C' }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'rgba(112, 138, 88, 0.2)';
                              e.target.style.color = '#2C2C2C';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#2C2C2C';
                            }}
                          >
                            Admin Panel
                          </span>
                          <span
                            onClick={() => logout()}
                            className="block px-4 py-2 cursor-pointer transition-all duration-200"
                            style={{ color: '#ff6b6b' }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                            }}
                          >
                            Logout
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={toggleLoginModal}
                  className="px-5 py-2 rounded-full transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: '#708A58',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 15px rgba(112, 138, 88, 0.4)'
                  }}
                >
                  Login
                </button>
              )}

              {/* Cart */}
              <div
                onClick={toggleCartModal}
                className="relative cursor-pointer transition-all duration-300 hover:scale-110"
                style={{ color: '#2C2C2C' }}
              >
                <ShoppingCart className="w-7 h-7" />
                <span className="absolute -top-1 -right-1 text-white text-xs px-2 py-0.5 rounded-full" style={{
                  backgroundColor: '#D4A574',
                  boxShadow: '0 2px 8px rgba(212, 165, 116, 0.5)'
                }}>
                  {data.cartProduct?.length || 0}
                </span>
              </div>

              {/* Hamburger */}
              <div className="lg:hidden">
                <button onClick={toggleHamburger}>
                  <svg
                    className="w-7 h-7"
                    style={{ color: '#2C2C2C' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {data.navberHamburger && (
          <div className="lg:hidden px-4 pt-2 pb-4 space-y-1" style={{
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid rgba(112, 138, 88, 0.2)'
          }}>
            {navLinks.map((link) => (
              <span
                key={link.path}
                onClick={() => history.push(link.path)}
                className="block px-4 py-2 rounded-xl cursor-pointer transition-all duration-200"
                style={{
                  backgroundColor: location.pathname === link.path ? '#708A58' : 'transparent',
                  color: location.pathname === link.path ? '#FFFFFF' : '#2C2C2C',
                  fontWeight: location.pathname === link.path ? '600' : '500'
                }}
              >
                {link.name}
              </span>
            ))}
          </div>
        )}
      </nav>
    </Fragment>
  );
};

export default Navber;
