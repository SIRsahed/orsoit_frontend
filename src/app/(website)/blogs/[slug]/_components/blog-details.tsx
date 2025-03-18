"use client";

import Image from "next/image";
import { useState } from "react";

export const blogData = [
  //   {
  //     id: 1,
  //     title: "Building a Resilient Digital Environment: Cybersecurity Essentials",
  //     date: "March 15, 2025",
  //     readTime: "5 min",
  //     coverImage:
  //       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201597882449%20%281%29-PNpbgVlJv8WSthdjnG7tsjkpxPx26B.png",
  //     content: `
  //         <h2>Our Mission</h2>
  //         <p>At Orso, we are more than a cybersecurity provider – we're your trusted partner in building a resilient digital environment. Our mission is to empower businesses to operate securely in today's complex and ever-changing threat landscape. We specialize in delivering end-to-end security solutions.</p>

  //         <h2>The Importance of Cybersecurity</h2>
  //         <p>In today's interconnected world, cybersecurity is more important than ever. With rapid advancements in technology, cyber threats are evolving at an alarming rate, affecting businesses, individuals, and even governments. Understanding these threats is crucial for maintaining a secure digital environment.</p>

  //         <p>Cybersecurity isn't just about protecting data; it's about ensuring business continuity, maintaining customer trust, and safeguarding your reputation in an increasingly digital marketplace.</p>

  //         <h2>Our Approach</h2>
  //         <p>We believe in a proactive approach to cybersecurity. Rather than simply reacting to threats as they emerge, we work with our clients to build robust security frameworks that anticipate and mitigate potential vulnerabilities before they can be exploited.</p>

  //         <p>Our team of experts stays at the forefront of cybersecurity developments, continuously updating our knowledge and tools to provide you with the most effective protection possible.</p>

  //         <h2>Get in Touch</h2>
  //         <p>Have questions or need assistance? Our team is here to help! Whether you're looking for cybersecurity solutions, have a security concern, or just want to learn more about our services, feel free to reach out.</p>
  //       `,
  //   },
  {
    id: 1,
    title: "Understanding Common Cybersecurity Threats",
    date: "March 10, 2025",
    readTime: "7 min",
    coverImage: "https://i.ibb.co.com/chgRb6w8/image-8.png",
    content: `
        <h3>Common Cybersecurity Threats</h3>
        <p>Some of the most common cybersecurity threats include:</p>
        
        <h3>Phishing Attacks</h3>
        <p>Cybercriminals trick individuals into revealing sensitive information through fake emails or websites. These attacks often appear to come from legitimate sources and can be highly convincing.</p>
        
        <h3>Ransomware</h3>
        <p>A type of malware that locks users out of their data and systems until a ransom is paid. Ransomware attacks have increased dramatically in recent years, targeting organizations of all sizes.</p>
        
        <h3>Data Breaches</h3>
        <p>Unauthorized access to confidential information, often resulting in financial loss or identity theft. Data breaches can expose customer information, intellectual property, and other sensitive data.</p>
        
        <h3>Zero-Day Exploits</h3>
        <p>Attacks that take advantage of software vulnerabilities before developers can fix them. These are particularly dangerous as there are no patches available at the time of exploitation.</p>
        
        <h2>Protection Strategies</h2>
        <p>To stay safe, businesses and individuals should adopt strong security measures like:</p>
        <ul>
          <li>Multi-factor authentication</li>
          <li>Regular software updates and patches</li>
          <li>Comprehensive employee cybersecurity training</li>
          <li>Data encryption for sensitive information</li>
          <li>Regular security audits and penetration testing</li>
          <li>Robust backup and disaster recovery plans</li>
        </ul>
        
        <p>By implementing these measures, you can significantly reduce your vulnerability to common cyber threats and protect your valuable digital assets.</p>
      `,
  },
];

export default function BlogDetails() {
  const [currentBlog] = useState(blogData[0]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="title text-center">Blogs</div>
        <p className="subTitle text-center">
          At Orso, we are more than a cybersecurity provider – we&apos;re your
          trusted partner in building a resilient digital environment. Our
          mission is to empower businesses to operate securely in today&apos;s
          complex and ever-changing threat landscape. We specialize in
          delivering end-to-end security solutions.
        </p>
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
          <Image
            src={currentBlog.coverImage}
            alt={currentBlog.title}
            fill
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1 className="mb-2 text-[26px] font-bold tracking-tight text-primary md:text-[32px]">
            {currentBlog.title}
          </h1>
          <p className="text-muted-foreground">
            Published on {currentBlog.date} • {currentBlog.readTime} read
          </p>
        </div>

        <div
          className="subTitle"
          dangerouslySetInnerHTML={{ __html: currentBlog.content }}
        />
      </div>
    </div>
  );
}
