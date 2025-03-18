import Image from "next/image";
import React from "react";

const TestimonialSection = () => {
  return (
    <div className="w-[1170px] h-[759px] mt-32 p-10 flex flex-col mx-auto mt items-center justify-center">
      <div className="text-center">
        <h2 className="text-base text-white font-bold mb-4">Testimonial</h2>
        <h3 className="text-[56px] font-semibold text-[#FFF] mb-6">
          You Choose, We Perfect
        </h3>
        <p className="text-[#FFF] text-[16px] mb-8  w-[569px]">
          Lorem ipsum dolor sit amet consectetur. Ornare dictumst donec morbi a
          egestas hendrerit. Integer purus at cursus sem sit risus adipiscing.
        </p>
      </div>

      <div className="bg-gray-100 rounded-lg p-8 w-full">
        <div className="flex mb-6 gap-10 space-y-2">
          <div className="w-[370px] h-[400px] bg-gray-300 mr-4">
            {/* Placeholder for Alex's profile picture */}
          </div>
          <div className="w-[700px]">
            <h4 className="font-semibold mb-5 text-[48px]">Alex</h4>
            <p className="text-sm text-gray-500 mb-2">Person Designation</p>
            <Image
              src="/images/t6.png"
              width={100}
              height={30}
              alt="Image Description"
              className="mb-3"
            />
            <p className="text-gray-700 leading-relaxed">
              We partnered with [Your Company Name] to secure our network, and
              the results have been outstanding. Their team is not only
              incredibly knowledgeable but also responsive and proactive. Since
              working with them, weve seen a dramatic decrease in security
              vulnerabilities, and we feel confident that our business is fully
              protected. Their 24/7 support is a lifesaver!
            </p>
          </div>
        </div>

        <div className="mt-6 gap-5 flex justify-between">
          <div className="flex gap-5 items-center w-[370px] h-[140px] border px-4 bg-[#301a1a] opacity-100 rounded-md">
            <div className="w-[100px] h-[100px] rounded-full bg-red-500"></div>
            <div className="w-[177px]">
              <p className="text-[24px] mb-1 text-white">Nofa</p>
              <p className="text-base text-white">
                Sr. Security Analyst, <br />
                Allsafe Security Expert
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-center w-[370px] h-[140px] border px-4 bg-[#301a1a] opacity-100 rounded-md">
            <div className="w-[100px] h-[100px] rounded-full bg-red-500"></div>
            <div className="w-[177px]">
              <p className="text-[24px] mb-1 text-white">Nofa</p>
              <p className="text-base text-white">
                Sr. Security Analyst, <br />
                Allsafe Security Expert
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-center w-[370px] h-[140px] border px-4 bg-[#301a1a] opacity-100 rounded-md">
            <div className="w-[100px] h-[100px] rounded-full bg-red-500"></div>
            <div className="w-[177px]">
              <p className="text-[24px] mb-1 text-white">Nofa</p>
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
