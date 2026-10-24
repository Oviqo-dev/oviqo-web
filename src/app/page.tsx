'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

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
                scrolled ? 'text-gray-900 hover:text-black' : 'text-gray-900 hover:text-white'
              }`}
            >
              OVIQO
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <a href="#solution" className="slide-link transition-colors text-gray-700 hover:text-gray-900">
              Solution
            </a>
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

      <div className="-mt-22 min-h-screen flex flex-col justify-between text-[#0F172A]">
        <div
          className="min-h-screen flex flex-col justify-between"
          style={{
            backgroundImage: `url('/background_image.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="h-20" />

          <main className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center max-w-4xl mx-auto my-auto w-full">
            <div className="radial-burst" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-sm text-xs sm:text-sm text-gray-700 mb-6">
                <span className="font-semibold text-gray-900 mr-2">Over £400 billion in government spending</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-md">
                Do more business with <span className="block mt-1">the government.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/90 leading-relaxed drop-shadow font-medium">
                The all in one system to help you find and win government contracts.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <a
                  href="#solution"
                  className="w-full sm:w-56 inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 shadow-lg transition"
                >
                  Explore Product <span className="ml-2 font-mono">→</span>
                </a>
                <Link
                  href="/contact"
                  className="w-full sm:w-56 inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-300 text-gray-900 font-medium hover:bg-white shadow-sm transition"
                >
                  Book a demo
                </Link>
              </div>
            </div>
          </main>

          <div className="h-12" />
        </div>

        <section className="bg-white py-24 px-6 scroll-mt-24" id="solution">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <h1></h1>
            </div>
          </div>
        </section>

        <footer className="py-6 text-center text-xs text-gray-900 bg-white">
          © {new Date().getFullYear()} OVIQO. All rights reserved.
        </footer>
      </div>
    </>
  );
}