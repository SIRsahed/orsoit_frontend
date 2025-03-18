/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface SubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planType: "basic" | "standard" | "premium";
  planData: {
    price: number;
    shortDescription: string;
    features: string[];
  };
  serviceName: string;
}

export function SubscriptionDialog({
  isOpen,
  onClose,
  planType,
  planData,
  //   serviceName,
}: SubscriptionDialogProps) {
  const [email, setEmail] = useState("");

  // Determine which features are included in this plan
  // For this example, we'll assume the first 3 features are included in all plans
  // Standard plan includes 4 features, and Premium includes all 5
  const allFeatures = [
    "Business Solution",
    "Market Growth Solution",
    "Great Customer Support",
    "Time Series Models",
    "24/7 Consultant Service",
  ];

  const includedFeatures =
    planType === "basic"
      ? allFeatures.slice(0, 3)
      : planType === "standard"
        ? allFeatures.slice(0, 4)
        : allFeatures;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl border-0 bg-black p-0 text-white">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Form */}
          <div className="p-6 md:w-1/2">
            <h2 className="text-2xl font-bold">
              {planType.charAt(0).toUpperCase() + planType.slice(1)} Plan
            </h2>
            <p className="mb-6 text-gray-400">Monthly</p>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg">Billing Information</h3>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-700 bg-transparent text-white"
                />
              </div>

              <div>
                <h3 className="mb-2 text-lg">Payment Method</h3>
                <div className="flex w-fit items-center space-x-2 rounded border border-gray-700 p-2">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment"
                    className="h-4 w-4"
                    defaultChecked
                  />
                  <label htmlFor="paypal" className="flex items-center">
                    <Image
                      src="/placeholder.svg?height=30&width=80"
                      alt="PayPal"
                      width={80}
                      height={30}
                    />
                  </label>
                </div>
              </div>

              <Button className="mt-4 w-full bg-red-600 hover:bg-red-700">
                Confirm and Pay
              </Button>
            </div>
          </div>

          {/* Right side - Plan details */}
          <div className="bg-gray-700 p-6 md:w-1/2">
            <h3 className="mb-4 text-lg">
              With {planType.charAt(0).toUpperCase() + planType.slice(1)} Plan
              you get
            </h3>

            <div className="mb-6 space-y-3">
              {allFeatures.map((feature, index) => {
                const isIncluded = includedFeatures.includes(feature);
                return (
                  <div key={index} className="flex items-center gap-2">
                    {isIncluded ? (
                      <CheckCircle className="h-5 w-5 text-red-600" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400" />
                    )}
                    <span>{feature}</span>
                  </div>
                );
              })}
            </div>

            <div className="mb-4 border-t border-gray-500 pt-4">
              <p className="text-gray-300">Month-to-month billing</p>
              <p className="text-xl">${planData.price.toFixed(2)}/month</p>
            </div>

            <div className="flex justify-between border-t border-gray-500 pt-4">
              <p>Charged today</p>
              <p className="font-bold">${planData.price.toFixed(2)}</p>
            </div>

            <p className="mt-6 text-sm text-gray-300">
              By clicking "confirm and pay" you agree to our term of use.
              Automatic monthly renewal: Your subscription will automatically
              renew every month for a single payment of $
              {planData.price.toFixed(2)}.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
