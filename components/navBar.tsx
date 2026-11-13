
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FloatingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen,setMenuOpen] = useState<boolean>(false);
  


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
      `}</style>

      <div className="sticky top-0 z-50 w-full pt-4 px-4 transition-all duration-300 pl-0 pr-0">
        <header
          className={`mx-auto transition-all duration-300 flex items-center justify-between ${
            scrolled
              ? 'max-w-5xl bg-white/80 backdrop-blur-md border border-gray-200/80 rounded-full px-6 py-3 shadow-lg text-gray-900'
              : 'max-w-7xl px-6 py-4 text-gray-700'
          }`}
        >
          <div className="flex-1 flex items-center justify-start mt-0.5">
            <Link href="/" className="font-bold text-lg text-gray-900 hover:text-black">
              OVIQO
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <Link href="/" className="slide-link text-gray-700 hover:text-gray-900">Solutions</Link>
            <Link href="/plans" className="slide-link text-gray-700 hover:text-gray-900">Plans</Link>
            <Link href="/resource" className="slide-link text-gray-700 hover:text-gray-900">Resources</Link>
            <Link href="/about" className="slide-link text-gray-700 hover:text-gray-900">About us</Link>
          </nav>

          <div className="flex-1 flex items-center justify-end">

            <button type="button" 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden ml-4 px-4">
                {menuOpen ? '✕' : '☰'}
            </button>


           
            <Link
              href="/contact"
              className="hidden lg:inline-flex px-5 py-2 text-sm font-semibold rounded-full shadow-sm text-white bg-[#9d96e9] hover:bg-[#8b84dd]"
            >
              Book a demo
            </Link>

        
         
          </div>
        </header>
         {menuOpen && (
              <nav className="lg:hidden flex flex-col gap-2 text-black border border-gray-200 rounded-2xl px-4 py-4 shadow-lg mx-4 mt-2 bg-white">
                 <Link href="/">Solutions</Link>
                 <Link href="/plans">Plans</Link>
                 <Link href="/resource">Resources</Link>
                 <Link href="/about">About us</Link>
                 <Link href="/contact" className="mt-3 w-fit px-5 py-2 lg:text-sm font-semibold rounded-full shadow-sm text-white bg-[#9d96e9] hover:bg-[#8b84dd]">Book a demo</Link>

              </nav>
             )}
      </div>
    </>
  );
}