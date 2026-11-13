'use client';

import { useState, useRef } from 'react';
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import Image from 'next/image';
import userProfile from '../public/memoji.png';
import Link from 'next/link';

interface CarouselItems {
  title: string;
  type: string;
  author: string;
  authorTitle: string;
  slug?: string;
  imageUrl?: string | null;
  pfpUrl?: string | null;
}

interface CarouselProps {
  carouselData: CarouselItems[];
}

export default function Carousel({ carouselData }: CarouselProps) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (!carouselData || carouselData.length === 0) {
    return null;
  }

  const total = carouselData.length;
  const currentItem = carouselData[activeItemIndex] || carouselData[0];

  const goPrev = () => setActiveItemIndex((i) => (i === 0 ? total - 1 : i - 1));
  const goNext = () => setActiveItemIndex((i) => (i === total - 1 ? 0 : i + 1));

  // Swipe left/right on touch screens
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return; // ignore taps and tiny movements
    if (dx > 0) goPrev();
    else goNext();
  };

  const arrowClass =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xl hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d96e9] sm:h-8 sm:w-8";

  return (
    // Mobile: card on top, arrows underneath. sm and up: arrows either side of the card.
    <div
      className="grid grid-cols-2 items-center gap-3 text-black sm:flex sm:gap-2"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        onClick={goPrev}
        aria-label="Previous item"
        className={`${arrowClass} order-2 justify-self-start sm:order-1`}
      >
        <HiArrowSmLeft />
      </button>

      <Link
        href={currentItem.slug ? `/resource/${currentItem.slug}` : '#'}
        className="order-1 col-span-2 w-full overflow-hidden rounded-md bg-[#EBEAFB] transition hover:opacity-95 sm:order-2 sm:h-100"
      >
        <div className="flex h-full flex-col sm:flex-row">
        
          <div
            className={`relative order-first m-3 aspect-video overflow-hidden rounded-lg mb-0 pb-0 bg-white sm:order-last sm:aspect-auto sm:w-3/5 ${
              currentItem.imageUrl ? '' : 'hidden sm:block'
            }`}
          >
            {currentItem.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentItem.imageUrl}
                alt={currentItem.title}
                className="h-full w-full rounded-lg object-cover"
              />
            ) : null}
          </div>

          
          <div className="flex flex-col justify-center gap-3 px-4 pb-4 pt-1 sm:w-2/5 sm:py-4 sm:pl-5 sm:pr-2">
            <div className="w-fit rounded-md bg-white px-2 mt-2">
              {currentItem.type}
            </div>

            <div className="line-clamp-3 text-4xl">
              {currentItem.title}
            </div>

            <div className="flex items-center gap-2">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white">
                {currentItem.pfpUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentItem.pfpUrl}
                    alt={`Profile picture of ${currentItem.author}`}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src={userProfile}
                    alt="Profile picture of the author"
                    placeholder="blur"
                    className="h-12 w-12 rounded-full"
                  />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate">{currentItem.author}</p>
                <p className="truncate">{currentItem.authorTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={goNext}
        aria-label="Next item"
        className={`${arrowClass} order-3 justify-self-end`}
      >
        <HiArrowSmRight />
      </button>
    </div>
  );
}