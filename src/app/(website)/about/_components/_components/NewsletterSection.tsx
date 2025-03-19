import Image from "next/image";
import React from "react";

const NewsletterSection = () => {
  return (
    <div className="relative mx-auto mt-[100px] flex h-[auto] min-h-[569px] w-full items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src="/images/subscribe.png"
          layout="fill"
          objectFit="cover"
          alt="subscribe-image"
        />
      </div>

      <div
        className="absolute z-10 lg:w-full w-[90%]  md:w-1/2 max-w-[670px] lg:max-h-[293px] rounded-lg bg-gradient-to-r from-[#FDFDFD40] to-[#200C0D] bg-opacity-100 p-4 md:p-10 lg:left-[18%] lg:top-[15%]"
      >
        <h2 className="mb-2 text-2xl md:text-3xl font-bold text-white">
          Subscribe Newsletter
        </h2>
        <p className="mb-4 text-sm text-gray-300">
          Get bidding update earlier.
        </p>
        <p className="mb-4 text-sm text-gray-300">
          Subscribe to our newsletter and be the first to discover the latest
          CBD tips, exclusive discounts, and wellness news.
        </p>
        <div className="flex flex-col md:flex-row">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="flex-grow rounded-l-md md:rounded-r-none bg-white px-4 py-2 text-black focus:outline-none mb-2 md:mb-0"
          />
          <button className="rounded-r-md md:rounded-l-none bg-red-600 px-6 py-2 text-white hover:bg-red-700">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;