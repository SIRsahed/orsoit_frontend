"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { deleteSubscriptionPlan } from '@/lib/api'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

export default function DeletePlanDialog({ planId, infoId }: { planId: string, infoId: string }) {
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const handleDeletePlan = () => {
        setIsLoading(true)
        deleteSubscriptionPlan(planId)
            .then(async () => {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete/subscription/info/${infoId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ subscriptionPlanId: [planId] }),
                }).then((res) => console.log(res.json()))
                setIsLoading(false)
                setOpen(false)
                toast.success("Plan deleted successfully")
                queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
            })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700">Delete Plan</Button>
            </DialogTrigger>
            <DialogContent className="border-[#222] bg-[#1A1A1A] text-white w-full max-w-md md:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Delete Plan</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <h4>Are you sure you want to delete this plan</h4>
                </div>
                <Button onClick={handleDeletePlan} className="bg-red-600 hover:bg-red-700">
                    {isLoading ? "Deleting..." : "Delete"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}
