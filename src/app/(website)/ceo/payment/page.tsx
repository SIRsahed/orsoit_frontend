import type { Metadata } from "next";

import PaymentsList from "@/components/payment/payments-list";
import PaymentStats from "@/components/payment/payment-stats";

export const metadata: Metadata = {
  title: "Payment | Orso Solutions",
  description: "Payment management",
};

export default function PaymentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6">
        <h2 className="mb-6 text-2xl font-bold">Transactions</h2>
        <PaymentStats />
        <PaymentsList />
      </main>
    </div>
  );
}
