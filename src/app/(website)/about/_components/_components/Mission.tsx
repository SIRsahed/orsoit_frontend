import Image from 'next/image';

const MissionSection = () => {
  return (
    <section className="bg-black text-white container mx-auto">
      <div className="lg:px-8 flex flex-col lg:gap-14 lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
          <Image
            src="/images/mission.png" // Replace with your image path
            alt="Cybersecurity Concept"
            width={600} // Adjust width as needed
            height={450} // Adjust height as needed
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 text-center lg:text-start">
          <h2 className="text-3xl font-bold mb-6">OUR MISSION</h2>
          <p className="text-lg mb-4">
            At ORSO, our mission is to empower businesses and individuals by providing top-tier cybersecurity services that safeguard digital assets, prevent cyber threats, and ensure peace of mind. We are committed to creating a safer online environment by delivering innovative, reliable, and scalable security solutions tailored to meet the unique needs of every client.
          </p>
          <p className="text-lg mb-4">
            We strive to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Protect:</strong> Deliver advanced, real-time protection against the ever-evolving landscape of cyber threats.</li>
            <li><strong>Empower:</strong> Equip our clients with the knowledge and tools necessary to mitigate risks and confidently navigate the digital world.</li>
            <li><strong>Innovate:</strong> Continuously develop and integrate cutting-edge technologies and strategies to stay ahead of cybercriminals.</li>
            <li><strong>Support:</strong> Offer dedicated, expert support to ensure our clients are always prepared and resilient in the face of potential security breaches.</li>
          </ul>
          <p className="text-lg mt-4">
            We believe that strong cybersecurity is a fundamental right, and we are passionate about helping our clients protect what matters most—from sensitive data to business operations—by providing world-class security solutions and exceptional customer service.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;