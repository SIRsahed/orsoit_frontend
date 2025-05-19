import AddSubscriptionDialog from '@/components/subscription/add-subscription-dialog'
import SubscriptionList from '@/components/subscription/subscription-list'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Plan Management | Orso Solutions",
  description: "Manage users",
};

export default function page({ params }: { params: { serviceId: string } }) {

  console.log("Service id", params)

  return (
    <div className="flex min-h-screen flex-col p-6">
      <main>
        <div className="flex justify-between items-start pb-10">
          <div className="">
            <h3>Manage Subscription</h3>
            <p>You can change your plan any time by upgrading your plan</p>
          </div>
          <div className="">
            <AddSubscriptionDialog serviceId={params.serviceId} />
          </div>
        </div>
        <SubscriptionList serviceId={params.serviceId} />
      </main>
    </div>
  )
}
