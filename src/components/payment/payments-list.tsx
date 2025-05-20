"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchPayments } from "@/lib/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Image from "next/image";

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
      const doc = new jsPDF();

      doc.setFillColor(20, 20, 20);
      doc.rect(0, 0, 210, 40, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text("PAYMENT RECEIPT", 105, 20, { align: "center" });

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);

      doc.text("Receipt Number:", 20, 50);
      doc.text(`REC-${payment._id.substring(0, 8)}`, 80, 50);

      const issueDate = new Date(payment.createdAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      );

      doc.text("Date:", 20, 60);
      doc.text(issueDate, 80, 60);

      doc.text("Payment Method:", 20, 70);
      doc.text(
        `${payment.paymentMethod} (**** ${payment.stripeSessionId.slice(-4)})`,
        80,
        70,
      );

      doc.text("Payment Status:", 20, 80);
      doc.text(
        payment.paymentStatus === "completed"
          ? "Succeeded"
          : payment.paymentStatus,
        80,
        80,
      );

      doc.setDrawColor(200, 200, 200);
      doc.line(20, 90, 190, 90);

      doc.setFontSize(14);
      doc.text("Customer Information", 20, 105);

      doc.setFontSize(12);
      doc.text("Name:", 20, 115);
      doc.text(
        `${payment.userId.firstName} ${payment.userId.lastName}`,
        80,
        115,
      );

      doc.text("Email:", 20, 125);
      doc.text(payment.userId.email, 80, 125);

      if (payment.userId.phoneNumber) {
        doc.text("Phone:", 20, 135);
        doc.text(payment.userId.phoneNumber, 80, 135);
      }

      doc.line(20, 145, 190, 145);

      doc.setFontSize(14);
      doc.text("Payment Details", 20, 160);

      autoTable(doc, {
        startY: 170,
        head: [["Description", "Amount"]],
        body: [["Service Subscription", `$${payment.amount.toFixed(2)}`]],
        theme: "grid",
        headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
        styles: { halign: "left" },
        columnStyles: {
          1: { halign: "right" },
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const finalY = (doc as any).lastAutoTable.finalY + 10;

      doc.setFontSize(12);
      doc.text("Total Amount:", 130, finalY);
      doc.setFont("helvetica", "bold");
      doc.text(`$${payment.amount.toFixed(2)}`, 190, finalY, {
        align: "right",
      });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Thank you for your business!", 105, 280, { align: "center" });
      doc.text(
        `Receipt generated on ${new Date().toLocaleDateString()}`,
        105,
        285,
        { align: "center" },
      );

      doc.save(`payment-receipt-${payment._id}.pdf`);
      toast.success("Payment receipt downloaded successfully");
    } catch (error) {
      console.error("Error generating receipt:", error);
      toast.error("Failed to generate payment receipt");
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
      paymentsData?.data &&
      selectedPayments.length === paymentsData.data.length &&
      paymentsData.data.length > 0
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
                    paymentsData?.data &&
                    selectedPayments.length === paymentsData.data.length &&
                    paymentsData.data.length > 0
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
              <th className="px-4 py-3 text-center font-medium">Receipt</th>
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
                        <div className="h-4 w-4 rounded bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-8 rounded bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-20 rounded bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-6 w-24 rounded bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-16 rounded bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-32 rounded bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-32 rounded bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-24 rounded bg-[#333]" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="mx-auto h-8 w-8 rounded bg-[#333]" />
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
                      <Image
                        fill
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
                          title="Download Receipt"
                          className="hover:bg-red-900/20 hover:text-red-400"
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
