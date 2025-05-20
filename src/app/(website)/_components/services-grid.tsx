"use client";

import { ServiceCard } from "@/components/shared/service-card";
import { Button } from "@/components/ui/button";
import { fetchServices } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CuboidIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface Service {
  name: string;
  description: string;
  image: string;
  _id: string
}


export function ServicesGrid() {

  const pathname = usePathname()

  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: () => fetchServices(),
    select: (serviceData) => serviceData.data
  })

  console.log(services)



  return (
    <section className="relative w-full py-16">
      <div className="absolute right-0 -z-10 md:h-[1500px] md:w-[1500px]">
        <Image src="/gradient/gr.png" alt="services-bg" fill />
      </div>
      {/* Content */}

      {
        pathname !== "/service" && (
          <div className="container z-20 mx-auto mb-20 mt-10 text-center">
            <h1 className="mb-6 text-[46px] font-bold leading-[60px] tracking-tight text-white md:text-[56px]">
              YOUR 1 IT SECURITY AND SERVICE PROVIDERS
            </h1>
            <p className="mx-auto mb-8 text-base text-white/90 md:text-lg">
              At Orso, we are dedicated to protecting your business in the
              ever-evolving digital landscape. From proactive threat assessments to
              building tailor-made security solutions, our expert team delivers
              cutting-edge strategies to safeguard your assets. Whether you&apos;re
              a startup or an enterprise, we&apos;ve got you covered.
            </p>
            <Link
              href="/service"
              className="inline-block min-w-[250px] bg-red-600 px-8 py-3 text-center font-medium text-white transition-colors duration-200 hover:bg-red-700"
            >
              Explore More
            </Link>
          </div>
        )
      }
      <div className="container mx-auto space-y-8">
        <div className="text-center">
          <h2 className="title">Orso Services</h2>
          <p className="mx-auto text-secondary">
            Have questions or need assistance? Our team is here to help! Whether
            you&apos;re looking for cybersecurity solutions, have a security
            concern, or just want to learn more about our services, feel free to
            reach out.
          </p>
        </div>
        {/* r-gradient */}
        {/* <div className="hero_line_gradient absolute inset-0 bottom-0 -z-10">
        </div> */}
        <div className="flex justify-center">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services?.map((service: Service, index: number) => (
              <ServiceCard
                key={index}
                title={service.name}
                description={service.description}
                image={service.image}
                id={service._id}
              />
            ))}
            <div className="">
              <div className="relative z-10 h-[390px] w-[370px]">
                <Image
                  src={"/curved_div.png"}
                  alt="ORSO Solutions"
                  height={400}
                  width={400}
                  className="h-full w-full object-contain"
                />

                {/* Content positioned absolutely on top of the image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pt-10">
                  <div className="space-y-6 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center">
                      <CuboidIcon className="h-12 w-12 text-red-600" />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-primary">Get your custom Service</h3>
                      <p className="cardSubTitle max-w-[280px]">Protect your business with robust network security solutions designed to defend against unauthorized access, malware, and cyber threats. We ensure your network infrastructure is secure, efficient, and reliable.</p>
                    </div>
                    <div>
                      <Link href={`/service/custom`}>
                        <Button
                          className="bg-primary text-white transition-colors hover:bg-red-600"
                          size="lg"
                        >
                          Create Plan
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
