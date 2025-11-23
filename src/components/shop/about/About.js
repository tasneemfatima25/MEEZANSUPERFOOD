import React from 'react';
import { useHistory } from 'react-router-dom';
import { ShoppingBag, TrendingUp, Truck, DollarSign, ArrowRight, Shield } from 'lucide-react';
import { Navber } from '../partials';

const AboutPage = () => {
  const history = useHistory();

  return (
    <>
    <Navber />
    <div className="overflow-hidden font-sans mt-16" style={{
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 50%, #FAF8F5 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Hero / Brand Story */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center text-center overflow-hidden px-6 py-24" style={{
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
          <span className="font-semibold" style={{ color: '#2C2C2C' }}>About Us</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{
          color: '#2C2C2C',
          textShadow: '0 2px 8px rgba(0,0,0,0.08)',
          fontFamily: 'Georgia, serif',
          lineHeight: '1.2'
        }}>
          Welcome to <span style={{ color: '#708A58' }}>Meezan</span> <span style={{ color: '#D4A574' }}>Super Food</span>
        </h1>

        <div style={{
          width: '140px',
          height: '5px',
          background: 'linear-gradient(90deg, #708A58 0%, #D4A574 100%)',
          borderRadius: '3px',
          margin: '0 auto 24px'
        }}></div>

        <p className="text-xl md:text-2xl max-w-4xl mb-6 leading-relaxed" style={{
          color: '#4A4A4A',
          lineHeight: '1.8'
        }}>
          Your trusted partner in <span className="font-semibold" style={{ color: '#708A58' }}>health and wellness</span>, delivering nature's finest offerings
          to your doorstep. We believe in the power of <span className="font-semibold" style={{ color: '#D4A574' }}>authentic, natural nutrition</span> that
          transforms lives — one wholesome product at a time.
        </p>

        <p className="text-lg md:text-xl max-w-3xl mb-10" style={{
          color: '#666666',
          lineHeight: '1.7'
        }}>
          From kids to elders, from traditional grains to modern superfoods — Meezan brings the goodness of
          dry fruits, barley, ancient remedies, and healthy flavors into your daily life. Every product is carefully sourced,
          quality-tested, and packed with love to ensure you receive only the best.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center gap-2 px-5 py-3" style={{
            background: 'rgba(112,138,88,0.1)',
            borderRadius: '30px',
            border: '2px solid rgba(112,138,88,0.2)'
          }}>
            <Shield className="w-5 h-5" style={{ color: '#708A58' }} />
            <span className="text-sm font-bold" style={{ color: '#708A58' }}>100% Natural & Organic</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-3" style={{
            background: 'rgba(212,165,116,0.1)',
            borderRadius: '30px',
            border: '2px solid rgba(212,165,116,0.2)'
          }}>
            <svg className="w-5 h-5" style={{ color: '#D4A574' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-bold" style={{ color: '#D4A574' }}>Quality Certified</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-3" style={{
            background: 'rgba(112,138,88,0.1)',
            borderRadius: '30px',
            border: '2px solid rgba(112,138,88,0.2)'
          }}>
            <svg className="w-5 h-5" style={{ color: '#708A58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm font-bold" style={{ color: '#708A58' }}>Made with Love</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => history.push('/products')}
            className="group relative px-10 py-4 rounded-full font-semibold text-lg text-white transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #708A58 0%, #5A7A55 100%)',
              boxShadow: '0 10px 25px rgba(112,138,88,0.4)',
              border: '2px solid rgba(255,255,255,0.2)'
            }}>
            <ShoppingBag className="w-5 h-5" />
            Explore Our Products
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up" style={{
            color: '#2C2C2C',
            textShadow: '0 2px 8px rgba(0,0,0,0.08)',
            fontFamily: 'Georgia, serif'
          }}>Why Meezan?</h2>
          <p className="text-lg animate-fade-in-up animation-delay-200" style={{
            color: '#666666'
          }}>
            Bringing health, taste, and quality together in every bite.
          </p>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: '100% Natural', desc: 'Products made with premium dry fruits, barley, and natural ingredients.', bg: '#FFFFFF', iconBg: '#708A58', accent: '#708A58' },
            { icon: Truck, title: 'Fast & Safe Delivery', desc: 'Fresh, hygienic products delivered right to your doorstep.', bg: '#FFFFFF', iconBg: '#D4A574', accent: '#D4A574' },
            { icon: DollarSign, title: 'Affordable & Healthy', desc: 'Nutritious products at prices that everyone can enjoy.', bg: '#FFFFFF', iconBg: '#708A58', accent: '#708A58' }
          ].map((feature, idx) => (
            <div key={idx} className="rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                 style={{
                   backgroundColor: feature.bg,
                   boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                   border: '1px solid rgba(0,0,0,0.05)',
                   overflow: 'hidden'
                 }}>
              <div style={{
                height: '6px',
                background: `linear-gradient(90deg, ${feature.accent} 0%, ${feature.accent} 100%)`
              }}></div>
              <div className="p-8">
                <div className="w-20 h-20 flex items-center justify-center mb-4 rounded-3xl text-white mx-auto transition-transform duration-300 hover:rotate-12" style={{
                  backgroundColor: feature.iconBg,
                  boxShadow: '0 5px 15px rgba(168,197,160,0.3)',
                }}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Highlights */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up" style={{
            color: '#2C2C2C',
            textShadow: '0 2px 8px rgba(0,0,0,0.08)',
            fontFamily: 'Georgia, serif'
          }}>Our Flavors & Ingredients</h2>
          <p className="text-lg animate-fade-in-up animation-delay-200" style={{
            color: '#666666'
          }}>
            Healthy, tasty, and suitable for everyone – from kids to elders.
          </p>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { title: 'Nutty Delight', desc: 'Dry fruits mixed for maximum nutrition and taste.', color: '#FFFFFF', accent: '#708A58' },
            { title: 'Barley Boost', desc: 'Barley-based products to support fitness and immunity.', color: '#FAF8F5', accent: '#D4A574' },
            { title: 'Natural Flavors', desc: 'Enjoy a variety of healthy flavors without preservatives.', color: '#FFFFFF', accent: '#708A58' }
          ].map((product, idx) => (
            <div key={idx} className="transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                 style={{
                   backgroundColor: product.color,
                   boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                   borderRadius: '30px',
                   border: '1px solid rgba(0,0,0,0.05)',
                   overflow: 'hidden'
                 }}>
              <div style={{
                height: '6px',
                background: `linear-gradient(90deg, ${product.accent} 0%, ${product.accent} 100%)`
              }}></div>
              <div className="p-10">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{product.title}</h3>
                <p className="text-gray-600 text-base">{product.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #FAF8F5 0%, #FFFFFF 100%)'
      }}>
        <div className="container mx-auto px-6 animate-fade-in-up">
          <TrendingUp className="w-8 h-8 mx-auto mb-4" style={{ color: '#D4A574' }} />
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{
            color: '#2C2C2C',
            textShadow: '0 2px 8px rgba(0,0,0,0.08)',
            fontFamily: 'Georgia, serif'
          }}>Ready to Try Meezan?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto" style={{
            color: '#666666'
          }}>
            Bring healthy, tasty products into your daily life. Perfect for the whole family!
          </p>
          <button
            onClick={() => history.push('/products')}
            className="group relative px-10 py-4 rounded-full font-semibold text-lg text-white transition-all duration-300 hover:scale-105 mx-auto flex items-center gap-3 cursor-pointer"
            style={{
              backgroundColor: '#708A58',
              boxShadow: '0 10px 25px rgba(168,197,160,0.3)'
            }}>
            <ShoppingBag className="w-5 h-5" />
            Explore Products
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

    </div>
    </>
  );
}

export default AboutPage;
