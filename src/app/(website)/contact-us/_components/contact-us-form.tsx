"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

// Define the form validation schema with Zod
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type FormValues = z.infer<typeof formSchema>;

// Define the API request interface
interface ContactFormRequest {
  name: string;
  phoneNumber: string;
  email: string;
  question: string;
}

export default function ContactUsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  // Set up the mutation with TanStack Query
  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormRequest) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact-us`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Your message has been sent successfully.");
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    },
  });

  // Handle form submission
  function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    // Map form data to API request format
    const contactRequest: ContactFormRequest = {
      name: data.name,
      phoneNumber: data.phone,
      email: data.email,
      question: data.message,
    };

    // Execute the mutation
    contactMutation.mutate(contactRequest);
  }

  return (
    <div className="mt-[30px] flex w-full flex-col md:mt-[80px]">
      <div className="relative">
        <div className="absolute left-0 top-0 z-0">
          <Image
            src="/images/c-1.png" // Update with your image path
            alt="Left Side Image"
            width={800} // Adjust width as needed
            height={200} // Adjust height as needed
            className="h-full w-full object-cover opacity-70" // Adjust opacity for subtle effect
          />
        </div>

        <div className="container">
          <div className="mb-[30px] flex flex-col md:mb-[80px] lg:flex-row">
            {/* Left section with title and contact icons */}
            <div className="flex w-full flex-col p-8 lg:w-1/2">
              <h3 className="mb-8 text-xl font-medium text-gray-500">
                WE ARE BASED IN ALABAMA, USA
              </h3>
              <h2 className="title">Let&apos;s Connect!</h2>
              <p className="subTitle">
                Your thoughts, questions, and feedback are what help us grow and
                improve Teak. Whether you&apos;ve encountered an issue, have a
                suggestion, or just want to share your experience, we&apos;re
                here to listen, Reach out to us using the form below or through
                any of the other contact methods provided. Let&apos;s make your
                bookmarking experience even better, together.
              </p>
              <div className="mt-8 flex flex-col space-y-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-red-200">
                    <Phone className="h-5 w-5 text-red-400" />
                  </div>
                  <p className="text-[20px] font-[500] text-primary">Phone:</p>
                  <p className="text-[16px] font-[400] text-primary">
                    +12545625889
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-red-200">
                    <Mail className="h-5 w-5 text-red-400" />
                  </div>
                  <p className="pl-2 text-[20px] font-[500] text-primary">
                    Example@gmail.com
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-red-200">
                    <Clock className="h-5 w-5 text-red-400" />
                  </div>
                  <p className="pl-2 text-[20px] font-[500] text-primary">
                    +12545625889
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-red-200">
                    <MapPin className="h-5 w-5 text-red-400" />
                  </div>
                  <p className="pl-2 text-[20px] font-[500] text-primary">
                    25 street California USA
                  </p>
                </div>
              </div>
            </div>

            {/* Right section with form */}
            <div className="w-full rounded-lg bg-[#0A0A0B] p-8 text-white lg:w-1/2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Name"
                            {...field}
                            className="h-[56px] border-[#737373] bg-transparent text-white"
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
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Phone Number"
                            {...field}
                            className="h-[56px] border-[#737373] bg-transparent text-white"
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email"
                            {...field}
                            className="h-[56px] border-[#737373] bg-transparent text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Any Question? Please write below</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please include any notes for our team"
                            {...field}
                            className="min-h-[120px] border-[#737373] bg-transparent text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-[260px] bg-red-600 text-white hover:bg-red-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Contact Us"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* Map section */}
      <div className="mt-4 h-[400px] w-full">
        <GoogleMap />
      </div>
    </div>
  );
}

function GoogleMap() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13279854.336037911!2d-113.72071021459961!3d37.06250341474988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c67c6fb8a88d%3A0x1db86518c8d5497f!2sAlabama%2C%20USA!5e0!3m2!1sen!2sus!4v1647881760889!5m2!1sen!2sus"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="h-full w-full"
      title="Google Map"
    />
  );
}
