import Image from 'next/image';
import React from 'react';

const NewsletterSection = () => {
  return (
    <div className="w-[1440px] h-[569px] mx-auto mt-[100px] relative flex items-center justify-center">
      {/* Background Image (Replace with your actual image) */}
      <div className="absolute">
      <Image 
      src="/images/subscribe.png"
      width={1440}
      height={569}
      alt='subscribe-image'
      />
      </div> 

      <div className="relative z-10 bg-black bg-opacity-70 p-10 rounded-lg w-1/2 max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-4">Subscribe Newsletter</h2>
        <p className="text-sm text-gray-300 mb-6">Get bidding update earlier.</p>
        <p className="text-sm text-gray-300 mb-6">
          Subscribe to our newsletter and be the first to discover the latest CBD tips, exclusive discounts, and wellness news.
        </p>
        <div className="flex">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="flex-grow bg-white text-black px-4 py-2 rounded-l-md focus:outline-none"
          />
          <button className="bg-red-600 text-white px-6 py-2 rounded-r-md hover:bg-red-700">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;