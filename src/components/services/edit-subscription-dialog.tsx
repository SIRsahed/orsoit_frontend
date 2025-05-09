"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { fetchSubscriptionPlans, createSubscriptionPlan } from "@/lib/api"

const formSchema = z.object({
  planName: z.string().min(2, "Plan name must be at least 2 characters"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
})

const features = [
  "Business Solution",
  "Market Growth Solution",
  "Great Customer Support",
  "Time Series Models",
  "24/7 Consultant Service",
]

export default function EditSubscriptionDialog({ serviceId }) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data: plans } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: fetchSubscriptionPlans,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      planName: "",
      price: "",
      description: "",
      features: [],
    },
  })

  const mutation = useMutation({
    mutationFn: createSubscriptionPlan,
    onSuccess: () => {
      toast.success("Subscription plan created successfully")
      queryClient.invalidateQueries({ queryKey: ["subscription-plans"] })
      form.reset()
      setOpen(false)
    },
    onError: (error) => {
      toast.error("Failed to create subscription plan")
      console.error(error)
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      ...values,
      price: Number.parseFloat(values.price),
      serviceId,
    }
    mutation.mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-900/20">
          Edit Subscription
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1A1A1A] border-[#222] text-white">
        <DialogHeader>
          <DialogTitle>Manage Subscription</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="planName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter plan name" className="bg-[#0F0F0F] border-[#333]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" className="bg-[#0F0F0F] border-[#333]" {...field} />
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
                      className="bg-[#0F0F0F] border-[#333] min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <h3 className="text-sm font-medium mb-3">FEATURES</h3>
              <div className="space-y-2">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 p-3 bg-[#222] rounded">
                    <FormField
                      control={form.control}
                      name="features"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(feature)}
                              onCheckedChange={(checked) => {
                                const updatedFeatures = checked
                                  ? [...field.value, feature]
                                  : field.value.filter((value) => value !== feature)
                                field.onChange(updatedFeatures)
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">{feature}</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="bg-transparent border-[#333]"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
