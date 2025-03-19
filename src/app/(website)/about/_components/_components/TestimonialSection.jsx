import Image from "next/image";
import React from "react";

const TestimonialSection = () => {
  return (
    <div className="relative">
      {/* <div className="absolute w-[500px] h-[800px] right-0 bottom-0">
        <Image 
          fill
          alt="image"
          src="/images/mis-1.png"
        />
      </div> */}
      <div className="container relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 lg:py-16">
        <div className="text-center">
          <h2 className="mb-4 text-base font-bold text-white">Testimonial</h2>
          <h3 className="mb-6 text-3xl font-semibold text-[#FFF] md:text-5xl">
            You Choose, We Perfect
          </h3>
          <p className="mb-8 max-w-lg text-sm text-[#FFF] md:text-base">
            Lorem ipsum dolor sit amet consectetur. Ornare dictumst donec morbi
            a egestas hendrerit. Integer purus at cursus sem sit risus
            adipiscing.
          </p>
        </div>
        <div className="w-full rounded-lg p-4 md:p-8">
          <div className="mb-6 flex flex-col gap-10 md:flex-row">
            <div className="h-[300px] w-full md:h-[400px] md:w-[370px]">
              <Image
                src="/images/testi-1.png"
                alt="tastimonial"
                height={400}
                width={370}
                className="h-full w-full"
              />
            </div>
            <div className="flex w-full flex-col items-center justify-center text-primary md:w-[700px]">
              <div className="mb-3 flex w-full flex-col items-start">
                <h4 className="mb-3 text-2xl font-semibold md:text-[48px]">
                  Alex
                </h4>
                <p className="mb-2 text-sm">Person Designation</p>

                <Image
                  src="/images/t6.png"
                  width={100}
                  height={30}
                  alt="Image Description"
                  className="mb-3"
                />
              </div>
              <p className="text-[20px] leading-[150%] md:text-base">
                We partnered with [Your Company Name] to secure our network, and
                the results have been outstanding. Their team is not only
                incredibly knowledgeable but also responsive and proactive.
                Since working with them, weve seen a dramatic decrease in
                security vulnerabilities, and we feel confident that our
                business is fully protected. Their 24/7 support is a lifesaver!
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-5 rounded-md bg-[#FFFFFF1A] p-4 opacity-100 backdrop-blur-xl">
              <div className="relative h-16 w-16 flex-shrink-0 rounded-full bg-red-600 md:h-20 md:w-20">
                <Image
                  alt="image"
                  src="/images/cc-1.png"
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="w-full">
                <p className="mb-1 text-lg text-white md:text-[24px]">Nofa</p>
                <p className="text-sm text-white md:text-base">
                  Sr. Security Analyst, <br />
                  Allsafe Security Expert
                </p>
              </div>
            </div>

            {/* <div className="flex items-center gap-5 rounded-md bg-[#301a1a] p-4 opacity-100">
              <div className="h-16 w-16 flex-shrink-0 rounded-full bg-red-600 md:h-20 md:w-20"></div>
              <div className="w-full">
                <p className="mb-1 text-lg text-white md:text-[24px]">Nofa</p>
                <p className="text-sm text-white md:text-base">
                  Sr. Security Analyst, <br />
                  Allsafe Security Expert
                </p>
              </div>
            </div> */}

            <div className="flex items-center gap-5 rounded-md bg-[#FFFFFF1A] p-4 opacity-100 backdrop-blur-xl">
              <div className="relative h-16 w-16 flex-shrink-0 rounded-full bg-red-600 md:h-20 md:w-20">
                <Image
                  alt="image"
                  src="/images/cc-1.png"
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="w-full">
                <p className="mb-1 text-lg text-white md:text-[24px]">Nofa</p>
                <p className="text-sm text-white md:text-base">
                  Sr. Security Analyst, <br />
                  Allsafe Security Expert
                </p>
              </div>
            </div>

            {/* <div className="flex items-center gap-5 rounded-md bg-[#301a1a] p-4 opacity-100">
              <div className="h-16 w-16 flex-shrink-0 rounded-full bg-red-600 md:h-20 md:w-20"></div>
              <div className="w-full">
                <p className="mb-1 text-lg text-white md:text-[24px]">Nofa</p>
                <p className="text-sm text-white md:text-base">
                  Sr. Security Analyst, <br />
                  Allsafe Security Expert
                </p>
              </div>
            </div> */}

            <div className="flex items-center gap-5 rounded-md bg-[#FFFFFF1A] p-4 opacity-100 backdrop-blur-xl">
              <div className="relative h-16 w-16 flex-shrink-0 rounded-full bg-red-600 md:h-20 md:w-20">
                <Image
                  alt="image"
                  src="/images/cc-1.png"
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="w-full">
                <p className="mb-1 text-lg text-white md:text-[24px]">Nofa</p>
                <p className="text-sm text-white md:text-base">
                  Sr. Security Analyst, <br />
                  Allsafe Security Expert
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
