'use client';

import { useState } from 'react';
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

  if (!carouselData || carouselData.length === 0) {
    return null;
  }

  const currentItem = carouselData[activeItemIndex] || carouselData[0];

  return (
    <div className="text-black flex items-center gap-2">
      <button 
        onClick={() => {
          if (activeItemIndex !== 0) { 
            setActiveItemIndex((prevIndex) => prevIndex - 1);
          } else {
            setActiveItemIndex(carouselData.length - 1);
          }
        }} 
        className="h-7.5 w-7.5 bg-gray-200 rounded-full justify-items-center mx-auto hover:bg-gray-300"
      >
        <HiArrowSmLeft />
      </button>

      <Link 
        href={currentItem.slug ? `resource/${currentItem.slug}` : '#'}
        className="w-full max-w-full grid bg-[#EBEAFB] rounded-md h-100 transition hover:opacity-95"
      >
        <div className="flex">
          <div className="flex-1 max-w-[40%] flex flex-col pl-5 justify-center">
            <div className="bg-white rounded-md p-2 mb-3 pt-0 pb-0 max-w-15 flex justify-center items-center">
              <div>{currentItem.type}</div>
            </div>
            <div className="text-4xl">{currentItem.title}</div>
            <div className="justify-left flex pt-2 ml-0 pl-0">
              <div className="w-12.5 h-12.5 rounded-full bg-white">
                {currentItem.pfpUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={currentItem.pfpUrl} 
                    alt={`Profile picture of ${currentItem.author}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <Image 
                    src={userProfile} 
                    alt="Profile picture of the author"
                    placeholder="blur"
                    className="w-12 h-12 rounded-full"
                  />
                )}
              </div>
              <div className="pl-2">
                <p>{currentItem.author}</p>
                <p>{currentItem.authorTitle}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-[60%] bg-white m-3 rounded-lg overflow-hidden relative">
            {currentItem.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={currentItem.imageUrl} 
                alt={currentItem.title} 
                className="w-full h-full object-cover rounded-lg"
              />
            ) : null}
          </div>
        </div>
      </Link>

      <button 
        onClick={() => {
          if (activeItemIndex !== carouselData.length - 1) {
            setActiveItemIndex((prevIndex) => prevIndex + 1);
          } else {
            setActiveItemIndex(0);
          }
        }} 
        className="h-7.5 w-7.5 bg-gray-200 rounded-full justify-items-center mx-auto hover:bg-gray-300"
      >
        <HiArrowSmRight />
      </button>
    </div>
  );
}