'use client';

import FloatingHeader from "../../components/navBar";
export default function About(){

   
    
    return(
        <>
        <FloatingHeader/>
       <main className="mx-auto max-w-lg mt-5">
              <h1 className="text-4xl font-bold text-slate-900"> About us </h1>
      </main>
              <footer className="mt-10 py-6 text-center text-xs text-gray-900 bg-white">
            <p>© 2026 OVIQO. All rights reserved.</p>
            <p>Developed by Adl &amp; Ahad.</p>
        </footer>
        
        
        
        </>
        
    );
}