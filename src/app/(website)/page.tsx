import React from "react";
import Hero from "./_components/hero";
import { ServicesGrid } from "./_components/services-grid";
import BlogsSection from "./_components/blogs-section";
import ContactSection from "./_components/contact-section";
import NewsletterSection from "./about/_components/_components/NewsletterSection";

const page = () => {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <BlogsSection />
      <ContactSection />
      <NewsletterSection />
    </>
  );
};

export default page;
