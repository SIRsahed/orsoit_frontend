"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

export default function DeletePlanDialog({ planId }: { planId: string }) {

    const [open, setOpen] = useState(false)

    console.log(planId)

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
                <Button className="bg-red-600 hover:bg-red-700">Delete</Button>
            </DialogContent>
        </Dialog>
    )
}
