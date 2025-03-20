import Image from "next/image";

export default function LearnMore() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 h-full w-full">
        <div className="absolute left-0 top-0 z-0">
          <Image
            src="/images/c-1.png" // Update with your image path
            alt="Left Side Image"
            width={800} // Adjust width as needed
            height={200} // Adjust height as needed
            className="h-full w-full object-cover opacity-90" // Adjust opacity for subtle effect
          />
        </div>

        {/* Binary Background Image (Should Be Fully Visible) */}
        <div className="absolute inset-0 z-10">
          <Image
            src="/images/binaryimage.png"
            alt="Binary Background"
            fill
            priority
            className="container object-cover mix-blend-overlay"
          />
        </div>

      </div>

      {/* Content Section */}
      <div className="container relative z-20 mx-auto px-4">
        <div className="mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Learn More About ORSO
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-base text-gray-300 md:text-lg">
            At Orso, we are more than a cybersecurity provider – we&apos;re your
            trusted partner in building a resilient digital environment. Our
            mission is to empower businesses to operate securely in today&apos;s
            complex and ever-changing threat landscape. We specialize in
            delivering end-to-end security solutions tailored to meet your
            unique needs, whether you&apos;re safeguarding sensitive data,
            ensuring compliance, or protecting critical infrastructure.
          </p>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
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
    <div className="rounded-lg border border-gray-800 bg-black/20 p-6 text-center backdrop-blur-sm">
      <p className="mb-1 text-4xl font-bold text-white">{value}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}
