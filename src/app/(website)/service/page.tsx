import React from "react";
import { ServicesGrid } from "./_components/services-grid";
import { Faq } from "./_components/faq";
import GlobalClients from "./_components/global-clients";
import NewsletterSection from "../about/_components/_components/NewsletterSection";

const page = () => {
  return (
    <div>
      <ServicesGrid />
      <Faq />
      <GlobalClients />
      <NewsletterSection />
    </div>
  );
};

export default page;
