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
                    "inline-block h-[30px] w-[90px] rounded-md px-2 py-1 text-center text-sm font-medium text-white",
                    plan.plan === "Basic"
                      ? "bg-[#2165FF]" // Solid color for Basic
                      : plan.plan === "Pro"
                        ? "bg-[linear-gradient(170.34deg,#D80100_-4.69%,#200C0D_97.46%)]" // Gradient for Pro
                        : "bg-[linear-gradient(148.79deg,#D80100_7.56%,#EB3E3E_53.78%,#3A0305_100%)]", // Gradient for Enterprise
                  )}
                >
                  {plan.plan}
                </span>
              </TableCell>
              <TableCell className="text-white">{plan.activatedAt}</TableCell>
              <TableCell className="text-white">{plan.expiringIn}</TableCell>
              <TableCell className="text-white">{plan.amount}</TableCell>
              <TableCell>
                <button className="text-[16px] text-[#D80100] hover:text-[#D80100]/80">
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
