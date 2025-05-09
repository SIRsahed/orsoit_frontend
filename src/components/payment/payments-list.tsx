"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { Search, Trash2, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { fetchPayments, generateInvoice } from "@/lib/api"

export default function PaymentsList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])

  const { data, isLoading, error } = useQuery({
    queryKey: ["payments", currentPage],
    queryFn: () => fetchPayments(currentPage, 10),
  })

  if (error) {
    toast.error("Failed to load payments")
  }

  const handleDownloadInvoice = async (paymentId: string) => {
    try {
      const blob = await generateInvoice(paymentId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `invoice-${paymentId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      toast.error("Failed to download invoice")
    }
  }

  const toggleSelectPayment = (paymentId: string) => {
    setSelectedPayments((prev) =>
      prev.includes(paymentId) ? prev.filter((id) => id !== paymentId) : [...prev, paymentId],
    )
  }

  const toggleSelectAll = () => {
    if (selectedPayments.length === (data?.data?.length || 0)) {
      setSelectedPayments([])
    } else {
      setSelectedPayments(data?.data?.map((payment) => payment._id) || [])
    }
  }

  return (
    <div className="bg-[#1A1A1A] border border-[#222] rounded-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <div className="text-sm font-medium">Payments</div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search Here..."
            className="pl-10 bg-[#0F0F0F] border-[#333] w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-[#333] bg-[#0F0F0F]">
              <th className="py-3 px-4">
                <Checkbox
                  checked={selectedPayments.length === (data?.data?.length || 0) && data?.data?.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </th>
              <th className="text-left py-3 px-4 font-medium">#</th>
              <th className="text-left py-3 px-4 font-medium">Amount</th>
              <th className="text-left py-3 px-4 font-medium">Status</th>
              <th className="text-left py-3 px-4 font-medium">Payment method</th>
              <th className="text-left py-3 px-4 font-medium">Email</th>
              <th className="text-left py-3 px-4 font-medium">Date</th>
              <th className="text-left py-3 px-4 font-medium">Refunded Date</th>
              <th className="text-left py-3 px-4 font-medium">Decline reason</th>
              <th className="text-center py-3 px-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i} className="border-b border-[#222] animate-pulse">
                      <td className="py-3 px-4">
                        <div className="h-4 w-4 bg-[#333] rounded"></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 bg-[#333] rounded w-8"></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 bg-[#333] rounded w-20"></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-6 bg-[#333] rounded w-24"></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 bg-[#333] rounded w-16"></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 bg-[#333] rounded w-32"></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 bg-[#333] rounded w-24"></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 bg-[#333] rounded w-24"></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 bg-[#333] rounded w-24"></div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex justify-center gap-2">
                          <div className="h-8 w-8 bg-[#333] rounded"></div>
                          <div className="h-8 w-8 bg-[#333] rounded"></div>
                        </div>
                      </td>
                    </tr>
                  ))
              : data?.data?.map((payment, index) => (
                  <tr key={payment._id} className="border-b border-[#222]">
                    <td className="py-3 px-4">
                      <Checkbox
                        checked={selectedPayments.includes(payment._id)}
                        onCheckedChange={() => toggleSelectPayment(payment._id)}
                      />
                    </td>
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">${payment.amount.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          payment.paymentStatus === "completed"
                            ? "bg-green-900 text-green-300"
                            : payment.paymentStatus === "refunded"
                              ? "bg-yellow-900 text-yellow-300"
                              : "bg-red-900 text-red-300"
                        }`}
                      >
                        {payment.paymentStatus === "completed" ? "Succeeded" : payment.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <img
                        src="/placeholder.svg?height=20&width=30"
                        alt={payment.paymentMethod}
                        className="h-5 w-8 object-contain"
                      />
                      <span className="text-xs">**** {payment.stripeSessionId.slice(-4)}</span>
                    </td>
                    <td className="py-3 px-4">example@gmail.com</td>
                    <td className="py-3 px-4">
                      {new Date(payment.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadInvoice(payment._id)}
                          title="Download Invoice"
                        >
                          <Download className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete Payment">
                          <Trash2 className="h-5 w-5 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 flex justify-between items-center text-sm">
        <div>
          Showing {data?.pagination?.currentPage || 1} to{" "}
          {Math.min((data?.pagination?.currentPage || 1) * 10, data?.pagination?.totalItems || 0)} of{" "}
          {data?.pagination?.totalItems || 0} entries
        </div>

        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            className="bg-[#0F0F0F] border-[#333] h-8 w-8 p-0"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </Button>

          {Array.from({ length: Math.min(5, data?.pagination?.totalPages || 1) }, (_, i) => {
            const pageNumber = i + 1
            return (
              <Button
                key={pageNumber}
                variant="outline"
                size="sm"
                className={`h-8 w-8 p-0 ${
                  pageNumber === currentPage ? "bg-red-600 border-red-600 text-white" : "bg-[#0F0F0F] border-[#333]"
                }`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            )
          })}

          <Button
            variant="outline"
            size="sm"
            className="bg-[#0F0F0F] border-[#333] h-8 w-8 p-0"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data?.pagination?.totalPages || 1))}
            disabled={currentPage === (data?.pagination?.totalPages || 1)}
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}
