import Image from "next/image"

const VisionSection = () => {
  return (
    <section className="relative text-white py-16">
      {/* Background image positioned absolutely */}
      <div className="absolute top-4 right-0 z-0  pointer-events-none h-[1500px] w-[1500px]">
        <Image
          alt="vision background"
          width={800}
          height={400}
          src="/images/mis-1.png"
          className="object-cover h-full w-auto ml-auto"
        />
      </div>

      {/* Content container with proper max-width and padding */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="lg:flex gap-14 items-center">
          {/* Left content column */}
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <div className="text-center lg:text-start mt-10 lg:mt-0">
              <h2 className="text-3xl font-bold mb-6">OUR VISION</h2>
              <p className="text-lg mb-4">
                At [Your Company Name], our vision is to be a global leader in cybersecurity, creating a secure digital
                future where individuals and businesses thrive without fear of cyber threats. We aspire to build a world
                where trust, privacy, and security are the foundation of all digital interactions.
              </p>
              <p className="text-lg mb-4">Our vision is centered on:</p>
              <ul className="list-disc list-inside mb-4">
                <li>
                  <strong>Innovation:</strong> Pioneering new technologies and approaches to stay one step ahead of
                  emerging threats, ensuring that our clients remain secure in an ever-changing digital landscape.
                </li>
                <li>
                  <strong>Resilience:</strong> Helping organizations of all sizes become more resilient to cyber risks
                  by implementing proactive and tailored security measures that evolve alongside industry needs.
                </li>
                <li>
                  <strong>Education:</strong> Promoting cybersecurity awareness and best practices, empowering our
                  clients and the wider community to make informed decisions about their online safety.
                </li>
              </ul>
              <p className="text-lg">
                Our goal is to provide not just protection, but a sense of confidence and security for everyone we
                serve, contributing to a safer and more secure digital world for generations to come.
              </p>
            </div>
          </div>

          {/* Right image column */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-[500px]">
              <Image
                src="/images/vision.png"
                alt="Vision Concept"
                width={500}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisionSection

