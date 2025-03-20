import Image from "next/image";

const MissionSection = () => {
  return (
    <section className=" mt-28 text-white">
      <div>
        <div className="flex flex-col items-center lg:flex-row lg:gap-14 lg:px-8 container mx-auto">
          <div className="mb-8 lg:mb-0 lg:w-1/2 lg:pr-8">
            <Image
              src="/images/mission.png" // Replace with your image path
              alt="Cybersecurity Concept"
              width={600} // Adjust width as needed
              height={450} // Adjust height as needed
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 text-start">
            <h2 className="mb-6 text-3xl font-bold">OUR MISSION</h2>
            <p className="mb-4 text-lg">
              At ORSO, our mission is to empower businesses and individuals by
              providing top-tier cybersecurity services that safeguard digital
              assets, prevent cyber threats, and ensure peace of mind. We are
              committed to creating a safer online environment by delivering
              innovative, reliable, and scalable security solutions tailored to
              meet the unique needs of every client.
            </p>
            <p className="mb-4 text-lg">We strive to:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong>Protect:</strong> Deliver advanced, real-time protection
                against the ever-evolving landscape of cyber threats.
              </li>
              <li>
                <strong>Empower:</strong> Equip our clients with the knowledge
                and tools necessary to mitigate risks and confidently navigate
                the digital world.
              </li>
              <li>
                <strong>Innovate:</strong> Continuously develop and integrate
                cutting-edge technologies and strategies to stay ahead of
                cybercriminals.
              </li>
              <li>
                <strong>Support:</strong> Offer dedicated, expert support to
                ensure our clients are always prepared and resilient in the face
                of potential security breaches.
              </li>
            </ul>
            <p className="mt-4 text-lg">
              We believe that strong cybersecurity is a fundamental right, and
              we are passionate about helping our clients protect what matters
              most—from sensitive data to business operations—by providing
              world-class security solutions and exceptional customer service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
