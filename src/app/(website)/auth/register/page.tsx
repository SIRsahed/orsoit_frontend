"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
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
import { registerUser } from "@/app/actions/auth";
import Image from "next/image";

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Please enter a valid phone number" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);

    try {
      const result = await registerUser({
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        password: values.password,
      });

      if (result.success) {
        toast.success(
          "Registration successful. Please verify your email to continue",
        );
        router.push(
          `/auth/verify-email?email=${encodeURIComponent(values.email)}`,
        );
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xl space-y-8 rounded-lg border border-gray-800 bg-black p-8">
          <div className="flex justify-center">
            <div className="text-center">
              <div className="mb-2 flex justify-center">
                <Image
                  src="/orso_logo.png"
                  alt="logo"
                  width={200}
                  height={200}
                  className="h-[130px] w-[150px]"
                />
              </div>
            </div>
          </div>

          <h1 className="text-center text-3xl font-bold text-white">
            Registration
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-300">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter first name"
                          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-300">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter last name"
                          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Enter phone number"
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">
                      E-Mail
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email address"
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative mt-1">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          className="block w-full rounded-md border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative mt-1">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Enter confirm password"
                          className="block w-full rounded-md border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {isLoading ? "Registering..." : "Registration"}
              </Button>

              <div className="text-center text-sm text-gray-300">
                Do you have account?{" "}
                <Link
                  href="/auth/login"
                  className="text-red-500 hover:text-red-400"
                >
                  Log In
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div
        className="hidden flex-1 bg-cover bg-center lg:block"
        style={{ backgroundImage: "url('/images/cybersecurity-bg.jpg')" }}
      >
        <div className="flex h-full items-center justify-center bg-black bg-opacity-50">
          {/* <div className="max-w-md p-8 text-white">
            <h2 className="mb-4 text-3xl font-bold">
              Secure Your Digital Assets
            </h2>
            <p className="text-lg">
              ORSO provides enterprise-grade cybersecurity solutions to protect
              your business from evolving threats.
            </p>
          </div> */}
          <Image
            src="/auth-img.png"
            alt="Cybersecurity background"
            width={800}
            height={600}
            className="h-screen w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
