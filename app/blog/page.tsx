'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Carousel from "../../components/carousel";



export default  function Blog(){
    const carouselData = [
      {
        title: 'Change in tenders',
        type: 'Article',
        author: 'Ahad Alam',
        authorTitle:'Co-Founder, Oviqo'
        
      },
      {
        title: 'How to write a tender',
        type: 'Blog', 
        author: 'Adl Alam',
        authorTitle:'Co-Founder, Oviqo'
      },
      {
        title: 'NHS awards lift tender',
        type: 'News',
        author: 'Ahad Alam',
        authorTitle:'Co-Founder, Oviqo'
      }

    ];

   
    const [ activeItemIndex, setActiveItemIndex] = useState(1);

    const [scrolled, setScrolled] = useState(false);
    
      useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 40);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return(

        <>
        <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        .slide-link {
          position: relative;
          text-decoration: none;
          padding-bottom: 2px;
          background-image: linear-gradient(currentColor, currentColor);
          background-repeat: no-repeat;
          background-size: 0% 2px;
          background-position: 100% 100%;
          transition: background-size 0.35s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .slide-link:hover {
          background-size: 100% 2px;
          background-position: 0% 100%;
        }

        .radial-burst {
          position: absolute;
          width: 650px;
          height: 650px;
          border-radius: 9999px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          background: radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 75%);
          -webkit-mask-image: radial-gradient(circle, black 30%, transparent 75%);
          mask-image: radial-gradient(circle, black 30%, transparent 75%);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      {/* Floating Sticky Header Container */}
      <div className="sticky top-0 z-50 w-full pt-4 px-4 pl-0 pr-0 transition-all duration-300">
        <header
          className={`mx-auto transition-all duration-300 flex items-center justify-between ${
            scrolled
              ? 'max-w-5xl bg-white/80 backdrop-blur-md border border-gray-200/80 rounded-full px-6 py-3 shadow-lg text-gray-900'
              : 'max-w-7xl px-6 py-4 text-gray-700'
          }`}
        >
          <div className="flex-1 flex items-center justify-start">
            <Link
              href="/"
              className={`transition font-bold text-lg ${
                scrolled ? 'text-gray-900 hover:text-black' : 'text-gray-900 hover:text-gray-600'
              }`}
            >
              OVIQO
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <Link href="/" className="slide-link transition-colors text-gray-700 hover:text-gray-900">
              Solutions
            </Link>
            <Link href="/plans" className="slide-link transition-colors text-gray-700 hover:text-gray-900">
              Plans
            </Link>
            <Link href="/blog" className="slide-link transition-colors text-gray-700 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/about" className="slide-link transition-colors text-gray-700 hover:text-gray-900">
              About us
            </Link>
          </nav>

          <div className="flex-1 flex items-center justify-end">
            <Link
              href="/contact"
              className={`px-5 py-2 text-sm font-semibold rounded-full shadow-sm transition border ${
                scrolled
                  ? 'bg-[#9d96e9] text-white hover:bg-[#9d96e9] border-transparent'
                  : 'text-white bg-[#9d96e9] backdrop-blur-md hover:bg-[#8b84dd] border-[#9d96e9]'
              }`}
            >
              Book a demo
            </Link>
          </div>
        </header>
      </div>


          <main className="flex-1 flex mx-auto flex-col w-full max-w-7xl justify-between pt-0 mt-0 pl-7 pr-7">
            <section>
            <h1 className="text-3xl font-bold text-slate-900 pt-0 py-6 text-left">
              The Resource Vault.
            </h1>

            

            <Carousel
              activeItemIndex={activeItemIndex}
              setActiveItemIndex={setActiveItemIndex}
              carouselData={carouselData}
            
            />

            </section>

            
          </main>



        <footer className="mt-10 py-6 text-center text-xs text-gray-900 bg-white">
            <p>© 2026 OVIQO. All rights reserved.</p>
            <p>Developed by Adl &amp; Ahad.</p>
        </footer>
        
        
    
        
        
        </>
    );
}