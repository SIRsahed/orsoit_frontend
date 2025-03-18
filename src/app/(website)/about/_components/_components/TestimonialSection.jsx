import Image from "next/image";
import React from "react";
import img1 from "../../../../../../public/images/Rectangle 6345.png";
import img2 from "../../../../../../public/images/Ellipse 10.png";
import img3 from "../../../../../../public/images/Ellipse 11.png";

const TestimonialSection = () => {
  return (
    <div className="mt container mx-auto mt-32 flex h-[759px] flex-col items-center justify-center p-10">
      <div className="text-center">
        <h2 className="mb-4 text-base font-bold text-white">Testimonial</h2>
        <h3 className="mb-6 text-[56px] font-semibold text-[#FFF]">
          You Choose, We Perfect
        </h3>
        <p className="mb-8 w-[569px] text-[16px] text-[#FFF]">
          Lorem ipsum dolor sit amet consectetur. Ornare dictumst donec morbi a
          egestas hendrerit. Integer purus at cursus sem sit risus adipiscing.
        </p>
      </div>

      <div className="w-full rounded-lg p-8 *:text-white">
        <div className="mb-6 flex gap-10 space-y-2">
          <div className="mr-4 h-[400px] w-[370px]">
            <Image
              src={img1}
              alt=""
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
          <div className="w-[700px]">
            <h4 className="mb-5 text-[48px] font-semibold">Alex</h4>
            <p className="mb-2 text-sm">Person Designation</p>
            <Image
              src="/images/t6.png"
              width={100}
              height={30}
              alt="Image Description"
              className="mb-3"
            />
            <p className="leading-relaxed">
              We partnered with [Your Company Name] to secure our network, and
              the results have been outstanding. Their team is not only
              incredibly knowledgeable but also responsive and proactive. Since
              working with them, weve seen a dramatic decrease in security
              vulnerabilities, and we feel confident that our business is fully
              protected. Their 24/7 support is a lifesaver!
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-between gap-5">
          <div className="bg-[rgba(255, 255, 255, 0.1)] flex h-[140px] w-[370px] items-center gap-5 rounded-md border border-gray-600 px-4 opacity-100 backdrop-blur-md">
            <div className="h-[100px] w-[100px] rounded-full">
              <Image
                src={img2}
                width={100}
                height={30}
                alt="Image Description"
                className="mb-3"
              />
            </div>
            <div className="w-[177px]">
              <p className="mb-1 text-[24px] text-white">Nofa</p>
              <p className="text-base text-white">
                Sr. Security Analyst, <br />
                Allsafe Security Expert
              </p>
            </div>
          </div>
          <div className="bg-[rgba(255, 255, 255, 0.1)] flex h-[140px] w-[370px] items-center gap-5 rounded-md border border-gray-600 px-4 opacity-100 backdrop-blur-md">
            <div className="h-[100px] w-[100px] rounded-full">
              {" "}
              <Image
                src={img3}
                width={100}
                height={30}
                alt="Image Description"
                className="mb-3"
              />
            </div>
            <div className="w-[177px]">
              <p className="mb-1 text-[24px] text-white">Nofa</p>
              <p className="text-base text-white">
                Sr. Security Analyst, <br />
                Allsafe Security Expert
              </p>
            </div>
          </div>
          <div className="bg-[rgba(255, 255, 255, 0.1)] flex h-[140px] w-[370px] items-center gap-5 rounded-md border border-gray-600 px-4 opacity-100 backdrop-blur-md">
            <div className="h-[100px] w-[100px] rounded-full">
              {" "}
              <Image
                src={img2}
                width={100}
                height={30}
                alt="Image Description"
                className="mb-3"
              />
            </div>
            <div className="w-[177px]">
              <p className="mb-1 text-[24px] text-white">Nofa</p>
              <p className="text-base text-white">
                Sr. Security Analyst, <br />
                Allsafe Security Expert
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;

// import Image from "next/image";
// import React from "react";

// const TestimonialSection = () => {
//   return (
//     <div className="mx-auto flex mt-20 lg:m-0 flex-col items-center lg:mx-auto justify-center lg:container lg:mt-32 lg:p-10">
//       <div className="text-center">
//         <h2 className="mb-4 text-base font-bold text-white">Testimonial</h2>
//         <h3 className="mb-6 text-[40px] font-semibold leading-tight text-[#FFF] lg:text-[56px]">
//           You Choose, We Perfect
//         </h3>
//         <p className="mb-8 w-full text-base text-[#FFF] md:w-[569px]">
//           Lorem ipsum dolor sit amet consectetur. Ornare dictumst donec morbi a
//           egestas hendrerit. Integer purus at cursus sem sit risus adipiscing.
//         </p>
//       </div>

//       <div className="w-full rounded-lg bg-gray-100 p-8">
//         <div className="mb-6 flex flex-col gap-10 md:flex-row">
//           <div className="h-[200px] w-full bg-gray-300 md:h-[400px] md:w-[370px]">
//             {/* Placeholder for Alex's profile picture */}
//           </div>
//           <div className="w-full md:w-[700px]">
//             <h4 className="mb-5 text-4xl font-semibold md:text-[48px]">Alex</h4>
//             <p className="mb-2 text-sm text-gray-500">Person Designation</p>
//             <Image
//               src="/images/t6.png"
//               width={100}
//               height={30}
//               alt="Image Description"
//               className="mb-3"
//             />
//             <p className="leading-relaxed text-gray-700">
//               We partnered with [Your Company Name] to secure our network, and
//               the results have been outstanding. Their team is not only
//               incredibly knowledgeable but also responsive and proactive. Since
//               working with them, weve seen a dramatic decrease in security
//               vulnerabilities, and we feel confident that our business is fully
//               protected. Their 24/7 support is a lifesaver!
//             </p>
//           </div>
//         </div>

//         <div className="mt-6 flex flex-col justify-between gap-5 md:flex-row">
//           {/* <div className="flex items-center w-full md:w-[370px] h-[140px] border px-4 bg-[#301a1a] rounded-md">
//             <div className="lg:w-[100px] lg:h-[100px] w-[70px] h-[70px] rounded-full bg-red-500"></div>
//             <div className="w-full md:w-[177px]">
//               <p className="text-2xl mb-1 text-white">Nofa</p>
//               <p className="text-base text-white">
//                 Sr. Security Analyst, <br />
//                 Allsafe Security Expert
//               </p>
//             </div>
//           </div> */}

//           <div className="flex h-[140px] w-full items-center rounded-md border bg-[#301a1a] px-4 md:w-[370px]">
//             <div className="h-[80px] w-[80px] flex-shrink-0 rounded-full bg-red-500 lg:h-[100px] lg:w-[100px]"></div>
//             <div className="w-full pl-4 md:w-[177px]">
//               {" "}
//               {/* pl-4 added for padding */}
//               <p className="mb-1 text-2xl text-white">Nofa</p>
//               <p className="text-base text-white">
//                 Sr. Security Analyst, <br />
//                 Allsafe Security Expert
//               </p>
//             </div>
//           </div>
//           <div className="flex h-[140px] w-full items-center rounded-md border bg-[#301a1a] px-4 md:w-[370px]">
//             <div className="h-[80px] w-[80px] flex-shrink-0 rounded-full bg-red-500 lg:h-[100px] lg:w-[100px]"></div>
//             <div className="w-full pl-4 md:w-[177px]">
//               {" "}
//               {/* pl-4 added for padding */}
//               <p className="mb-1 text-2xl text-white">Nofa</p>
//               <p className="text-base text-white">
//                 Sr. Security Analyst, <br />
//                 Allsafe Security Expert
//               </p>
//             </div>
//           </div>
//           <div className="flex h-[140px] w-full items-center rounded-md border bg-[#301a1a] px-4 md:w-[370px]">
//             <div className="h-[80px] w-[80px] flex-shrink-0 rounded-full bg-red-500 lg:h-[100px] lg:w-[100px]"></div>
//             <div className="w-full pl-4 md:w-[177px]">
//               {" "}
//               {/* pl-4 added for padding */}
//               <p className="mb-1 text-2xl text-white">Nofa</p>
//               <p className="text-base text-white">
//                 Sr. Security Analyst, <br />
//                 Allsafe Security Expert
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestimonialSection;
