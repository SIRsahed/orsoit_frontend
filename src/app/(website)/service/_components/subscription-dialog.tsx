/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planData: {
    _id: string;
    price: number;
    description: string;
    features: string[];
    planName: string
  };
}

export function SubscriptionDialog({
  isOpen,
  onClose,
  planData,
  //   serviceName,
}: SubscriptionDialogProps) {

  const [loading, setLoading] = useState(false)

  const session = useSession()
  const router = useRouter()

  const handlePayment = async (price: number, id: string) => {
    setLoading(true)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.data?.user?.id, price: price, subscriptionId: id }),
      }
    )

    if (res.ok) {
      const data = await res.json()
      router.push(data?.url)
    }

    setLoading(false)

  }


  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl border-0 bg-[#1A1A1A] p-0 text-white">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Form */}
          <div className="p-6 md:w-1/2">
            <h3>{planData?.planName}</h3>
            <p className="mb-6 text-gray-400">Monthly</p>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg">Billing Information</h3>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  value={session?.data?.user?.email || ""}
                  readOnly
                  className="border-gray-700 bg-transparent text-white"
                />
              </div>

              <div>
                <h3 className="mb-2 text-lg">Payment Method</h3>
                <div className="flex w-fit items-center space-x-2 rounded border border-gray-700 p-2 bg-white">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment"
                    className="h-4 w-4"
                    defaultChecked
                  />
                  <label htmlFor="paypal" className="flex items-center">
                    <Image
                      src="/images/paypal.png"
                      alt="PayPal"
                      width={600}
                      height={300}
                      className="h-8 w-20 object-cover"
                    />
                  </label>
                </div>
              </div>

              <Button
                onClick={() => handlePayment(planData?.price, planData?._id)}
                className="mt-4 w-full bg-red-600 hover:bg-red-700"
              >
                {loading ? "Loading Payment ..." : "Confirm and Pay"}
                
              </Button>
            </div>
          </div>

          {/* Right side - Plan details */}
          <div className="bg-gray-700 p-6 md:w-1/2">

            <div className="mb-6 space-y-3">
              {planData?.features?.map((feature, index) => {
                return (
                  <div key={index} className="flex items-center gap-2">
                    <li key={feature} className='flex gap-2 items-center'>
                      <Check className='h-5 w-5 rounded-full bg-primary p-1' />
                      {feature}
                    </li>
                    <span>{feature}</span>
                  </div>
                );
              })}
            </div>

            <div className="mb-4 border-t border-gray-500 pt-4">
              <p className="text-gray-300">Month-to-month billing</p>
              <p className="text-xl">${planData?.price?.toFixed(2)}/month</p>
            </div>

            <div className="flex justify-between border-t border-gray-500 pt-4">
              <p>Charged today</p>
              <p className="font-bold">${planData?.price?.toFixed(2)}</p>
            </div>

            <p className="mt-6 text-sm text-gray-300">
              By clicking "confirm and pay" you agree to our term of use.
              Automatic monthly renewal: Your subscription will automatically
              renew every month for a single payment of $
              {planData?.price?.toFixed(2)}.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
