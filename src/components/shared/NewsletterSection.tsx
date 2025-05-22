// import Image from 'next/image';
// import React from 'react';

// const NewsletterSection = () => {
//   return (
//     <div className="w-[1440px] h-[569px] mx-auto mt-[100px] relative flex items-center justify-center">
//       {/* Background Image (Replace with your actual image) */}
//       <div className="absolute">
//       <Image
//       src="/images/subscribe.png"
//       width={1440}
//       height={569}
//       alt='subscribe-image'
//       />
//       </div>

//       <div className="relative z-10 bg-black bg-opacity-70 p-10 rounded-lg w-1/2 max-w-xl">
//         <h2 className="text-3xl font-bold text-white mb-4">Subscribe Newsletter</h2>
//         <p className="text-sm text-gray-300 mb-6">Get bidding update earlier.</p>
//         <p className="text-sm text-gray-300 mb-6">
//           Subscribe to our newsletter and be the first to discover the latest CBD tips, exclusive discounts, and wellness news.
//         </p>
//         <div className="flex">
//           <input
//             type="email"
//             placeholder="Enter Your Email"
//             className="flex-grow bg-white text-black px-4 py-2 rounded-l-md focus:outline-none"
//           />
//           <button className="bg-red-600 text-white px-6 py-2 rounded-r-md hover:bg-red-700">
//             Subscribe
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsletterSection;

// import Image from "next/image";
// import React from "react";

// const NewsletterSection = () => {
//   return (
//     <div className="relative mx-auto mt-[100px] flex h-[569px] container items-center justify-center">
//       {/* Background Image (Replace with your actual image) */}
//      <div className="absolute">
//         <Image
//           src="/images/subscribe.png"
//           width={1440}
//           height={569}
//           alt="subscribe-image"
//         />
//       </div>

//       <div
//         className="absolute z-10 w-1/2 max-w-xl rounded-lg bg-gradient-to-r from-[#FDFDFD40] to-[#200C0D]-+l bg-opacity-100 p-10"
//         style={{ left: "8%", top: "15%" }}
//       >
//         {" "}
//         {/* absolute added */}
//         <h2 className="mb-4 text-3xl font-bold text-white">
//           Subscribe Newsletter
//         </h2>
//         <p className="mb-6 text-sm text-gray-300">
//           Get bidding update earlier.
//         </p>
//         <p className="mb-6 text-sm text-gray-300">
//           Subscribe to our newsletter and be the first to discover the latest
//           CBD tips, exclusive discounts, and wellness news.
//         </p>
//         <div className="flex">
//           <input
//             type="email"
//             placeholder="Enter Your Email"
//             className="flex-grow rounded-l-md bg-white px-4 py-2 text-black focus:outline-none"
//           />
//           <button className="rounded-r-md bg-red-600 px-6 py-2 text-white hover:bg-red-700">
//             Subscribe
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsletterSection;

"use client";

import Image from "next/image";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      toast.success("You have successfully subscribed to our newsletter.");

      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative mx-auto mt-[100px] flex h-[auto] min-h-[569px] w-full items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src="/images/subscribe.png"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          alt="Newsletter subscription background"
          priority
        />
      </div>

      <div className="absolute z-10 w-[90%] max-w-[670px] rounded-lg bg-opacity-100 bg-gradient-to-r from-[#FDFDFD40] to-[#200C0D] p-4 md:w-1/2 md:p-10 lg:left-[15%] lg:top-[30%] lg:max-h-[293px] lg:w-full">
        <h2 className="mb-2 text-[26px] font-bold text-white md:text-[32px]">
          Subscribe Newsletter
        </h2>
        <p className="mb-4 text-sm text-gray-300">
          Get bidding update earlier.
        </p>
        <p className="mb-4 text-sm text-gray-300">
          Subscribe to our newsletter and be the first to discover the latest
          CBD tips, exclusive discounts, and wellness news.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="mb-2 flex-grow rounded-l-md bg-white px-4 py-2 text-black focus:outline-none md:mb-0 md:rounded-r-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            aria-label="Email address"
            required
          />
          <button
            type="submit"
            className="rounded-r-md bg-red-600 px-6 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 md:rounded-l-none"
            disabled={isLoading}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSection;
