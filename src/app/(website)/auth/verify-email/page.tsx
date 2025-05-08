"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  useEffect(() => {
    // Check if email exists
    if (!email) {
      router.push("/auth/register");
    }

    // Focus on first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [router, email]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendDisabled, countdown]);

  const handleChange = (index: number, value: string) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Move to previous input on backspace if current input is empty
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);

      // Focus on the last input
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: otpValue,
            email,
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Your email has been verified successfully");
        router.push("/auth/login");
      } else {
        toast.error(data.message || "Invalid OTP code");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      router.push("/auth/register");
      return;
    }

    setResendDisabled(true);
    setCountdown(60);

    try {
      const response = await fetch(
        "http://localhost:5000/auth/resend-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("A new OTP has been sent to your email");
      } else {
        toast.error(data.message || "Failed to resend OTP");
        setResendDisabled(false);
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
      console.error("Resend OTP error:", error);
      setResendDisabled(false);
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
            Verify Email
          </h1>
          <p className="text-center text-sm text-gray-400">
            Please enter the OTP we have sent you in your Email Address.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="h-12 w-12 rounded-md border-gray-700 bg-gray-900 text-center text-xl font-semibold text-white focus:border-red-500 focus:ring-red-500"
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Didn&apos;t receive OTP?
              </span>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendDisabled}
                className={`text-sm ${resendDisabled ? "text-gray-500" : "text-red-500 hover:text-red-400"}`}
              >
                {resendDisabled ? `Resend in ${countdown}s` : "Resend"}
              </button>
            </div>
          </form>
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
