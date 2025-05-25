import SubscriptionList from "@/components/subscription/subscription-list";
import React from "react";

export default function page({ params }: { params: { serviceId: string } }) {


  return (
    <div className="flex flex-col" >
      <main>
        <div className="container">
          <SubscriptionList serviceId={params.serviceId} />
        </div>
      </main>
    </div >
  );
}
