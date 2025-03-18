import Image from "next/image";
import React from "react";
import img1 from "../../../../../../public/images/Rectangle 6345.png";
import img2 from "../../../../../../public/images/Ellipse 10.png";
import img3 from "../../../../../../public/images/Ellipse 11.png";

const TestimonialSection = () => {
  return (
    <div className="mt mx-auto mt-32 flex h-[759px] w-[1170px] flex-col items-center justify-center p-10">
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
