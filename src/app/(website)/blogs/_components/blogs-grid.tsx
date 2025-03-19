"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Demo blog data - will be replaced with API data later
const demoBlogs = [
  {
    id: 1,
    title: "Protecting Your Business in the Digital Age",
    excerpt:
      "Have questions or need assistance? Our team is here to help! Whether you're looking for cybersecurity solutions, have a security concern, or just want to learn more about our services, feel free to reach out.",
    date: "March 15, 2025",
    imageUrl: "https://i.ibb.co.com/chgRb6w8/image-8.png",
  },
  {
    id: 2,
    title: "The Future of Network Security",
    excerpt:
      "Have questions or need assistance? Our team is here to help! Whether you're looking for cybersecurity solutions, have a security concern, or just want to learn more about our services, feel free to reach out.",
    date: "March 10, 2025",
    imageUrl: "https://i.ibb.co.com/chgRb6w8/image-8.png",
  },
  {
    id: 3,
    title: "Cybersecurity Best Practices for Small Businesses",
    excerpt:
      "Small businesses are increasingly becoming targets for cyberattacks. Learn how to protect your business with these essential cybersecurity practices and affordable solutions.",
    date: "March 5, 2025",
    imageUrl: "https://i.ibb.co.com/chgRb6w8/image-8.png",
  },
  {
    id: 4,
    title: "Understanding Zero Trust Architecture",
    excerpt:
      "Zero Trust is more than a buzzword—it's a comprehensive security approach. Discover how implementing Zero Trust principles can transform your organization's security posture.",
    date: "February 28, 2025",
    imageUrl: "https://i.ibb.co.com/chgRb6w8/image-8.png",
  },
  {
    id: 5,
    title: "The Role of AI in Modern Cybersecurity",
    excerpt:
      "Artificial Intelligence is revolutionizing how we detect and respond to cyber threats. Explore how AI-powered security solutions are helping organizations stay ahead of sophisticated attacks.",
    date: "February 20, 2025",
    imageUrl: "https://i.ibb.co.com/chgRb6w8/image-8.png",
  },
  {
    id: 6,
    title: "The Role of AI in Modern Cybersecurity",
    excerpt:
      "Artificial Intelligence is revolutionizing how we detect and respond to cyber threats. Explore how AI-powered security solutions are helping organizations stay ahead of sophisticated attacks.",
    date: "February 20, 2025",
    imageUrl: "https://i.ibb.co.com/chgRb6w8/image-8.png",
  },
  {
    id: 7,
    title: "The Role of AI in Modern Cybersecurity",
    excerpt:
      "Artificial Intelligence is revolutionizing how we detect and respond to cyber threats. Explore how AI-powered security solutions are helping organizations stay ahead of sophisticated attacks.",
    date: "February 20, 2025",
    imageUrl: "https://i.ibb.co.com/chgRb6w8/image-8.png",
  },
  {
    id: 8,
    title: "The Role of AI in Modern Cybersecurity",
    excerpt:
      "Artificial Intelligence is revolutionizing how we detect and respond to cyber threats. Explore how AI-powered security solutions are helping organizations stay ahead of sophisticated attacks.",
    date: "February 20, 2025",
    imageUrl: "https://i.ibb.co.com/chgRb6w8/image-8.png",
  },
  {
    id: 9,
    title: "The Role of AI in Modern Cybersecurity",
    excerpt:
      "Artificial Intelligence is revolutionizing how we detect and respond to cyber threats. Explore how AI-powered security solutions are helping organizations stay ahead of sophisticated attacks.",
    date: "February 20, 2025",
    imageUrl: "https://i.ibb.co.com/chgRb6w8/image-8.png",
  },
  {
    id: 10,
    title: "The Role of AI in Modern Cybersecurity",
    excerpt:
      "Artificial Intelligence is revolutionizing how we detect and respond to cyber threats. Explore how AI-powered security solutions are helping organizations stay ahead of sophisticated attacks.",
    date: "February 20, 2025",
    imageUrl: "https://i.ibb.co.com/chgRb6w8/image-8.png",
  },
  {
    id: 11,
    title: "The Role of AI in Modern Cybersecurity",
    excerpt:
      "Artificial Intelligence is revolutionizing how we detect and respond to cyber threats. Explore how AI-powered security solutions are helping organizations stay ahead of sophisticated attacks.",
    date: "February 20, 2025",
    imageUrl: "https://i.ibb.co.com/chgRb6w8/image-8.png",
  },
  {
    id: 12,
    title: "The Role of AI in Modern Cybersecurity",
    excerpt:
      "Artificial Intelligence is revolutionizing how we detect and respond to cyber threats. Explore how AI-powered security solutions are helping organizations stay ahead of sophisticated attacks.",
    date: "February 20, 2025",
    imageUrl: "https://i.ibb.co.com/chgRb6w8/image-8.png",
  },
];

export default function BlogsGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  // Calculate total pages
  const totalPages = Math.ceil(demoBlogs.length / blogsPerPage);

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = demoBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Change page and scroll to top
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      scrollToTop();
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      scrollToTop();
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="relative">
        <div className="absolute left-0 top-[-300px] -z-10 h-[1500px] w-[1500px]">
          <Image
            alt="vision background"
            width={800}
            height={400}
            src="/gradient/gl.png"
            className="h-full w-full"
          />
        </div>


        <div className="absolute right-[-40px] bottom-[300px] -z-10 h-[1500px] w-[1000px]">
          <Image
            alt="vision background"
            width={800}
            height={400}
            src="/gradient/gr.png"
            className="h-full w-full"
          />
        </div>


        <div className="absolute left-0 bottom-[-500px] -z-10 h-[1500px] w-[1000px]">
          <Image
            alt="vision background"
            width={800}
            height={400}
            src="/gradient/gl.png"
            className="h-full w-full"
          />
        </div>

        <div className="container">
          <h2 className="title text-center">Blogs</h2>
          <div className="flex flex-col items-center space-y-10">
            {/* Header Text */}
            <div className="text-secondary">
              <p className="subTitle text-center">
                At Orso, we are more than a cybersecurity provider – we&apos;re
                your trusted partner in building a resilient digital
                environment. Our mission is to empower businesses to operate
                securely in today&apos;s complex and ever-changing threat
                landscape. We specialize in delivering end-to-end security
                solutions.
              </p>
            </div>

            {/* Dynamic Blog Cards */}
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
              {currentBlogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="overflow-hidden border-0 bg-[#000000] shadow-none"
                >
                  <Link href={`/blogs/1`} className="block">
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={blog.imageUrl || "/placeholder.svg"}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>
                  <CardContent className="px-0 py-5">
                    <Link href={`/blogs/1`} className="block">
                      <h3 className="cardTitle mb-2 hover:text-[#D80100]">
                        {blog.title}
                      </h3>
                    </Link>
                    {/* <p className="text-gray-500 text-sm mb-2">{blog.date}</p> */}
                    <p className="subTitle">{blog.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevPage}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(index + 1)}
                  aria-label={`Page ${index + 1}`}
                  aria-current={currentPage === index + 1 ? "page" : undefined}
                >
                  {index + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
