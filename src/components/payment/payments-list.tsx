"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchPayments } from "@/lib/api";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface Payment {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
  };
  paymentMethod: string;
  subscriptionId: string;
  stripeSessionId: string;
  amount: number;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PaymentsResponse {
  success: boolean;
  message: string;
  data?: Payment[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export default function PaymentsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const {
    data: paymentsData,
    isLoading,
    error,
  } = useQuery<PaymentsResponse>({
    queryKey: ["payments", currentPage],
    queryFn: () => fetchPayments(currentPage, 10),
  });

  if (error) {
    toast.error("Failed to load payments");
  }

  const handleDownloadInvoice = async (payment: Payment) => {
    try {
      // Create a new PDF document
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(24);
      doc.text("Invoice PDF", 20, 20);

      // Add invoice details
      doc.setFontSize(14);
      doc.text("Invoice", 20, 40);
      doc.setFontSize(10);
      doc.text(`Invoice number: INV-${payment._id.substring(0, 8)}`, 20, 50);

      const issueDate = new Date(payment.createdAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      );

      doc.text(`Date of issue: ${issueDate}`, 20, 55);
      doc.text(`Date of due: ${issueDate}`, 20, 60);

      // Add company info
      doc.text("ORSO Solutions", 20, 70);
      doc.text("USA", 20, 75);

      // Add customer info
      doc.text("Bill to", 120, 70);
      doc.text(
        `${payment.userId.firstName} ${payment.userId.lastName}`,
        120,
        75,
      );
      doc.text(`${payment.userId.email}`, 120, 80);
      doc.text(`${payment.userId.phoneNumber || ""}`, 120, 85);

      // Add amount due
      doc.setFontSize(14);
      doc.text(`$${payment.amount.toFixed(2)} due ${issueDate}`, 20, 95);

      // Add table headers
      const headers = [["Description", "Qty", "Unit Price", "Amount"]];

      // Add table data
      const data = [
        [
          "Cybersecurity Service Subscription",
          "1",
          `$${payment.amount.toFixed(2)}`,
          `$${payment.amount.toFixed(2)}`,
        ],
      ];

      // Add table
      (doc as any).autoTable({
        startY: 105,
        head: headers,
        body: data,
        theme: "grid",
      });

      // Add totals
      const finalY = (doc as any).lastAutoTable.finalY + 10;

      doc.text("Subtotal", 140, finalY);
      doc.text(`$${payment.amount.toFixed(2)}`, 170, finalY);

      doc.text("Total", 140, finalY + 5);
      doc.text(`$${payment.amount.toFixed(2)}`, 170, finalY + 5);

      doc.text("Amount due", 140, finalY + 10);
      doc.text(`$${payment.amount.toFixed(2)}`, 170, finalY + 10);

      // Add footer
      doc.setFontSize(8);
      doc.text(
        `INV-${payment._id.substring(0, 8)}: $${payment.amount.toFixed(2)}, due ${issueDate}`,
        20,
        280,
      );

      // Save the PDF
      doc.save(`invoice-${payment._id}.pdf`);
    } catch (error) {
      console.error("Error generating invoice:", error);
      toast.error("Failed to generate invoice");
    }
  };

  const toggleSelectPayment = (paymentId: string) => {
    setSelectedPayments((prev) =>
      prev.includes(paymentId)
        ? prev.filter((id) => id !== paymentId)
        : [...prev, paymentId],
    );
  };

  const toggleSelectAll = () => {
    if (
      selectedPayments.length === (paymentsData?.data?.length || 0) &&
      paymentsData?.data?.length > 0
    ) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(
        paymentsData?.data?.map((payment) => payment._id) || [],
      );
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-[#222] bg-[#1A1A1A]">
      <div className="flex items-center justify-between p-4">
        <div className="text-sm font-medium">Payments</div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search Here..."
            className="w-full border-[#333] bg-[#0F0F0F] pl-10 md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-[#333] bg-[#0F0F0F]">
              <th className="px-4 py-3">
                <Checkbox
                  checked={
                    selectedPayments.length ===
                      (paymentsData?.data?.length || 0) &&
                    paymentsData?.data?.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left font-medium">#</th>
              <th className="px-4 py-3 text-left font-medium">Amount</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">
                Payment method
              </th>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-center font-medium">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <tr
                      key={i}
                      className="animate-pulse border-b border-[#222]"
                    >
                      <td className="px-4 py-3">
                        <div className="h-4 w-4 rounded bg-[#333]"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-8 rounded bg-[#333]"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-20 rounded bg-[#333]"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-6 w-24 rounded bg-[#333]"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-16 rounded bg-[#333]"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-32 rounded bg-[#333]"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-32 rounded bg-[#333]"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-24 rounded bg-[#333]"></div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          <div className="h-8 w-8 rounded bg-[#333]"></div>
                        </div>
                      </td>
                    </tr>
                  ))
              : paymentsData?.data?.map((payment, index) => (
                  <tr key={payment._id} className="border-b border-[#222]">
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedPayments.includes(payment._id)}
                        onCheckedChange={() => toggleSelectPayment(payment._id)}
                      />
                    </td>
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">${payment.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          payment.paymentStatus === "completed"
                            ? "bg-green-900 text-green-300"
                            : payment.paymentStatus === "refunded"
                              ? "bg-yellow-900 text-yellow-300"
                              : "bg-red-900 text-red-300"
                        }`}
                      >
                        {payment.paymentStatus === "completed"
                          ? "Succeeded"
                          : payment.paymentStatus}
                      </span>
                    </td>
                    <td className="flex items-center gap-2 px-4 py-3">
                      <img
                        src="/credit-card-icon.png"
                        alt={payment.paymentMethod}
                        className="h-5 w-8 object-contain"
                      />
                      <span className="text-xs">
                        **** {payment.stripeSessionId.slice(-4)}
                      </span>
                    </td>
                    <td className="px-4 py-3">{`${payment.userId.firstName} ${payment.userId.lastName}`}</td>
                    <td className="px-4 py-3">{payment.userId.email}</td>
                    <td className="px-4 py-3">
                      {new Date(payment.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadInvoice(payment)}
                          title="Download Invoice"
                        >
                          <Download className="h-5 w-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-4 text-sm">
        <div>
          Showing {paymentsData?.pagination?.currentPage || 1} to{" "}
          {Math.min(
            (paymentsData?.pagination?.currentPage || 1) * 10,
            paymentsData?.pagination?.totalItems || 0,
          )}{" "}
          of {paymentsData?.pagination?.totalItems || 0} entries
        </div>

        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 border-[#333] bg-[#0F0F0F] p-0"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </Button>

          {Array.from(
            { length: Math.min(5, paymentsData?.pagination?.totalPages || 1) },
            (_, i) => {
              const pageNumber = i + 1;
              return (
                <Button
                  key={pageNumber}
                  variant="outline"
                  size="sm"
                  className={`h-8 w-8 p-0 ${
                    pageNumber === currentPage
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-[#333] bg-[#0F0F0F]"
                  }`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            },
          )}

          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 border-[#333] bg-[#0F0F0F] p-0"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, paymentsData?.pagination?.totalPages || 1),
              )
            }
            disabled={
              currentPage === (paymentsData?.pagination?.totalPages || 1)
            }
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
