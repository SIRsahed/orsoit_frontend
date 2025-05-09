"use client"

import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { CuboidIcon as Cube3d } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchServices } from "@/lib/api"
import EditServiceDialog from "./edit-service-dialog"
import EditSubscriptionDialog from "./edit-subscription-dialog"

export default function ServicesList() {
  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  })

  if (error) {
    toast.error("Failed to load services")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading
        ? Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="bg-[#1A1A1A] border-[#222] overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <Skeleton className="h-16 w-16 rounded bg-[#333]" />
                  </div>
                  <Skeleton className="h-6 w-3/4 mx-auto mb-4 bg-[#333]" />
                  <Skeleton className="h-24 w-full bg-[#333]" />
                </CardContent>
                <CardFooter className="flex justify-center gap-4 p-4 border-t border-[#222]">
                  <Skeleton className="h-10 w-28 bg-[#333]" />
                  <Skeleton className="h-10 w-28 bg-[#333]" />
                </CardFooter>
              </Card>
            ))
        : services?.data?.map((service) => (
            <Card key={service._id} className="bg-[#1A1A1A] border-[#222] overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {service.image ? (
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      className="h-16 w-16 object-contain"
                    />
                  ) : (
                    <Cube3d className="h-16 w-16 text-red-600" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-center mb-4">{service.name}</h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </CardContent>
              <CardFooter className="flex justify-center gap-4 p-4 border-t border-[#222]">
                <EditServiceDialog service={service} />
                <EditSubscriptionDialog serviceId={service._id} />
              </CardFooter>
            </Card>
          ))}
    </div>
  )
}
