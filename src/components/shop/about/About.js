import React from 'react';
import { ShoppingBag, TrendingUp, Truck, DollarSign, ArrowRight, Shield } from 'lucide-react';
import { Navber } from '../partials';

const AboutPage = () => {
  return (
    <>
    <Navber />
    <div className="overflow-hidden font-sans mt-16" style={{
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 50%, #FAF8F5 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Hero / Brand Story */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden px-6 py-20" style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF8F5 100%)'
      }}>
        <h1 className="text-6xl md:text-7xl font-bold mb-6" style={{
          color: '#2C2C2C',
          textShadow: '0 2px 8px rgba(0,0,0,0.08)',
          fontFamily: 'Georgia, serif'
        }}>
          Welcome to <span style={{ color: '#D4A574' }}>Meezan</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mb-8" style={{
          color: '#666666',
          textShadow: '0 1px 4px rgba(0,0,0,0.05)'
        }}>
          A health-focused brand delivering natural, nutritious, and tasty products for all ages. From kids to elders, Meezan brings the goodness of dry fruits, barley, and healthy flavors into your daily life.
        </p>
        <div className="mt-6">
          <button className="group relative px-10 py-4 rounded-full font-semibold text-lg text-white transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto" style={{
            backgroundColor: '#708A58',
            boxShadow: '0 10px 25px rgba(168,197,160,0.3)'
          }}>
            <ShoppingBag className="w-5 h-5" />
            Explore Products
            <ArrowRight className="w-5 h-5" />
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
          <button className="group relative px-10 py-4 rounded-full font-semibold text-lg text-white transition-all duration-300 hover:scale-105 mx-auto flex items-center gap-3" style={{
            backgroundColor: '#708A58',
            boxShadow: '0 10px 25px rgba(168,197,160,0.3)'
          }}>
            <ShoppingBag className="w-5 h-5" />
            Explore Products
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

    </div>
    </>
  );
}

export default AboutPage;
