"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Check } from "lucide-react"
import { fetchUserCustomServices, fetchSubscriptionPlans } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type CustomService = {
    _id: string
    name: string
    country: string
    fileUpload: string
    description: string
    price: number
    isApprove: boolean
    userId: string
    createdAt: string
    updatedAt: string
    planData?: {
        _id: string
        price: number
        description: string
        features: string[]
        planName: string
    }
}

export default function UserCustomServicesList() {
    const [selectedService, setSelectedService] = useState<CustomService | null>(null)
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const session = useSession()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [subscriptionPlans, setSubscriptionPlans] = useState<any[]>([])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedPlan, setSelectedPlan] = useState<any>(null)
    const [plansLoading, setPlansLoading] = useState(false)

    const userId = session?.data?.user?.id
    const router = useRouter()

    const { data: services, isLoading } = useQuery({
        queryKey: ["user-custom-services", userId],
        queryFn: () => fetchUserCustomServices(userId as string),
    })

    const finalPrice = selectedPlan?.subscriptionPlanId[0].price || 0

    const handleViewPlan = async (service: CustomService) => {
        setSelectedService(service)
        setIsPaymentDialogOpen(true)
        setPlansLoading(true)

        const serviceId = service._id

        try {
            const plans = await fetchSubscriptionPlans({ serviceId })

            console.log(plans, "plans")
            setSubscriptionPlans(plans.data.plans)
            // Set the latest plan as default (assuming the last one is latest)
            if (plans && plans.data.plans.length > 0) {
                setSelectedPlan(plans.data.plans[plans.length - 1])
            }
        } catch (error) {
            console.error("Error fetching plans:", error)
            toast.error("Failed to load subscription plans")
        } finally {
            setPlansLoading(false)
        }
    }

    const handleCloseDialog = () => {
        setIsPaymentDialogOpen(false)
        setSelectedService(null)
        setSubscriptionPlans([])
        setSelectedPlan(null)
    }

    const handlePayment = async () => {
        setLoading(true)
        try {

            if (!selectedPlan) {
                toast.error("Please select a plan")
                return
            }

            const habijabi = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription-info`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: session?.data?.user?.id,
                        subscriptionPlanId: [selectedPlan?.subscriptionPlanId[0]._id],
                        services: [
                            {
                                serviceId: selectedService?._id
                            }
                        ]
                    }),
                }
            )

            const habijabiData = await habijabi.json()

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: session?.data?.user?.id,
                    price: finalPrice,
                    subscriptionId: habijabiData.data._id
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

    const getFileName = (fileUrl: string) => {
        if (!fileUrl) return "No file"
        const urlParts = fileUrl.split("/")
        return urlParts[urlParts.length - 1]
    }

    const getStatusBadge = (isApprove: boolean) => {
        return (
            <Badge
                variant={isApprove ? "default" : "secondary"}
                className={
                    isApprove ? "bg-green-600 text-white hover:bg-green-700" : "bg-yellow-600 text-white hover:bg-yellow-700"
                }
            >
                {isApprove ? "Approved" : "Pending"}
            </Badge>
        )
    }


    console.log(selectedPlan, "selectedPlan")

    return (
        <>
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">My Custom Services</h2>

                {/* Mobile Card View */}
                <div className="block md:hidden space-y-4">
                    {isLoading
                        ? Array(3)
                            .fill(0)
                            .map((_, i) => (
                                <div key={i} className="rounded-lg border border-[#222] bg-[#1A1A1A] p-4">
                                    <Skeleton className="h-6 w-3/4 bg-[#333] mb-2" />
                                    <Skeleton className="h-4 w-1/2 bg-[#333] mb-2" />
                                    <Skeleton className="h-4 w-2/3 bg-[#333] mb-4" />
                                    <Skeleton className="h-8 w-20 bg-[#333]" />
                                </div>
                            ))
                        : services?.data?.map((service: CustomService) => (
                            <div key={service._id} className="rounded-lg border border-[#222] bg-[#1A1A1A] p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-semibold text-white text-lg">{service.name}</h3>
                                    {getStatusBadge(service.isApprove)}
                                </div>

                                <div className="space-y-2 text-sm text-gray-300">
                                    <p>
                                        <span className="font-medium">Country:</span> {service.country}
                                    </p>
                                    <p>
                                        <span className="font-medium">Price:</span> ${service.price}
                                    </p>
                                    <p>
                                        <span className="font-medium">Description:</span> {service.description}
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">File:</span>
                                        <a
                                            href={service.fileUpload}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 hover:underline"
                                        >
                                            {getFileName(service.fileUpload)}
                                        </a>
                                    </div>
                                </div>

                                {service.isApprove && (
                                    <Button
                                        onClick={() => handleViewPlan(service)}
                                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
                                    >
                                        View Plan & Pay
                                    </Button>
                                )}
                            </div>
                        ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-hidden rounded-lg border border-[#222] bg-[#1A1A1A]">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#333] bg-[#0F0F0F]">
                                    <th className="px-4 py-3 text-sm text-left font-medium text-white">Service Name</th>
                                    <th className="px-4 py-3 text-sm text-left font-medium text-white">Country</th>
                                    <th className="px-4 py-3 text-sm text-left font-medium text-white">Budget</th>
                                    <th className="px-4 py-3 text-sm text-left font-medium text-white">File</th>
                                    <th className="px-4 py-3 text-sm text-center font-medium text-white">Status</th>
                                    <th className="px-4 py-3 text-sm text-center font-medium text-white">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading
                                    ? Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                            <tr key={i} className="animate-pulse border-b border-[#222]">
                                                <td className="px-4 py-3">
                                                    <Skeleton className="h-4 w-32 bg-[#333]" />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Skeleton className="h-4 w-24 bg-[#333]" />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Skeleton className="h-4 w-16 bg-[#333]" />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Skeleton className="h-4 w-32 bg-[#333]" />
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <Skeleton className="h-6 w-20 bg-[#333] mx-auto" />
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <Skeleton className="h-8 w-24 bg-[#333] mx-auto" />
                                                </td>
                                            </tr>
                                        ))
                                    : services?.data?.map((service: CustomService) => (
                                        <tr key={service._id} className="border-b border-[#222] text-white">
                                            <td className="px-4 py-3 text-sm font-medium">{service.name}</td>
                                            <td className="px-4 py-3 text-sm">{service.country}</td>
                                            <td className="px-4 py-3 text-sm">${service.price}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <a
                                                    href={service.fileUpload}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-blue-400 hover:text-blue-300 hover:underline"
                                                >
                                                    {getFileName(service.fileUpload)}
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="ml-1 h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                        />
                                                    </svg>
                                                </a>
                                            </td>
                                            <td className="px-4 py-3 text-center">{getStatusBadge(service.isApprove)}</td>
                                            <td className="px-4 py-3 text-center">
                                                {service.isApprove ? (
                                                    <Button onClick={() => handleViewPlan(service)} className="bg-blue-600 hover:bg-blue-700">
                                                        View Plan
                                                    </Button>
                                                ) : (
                                                    <span className="text-gray-500">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {services?.data?.length === 0 && !isLoading && (
                    <div className="text-center py-8 text-gray-400">
                        <p>No custom services found.</p>
                    </div>
                )}
            </div>

            {/* Payment Dialog */}
            <Dialog open={isPaymentDialogOpen} onOpenChange={(open) => !open && handleCloseDialog()}>
                <DialogContent className="max-w-4xl border-0 bg-[#1A1A1A] p-0 text-white">
                    <DialogHeader className="sr-only text-2xl font-semibold">
                        Subscribe to {selectedService?.planData?.planName}
                    </DialogHeader>
                    <div className="flex flex-col lg:flex-row">
                        {/* Left side - Form */}
                        <div className="p-6 lg:w-1/2">
                            <h3 className="text-xl font-semibold">{selectedService?.planData?.planName || selectedService?.name}</h3>
                            <p className="mb-6 text-gray-400">Custom Service Plan</p>
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

                                    {/* Plan Selection */}
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-semibold">Available Plans</h3>
                                        {plansLoading ? (
                                            <div className="space-y-2">
                                                <Skeleton className="h-16 w-full bg-[#333]" />
                                                <Skeleton className="h-16 w-full bg-[#333]" />
                                            </div>
                                        ) : (
                                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                                {subscriptionPlans?.map((plan) => (
                                                    <div
                                                        key={plan._id}
                                                        onClick={() => setSelectedPlan(plan)}
                                                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedPlan?._id === plan._id
                                                            ? "border-red-600 bg-red-600/10"
                                                            : "border-gray-700 hover:border-gray-600"
                                                            }`}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="font-medium">{plan.subscriptionPlanId[0].planName}</h4>
                                                                <p className="text-sm text-gray-400">{plan.subscriptionPlanId[0].description}</p>
                                                            </div>
                                                            <span className="font-bold text-lg">${plan.subscriptionPlanId[0].price}</span>
                                                        </div>
                                                    </div>
                                                ))}
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
                                                width={80}
                                                height={32}
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
                        <div className="bg-gray-700 p-6 lg:w-1/2">
                            <div className="mb-6 space-y-3">
                                <h4 className="text-lg font-semibold mb-3">Service Details</h4>
                                <div className="space-y-2 text-sm">
                                    <p>
                                        <span className="font-medium">Service:</span> {selectedService?.name}
                                    </p>
                                    <p>
                                        <span className="font-medium">Country:</span> {selectedService?.country}
                                    </p>
                                    <p>
                                        <span className="font-medium">Description:</span> {selectedService?.description}
                                    </p>
                                </div>

                                {selectedPlan?.subscriptionPlanId[0].features && (
                                    <>
                                        <h4 className="text-lg font-semibold mt-4 mb-3">Plan Features</h4>
                                        {selectedPlan.subscriptionPlanId[0].features.map((feature: string[], index: number) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Check className="h-5 w-5 rounded-full bg-red-600 p-1 text-white flex-shrink-0" />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>

                            <div className="mb-4 space-y-2 border-t border-gray-500 pt-4">
                                <div className="flex justify-between">
                                    <p className="text-gray-300">Selected Plan</p>
                                    <p>{selectedPlan?.subscriptionPlanId[0].planName || "No plan selected"}</p>
                                </div>

                                <div className="flex justify-between border-t border-gray-500 pt-2">
                                    <p className="text-xl font-semibold">Total</p>
                                    <p className="text-xl font-semibold">${finalPrice.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="flex justify-between border-t border-gray-500 pt-4">
                                <p>Charged today</p>
                                <p className="font-bold">${finalPrice.toFixed(2)}</p>
                            </div>

                            <p className="mt-6 text-sm text-gray-300">
                                By clicking confirm and pay you agree to our terms of use. This is a one-time payment for the custom
                                service.
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
