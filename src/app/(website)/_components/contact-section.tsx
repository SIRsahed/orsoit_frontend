"use client";

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
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  details: z.string().min(10, {
    message: "Your message must be at least 10 characters.",
  }),
});

// Define the API request interface
interface ContactFormRequest {
  name: string;
  phoneNumber: string;
  email: string;
  question: string;
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      details: "",
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
      toast.success("Thank you for contacting us. We'll get back to you soon.");
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Map form data to API request format
    const contactRequest: ContactFormRequest = {
      name: values.name,
      phoneNumber: values.phone,
      email: values.email,
      question: values.details,
    };

    // Execute the mutation
    contactMutation.mutate(contactRequest);
  }

  return (
    <section className="relative w-full rounded-lg px-4 py-12">
      <div className="absolute left-0 top-[-300px] -z-10 md:h-[1500px] md:w-[1500px]">
        <Image src="/gradient/gl.png" alt="services-bg" fill />
      </div>
      <div className="container mx-auto">
        <h2 className="title">Contact Us</h2>
        <div className="mb-8">
          <p className="subTitle">
            Have questions or need assistance? Our team is here to help! Whether
            you&apos;re looking for cybersecurity solutions, have a security
            concern, or just want to learn more about our services, feel free to
            reach out.
          </p>
        </div>

        <div className="mb-12 rounded-lg bg-[#42424726] p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-lg bg-[#D8010040] p-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <p className="text-secondary">+888 567825741</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-lg bg-[#D8010040] p-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <p className="text-secondary">orsosolution@gmail.com</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-lg bg-[#D8010040] p-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <p className="text-secondary">25 street California USA</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-lg bg-[#D8010040] p-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <p className="text-secondary">+888 567825741</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-2 text-[30px] font-[700] text-primary md:text-[36px]">
            Ping Us
          </h3>
          <p className="subTitle">
            Have questions or need assistance? Our team is here to help! Whether
            you&apos;re looking for cybersecurity solutions, have a security
            concern, or just want to learn more about our services, feel free to
            reach out.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-primary md:text-[18px]">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write here"
                      {...field}
                      className="h-14 border-none bg-[#0A0A0B] text-white placeholder:text-gray-400"
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
                  <FormLabel className="text-[14px] text-primary md:text-[18px]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write your email"
                      type="email"
                      {...field}
                      className="h-14 border-none bg-[#0A0A0B] text-white placeholder:text-gray-400"
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
                  <FormLabel className="text-[14px] text-primary md:text-[18px]">
                    Phone number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write phone number"
                      type="tel"
                      {...field}
                      className="h-14 border-none bg-[#0A0A0B] text-white placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-primary md:text-[18px]">
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your message"
                      {...field}
                      className="min-h-[160px] border-none bg-[#0A0A0B] text-white placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="">
              <Button
                type="submit"
                className="w-full max-w-xs bg-primary py-6 text-white hover:bg-red-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
