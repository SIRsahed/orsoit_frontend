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
        <div className="flex flex-col md:flex-row">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="mb-2 flex-grow rounded-l-md bg-white px-4 py-2 text-black focus:outline-none md:mb-0 md:rounded-r-none"
          />
          <button className="rounded-r-md bg-red-600 px-6 py-2 text-white hover:bg-red-700 md:rounded-l-none">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
