"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define the FAQ item type
interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export function Faq() {
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaqData = () => {
      setIsLoading(true);

      const dummyData: FaqItem[] = [
        {
          id: "web-security",
          question: "What is web security, and why is it important?",
          answer:
            "Web security refers to protecting websites, web applications, and online data from cyber threats like hacking, malware, and data breaches. It is essential to safeguard sensitive information, maintain user trust, and prevent financial or reputational damage. These threats include hacking, malware, data breaches, phishing, and distributed denial-of-service (DDoS) attacks. Every time a user visits a website, enters personal data, or performs transactions, there is a risk of data being intercepted, stolen, or manipulated by cybercriminals. Web security ensures that such interactions remain private, secure, and protected from unauthorized access.",
        },
        {
          id: "protect-website",
          question: "How can I protect my website from hackers?",
          answer:
            "Protecting your website from hackers involves multiple layers of security. Keep all software updated, use strong passwords and two-factor authentication, implement SSL/TLS encryption, regularly back up your data, use a web application firewall (WAF), conduct security audits, and educate your team about security best practices. Additionally, consider implementing content security policies, using HTTPS, validating all user inputs, and monitoring your website for suspicious activities.",
        },
        {
          id: "ssl-tls",
          question: "What is an SSL/TLS certificate, and do I need one?",
          answer:
            "An SSL/TLS certificate is a digital certificate that authenticates a website's identity and enables an encrypted connection. It stands for Secure Sockets Layer/Transport Layer Security. When installed on a web server, it activates the HTTPS protocol, allowing secure connections between the web server and browser. Yes, you need one if you collect any user data, have login functionality, or run an e-commerce site. Even for simple informational websites, having SSL/TLS is recommended as it builds trust with visitors and is a ranking factor for search engines.",
        },
        {
          id: "pen-testing",
          question: "What is Penetration Testing (Pen Testing)?",
          answer:
            "Penetration Testing, or Pen Testing, is a simulated cyber attack against your computer system, network, or web application to check for exploitable vulnerabilities. It involves actively trying to discover and exploit weaknesses in your systems—just as a malicious attacker would, but in a controlled environment. The process typically includes planning, scanning, gaining access, maintaining access, and analysis. The results help organizations identify and prioritize security risks that need to be addressed.",
        },
        {
          id: "vpn-security",
          question: "How Does a VPN Enhance Web Security?",
          answer:
            "A Virtual Private Network (VPN) enhances web security by creating an encrypted tunnel for your internet traffic, making it difficult for hackers, ISPs, or other third parties to monitor your online activities or steal your data. When you connect to a VPN, your IP address is masked, providing anonymity and preventing websites from tracking your location. VPNs are particularly important when using public Wi-Fi networks, which are often unsecured and vulnerable to attacks. They also help bypass geo-restrictions and censorship, allowing access to content that might be blocked in certain regions.",
        },
        {
          id: "two-factor",
          question: "What is Two-Factor Authentication (2FA)?",
          answer:
            "Two-Factor Authentication (2FA) is a security process that requires users to provide two different authentication factors to verify their identity. These factors typically include something you know (password), something you have (security token or mobile device), or something you are (biometric verification). By requiring a second form of identification beyond just a password, 2FA significantly reduces the risk of unauthorized access even if passwords are compromised. It's an essential security measure for protecting sensitive accounts and data in today's threat landscape.",
        },
      ];

      setTimeout(() => {
        setFaqItems(dummyData);
        setIsLoading(false);
      }, 500);
    };

    fetchFaqData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading FAQ items...</div>;
  }

  return (
    <div className="container mx-auto">
      <h2 className="title text-center">FAQ</h2>
      <p className="subTitle mb-10 text-center">
        Welcome to our Web Security FAQ section! Here, we answer common
        questions about cybersecurity, online threats, and best practices to
        keep your digital world safe.
      </p>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="mb-4 overflow-hidden rounded-md border border-[#444444] bg-transparent"
          >
            <AccordionTrigger className="px-6 py-4 text-left hover:bg-accent/10 hover:no-underline">
              <span className="text-[18px] font-medium text-secondary">
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
