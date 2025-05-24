"use client";

import React, { useEffect, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

// Create a separate component for the content that uses useSearchParams
const SuccessContent = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("stripeSessionId");

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            try {
                if (sessionId) {
                    await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/payments/status-check?stripeSessionId=${sessionId}`
                    );
                }
            } catch (error) {
                console.error("Error fetching payment status:", error);
            }
        };

        fetchPaymentStatus();
    }, [sessionId]);

    return (
        <Card className="max-w-[800px] mx-auto bg-black py-10 rounded-3xl relative border-red-500">
            <CardContent>
                <div className="flex justify-center items-center pb-6">
                    <Image
                        src={"/images/cancel.png"}
                        alt="success"
                        height={1000}
                        width={500}
                        className="object-contain w-32 h-28"
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white pb-6">
                        Oops! Payment Cancelled! Try Again.
                    </h2>
                    <Link href="/">
                        <Button
                            className="w-52"
                        >
                            Go Back!
                        </Button>
                    </Link>
                </div>
            </CardContent>
            <Link href="/">
                <Button
                    variant="outline"
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 font-medium text-white"
                >
                    <X />
                </Button>
            </Link>
        </Card>
    );
};

const Page = () => {
    return (
        <div className="pb-32 pt-44">
            <Suspense
                fallback={
                    <div className="text-center text-white">
                        Loading payment status...
                    </div>
                }
            >
                <SuccessContent />
            </Suspense>
        </div>
    );
};

export default Page;