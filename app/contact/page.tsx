'use client';

import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import FloatingHeader from "../../components/navBar";


export default function Contact(){

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=> {
       e.preventDefault(); 

         setLoading(true);
         setStatus('');

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        };

          try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

        const result = await response.json();

    if (response.ok) {
      setStatus('Thank you! Your message has been sent.');
      form.reset();
    } else {
      setStatus(result.error || 'Something went wrong.');
    }

  } catch (error) {
    setStatus('Unable to send your message. Please try again.');
  } finally {
    setLoading(false);
  }


    }

    return(
      
      <>
      <FloatingHeader/>

      <main className="mx-auto mt-5">
        <div className='flex flex-col gap-10 px-10 lg:flex-row lg:items-center lg:justify-center'>
          <div className=''>

            <h2 className="flex items-center text-3xl sm:text-4xl lg:text-6xl font-bold text-black text-left gap-4"> Get in 
               <span className="inline-block h-1 w-25 bg-black"> </span> </h2>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black text-left"> touch with us  </h2>
            
            <p className=' text-slate-500 mt-5 text-base'>We’re here to help! Whether you have a question about our 
              services or an enquiry about Oviqo, we’d love to hear from you.</p>
              <p className=' text-slate-500 mt-5'>Company Enquiry Email : </p>
              <p className=' text-black mt-5'>oviqo@hotmail.com</p>
               <p className=' text-slate-500 mt-5'>Phone Number : </p>
               <p className=' text-black mt-5'>+44 7597474602</p>

               <p className="mt-12 rounded-[80] bg-black px-5 py-3 font-semibold text-white text-center hover:bg-black">Avaiable Monday to Friday 9AM - 5PM GMT</p>


            </div>          
          <div className='w-full max-w-xl min-w-0 rounded-[40px] bg-neutral-100 p-7 sm:p-8 lg:p-10 mt-16 ml-50'>
             <form onSubmit={handleSubmit}>
                <div className=''>
            <label htmlFor="name" className="mb-2 mt-2 block text-black font-semibold">
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full rounded-lg border border-slate-600 text-slate-600 p-3"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 mt-2 block text-black font-semibold">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-slate-600 text-slate-600 p-3"></input>
          </div>
          <div>
            <label htmlFor="message" className="mb-2 mt-2 block text-black font-semibold">
              Message
            </label>

            <textarea
              id="message"
              name="message"
              rows={8}
              required
              className="w-full rounded-lg border border-slate-600 text-slate-600 p-3 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-[80px] bg-[#9d96e9] px-6 py-3 font-semibold text-white hover:bg-[#7770c5] disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send message'}
          </button>

          {status && (
  <p className="mt-4 text-sm text-slate-700">
    {status}
  </p>
)}

  

             </form>
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