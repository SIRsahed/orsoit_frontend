import React from "react";
import { Faq } from "./_components/faq";
import GlobalClients from "./_components/global-clients";
import { ServicesGrid } from "../_components/services-grid";

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
