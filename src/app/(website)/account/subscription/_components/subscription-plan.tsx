import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const plans = [
  {
    service: "Network Security",
    plan: "Basic",
    activatedAt: "8 Sep, 2020",
    expiringIn: "10 Nov, 2020",
    amount: "$125.00",
  },
  {
    service: "Network Security",
    plan: "Pro",
    activatedAt: "8 Sep, 2020",
    expiringIn: "10 Nov, 2020",
    amount: "$125.00",
  },
  {
    service: "Network Security",
    plan: "Basic",
    activatedAt: "8 Sep, 2020",
    expiringIn: "10 Nov, 2020",
    amount: "$125.00",
  },
  {
    service: "Network Security",
    plan: "Enterprise",
    activatedAt: "8 Sep, 2020",
    expiringIn: "10 Nov, 2020",
    amount: "$125.00",
  },
  {
    service: "Network Security",
    plan: "Pro",
    activatedAt: "8 Sep, 2020",
    expiringIn: "10 Nov, 2020",
    amount: "$125.00",
  },
  {
    service: "Network Security",
    plan: "Basic",
    activatedAt: "8 Sep, 2020",
    expiringIn: "10 Nov, 2020",
    amount: "$125.00",
  },
  {
    service: "Network Security",
    plan: "Enterprise",
    activatedAt: "8 Sep, 2020",
    expiringIn: "10 Nov, 2020",
    amount: "$125.00",
  },
  {
    service: "Network Security",
    plan: "Basic",
    activatedAt: "8 Sep, 2020",
    expiringIn: "10 Nov, 2020",
    amount: "$125.00",
  },
  {
    service: "Network Security",
    plan: "Basic",
    activatedAt: "8 Sep, 2020",
    expiringIn: "10 Nov, 2020",
    amount: "$125.00",
  },
  {
    service: "Network Security",
    plan: "Pro",
    activatedAt: "8 Sep, 2020",
    expiringIn: "10 Nov, 2020",
    amount: "$125.00",
  },
  {
    service: "Network Security",
    plan: "Basic",
    activatedAt: "8 Sep, 2020",
    expiringIn: "10 Nov, 2020",
    amount: "$125.00",
  },
  {
    service: "Network Security",
    plan: "Enterprise",
    activatedAt: "8 Sep, 2020",
    expiringIn: "10 Nov, 2020",
    amount: "$125.00",
  },
  {
    service: "Network Security",
    plan: "Pro",
    activatedAt: "8 Sep, 2020",
    expiringIn: "10 Nov, 2020",
    amount: "$125.00",
  },
];

export function SubscriptionPlan() {
  return (
    <div className="rounded-md">
      <Table>
        <TableHeader className="bg-neutral-900">
          <TableRow className="border-none hover:bg-neutral-900">
            <TableHead className="font-medium text-neutral-400">
              Service
            </TableHead>
            <TableHead className="font-medium text-neutral-400">Plan</TableHead>
            <TableHead className="font-medium text-neutral-400">
              Activated at
            </TableHead>
            <TableHead className="font-medium text-neutral-400">
              Expiring In
            </TableHead>
            <TableHead className="font-medium text-neutral-400">
              Amount
            </TableHead>
            <TableHead className="font-medium text-neutral-400">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.map((plan, index) => (
            <TableRow
              key={index}
              className="border-t border-neutral-800 hover:bg-neutral-900/50"
            >
              <TableCell className="text-white">{plan.service}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "rounded-md px-3 py-1 text-sm font-medium text-white",
                    plan.plan === "Basic"
                      ? "bg-blue-600"
                      : plan.plan === "Pro"
                        ? "bg-gradient-to-r from-red-900 to-red-800"
                        : "bg-gradient-to-r from-red-900 to-red-800",
                  )}
                >
                  {plan.plan}
                </span>
              </TableCell>
              <TableCell className="text-white">{plan.activatedAt}</TableCell>
              <TableCell className="text-white">{plan.expiringIn}</TableCell>
              <TableCell className="text-white">{plan.amount}</TableCell>
              <TableCell>
                <button className="text-red-600 hover:text-red-500">
                  Unsubscribe
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
