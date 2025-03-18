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

export default function ContactSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      details: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the form data to your backend
  }

  return (
    <section className="w-full rounded-lg px-4 py-12">
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
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
