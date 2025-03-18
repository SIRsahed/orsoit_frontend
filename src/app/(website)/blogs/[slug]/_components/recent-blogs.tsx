import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

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
];

export default function RecentBlogs() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 className="title text-center">Recent Blogs</h2>
        <div className="flex flex-col items-center space-y-10">
          {/* Header Text */}
          <div className="text-secondary">
            <p className="subTitle text-center">
              At Oreo, we are more than a cybersecurity provider – we&apos;re
              your trusted partner in building a resilient digital environment.
              Our mission is to empower businesses to operate securely in
              today&apos;s complex and ever-changing threat landscape. We
              specialize in delivering end-to-end security solutions.
            </p>
          </div>

          {/* Dynamic Blog Cards */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {demoBlogs.map((blog) => (
              <Card
                key={blog.id}
                className="overflow-hidden border-0 bg-[#000000] shadow-none"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={blog.imageUrl || "/placeholder.svg"}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="px-0 py-5">
                  <h3 className="cardTitle mb-2">{blog.title}</h3>
                  {/* <p className="text-gray-500 text-sm mb-2">{blog.date}</p> */}
                  <p className="subTitle">{blog.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* See All Link */}
          {/* <div className="flex w-full items-start justify-end">
            <Link
              href="#"
              className="inline-flex items-center font-medium text-red-600"
            >
              See All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
}
