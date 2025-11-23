import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';
import { Navber } from '../partials';

const ContactPage = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Navber />
      <div className="overflow-hidden font-sans mt-16" style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 50%, #FAFAFA 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: '100vh'
      }}>
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center overflow-hidden px-6 py-24" style={{
          background: 'linear-gradient(135deg, #F5F9F3 0%, #FFFFFF 100%)'
        }}>
          {/* Breadcrumb */}
          <div className="flex items-center space-x-3 text-base md:text-lg mb-8">
            <span
              className="cursor-pointer transition-colors duration-200 hover:underline font-medium"
              style={{ color: '#708A58' }}
              onClick={() => history.push('/')}
            >
              Home
            </span>
            <span style={{ color: '#D4A574', fontSize: '20px' }}>›</span>
            <span className="font-semibold" style={{ color: '#2C2C2C' }}>Contact Us</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{
            color: '#2C2C2C',
            textShadow: '0 2px 8px rgba(0,0,0,0.08)',
            fontFamily: 'Georgia, serif',
            lineHeight: '1.2'
          }}>
            Get In <span style={{ color: '#708A58' }}>Touch</span> <span style={{ color: '#D4A574' }}>With Us</span>
          </h1>

          <div style={{
            width: '140px',
            height: '5px',
            background: 'linear-gradient(90deg, #708A58 0%, #D4A574 100%)',
            borderRadius: '3px',
            margin: '0 auto 24px'
          }}></div>

          <p className="text-xl md:text-2xl max-w-3xl mb-6 leading-relaxed" style={{
            color: '#4A4A4A',
            lineHeight: '1.8'
          }}>
            We're here to help! Whether you have questions about our products, need assistance with an order,
            or simply want to share your feedback — <span className="font-semibold" style={{ color: '#708A58' }}>we'd love to hear from you</span>.
          </p>

          <p className="text-lg md:text-xl max-w-2xl mb-8" style={{
            color: '#666666',
            lineHeight: '1.7'
          }}>
            Our dedicated team at <span className="font-semibold" style={{ color: '#D4A574' }}>Meezan Super Food</span> is committed to providing you with
            exceptional service and support. Reach out to us through any of the channels below, and we'll get back to you as soon as possible.
          </p>

          {/* Quick Contact Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-5 py-3" style={{
              background: 'rgba(112,138,88,0.1)',
              borderRadius: '30px',
              border: '2px solid rgba(112,138,88,0.2)'
            }}>
              <MessageCircle className="w-5 h-5" style={{ color: '#708A58' }} />
              <span className="text-sm font-bold" style={{ color: '#708A58' }}>Quick Response</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3" style={{
              background: 'rgba(212,165,116,0.1)',
              borderRadius: '30px',
              border: '2px solid rgba(212,165,116,0.2)'
            }}>
              <Clock className="w-5 h-5" style={{ color: '#D4A574' }} />
              <span className="text-sm font-bold" style={{ color: '#D4A574' }}>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3" style={{
              background: 'rgba(112,138,88,0.1)',
              borderRadius: '30px',
              border: '2px solid rgba(112,138,88,0.2)'
            }}>
              <svg className="w-5 h-5" style={{ color: '#708A58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-bold" style={{ color: '#708A58' }}>Friendly Team</span>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 relative">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6 -mt-20 relative z-10">
              {[
                { icon: Phone, title: 'Call Us', info: '+91 9219725401', bg: '#FFFFFF', iconBg: '#708A58', accent: '#708A58' },
                { icon: Mail, title: 'Email Us', info: 'info@meezansuperfood.com', bg: '#FFFFFF', iconBg: '#D4A574', accent: '#D4A574' },
                { icon: MapPin, title: 'Visit Us', info: 'Kundan Road Unnao, 209801', bg: '#FFFFFF', iconBg: '#708A58', accent: '#708A58' }
              ].map((contact, idx) => (
                <div key={idx} className="transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                     style={{
                       backgroundColor: contact.bg,
                       boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                       borderRadius: '30px',
                       border: '1px solid rgba(0,0,0,0.05)',
                       overflow: 'hidden'
                     }}>
                  <div style={{
                    height: '6px',
                    background: `linear-gradient(90deg, ${contact.accent} 0%, ${contact.accent} 100%)`
                  }}></div>
                  <div className="p-6">
                    <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-2xl mx-auto transition-transform duration-300 hover:rotate-12" style={{
                      backgroundColor: contact.iconBg,
                      boxShadow: '0 5px 15px rgba(212,165,116,0.3)'
                    }}>
                      <contact.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 text-center">{contact.title}</h3>
                    <p className="text-gray-600 text-center">{contact.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">

              {/* Contact Form */}
              <div className="p-8 transition-all duration-300" style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                borderRadius: '40px',
                border: '1px solid rgba(212,165,116,0.2)'
              }}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{
                  color: '#4A4A4A',
                  textShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  fontFamily: 'Georgia, serif'
                }}>Send us a Message</h2>
                <p className="mb-8" style={{ color: '#666666' }}>
                  Fill out the form below and we'll get back to you soon!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border-2 border-transparent focus:border-[#D4A574] outline-none transition-all"
                      style={{
                        backgroundColor: '#F9F9F9',
                        color: '#333333',
                        border: '1px solid #E5E5E5'
                      }}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border-2 border-transparent focus:border-[#D4A574] outline-none transition-all"
                      style={{
                        backgroundColor: '#F9F9F9',
                        color: '#333333',
                        border: '1px solid #E5E5E5'
                      }}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-transparent focus:border-[#D4A574] outline-none transition-all"
                      style={{
                        backgroundColor: '#F9F9F9',
                        color: '#333333',
                        border: '1px solid #E5E5E5'
                      }}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">Your Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-transparent focus:border-[#D4A574] outline-none transition-all resize-none"
                      style={{
                        backgroundColor: '#F9F9F9',
                        color: '#333333',
                        border: '1px solid #E5E5E5'
                      }}
                      placeholder="Write your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full font-semibold text-lg text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                    style={{
                      backgroundColor: '#D4A574',
                      boxShadow: '0 10px 25px rgba(212,165,116,0.3)'
                    }}
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Additional Info */}
              <div className="space-y-6">
                {/* Office Hours */}
                <div className="p-8 transition-all duration-300 hover:scale-105" style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  borderRadius: '40px',
                  border: '1px solid rgba(212,165,116,0.2)'
                }}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl flex-shrink-0" style={{
                      backgroundColor: '#708A58',
                      boxShadow: '0 5px 15px rgba(168,197,160,0.3)'
                    }}>
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">Office Hours</h3>
                      <div className="space-y-2 text-gray-600">
                        <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                        <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                        <p><strong>Sunday:</strong> Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="p-8 transition-all duration-300 hover:scale-105" style={{
                  backgroundColor: '#FAF8F5',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  borderRadius: '40px',
                  border: '1px solid rgba(212,165,116,0.2)'
                }}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl flex-shrink-0" style={{
                      backgroundColor: '#D4A574',
                      boxShadow: '0 5px 15px rgba(212,165,116,0.3)'
                    }}>
                      <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">Quick Response</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Need immediate assistance? Call us directly or send a WhatsApp message for quick support!
                      </p>
                      <button className="mt-4 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105" style={{
                        backgroundColor: '#708A58',
                        boxShadow: '0 5px 15px rgba(168,197,160,0.3)'
                      }}>
                        WhatsApp Us
                      </button>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="p-8 transition-all duration-300 hover:scale-105" style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  borderRadius: '40px',
                  border: '1px solid rgba(168,197,160,0.2)',
                  borderTop: '4px solid #708A58'
                }}>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">Follow Us</h3>
                  <div className="flex justify-center gap-4">
                    {['Facebook', 'Instagram', 'Twitter'].map((social, idx) => (
                      <button key={idx} className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110" style={{
                        backgroundColor: idx === 1 ? '#D4A574' : '#708A58',
                        boxShadow: idx === 1 ? '0 5px 15px rgba(212,165,116,0.3)' : '0 5px 15px rgba(168,197,160,0.3)'
                      }}>
                        {social[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
