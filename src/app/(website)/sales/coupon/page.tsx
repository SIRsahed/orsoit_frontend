import type { Metadata } from "next";
import CouponsList from "@/components/coupons/coupons-list";

export const metadata: Metadata = {
  title: "Coupons | Orso Solutions",
  description: "Coupon management",
};

export default function CouponsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Coupon Management</h2>
          <p className="mt-2 text-gray-400">
            A coupon is a promotional tool that offers discounts or special
            deals to customers. It can be a code or a physical voucher,
            providing percentage-based, fixed-amount, or exclusive offers.
          </p>
        </div>
        <CouponsList />
      </main>
    </div>
  );
}
