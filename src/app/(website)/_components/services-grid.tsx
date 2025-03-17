import { ServiceCard } from "@/components/shared/service-card";
import { CuboidIcon } from "lucide-react";

const services = [
  {
    title: "Network Security",
    description:
      "Protect your business with robust network security solutions designed to defend against unauthorized access, malware, and cyber threats. We ensure your network infrastructure is secure, efficient, and reliable.",
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Secure your cloud environment with tailored solutions that protect your data, applications, and workflows. We help you navigate cloud security challenges while ensuring compliance and performance.",
  },
  {
    title: "Data Security",
    description:
      "Keep your sensitive information safe with cutting-edge encryption, access controls, and data loss prevention strategies. We prioritize protecting your data from breaches and unauthorized exposure.",
  },
  {
    title: "Virtual Private Network",
    description:
      "Establish secure, encrypted connections for remote access and data transmission. Our VPN solutions ensure privacy and security for your organization's communications across any network.",
  },
  {
    title: "Penetration Testing",
    description:
      "Identify vulnerabilities before attackers do with comprehensive penetration testing services. Our experts simulate real-world attacks to strengthen your security posture.",
  },
  {
    title: "Get your custom Service",
    description:
      "Need a tailored security solution? We work with you to develop and implement custom security measures that address your specific needs and challenges.",
  },
];

export function ServicesGrid() {
  return (
    <section className="w-full px-4 py-16">
      <div className="container mx-auto space-y-8">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">Orso Services</h2>
          <p className="mx-auto text-secondary">
            Have questions or need assistance? Our team is here to help! Whether
            you&apos;re looking for cybersecurity solutions, have a security
            concern, or just want to learn more about our services, feel free to
            reach out.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={<CuboidIcon className="h-12 w-12 text-red-600" />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
