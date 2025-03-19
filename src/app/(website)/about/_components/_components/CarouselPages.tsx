// "use client"

// import Image from "next/image"
// import { Facebook, Twitter, Instagram } from "lucide-react"
// import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
// import { useState } from "react"
// import type { CarouselApi } from "@/components/ui/carousel"

// export default function CyberSecurityCarousel() {
//   const [api, setApi] = useState<CarouselApi | null>(null)

//   const advisors = [
//     {
//       name: "Alender",
//       title: "Performance Advisor",
//       image: "/placeholder.svg?height=200&width=200",
//     },
//     {
//       name: "Alender",
//       title: "Performance Advisor",
//       image: "/placeholder.svg?height=200&width=200",
//     },
//     {
//       name: "Alender",
//       title: "Performance Advisor",
//       image: "/placeholder.svg?height=200&width=200",
//     },
//     {
//       name: "Alender",
//       title: "Performance Advisor",
//       image: "/placeholder.svg?height=200&width=200",
//     },
//     {
//       name: "Alender",
//       title: "Performance Advisor",
//       image: "/placeholder.svg?height=200&width=200",
//     },
//     {
//       name: "Alender",
//       title: "Performance Advisor",
//       image: "/placeholder.svg?height=200&width=200",
//     },
//   ]

//   // Handle previous slide
//   const handlePrevious = () => {
//     if (api) {
//       api.scrollPrev()
//     }
//   }

//   // Handle next slide
//   const handleNext = () => {
//     if (api) {
//       api.scrollNext()
//     }
//   }

//   return (
//     <div className="w-full container mx-auto p-6 relative">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-3xl font-bold text-white">Cyber Security Solutions</h2>

//         {/* Navigation buttons at the top right */}
//         <div className="flex space-x-4">
//           <button
//             onClick={handlePrevious}
//             className="text-white hover:text-red-400 transition-colors"
//             aria-label="Previous slide"
//           >
//             <span className="text-2xl">&lt;</span>
//           </button>
//           <button
//             onClick={handleNext}
//             className="text-white hover:text-red-400 transition-colors"
//             aria-label="Next slide"
//           >
//             <span className="text-2xl">&gt;</span>
//           </button>
//         </div>
//       </div>

//       <div className="relative">
//         <Carousel
//           className="w-full"
//           setApi={setApi}
//           opts={{
//             align: "start",
//           }}
//         >
//           <CarouselContent>
//             {advisors.map((advisor, index) => (
//               <CarouselItem key={index} className="md:basis-1/3 p-2">
//                 <div className="bg-[#0A0A0B] rounded-lg p-6 h-full flex flex-col items-center">
//                   <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
//                     <Image src={advisor.image || "/placeholder.svg"} alt={advisor.name} fill className="object-cover" />
//                   </div>
//                   <h3 className="text-xl font-bold text-white">{advisor.name}</h3>
//                   <p className="text-gray-300 mb-4">{advisor.title}</p>
//                   <div className="flex space-x-4 mt-auto">
//                     <button className="text-red-600 hover:text-red-400 transition-colors">
//                       <Facebook size={20} />
//                     </button>
//                     <button className="text-red-600 hover:text-red-400 transition-colors">
//                       <Twitter size={20} />
//                     </button>
//                     <button className="text-red-600 hover:text-red-400 transition-colors">
//                       <Instagram size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//         </Carousel>
//       </div>
//     </div>
//   )
// }

"use client";

import Image from "next/image";
import { Facebook, Twitter, Instagram } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

export default function CyberSecurityCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);

  const advisors = [
    {
      name: "Alender",
      title: "Performance Advisor",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Alender",
      title: "Performance Advisor",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Alender",
      title: "Performance Advisor",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Alender",
      title: "Performance Advisor",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Alender",
      title: "Performance Advisor",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Alender",
      title: "Performance Advisor",
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  // Handle previous slide
  const handlePrevious = () => {
    if (api) {
      api.scrollPrev();
    }
  };

  // Handle next slide
  const handleNext = () => {
    if (api) {
      api.scrollNext();
    }
  };

  return (
    <div className="relative mx-auto w-full p-6">
      {/* Absolutely positioned image */}
      <div className="absolute left-0 top-1/4 z-0">
        <Image
          src="/images/c-1.png" // Update with your image path
          alt="Left Side Image"
          width={800} // Adjust width as needed
          height={200} // Adjust height as needed
          className="h-full w-full object-cover opacity-30" // Adjust opacity for subtle effect
        />
      </div>
      <div className="container">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">
            Cyber Security Solutions
          </h2>

          {/* Navigation buttons at the top right */}
          <div className="flex space-x-4">
            <button
              onClick={handlePrevious}
              className="text-white transition-colors hover:text-red-400"
              aria-label="Previous slide"
            >
              <span className="text-2xl">&lt;</span>
            </button>
            <button
              onClick={handleNext}
              className="text-white transition-colors hover:text-red-400"
              aria-label="Next slide"
            >
              <span className="text-2xl">&gt;</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <Carousel
            className="w-full"
            setApi={setApi}
            opts={{
              align: "start",
            }}
          >
            <CarouselContent>
              {advisors.map((advisor, index) => (
                <CarouselItem key={index} className="p-2 md:basis-1/3">
                  <div className="flex h-full flex-col items-center rounded-lg bg-[#0A0A0B] p-6">
                    <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full bg-gray-200">
                      <Image
                        src="/images/cc-1.png"
                        alt={advisor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {advisor.name}
                    </h3>
                    <p className="mb-4 text-gray-300">{advisor.title}</p>
                    <div className="mt-auto flex space-x-4">
                      {/* <button className="text-red-600 hover:text-red-400 transition-colors bg-[#D8010040] w-[30px] h-[30px]">
                      <Facebook size={20} />
                    </button> */}

                      <button className="flex h-[30px] w-[30px] items-center justify-center bg-[#D8010040] text-red-600 transition-colors hover:text-red-400 rounded-sm">
                        <Facebook size={15} />
                      </button>
                      <button className="flex h-[30px] w-[30px] items-center justify-center bg-[#D8010040] text-red-600 transition-colors hover:text-red-400 rounded-sm">
                        <Twitter size={20} />
                      </button>
                      <button className="flex h-[30px] w-[30px] items-center justify-center bg-[#D8010040] text-red-600 transition-colors hover:text-red-400 rounded-sm">
                        <Instagram size={20} />
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
