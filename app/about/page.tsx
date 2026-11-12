'use client';

import FloatingHeader from "../../components/navBar";
import Image from "next/image";
export default function About(){

   
    
    return(
        <>
        <FloatingHeader/>
       <main className="mx-auto max-w-lg mt-5">
              <h1 className="text-4xl font-bold text-slate-900 text-center"> About us </h1>

              <div className="flex flex-row gap-5">
                   <div className="text-black w-60 h-80  border border-gray-300 rounded-lg p-4 mt-10">
                <h1 className="text-black">CO-FOUNDER</h1>
                <h2 className="text-black">Saif Mirza</h2>
                <div className="mx-auto mt-4 w-30 h-30 rounded-full border-2 border-gray-300 overflow-hidden">
                    <img  src="/memoji.png" alt="Profile" className="w-full h-full object-cover"/>
                </div>
                <h2 className="text-black">Im the only CEO out there im lazy cunt</h2>
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