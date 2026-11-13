'use client';

import FloatingHeader from "../../components/navBar";
import Image from "next/image";
export default function About(){

   
    
    return(
        <>
        <FloatingHeader/>
       <main className="mx-auto mt-5">
              <h1 className="text-4xl font-bold text-slate-900 text-center"> About us </h1>

            <div className="flex lg:flex-row gap-5 sm:flex-col">

                 <div className="relative text-black w-60 h-80  border border-gray-300 rounded-lg mt-10 overflow-hidden shadow-xl ">
                       <img  src="/1.png" alt="Profile" className="w-full h-full object-cover"/>

                        <div className="absolute bottom-0 left-0 w-full p-3">
                        <h2 className="text-white text-xl font-bold"> Adl Alam</h2>
                         <h2 className="text-white text-xl font-bold"> Co-Founder</h2>
                        </div>
                 </div>

                 <div className="relative text-black w-60 h-80  border border-gray-300 rounded-lg mt-10 overflow-hidden shadow-xl ">
                       <img  src="/2.png" alt="Profile" className="w-full h-full object-cover"/>

                        <div className="absolute bottom-0 left-0 w-full p-3">
                        <h2 className="text-white text-xl font-bold"> Ahad Alam</h2>
                         <h2 className="text-white text-xl font-bold"> Co-Founder</h2>
                        </div>
                 </div>

                  <div className="relative text-black w-60 h-80  border border-gray-300 rounded-lg mt-10 overflow-hidden shadow-xl ">
                       <img  src="/3.png" alt="Profile" className="w-full h-full object-cover"/>

                         <div className="absolute bottom-0 left-0 w-full p-2">
                        <h2 className="text-white text-xl font-bold"> Saif-Ali Mirza </h2>
                         <h2 className="text-white text-xl font-bold"> Ceo</h2>
                        </div>
                 </div>

            </div>

            
      </main>
              <footer className="mt-10 py-6 text-center text-xs text-gray-900 bg-white">
            <p>© 2026 OVIQO. All rights reserved.</p>
            <p>Developed by Adl &amp; Ahad.</p>
        </footer>
        
        
        
        </>
        
    );
}