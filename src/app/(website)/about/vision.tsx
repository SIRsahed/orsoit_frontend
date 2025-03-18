import Image from 'next/image';

const VisionSection = () => {
  return (
    <section className="bg-black text-white lg:py-16 container mx-auto">
      {/* <div className='relativ'>
        <div className="absolute left-0 -top-40 w-full h-full">
                  <Image 
                    src="/images/c-1.png" 
                    fill
                    priority
                    alt="image" 
                    className="object-cover w-full opacity-40"
                  />
                </div>
      </div> */}
      <div className="lg:flex gap-14 lg:ml-4 items-center h-full">
        <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8 h-full flex items-center">
          <div className='text-center lg:text-start mt-10 lg:mt-0'>
            <h2 className="text-3xl font-bold mb-6">OUR VISION</h2>
            <p className="text-lg mb-4">
              At [Your Company Name], our vision is to be a global leader in cybersecurity, creating a secure digital future where individuals and businesses thrive without fear of cyber threats. We aspire to build a world where trust, privacy, and security are the foundation of all digital interactions.
            </p>
            <p className="text-lg mb-4">
              Our vision is centered on:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Innovation:</strong> Pioneering new technologies and approaches to stay one step ahead of emerging threats, ensuring that our clients remain secure in an ever-changing digital landscape.</li>
              <li><strong>Resilience:</strong> Helping organizations of all sizes become more resilient to cyber risks by implementing proactive and tailored security measures that evolve alongside industry needs.</li>
              <li><strong>Education:</strong> Promoting cybersecurity awareness and best practices, empowering our clients and the wider community to make informed decisions about their online safety.</li>
            </ul>
            <p className="text-lg">
              Our goal is to provide not just protection, but a sense of confidence and security for everyone we serve, contributing to a safer and more secure digital world for generations to come.
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 h-full flex items-center justify-center">
          <Image
            src="/images/vision.png" // Replace with your image path
            alt="Pen Concept"
            width={500} // Adjust width as needed
            height={400} // Adjust height as needed
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default VisionSection;




