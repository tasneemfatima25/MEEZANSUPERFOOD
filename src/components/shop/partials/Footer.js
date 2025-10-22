import React, { Fragment } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = (props) => {
  const history = useHistory();

  const handleQuickLinkClick = (link) => {
    if (link === 'Home') history.push('/');
    else if (link === 'Products') history.push('/products');
    else if (link === 'About Us') history.push('/about');
    else if (link === 'Contact') history.push('/contact-us');
  };

  const handleCustomerServiceClick = (link) => {
    if (link === 'FAQs') history.push('/faq');
  };

  const handleBottomLinkClick = (link) => {
    if (link === 'Privacy Policy') history.push('/privacy-policy');
    else if (link === 'Terms of Service') history.push('/term-condition');
    else if (link === 'Sitemap') history.push('/sitemap');
  };

  return (
    <Fragment>
      <footer className="relative overflow-hidden" style={{
        background: '#4e603d',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-3xl font-bold mb-4" style={{
                color: '#FFFFFF',
                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                fontFamily: 'Georgia, serif'
              }}>
                MEEZAN
              </h3>
              <p className="text-sm leading-relaxed" style={{
                color: 'rgba(255, 255, 255, 0.85)'
              }}>
                A health-focused brand delivering natural, nutritious, and tasty products for all ages. From kids to elders.
              </p>
              {/* Social Icons */}
              <div className="flex space-x-3 pt-4">
                {[
                  { Icon: Facebook, color: '#FFFFFF' },
                  { Icon: Twitter, color: '#FFFFFF' },
                  { Icon: Instagram, color: '#FFFFFF' }
                ].map(({ Icon, color }, idx) => (
                  <div key={idx} className="w-11 h-11 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: color,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold mb-4" style={{
                color: '#FFFFFF'
              }}>
                Quick Links
              </h4>
              {['Home', 'Products', 'About Us', 'Contact'].map((link, idx) => (
                <div key={idx} className="group cursor-pointer transition-all duration-200" onClick={() => handleQuickLinkClick(link)}>
                  <span className="text-sm inline-block transition-transform duration-200 group-hover:translate-x-2" style={{
                    color: 'rgba(255, 255, 255, 0.85)'
                  }}>
                    → {link}
                  </span>
                </div>
              ))}
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold mb-4" style={{
                color: '#FFFFFF'
              }}>
                Customer Service
              </h4>
              {['My Account', 'Shipping Info', 'Returns', 'FAQs'].map((link, idx) => (
                <div key={idx} className="group cursor-pointer transition-all duration-200" onClick={() => handleCustomerServiceClick(link)}>
                  <span className="text-sm inline-block transition-transform duration-200 group-hover:translate-x-2" style={{
                    color: 'rgba(255, 255, 255, 0.85)'
                  }}>
                    → {link}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold mb-4" style={{
                color: '#FFFFFF'
              }}>
                Get In Touch
              </h4>
              {[
                { Icon: Phone, text: '+91 9219725401' },
                { Icon: Mail, text: 'info@meezansuperfood.com' },
                { Icon: MapPin, text: 'Kundan Road Unnao, 209801' }
              ].map(({ Icon, text }, idx) => (
                <div key={idx} className="flex items-center space-x-3 group cursor-pointer">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm" style={{
                    color: 'rgba(255, 255, 255, 0.85)'
                  }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          {/* <div className="mb-12 p-8 rounded-3xl transition-all duration-300 hover:scale-[1.02]" style={{
            background: 'rgba(255, 255, 255, 0.15)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-2xl font-bold mb-3" style={{
                color: '#FFFFFF',
                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                fontFamily: 'Georgia, serif'
              }}>
                Subscribe to Our Newsletter
              </h4>
              <p className="text-sm mb-6" style={{
                color: 'rgba(255, 255, 255, 0.85)'
              }}>
                Get the latest updates on new products and special offers
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-full outline-none transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: '#333333'
                  }}
                />
                <button className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105" style={{
                  background: '#D4A574',
                  boxShadow: '0 4px 15px rgba(212,165,116,0.4)'
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div> */}

          {/* Bottom Bar */}
          <div className="pt-8 border-t" style={{
            borderColor: 'rgba(255,255,255,0.2)'
          }}>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm" style={{
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                © {moment().format("YYYY")} Meezan Super Food. All rights reserved.
              </p>
              <div className="flex space-x-6">
                {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((link, idx) => (
                  <span key={idx} className="text-sm cursor-pointer transition-colors duration-200 hover:text-white" style={{
                    color: 'rgba(255, 255, 255, 0.7)'
                  }} onClick={() => handleBottomLinkClick(link)}>
                    {link}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative 3D Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-10" style={{
          background: 'radial-gradient(circle, #708A58 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full opacity-10" style={{
          background: 'radial-gradient(circle, #D4A574 0%, transparent 70%)',
          filter: 'blur(50px)'
        }}></div>
      </footer>
    </Fragment>
  );
};

export default Footer;
