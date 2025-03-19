import { ServiceCard } from "@/components/shared/service-card";
import { CuboidIcon } from "lucide-react";

const services = [
  {
    title: "Network Security",
    description:
      "Protect your business with robust network security solutions designed to defend against unauthorized access, malware, and cyber threats. We ensure your network infrastructure is secure, efficient, and reliable.",
    plans: {
      basic: {
        price: 150,
        shortDescription: "Essential network protection for small businesses",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Great Customer Support",
          "Time Series Models",
          "24/7 Consultant Service",
        ],
      },
      standard: {
        price: 250,
        shortDescription: "Advanced protection with monitoring",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Great Customer Support",
          "Time Series Models",
          "24/7 Consultant Service",
        ],
      },
      premium: {
        price: 600,
        shortDescription: "Enterprise-grade security solution",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Great Customer Support",
          "Time Series Models",
          "24/7 Consultant Service",
        ],
      },
    },
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Secure your cloud environment with tailored solutions that protect your data, applications, and workflows. We help you navigate cloud security challenges while ensuring compliance and performance.",
    plans: {
      basic: {
        price: 180,
        shortDescription: "Basic cloud security essentials",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Great Customer Support",
          "Time Series Models",
        ],
      },
      standard: {
        price: 300,
        shortDescription: "Comprehensive cloud protection",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Great Customer Support",
          "Time Series Models",
          "24/7 Consultant Service",
        ],
      },
      premium: {
        price: 700,
        shortDescription: "Full-scale cloud security management",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Great Customer Support",
          "Time Series Models",
          "24/7 Consultant Service",
        ],
      },
    },
  },
  {
    title: "Data Security",
    description:
      "Keep your sensitive information safe with cutting-edge encryption, access controls, and data loss prevention strategies. We prioritize protecting your data from breaches and unauthorized exposure.",
    plans: {
      basic: {
        price: 160,
        shortDescription: "Core data protection services",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Great Customer Support",
        ],
      },
      standard: {
        price: 280,
        shortDescription: "Enhanced data security suite",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Great Customer Support",
          "Time Series Models",
          "24/7 Consultant Service",
        ],
      },
      premium: {
        price: 650,
        shortDescription: "Complete data security ecosystem",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Great Customer Support",
          "Time Series Models",
          "24/7 Consultant Service",
        ],
      },
    },
  },
  {
    title: "Virtual Private Network",
    description:
      "Establish secure, encrypted connections for remote access and data transmission. Our VPN solutions ensure privacy and security for your organization's communications across any network.",
    plans: {
      basic: {
        price: 120,
        shortDescription: "Secure VPN for small teams",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Great Customer Support",
        ],
      },
      standard: {
        price: 220,
        shortDescription: "Business VPN with advanced features",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Great Customer Support",
          "Time Series Models",
        ],
      },
      premium: {
        price: 500,
        shortDescription: "Enterprise VPN solution with dedicated support",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Great Customer Support",
          "Time Series Models",
          "24/7 Consultant Service",
        ],
      },
    },
  },
  {
    title: "Penetration Testing",
    description:
      "Identify vulnerabilities before attackers do with comprehensive penetration testing services. Our experts simulate real-world attacks to strengthen your security posture.",
    plans: {
      basic: {
        price: 200,
        shortDescription: "Basic vulnerability assessment",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Time Series Models",
        ],
      },
      standard: {
        price: 350,
        shortDescription: "Comprehensive penetration testing",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Great Customer Support",
          "Time Series Models",
          "24/7 Consultant Service",
        ],
      },
      premium: {
        price: 800,
        shortDescription: "Advanced red team operations",
        features: [
          "Business Solution",
          "Market Growth Solution",
          "Great Customer Support",
          "Time Series Models",
          "24/7 Consultant Service",
        ],
      },
    },
  },
];

export function ServicesGrid() {
  return (
    <section className="relative w-full px-4 py-16">
      <div className="r-gradient absolute inset-0 -z-10">
        {/* r-gradient */}
      </div>
      <div className="container mx-auto space-y-8">
        <div className="text-center">
          <h2 className="title">Orso Services</h2>
          <p className="mx-auto text-secondary">
            Have questions or need assistance? Our team is here to help! Whether
            you&apos;re looking for cybersecurity solutions, have a security
            concern, or just want to learn more about our services, feel free to
            reach out.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={<CuboidIcon className="h-12 w-12 text-red-600" />}
                plans={service.plans}
              />
            ))}
            <ServiceCard
              title="Get your custom Service"
              description="Need a tailored security solution? We work with you to develop and implement custom security measures that address your specific needs and challenges."
              icon={<CuboidIcon className="h-12 w-12 text-red-600" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
