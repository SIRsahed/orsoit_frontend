"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { resetPassword } from "@/app/actions/auth";
import Image from "next/image";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) {
      toast.error("Password reset token is missing or invalid");
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPassword({
        token,
        password: values.password,
      });

      if (result.success) {
        toast.success("Your password has been reset successfully");
        router.push("/auth/login");
      } else {
        toast.error(result.message || "Failed to reset password");
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

          <h1 className="text-center text-3xl font-bold text-white">
            Reset Password
          </h1>
          <p className="text-center text-sm text-gray-400">
            Create your password
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-300">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative mt-1">
                          <Input
                            {...field}
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            className="block w-full rounded-md border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                          >
                            {showNewPassword ? (
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
                            placeholder="Confirm new password"
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
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
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
