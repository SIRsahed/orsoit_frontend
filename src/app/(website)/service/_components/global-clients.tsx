import Image from "next/image";
import React from "react";

const GlobalClients = () => {
  return (
    <div className="relative">
      <div className="absolute bottom-[-200px] left-0 -z-10 md:h-[1500px] md:w-[1500px]">
        <Image src="/gradient/gl.png" alt="services-bg" fill />
      </div>

      <div className="container">
        <div className="my-10">
          <h2 className="title">Our Client Globally</h2>
          <p className="subTitle">
            Our team is here to help! Whether you’re looking for cybersecurity
            solutions, have a security concern, or just want to learn more about
            our services, feel free to reach out.
          </p>
        </div>
        <Image
          src="/globally_map.png"
          alt="global map"
          width={1000}
          height={1000}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default GlobalClients;
