
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';


export default function Plans() {
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

      <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50 w-full pt-4 px-4 transition-all duration-300">
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
                  ? 'bg-gray-900 text-white hover:bg-gray-800 border-transparent'
                  : 'text-gray-900 bg-white/80 backdrop-blur-md border-gray-300 hover:bg-white'
              }`}
            >
              Book a demo
            </Link>
          </div>
        </header>
      </div>
       <main className="flex-1 flex flex-col">
             

        <section className="bg-white flex-1 h-full" id="solution">
          <div className="p-6 text-left text-black h-auto">
            <div className="text-center mb-8 mt-5">
              <h1 className="text-2xl">Ready to build your government contract pipeline.</h1>
            </div>
            <div className="flex p-2 h-auto  min-h-100">
              <div className="flex-1 bg-[#f1f1f1] m-2 rounded-lg text-left h-auto p-4 text-3xl">Included in all tiers</div>
              <div className="flex-1 bg-[#f1f1f1] m-2 rounded-lg text-left h-auto p-4 text-3xl">Small Orgs</div>
              <div className="flex-1 bg-[#f1f1f1] m-2 rounded-lg text-left h-auto p-4 text-3xl">Medium Orgs</div>
              <div className="flex-1 bg-[#f1f1f1] m-2 rounded-lg text-left h-auto p-4 text-3xl">Large Orgs</div>
            </div>
          </div>
        </section>

      </main>
          <footer className="mt-10 py-6 text-center text-xs text-gray-900 bg-white">
            <p>© 2026 OVIQO. All rights reserved.</p>
            <p>Developed by Adl &amp; Ahad.</p>
        </footer>
        
      </div>
    
    </>
  );
}