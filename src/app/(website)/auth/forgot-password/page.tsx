"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
// Remove this line: import { useToast } from "@/hooks/use-toast"
import { forgotPassword } from "@/app/actions/auth";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Remove this line: const { toast } = useToast()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);

    try {
      const result = await forgotPassword(values.email);

      if (result.success) {
        toast.success(
          "Password reset instructions have been sent to your email",
        );
        // Redirect to login or a confirmation page
        router.push("/auth/login");
      } else {
        toast.error(result.message || "Failed to send reset email");
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
                <div className="h-12 w-12 rounded-full bg-red-600 p-2">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-white">
                    <path
                      fill="currentColor"
                      d="M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">ORSO</h2>
              <p className="text-xs text-gray-400">SOLUTIONS</p>
            </div>
          </div>

          <h1 className="text-center text-3xl font-bold text-white">
            Forget Password?
          </h1>
          <p className="text-center text-sm text-gray-400">
            Enter your email address below, and we&apos;ll email instructions
            for setting a new one.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
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
                        placeholder="Enter email"
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                      />
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
                {isLoading ? "Sending..." : "Send Link"}
              </Button>

              <div className="text-center text-sm">
                <Link
                  href="/auth/login"
                  className="text-gray-400 hover:text-gray-300"
                >
                  Back To Login
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
          <div className="max-w-md p-8 text-white">
            <h2 className="mb-4 text-3xl font-bold">
              Secure Your Digital Assets
            </h2>
            <p className="text-lg">
              ORSO provides enterprise-grade cybersecurity solutions to protect
              your business from evolving threats.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
