import Image from "next/image";

export default function LearnMore() {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Background image from public folder */}
      <div
        className="absolute top-20 z-0 left-1/2 -translate-x-1/2"
        style={{ width: "1096.37px", height: "657px" }} // Set container width
      >
        <div
          className="relative w-full h-full"
          style={{
            aspectRatio: "894/600",
            width: "100%", // Ensure the width is 100% of its parent container
            height: "100%", // Height adjusts to aspect ratio
          }}
        >
          <Image
            src="/images/binaryimage.png"
            alt="Digital background"
            fill
            priority
            className="object-cover"
            sizes="1096.37px" // Add the size of the image to the sizes prop
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Learn More About ORSO</h2>

          <p className="text-gray-300 mb-12 text-base md:text-lg max-w-3xl mx-auto">
            At Orso, we are more than a cybersecurity provider – were your trusted partner in building a resilient
            digital environment. Our mission is to empower businesses to operate securely in todays complex and
            ever-changing threat landscape. We specialize in delivering end-to-end security solutions tailored to meet
            your unique needs, whether youre safeguarding sensitive data, ensuring compliance, or protecting critical
            infrastructure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
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
