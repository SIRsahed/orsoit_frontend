"use client"


import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { fetchSubscriptionPlans } from '@/lib/api'
import { Check } from 'lucide-react'
import EditSubscriptionDialog from './edit-subscription-dialog'
import DeletePlanDialog from './delete-plan-dialog';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { SubscriptionDialog } from '@/app/(website)/service/_components/subscription-dialog';


export interface Subscription {
    _id: string
    planName: string
    price: number
    description: string
    features: string[]
    subscriptionPlanId: [subscriptionPlanId]
    data: []
}


export interface subscriptionPlanId {
    _id: string,
    planName: string,
    price: 839,
    description: string,
    features: string[]

}


export default function SubscriptionList({ serviceId }: { serviceId: string }) {

    const [selectedPlan, setSelectedPlan] = useState({});
    const pathname = usePathname()

    const {
        data: subscriptions,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["subscriptions", serviceId], // Include serviceId in the queryKey
        queryFn: () => fetchSubscriptionPlans({ serviceId }),
        staleTime: 0, // Consider data stale immediately
        refetchOnMount: true, // Refetch when component mounts
    })

    if (error) {
        toast.error("Failed to load services")
    }


    const [dialogOpen, setDialogOpen] = useState(false);

    console.log(subscriptions)

    const handleOpenDialog = (plan: subscriptionPlanId) => {
        setDialogOpen(true);
        setSelectedPlan(plan)
    }

    return (
        <div className="">
            {isLoading
                ? Array(3)
                    .fill(0)
                    .map((_, i) => (
                        <Card
                            key={i}
                            className="overflow-hidden border-[#222] bg-[#1A1A1A]"
                        >
                            <CardContent className="p-6">
                                <div className="mb-4 flex justify-center">
                                    <Skeleton className="h-16 w-16 rounded bg-[#333]" />
                                </div>
                                <Skeleton className="mx-auto mb-4 h-6 w-3/4 bg-[#333]" />
                                <Skeleton className="h-24 w-full bg-[#333]" />
                            </CardContent>
                            <CardFooter className="flex justify-center gap-4 border-t border-[#222] p-4">
                                <Skeleton className="h-10 w-28 bg-[#333]" />
                                <Skeleton className="h-10 w-28 bg-[#333]" />
                            </CardFooter>
                        </Card>
                    ))
                : (
                    <div className="">
                        <div className="text-center py-10">
                            <h2 className='text-xl lg:text-4xl font-bold pb-4 text-white'>Subscription Plans of <span className='capitalize'>{subscriptions?.data[0]?.services[0]?.serviceId?.name}</span></h2>
                            <p className='text-sm text-[#E6E6E6]'>At Orso, we are more than a cybersecurity provider - we&apos;re your trusted partner in building a resilient digital environment. Our mission is to empower businesses to operate securely in today&apos;s complex and ever-changing threat landscape. We specialize in delivering end-to-end security solutions.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {subscriptions?.data?.length > 0 ? (
                                subscriptions?.data?.map((subscription: Subscription) => (
                                    <Card
                                        key={subscription._id}
                                        className="overflow-hidden border-[#222] bg-[#1A1A1A] text-white"
                                    >
                                        <CardContent className="p-6">

                                            <h3 className="mb-4 capitalize text-2xl font-bold">
                                                {subscription?.subscriptionPlanId[0]?.planName}
                                            </h3>
                                            <h4 className='text-5xl text-[#D80100] font-semibold pb-4'>
                                                ${subscription?.subscriptionPlanId[0]?.price}
                                                <span className='text-base pl-1 text-white'>/Month</span>
                                            </h4>
                                            <p className="text-lg pb-8">{subscription?.subscriptionPlanId[0]?.description}</p>
                                            <ul className='list-none p-0 space-y-1 min-h-24'>
                                                {
                                                    subscription?.subscriptionPlanId?.map((sub: subscriptionPlanId) => (
                                                        sub?.features?.map((feature: string) => (
                                                            <li key={feature} className='flex gap-2 items-center'>
                                                                <Check className='h-5 w-5 rounded-full bg-primary p-1' />
                                                                {feature}
                                                            </li>
                                                        ))
                                                    ))
                                                }
                                            </ul>
                                        </CardContent>
                                        <CardFooter className="flex justify-center">
                                            {
                                                pathname.includes("ceo-dashboard") ? (
                                                    <div className="flex justify-center gap-4 border-t border-[#222] p-4">
                                                        <EditSubscriptionDialog subscription={subscription} />
                                                        <DeletePlanDialog infoId={subscription?._id} planId={subscription?.subscriptionPlanId[0]?._id} />
                                                    </div>
                                                )

                                                    :

                                                    <div className=''>
                                                        <Button
                                                            onClick={() => handleOpenDialog(subscription?.subscriptionPlanId[0])}
                                                        >
                                                            Buy Plan
                                                        </Button>
                                                        <SubscriptionDialog
                                                            planData={selectedPlan}
                                                            isOpen={dialogOpen}
                                                            onClose={() => setDialogOpen(false)} />
                                                    </div>
                                            }
                                        </CardFooter>
                                    </Card>
                                ))

                            )
                                :

                                (
                                    <p className='text-center text-2xl font-bold mt-10'>No subscriptions plan found</p>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}
