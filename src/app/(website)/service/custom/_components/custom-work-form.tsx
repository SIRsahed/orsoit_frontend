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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  country: z.string().optional(),
  requirements: z.string().optional(),
  budget: z.string().optional(),
  file: z.instanceof(FileList).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CustomWorkForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      requirements: "",
      budget: "",
    },
  });

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    // Simulate form submission
    console.log(values);

    setTimeout(() => {
      setIsSubmitting(false);
      form.reset();
      alert("Form submitted successfully!");
    }, 1500);
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
                name="requirements"
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
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Choose a Budget
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-[56px] border-[#737373] bg-transparent text-white">
                          <SelectValue placeholder="-" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-[56px] border-[#737373] bg-transparent text-white">
                        <SelectItem value="less-5k">
                          Less than $5,000
                        </SelectItem>
                        <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10k-25k">
                          $10,000 - $25,000
                        </SelectItem>
                        <SelectItem value="25k-50k">
                          $25,000 - $50,000
                        </SelectItem>
                        <SelectItem value="50k-plus">$50,000+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel className="text-sm font-medium text-white">
                  Please upload your requirements (text, docs, pdf, zip, png,
                  jpg)
                </FormLabel>
                <div className="flex h-[56px] items-center rounded-lg border border-gray-600 bg-transparent px-4">
                  <Input
                    type="file"
                    className="h-[47px] border-none text-white file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white"
                    onChange={(e) =>
                      form.setValue("file", e.target.files || undefined)
                    }
                  />
                </div>
              </div>

              {/* <div className="flex items-start space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded border border-gray-300">
              <div className="h-4 w-4 border border-gray-300"></div>
            </div>
            <div className="rounded bg-pink-100 p-2 text-sm text-pink-900">
              I&apos;m not a robot
            </div>
          </div> */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-primary px-10 text-white hover:bg-red-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Now"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
