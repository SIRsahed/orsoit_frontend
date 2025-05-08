"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
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
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl,
      });

      if (!result?.error) {
        toast.success("You have been logged in successfully");
        router.push(callbackUrl);
      } else {
        toast.error(result.error || "Failed to login");
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
        <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-800 bg-black p-8">
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

          <h1 className="text-center text-3xl font-bold text-white">Login</h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-300">
                        E-mail
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter E-mail"
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

                <div className="flex items-center justify-between">
                  {/* <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-red-500"
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-gray-300">
                          Remember me
                        </FormLabel>
                      </FormItem>
                    )}
                  /> */}
                  <div></div>
                  <div className="text-sm">
                    <Link
                      href="/auth/forgot-password"
                      className="text-red-500 hover:text-red-400"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center text-sm text-gray-300">
                Don&apos;t you have account?{" "}
                <Link
                  href="/auth/register"
                  className="text-red-500 hover:text-red-400"
                >
                  Sign Up
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
