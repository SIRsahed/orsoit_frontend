// "use client";
// import { useState, useEffect } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Facebook,
//   Twitter,
//   Instagram,
// } from "lucide-react";
// import Image from "next/image";

// // Define the type for team members
// interface TeamMember {
//   id: number;
//   name: string;
//   title: string;
//   image: string;
//   socialLinks: {
//     facebook?: string;
//     twitter?: string;
//     instagram?: string;
//   };
// }

// export default function CarouselPages() {
//   // Sample data - replace with your dynamic data source
//   const teamMembers: TeamMember[] = [
//     {
//       id: 1,
//       name: "Alender",
//       title: "Performance Advisor",
//       image: "/placeholder.svg?height=150&width=150",
//       socialLinks: {
//         facebook: "#",
//         twitter: "#",
//         instagram: "#",
//       },
//     },
//     {
//       id: 2,
//       name: "Alender",
//       title: "Performance Advisor",
//       image: "/placeholder.svg?height=150&width=150",
//       socialLinks: {
//         facebook: "#",
//         twitter: "#",
//         instagram: "#",
//       },
//     },
//     {
//       id: 3,
//       name: "Alender",
//       title: "Performance Advisor",
//       image: "/placeholder.svg?height=150&width=150",
//       socialLinks: {
//         facebook: "#",
//         twitter: "#",
//         instagram: "#",
//       },
//     },
//     {
//       id: 4,
//       name: "Sarah Johnson",
//       title: "Security Specialist",
//       image: "/placeholder.svg?height=150&width=150",
//       socialLinks: {
//         facebook: "#",
//         twitter: "#",
//         instagram: "#",
//       },
//     },
//     {
//       id: 5,
//       name: "Michael Chen",
//       title: "Threat Analyst",
//       image: "/placeholder.svg?height=150&width=150",
//       socialLinks: {
//         facebook: "#",
//         twitter: "#",
//         instagram: "#",
//       },
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [visibleCards, setVisibleCards] = useState<TeamMember[]>([]);
//   const [cardsToShow, setCardsToShow] = useState(3);

//   // Handle responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setCardsToShow(1);
//       } else if (window.innerWidth < 1024) {
//         setCardsToShow(2);
//       } else {
//         setCardsToShow(3);
//       }
//     };

//     // Set initial value
//     handleResize();

//     // Add event listener
//     window.addEventListener("resize", handleResize);

//     // Clean up
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Update visible cards when currentIndex or cardsToShow changes
//   useEffect(() => {
//     setVisibleCards(
//       teamMembers.slice(currentIndex, currentIndex + cardsToShow),
//     );
//   }, [currentIndex, cardsToShow, teamMembers]);

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => {
//       const newIndex = prevIndex - cardsToShow;
//       return newIndex >= 0
//         ? newIndex
//         : Math.max(teamMembers.length - cardsToShow, 0);
//     });
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => {
//       const newIndex = prevIndex + cardsToShow;
//       return newIndex < teamMembers.length ? newIndex : 0;
//     });
//   };

//   return (
//     <section className="w-full pt-12">
//       <div className="container mx-auto px-4">
//         <div className="absolute inset-0 z-0 h-full w-full">
//           <Image
//             src="/images/binaryimage.png"
//             alt="Background"
//             fill
//             priority
//             className="object-cover opacity-70 "
//           />
//         </div>

//         {/* First image positioned on the left with half width and full height */}
//         <div className="z-1 absolute left-0 top-0 h-full w-[70%]">
//           <Image
//             src="/images/E-1.png"
//             alt="Left side image"
//             fill
//             priority
//             className="w-full object-cover opacity-50" // Add white border here
//           />
//         </div>
//         <div className="mb-8 flex items-center justify-between">
//           <h2 className="text-3xl font-bold text-white">
//             Cyber Security Solutions
//           </h2>
//           <div className="flex space-x-2">
//             <button
//               onClick={handlePrev}
//               className="rounded-full p-2 text-white hover:bg-red-900/30"
//               aria-label="Previous slide"
//             >
//               <ChevronLeft className="h-6 w-6" />
//             </button>
//             <button
//               onClick={handleNext}
//               className="rounded-full p-2 text-white hover:bg-red-900/30"
//               aria-label="Next slide"
//             >
//               <ChevronRight className="h-6 w-6" />
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {visibleCards.map((member) => (
//             <div
//               key={member.id}
//               className="flex flex-col items-center rounded-lg border border-red-900/30 bg-black p-6 transition-all"
//             >
//               <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-200">
//                 <Image
//                   src={member.image || "/placeholder.svg"}
//                   alt={member.name}
//                   width={150}
//                   height={150}
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//               <h3 className="mb-1 text-xl font-medium text-white">
//                 {member.name}
//               </h3>
//               <p className="mb-4 text-sm text-gray-400">{member.title}</p>
//               <div className="flex space-x-3">
//                 {member.socialLinks.facebook && (
//                   <a
//                     href={member.socialLinks.facebook}
//                     className="rounded-full bg-red-900/50 p-2 text-white hover:bg-red-800"
//                     aria-label="Facebook"
//                   >
//                     <Facebook className="h-4 w-4" />
//                   </a>
//                 )}
//                 {member.socialLinks.twitter && (
//                   <a
//                     href={member.socialLinks.twitter}
//                     className="rounded-full bg-red-900/50 p-2 text-white hover:bg-red-800"
//                     aria-label="Twitter"
//                   >
//                     <Twitter className="h-4 w-4" />
//                   </a>
//                 )}
//                 {member.socialLinks.instagram && (
//                   <a
//                     href={member.socialLinks.instagram}
//                     className="rounded-full bg-red-900/50 p-2 text-white hover:bg-red-800"
//                     aria-label="Instagram"
//                   >
//                     <Instagram className="h-4 w-4" />
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

