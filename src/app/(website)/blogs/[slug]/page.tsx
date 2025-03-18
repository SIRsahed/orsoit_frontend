import React from "react";
import RecentBlogs from "./_components/recent-blogs";
import BlogDetails from "./_components/blog-details";

const page = () => {
  return (
    <div>
      <BlogDetails />
      <RecentBlogs />
    </div>
  );
};

export default page;
