"use client";

import type React from "react";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useState } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  country: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  fileUpload: z.any().optional(),
  userId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CustomWorkForm() {
  const [fileName, setFileName] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = session?.user?.id;
  const token = session?.user?.accessToken;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      description: "",
      price: undefined,
      userId: userId || "", // Set userId from session
    },
  });

  // Update userId in form when session changes
  useEffect(() => {
    if (userId) {
      form.setValue("userId", userId);
    }
  }, [userId, form]);

  const submitCustomService = async (data: FormValues) => {
    const formData = new FormData();

    // Add all text fields to FormData
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("country", data.country || "");
    formData.append("price", data.price?.toString() || "0");
    // Add userId from session
    if (userId) {
      formData.append("userId", userId);
    }

    // Add file if available
    if (data.fileUpload && data.fileUpload[0]) {
      formData.append("fileUpload", data.fileUpload[0]);
    }

    // Make the API request with auth token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/custom-services`,
      {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit form");
    }

    return await response.json();
  };

  const mutation = useMutation({
    mutationFn: submitCustomService,
    onSuccess: () => {
      toast.success("Custom service submitted successfully!");
      form.reset();
      setFileName(null);
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while submitting the form",
      );
    },
  });

  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      form.setValue("fileUpload", files);
    } else {
      setFileName(null);
      form.setValue("fileUpload", undefined);
    }
  };

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // If not authenticated, don't render the form (will redirect via useEffect)
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="relative">
      <div className="absolute right-0 top-[-600px] -z-10 md:h-[1500px] md:w-[1200px]">
        <Image src="/gradient/gr.png" alt="services-bg" fill />
      </div>
      <div className="absolute left-0 top-0 -z-10 md:h-[1500px] md:w-[1200px]">
        <Image src="/gradient/gl.png" alt="services-bg" fill />
      </div>
      <div className="container">
        <h1 className="title mt-[100px] text-center">Any Custom Work</h1>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        {...field}
                        className="h-[56px] border-[#737373] bg-transparent text-white placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Email Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                        className="h-[56px] border-[#737373] bg-transparent text-white placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Phone <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        type="tel"
                        {...field}
                        className="h-[56px] border-[#737373] bg-transparent text-white placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Country</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Country name"
                        {...field}
                        className="h-[56px] border-[#737373] bg-transparent text-white placeholder:text-gray-500"
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
                    <FormLabel className="text-white">
                      Please Write your Requirements
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write here..."
                        {...field}
                        className="h-[56px] min-h-[150px] border-[#737373] bg-transparent text-white placeholder:text-gray-500"
                      />
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
                    <FormLabel className="text-white">
                      Estimated Budget
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your estimated budget"
                        {...field}
                        className="h-[56px] border-[#737373] bg-transparent text-white placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel className="text-sm font-medium text-white">
                  Please upload any Reference image (png, jpg, jpeg)
                </FormLabel>
                <div className="flex h-[56px] items-center rounded-lg border border-gray-600 bg-transparent px-4">
                  <Input
                    type="file"
                    className="h-[47px] border-none text-white file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white"
                    onChange={handleFileChange}
                  />
                </div>
                {fileName && (
                  <p className="text-sm text-white">Selected: {fileName}</p>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-primary px-10 text-white hover:bg-red-600"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Submitting..." : "Submit Now"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
