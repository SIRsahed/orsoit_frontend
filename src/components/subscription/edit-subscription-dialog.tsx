"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateSubscriptionPlan } from "@/lib/api"
import type { Subscription } from "./subscription-list"

const formSchema = z.object({
    planName: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.coerce.number().min(1, "Price must be at least 1"),
    features: z.array(z.string()).min(1, "At least one feature is required"),
})

export default function EditSubscriptionDialog({ subscription }: { subscription: Subscription }) {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const [featuresText, setFeaturesText] = useState(subscription?.subscriptionPlanId[0]?.features?.join(", "))

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            planName: subscription.subscriptionPlanId[0]?.planName,
            description: subscription.subscriptionPlanId[0]?.description,
            price: subscription.subscriptionPlanId[0]?.price,
            features: subscription.subscriptionPlanId[0]?.features,
        },
    })

    const mutation = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) => updateSubscriptionPlan(subscription?.subscriptionPlanId[0]._id, values),
        onSuccess: () => {
            toast.success("Subscription updated successfully")
            queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
            setOpen(false)
        },
        onError: (error) => {
            toast.error("Failed to update subscription")
            console.error(error)
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate(values)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700">Edit Plan</Button>
            </DialogTrigger>
            <DialogContent className="border-[#222] bg-[#1A1A1A] text-white w-full max-w-md md:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Plan</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                        <FormField
                            control={form.control}
                            name="planName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Plan Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter plan Name" className="border-[#333] bg-[#0F0F0F]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field: { onChange, ...rest } }) => (
                                <FormItem>
                                    <FormLabel>Plan Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter plan price"
                                            className="border-[#333] bg-[#0F0F0F]"
                                            onChange={(e) => {
                                                onChange(e.target.valueAsNumber || 0)
                                            }}
                                            {...rest}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write here..."
                                            className="min-h-[100px] border-[#333] bg-[#0F0F0F]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="features"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Features</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write features here with comma (,) separated"
                                                className="min-h-[100px] border-[#333] bg-[#0F0F0F]"
                                                value={featuresText}
                                                onChange={(e) => {
                                                    setFeaturesText(e.target.value)

                                                    const featuresArray = e.target.value
                                                        .split(",")
                                                        .map((feature) => feature.trim())
                                                        .filter((feature) => feature !== "")

                                                    field.onChange(featuresArray)
                                                }}
                                                onBlur={field.onBlur}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                className="border-[#333] bg-transparent w-full sm:w-auto"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
