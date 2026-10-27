
'use client';

import Image from 'next/image';
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
                  ? 'bg-[#9d96e9] text-white hover:bg-[#9d96e0] border-transparent'
                  : 'text-white bg-[#9d96e9] backdrop-blur-md hover:bg-[#8b84dd] border-[#9d96e9]'
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
            <div className="flex">
            <div className="text-left mb-8 ml-4 width-half flex-1">
              <h1 className="text-3xl font-bold">Ready to build your government contract pipeline.</h1>
            </div>
            
            <div className="flex-1"></div>
           </div> 
            <div className="flex p-2 h-auto  min-h-100">
              <div className="flex-1 flex flex-col bg-[#f6f6f6] m-2 rounded-lg text-left h-auto p-4 text-3xl font-semibold">
                Included in all tiers
                <p className="text-sm mt-35 text-[#9d96e9]">Features</p>
                <ul>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Unlimited users</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Unlimited projects</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Unlimited storage</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Email support</li>                
                </ul>
                
              </div>
              <div className="flex-1 bg-[#f6f6f6] m-2 rounded-lg text-left h-auto p-4 text-3xl font-semibold">
                Growth
                <p className="text-sm mt-1 text-[#9d96e9]">Features</p>  
                <ul>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Priority support</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Custom integrations</li>
                </ul>

                <div className=" flex flex-col items-start gap-3 w-full mt-39">
                  <div className="flex items-baseline gap-1 text-left">
                    <span className="text-3xl font-bold text-black">£499</span>
                    <span className="text-sm font-normal text-gray-600">per month</span>
                  </div>

                  <div className="flex flex-col text-center items-center justify-between min-w-[95%]">
                  
                  <Link
                    href="/contact"
                    className="rounded-full border border-[#9d96e9] bg-[#9d96e9] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#8b84dd] w-[95%]"
                  >
                    Book a Call
                  </Link>
                </div>
                </div>

               
              </div>

              <div className="flex-1 flex flex-col bg-[#f6f6f6] m-2 rounded-lg text-left h-auto p-4 text-3xl font-semibold">
                Scale
                <p className="text-sm mt-1 text-[#9d96e9]">Features</p>  
                <ul>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Everything in growth</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Account manager</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Advanced reporting</li>
                </ul>

                <div className=" flex flex-col items-start gap-3 w-full mt-30">
                  <div className="flex items-baseline gap-1 text-left">
                    <span className="text-3xl font-bold text-black">£999</span>
                    <span className="text-sm font-normal text-gray-600">per month</span>
                  </div>

                  <div className="flex flex-col text-center items-center justify-between min-w-[95%]">
                  
                  <Link
                    href="/contact"
                    className="rounded-full border border-[#9d96e9] bg-[#9d96e9] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#8b84dd] w-95/100"
                  >
                    Book a Call
                  </Link>
                </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col bg-[#f6f6f6] m-2 rounded-lg text-left h-auto p-4 text-3xl font-semibold">
                Enterprise
                <p className="text-sm mt-1 mb-0 pb-0 text-[#9d96e9]">Features</p>  
              
                <ul className="mt-0 pt-0">
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Everything in scale</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>Custom solutions</li>
                  <li className="text-lg font-normal mt-2 text-black"><Image src="/purpleTick.png" alt="Tick" className="inline-block mr-2 max-w-5" width={20} height={20}/>On-site training</li>
                </ul>

                <div className=" flex flex-col items-start gap-3 w-full mt-30">
                  <div className="flex items-baseline gap-1 text-left">
                    <span className="text-3xl font-bold text-black">Contact</span>
                    
                  </div>

                <div className="flex flex-col items-baseline text-center  justify-between min-w-[95%] ">
                  
                  <Link
                    href="/contact"
                    className="rounded-full border border-[#9d96e9] bg-[#9d96e9] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#8b84dd] w-[95%]"
                  >
                    Book a Call
                  </Link>
                </div>
                </div>


              </div>
            </div>
          </div>
        </section>

      </main>
          <footer className="py-6 text-center text-xs text-gray-900 bg-white">
            <p>© 2026 OVIQO. All rights reserved.</p>
            <p>Developed by Adl &amp; Ahad.</p>
        </footer>
        
      </div>
    
    </>
  );
}