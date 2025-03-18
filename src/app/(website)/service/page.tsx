import React from "react";
import { ServicesGrid } from "./_components/services-grid";
import { Faq } from "./_components/faq";
import GlobalClients from "./_components/global-clients";

const page = () => {
  return (
    <div>
      <ServicesGrid />
      <Faq />
      <GlobalClients />
    </div>
  );
};

export default page;
