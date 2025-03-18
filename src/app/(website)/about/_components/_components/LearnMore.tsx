// import Image from "next/image";

// export default function LearnMore() {
//   return (
//     <section className="relative container py-16 mb-48 md:py-24 overflow-hidden">
//       {/* Background image from public folder */}
//       <div
//         className="absolute top-20 z-0 left-1/2 -translate-x-1/2"
//         style={{ width: "1096.37px", height: "657px" }} // Set container width
//       >
//         <div
//           className="relative w-full h-full"
//           style={{
//             aspectRatio: "894/600",
//             width: "100%", // Ensure the width is 100% of its parent container
//             height: "100%", // Height adjusts to aspect ratio
//           }}
//         >
//           <Image
//             src="/images/binaryimage.png"
//             alt="Digital background"
//             fill
//             priority
//             className="object-cover"
//           />
//         </div>
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className=" mx-auto text-center">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Learn More About ORSO</h2>

//           <p className="text-gray-300 mb-12 text-base md:text-lg  mx-auto">
//             At Orso, we are more than a cybersecurity provider – were your trusted partner in building a resilient
//             digital environment. Our mission is to empower businesses to operate securely in todays complex and
//             ever-changing threat landscape. We specialize in delivering end-to-end security solutions tailored to meet
//             your unique needs, whether youre safeguarding sensitive data, ensuring compliance, or protecting critical
//             infrastructure.
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6  mx-auto">
//             <StatCard value="5K" label="Subscribers" />
//             <StatCard value="5K" label="Clients" />
//             <StatCard value="5K" label="Success" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function StatCard({ value, label }: { value: string; label: string }) {
//   return (
//     <div className="border border-gray-800 bg-black/20 backdrop-blur-sm rounded-lg p-6 text-center">
//       <p className="text-4xl font-bold text-white mb-1">{value}</p>
//       <p className="text-gray-400">{label}</p>
//     </div>
//   );
// }






// // import Image from "next/image";

// // export default function LearnMore() {
// //   return (
// //     <section className="mx-auto h-[80vh] relative md:py-24">
// //       {/* Background image covering the entire section */}
// //       <div className="absolute container inset-0 z-0 h-full w-full">
// //         <Image
// //           src="/images/binaryimage.png"
// //           alt="Background"
// //           fill
// //           priority
// //           className="object-cover opacity-70"
// //         />
// //       </div>

// //       {/* First image positioned on the left with half width and full height */}
// //       <div className="absolute left-0 top-0 z-1 h-full w-[70%]">
// //         <Image
// //           src="/images/E-1.png"
// //           alt="Left side image"
// //           fill
// //           priority
// //           className="object-cover w-full opacity-50" // Add white border here
// //         />
// //       </div>

// //       {/* Content container */}
// //       <div className="container relative z-10 mx-auto px-4">
// //         <div className="mx-auto text-center">
// //           <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
// //             Learn More About ORSO
// //           </h2>

// //           <p className="mx-auto mb-12 max-w-4xl text-base text-gray-300 md:text-lg">
// //             At Orso, we are more than a cybersecurity provider – we&apos;re your
// //             trusted partner in building a resilient digital environment. Our
// //             mission is to empower businesses to operate securely in today&apos;s
// //             complex and ever-changing threat landscape. We specialize in
// //             delivering end-to-end security solutions tailored to meet your
// //             unique needs, whether you&apos;re safeguarding sensitive data,
// //             ensuring compliance, or protecting critical infrastructure.
// //           </p>

// //           <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
// //             <StatCard value="5K" label="Subscribers" />
// //             <StatCard value="5K" label="Clients" />
// //             <StatCard value="5K" label="Success" />
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // function StatCard({ value, label }: { value: string; label: string }) {
// //   return (
// //     <div className="rounded-lg border border-gray-800 bg-black/40 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-black/60">
// //       <p className="mb-1 text-4xl font-bold text-white">{value}</p>
// //       <p className="text-gray-400">{label}</p>
// //     </div>
// //   );
// // }


// import Image from "next/image";

export default function LearnMore() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background image from public folder */}
      {/* <div className="absolute inset-0 z-0">
        <Image
          src="/images/binaryimage.png"
          alt="Digital background"
          fill
          priority
          className="object-cover"
        />
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Learn More About ORSO
          </h2>

          <p className="text-gray-300 mb-12 text-base md:text-lg mx-auto max-w-3xl">
            At Orso, we are more than a cybersecurity provider – we&apos;re your
            trusted partner in building a resilient digital environment. Our
            mission is to empower businesses to operate securely in today&apos;s
            complex and ever-changing threat landscape. We specialize in
            delivering end-to-end security solutions tailored to meet your
            unique needs, whether you&apos;re safeguarding sensitive data, ensuring
            compliance, or protecting critical infrastructure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-4xl">
            <StatCard value="5K" label="Subscribers" />
            <StatCard value="5K" label="Clients" />
            <StatCard value="5K" label="Success" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-gray-800 bg-black/20 backdrop-blur-sm rounded-lg p-6 text-center">
      <p className="text-4xl font-bold text-white mb-1">{value}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}