import React from "react";
import RecentBlogs from "./_components/recent-blogs";
import BlogDetails from "./_components/blog-details";
import NewsletterSection from "../../about/_components/_components/NewsletterSection";

const page = () => {
  return (
    <div>
      <BlogDetails />
      <RecentBlogs />
      <NewsletterSection />
    </div>
  );
};

export default page;
