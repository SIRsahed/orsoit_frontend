/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface SubscriptionDialogProps {
  isOpen: boolean
  onClose: () => void
  planData: {
    _id: string
    price: number
    description: string
    features: string[]
    planName: string
  }
  subscriptionIdForPayment: string
  serviceId: string
}

interface CouponData {
  _id: string
  title: string
  discount: number
  code: string
  applicableServices: string[]
}

export function SubscriptionDialog({
  isOpen,
  onClose,
  planData,
  subscriptionIdForPayment,
  serviceId,
}: SubscriptionDialogProps) {
  const [loading, setLoading] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<CouponData | null>(null)
  const [couponLoading, setCouponLoading] = useState(false)

  const session = useSession()
  const router = useRouter()

  const originalPrice = planData?.price || 0
  const discountAmount = appliedCoupon ? (originalPrice * appliedCoupon.discount) / 100 : 0
  const finalPrice = originalPrice - discountAmount

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code")
      return
    }

    setCouponLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/check/coupon/code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: couponCode,
          serviceID: serviceId,
          userID: session?.data?.user?.id,
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setAppliedCoupon(data.data)
        toast.success(`Coupon applied! ${data.data.discount}% discount`)
      } else {
        toast.error(data.message || "Invalid coupon code")
        setAppliedCoupon(null)
      }
    } catch (error) {
      console.error("Error applying coupon:", error)
      toast.error("Failed to apply coupon")
      setAppliedCoupon(null)
    } finally {
      setCouponLoading(false)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    toast.success("Coupon removed")
  }

  const handlePayment = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.data?.user?.id,
          price: finalPrice,
          subscriptionId: subscriptionIdForPayment,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        router.push(data?.url)
      } else {
        toast.error("Payment failed. Please try again.")
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Payment failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl border-0 bg-[#1A1A1A] p-0 text-white">
        <DialogHeader className="sr-only text-2xl font-semibold">Subscribe to {planData?.planName}</DialogHeader>
        <div className="flex flex-col md:flex-row">
          {/* Left side - Form */}
          <div className="p-6 md:w-1/2">
            <h3 className="text-xl font-semibold">{planData?.planName}</h3>
            <p className="mb-6 text-gray-400">Monthly</p>
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="mb-2 text-lg">Billing Information</h3>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  value={session?.data?.user?.email || ""}
                  readOnly
                  className="border-gray-700 bg-transparent text-white"
                />

                {/* Coupon Section */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Have a coupon? Enter it here"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 border-gray-700 bg-transparent text-white"
                      disabled={!!appliedCoupon}
                    />
                    {!appliedCoupon ? (
                      <Button
                        onClick={handleApplyCoupon}
                        disabled={couponLoading || !couponCode.trim()}
                        className="bg-red-600 hover:bg-red-700 px-4 whitespace-nowrap"
                      >
                        {couponLoading ? "Applying..." : "Apply Coupon"}
                      </Button>
                    ) : (
                      <Button
                        onClick={handleRemoveCoupon}
                        variant="outline"
                        className="border-gray-700 text-white hover:bg-gray-800 px-4 whitespace-nowrap"
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  {appliedCoupon && (
                    <div className="flex items-center justify-between rounded bg-green-900/20 border border-green-700 p-2 text-sm">
                      <span className="text-green-400">
                        ✓ {appliedCoupon.title} - {appliedCoupon.discount}% off
                      </span>
                      <span className="text-green-400 font-medium">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg">Payment Method</h3>
                <div className="flex w-fit items-center space-x-2 rounded border border-gray-700 bg-white p-2">
                  <input type="radio" id="stripe" name="payment" className="h-4 w-4" defaultChecked />
                  <label htmlFor="stripe" className="flex items-center">
                    <Image
                      src="/images/stripe.png"
                      alt="Stripe"
                      width={600}
                      height={300}
                      className="h-8 w-20 object-cover"
                    />
                  </label>
                </div>
              </div>

              <Button onClick={handlePayment} disabled={loading} className="mt-4 w-full bg-red-600 hover:bg-red-700">
                {loading ? "Processing Payment..." : "Confirm and Pay"}
              </Button>
            </div>
          </div>

          {/* Right side - Plan details */}
          <div className="bg-gray-700 p-6 md:w-1/2">
            <div className="mb-6 space-y-3">
              {planData?.features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 rounded-full bg-red-600 p-1 text-white" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mb-4 space-y-2 border-t border-gray-500 pt-4">
              <div className="flex justify-between">
                <p className="text-gray-300">Subtotal</p>
                <p>${originalPrice.toFixed(2)}</p>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-green-400">
                  <p>Discount ({appliedCoupon.discount}%)</p>
                  <p>-${discountAmount.toFixed(2)}</p>
                </div>
              )}

              <div className="flex justify-between border-t border-gray-500 pt-2">
                <p className="text-xl font-semibold">Total</p>
                <p className="text-xl font-semibold">${finalPrice.toFixed(2)}/month</p>
              </div>
            </div>

            <div className="flex justify-between border-t border-gray-500 pt-4">
              <p>Charged today</p>
              <p className="font-bold">${finalPrice.toFixed(2)}</p>
            </div>

            <p className="mt-6 text-sm text-gray-300">
              By clicking "confirm and pay" you agree to our terms of use. Automatic monthly renewal: Your subscription
              will automatically renew every month for a single payment of ${finalPrice.toFixed(2)}.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
