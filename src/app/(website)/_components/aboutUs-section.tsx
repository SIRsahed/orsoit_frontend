import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutUsSection = () => {
  return (
    <div className="relative">
      <div className="absolute left-0 top-[-500px] -z-10 overflow-hidden md:h-[1500px] md:w-[1500px]">
        <Image src="/gradient/gl.png" alt="services-bg" fill />
      </div>
      <div className="container">
        <h2 className="title">About Us</h2>
        <p className="subTitle">
          At Orso, we are more than a cybersecurity provider – we&apos;re your
          trusted partner in building a resilient digital environment. Our
          mission is to empower businesses to operate securely in today&apos;s
          complex and ever-changing threat landscape. We specialize in
          delivering end-to-end security solutions tailored to meet your unique
          needs, whether you&apos;re safeguarding sensitive data, ensuring
          compliance, or protecting critical infrastructure.
        </p>
        <div className="mt-10 flex w-full flex-wrap justify-between gap-10">
          <Link href="/about">
            <Button className="h-[45px] w-[340px] text-[18px]">
              Learn More
            </Button>
          </Link>
          <div className="flex h-[570px] w-[750px]">
            <Image
              src="/about-us-right.png"
              width={800}
              height={570}
              alt="subscribe"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
