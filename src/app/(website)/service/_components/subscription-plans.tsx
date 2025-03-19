/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { SubscriptionDialog } from "./subscription-dialog";

interface PlanData {
  title: string;
  description: string;
  plans: {
    basic: {
      price: number;
      shortDescription: string;
      features: string[];
    };
    standard: {
      price: number;
      shortDescription: string;
      features: string[];
    };
    premium: {
      price: number;
      shortDescription: string;
      features: string[];
    };
  };
}

export default function SubscriptionPage() {
  //   const params = useParams();
  const searchParams = useSearchParams();
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<
    "basic" | "standard" | "premium"
  >("standard");

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam));
        // Only update state if the data is different
        setPlanData((prev) => {
          // Check if data is the same to avoid unnecessary re-renders
          if (JSON.stringify(prev) === JSON.stringify(decodedData)) {
            return prev;
          }
          return decodedData;
        });
      } catch (error) {
        console.error("Error parsing plan data:", error);
      }
    }
  }, [searchParams]);

  const handleBuyPlan = (planType: "basic" | "standard" | "premium") => {
    setSelectedPlan(planType);
    setDialogOpen(true);
  };

  if (!planData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading plan details...</p>
      </div>
    );
  }

  return (
    <div className="w-full text-white">
      <div className="container mx-auto px-4 py-16 backdrop-blur-md">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{planData.title}</h1>
          <p>{planData.description}</p>
        </div>
        <div className="mb-12 text-center">
          <h1 className="mt-16 text-4xl font-bold">Subscription</h1>
          <p className="mx-auto mt-4 max-w-3xl">
            At Orso, we are more than a cybersecurity provider - we&apos;re your
            trusted partner in building a resilient digital environment. Our
            mission is to empower businesses to operate securely in today&apos;s
            complex and ever-changing threat landscape. We specialize in
            delivering end-to-end security solutions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Basic Plan */}
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-8">
            <h2 className="text-xl font-bold">Basic Plan</h2>
            <div className="my-4">
              <span className="text-4xl font-bold text-red-600">
                ${planData.plans.basic.price}
              </span>
              <span className="text-gray-400">/Month</span>
            </div>
            <p className="mb-6 text-gray-300">
              {planData.plans.basic.shortDescription}
            </p>

            <div className="mb-6 space-y-3">
              {planData.plans.basic.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => handleBuyPlan("basic")}
            >
              Buy Plan
            </Button>
          </div>

          {/* Standard Plan */}
          <div className="rounded-lg border-2 border-red-600 bg-gray-900 p-8">
            <h2 className="text-xl font-bold">Standard Plan</h2>
            <div className="my-4">
              <span className="text-4xl font-bold text-red-600">
                ${planData.plans.standard.price}
              </span>
              <span className="text-gray-400">/Month</span>
            </div>
            <p className="mb-6 text-gray-300">
              {planData.plans.standard.shortDescription}
            </p>

            <div className="mb-6 space-y-3">
              {planData.plans.standard.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => handleBuyPlan("standard")}
            >
              Buy Plan
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-8">
            <h2 className="text-xl font-bold">Premium Plan</h2>
            <div className="my-4">
              <span className="text-4xl font-bold text-red-600">
                ${planData.plans.premium.price}
              </span>
              <span className="text-gray-400">/Month</span>
            </div>
            <p className="mb-6 text-gray-300">
              {planData.plans.premium.shortDescription}
            </p>

            <div className="mb-6 space-y-3">
              {planData.plans.premium.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => handleBuyPlan("premium")}
            >
              Buy Plan
            </Button>
          </div>
        </div>
      </div>

      {/* Subscription Dialog */}
      {planData && (
        <SubscriptionDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          planType={selectedPlan}
          planData={planData.plans[selectedPlan]}
          serviceName={planData.title}
        />
      )}
    </div>
  );
}
