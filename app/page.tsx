'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FloatingHeader from "../components/navBar";


export default function Home() {
 
  return (
    <>
     <FloatingHeader/>
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
                Do more business with the government.
              </h1>

              <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/90 leading-relaxed drop-shadow font-semibold">
                The all in one system to help you find and win government contracts.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="w-full sm:w-56 inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#9d96e9] text-white font-medium hover:bg-[#8b84dd] shadow-lg transition"
                >
                  Book a demo
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-56 inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-300 text-gray-900 font-medium hover:bg-white shadow-sm transition"
                >
                  Explore Product <span className="ml-2 font-mono">→</span>
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
            <p>© 2026 OVIQO. All rights reserved.</p>
            <p>Developed by Adl &amp; Ahad</p>
        </footer>
      </div>
    </>
  );
}