"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { z } from "zod"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateService } from "@/lib/api"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.any().optional(),
})

export default function EditServiceDialog({ service }) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: service.name,
      description: service.description,
    },
  })

  const mutation = useMutation({
    mutationFn: (values) => updateService(service._id, values),
    onSuccess: () => {
      toast.success("Service updated successfully")
      queryClient.invalidateQueries({ queryKey: ["services"] })
      setOpen(false)
    },
    onError: (error) => {
      toast.error("Failed to update service")
      console.error(error)
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700">Edit Service</Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1A1A1A] border-[#222] text-white">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter plan Name" className="bg-[#0F0F0F] border-[#333]" {...field} />
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

            <div className="border border-dashed border-[#333] rounded-lg p-6">
              <div className="flex flex-col items-center justify-center gap-2">
                {service.image && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Current Image:</p>
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      className="h-20 w-20 object-contain"
                    />
                  </div>
                )}
                <Upload className="h-6 w-6 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm text-gray-400">Drag and drop</p>
                  <p className="text-sm text-gray-400">or</p>
                  <p className="text-sm text-blue-500">Browse</p>
                </div>
                <Input
                  type="file"
                  className="hidden"
                  id="image-upload-edit"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      form.setValue("image", file)
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2 bg-[#0F0F0F] border-[#333]"
                  onClick={() => document.getElementById("image-upload-edit")?.click()}
                >
                  Choose File
                </Button>
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
