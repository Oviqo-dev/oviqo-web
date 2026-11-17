'use client';

import { useState, type SyntheticEvent } from 'react';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setMessage('Thanks for subscribing!');
      setEmail('');
    } catch (err: unknown) {
      setStatus('error');
      setMessage(
        err instanceof Error ? err.message : 'OOPS something didn&apos; go right, please try again :)'
      );
    }
  };

  return (
    <div className="rounded-lg w-full bg-[#F7F7FF] mt-3 p-10 sm:hidden md:block">
      <h2 className="font-bold">Subscribe to our free newsletter</h2>
      <p>Government tender news delivered straight to your inbox</p>

      <form onSubmit={handleSubmit} className="mt-5">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={status === 'loading'}
          className="rounded-lg w-full h-10 px-3 bg-white text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg w-full h-10 mt-3 bg-black text-white font-medium hover:bg-gray-900 disabled:opacity-60 transition cursor-pointer"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {status === 'success' && (
        <p className="text-center mt-3 text-sm text-green-600 font-medium">
          {message}
        </p>
      )}

      {status === 'error' && (
        <p className="text-center mt-3 text-sm text-red-600 font-medium">
          {message}
        </p>
      )}

      {status !== 'success' && status !== 'error' && (
        <p className="text-center mt-3 text-gray-500">
          No spam, we hate it too!
        </p>
      )}
    </div>
  );
}