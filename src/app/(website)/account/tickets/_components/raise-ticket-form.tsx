"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserSubscriptions } from "@/lib/api";

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  name: z.string().min(1, "Name is required"),
  serviceId: z.string().min(1, "Please select a service"),
  urgency: z.enum(["low", "medium", "high"], {
    required_error: "Please select urgency level",
  }),
  envotoPunchesKey: z.string().optional(),
  issueDetails: z
    .string()
    .min(10, "Issue details must be at least 10 characters"),
  file: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function RaiseTicketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { data: session } = useSession();

  const { data: userSubscriptions } = useQuery({
    queryKey: ["userSubscriptions"],
    queryFn: () => fetchUserSubscriptions(session?.user.id as string),
    enabled: !!session?.user,
    select: (data) => data.data,
  });

  console.log(userSubscriptions);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      name: "",
      serviceId: "",
      urgency: "medium",
      envotoPunchesKey: "",
      issueDetails: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("file", file);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!session?.user) {
      toast.error("You must be logged in to submit a ticket");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Add all form fields
      formData.append("subject", data.subject);
      formData.append("name", data.name);
      formData.append("urgency", data.urgency);
      formData.append("envotoPunchesKey", data.envotoPunchesKey || "");
      formData.append("issueDetails", data.issueDetails);
      formData.append("userId", session.user.id || "");
      formData.append("serviceId", data.serviceId);

      // Add file if selected
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tickets`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.user.accessToken || ""}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit ticket");
      }

      toast.success("Ticket submitted successfully!");

      // Reset form
      form.reset();
      setSelectedFile(null);
    } catch (error) {
      console.error("Error submitting ticket:", error);
      toast.error("Failed to submit ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-full p-4 sm:p-6">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Raise New Ticket
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-full space-y-6"
        >
          {/* Subject */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex text-sm text-white">
                  Subject{" "}
                  <Star className="mt-1 h-2 text-red-500" fill="currentColor" />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter subject name"
                    className="h-12 w-full border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex text-sm text-white">
                  Name{" "}
                  <Star className="mt-1 h-2 text-red-500" fill="currentColor" />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    className="h-12 w-full border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Service */}
          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex text-sm text-white">
                  Service{" "}
                  <Star className="mt-1 h-2 text-red-500" fill="currentColor" />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-gray-600 text-white focus:border-gray-500">
                      <SelectValue placeholder="Nothing Selected" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-gray-600 bg-black">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {userSubscriptions?.map((service: any) => (
                      <SelectItem
                        key={service._id}
                        value={service?.services[0]?.serviceId?._id}
                        className="text-white hover:bg-gray-700"
                      >
                        {service?.services[0]?.serviceId?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Urgency */}
          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-white">Urgency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-gray-600 text-white focus:border-gray-500">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-gray-600 bg-black">
                    <SelectItem
                      value="low"
                      className="text-white hover:bg-gray-700"
                    >
                      Low
                    </SelectItem>
                    <SelectItem
                      value="medium"
                      className="text-white hover:bg-gray-700"
                    >
                      Medium
                    </SelectItem>
                    <SelectItem
                      value="high"
                      className="text-white hover:bg-gray-700"
                    >
                      High
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Envato Purchase Key */}
          <FormField
            control={form.control}
            name="envotoPunchesKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-white">
                  Envato Purchase Key
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter purchase key"
                    className="h-12 w-full border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Issue Details */}
          <FormField
            control={form.control}
            name="issueDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-white">
                  Issue Details
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write here..."
                    className="min-h-[120px] w-full resize-none border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Attachments */}
          <div className="space-y-2">
            <label className="text-sm text-white">Attachments</label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-700 sm:w-auto"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Choose file
              </Button>
              {selectedFile && (
                <span className="self-center text-sm text-gray-400">
                  {selectedFile.name}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 px-8 py-2 text-white hover:bg-red-700 sm:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit Now"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
