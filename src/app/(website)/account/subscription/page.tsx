import { SubscriptionPlan } from "./_components/subscription-plan";

export default function SubscriptionPage() {
  return (
    <div className="space-y-4">
      <div className="border-b border-neutral-800 pb-4">
        <h1 className="text-2xl font-bold text-primary">View Current Plan</h1>
      </div>
      <SubscriptionPlan />
    </div>
  );
}
