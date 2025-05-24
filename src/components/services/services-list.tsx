"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchServices } from "@/lib/api";
import EditServiceDialog from "./edit-service-dialog";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { DeleteServiceDialog } from "./delete-service-dialog";

export interface Service {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export default function ServicesList() {
  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  if (error) {
    toast.error("Failed to load services");
  }
  

  const [dialogOpen, setDialogOpen] = useState(false)


  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {isLoading
        ? Array(3)
          .fill(0)
          .map((_, i) => (
            <Card
              key={i}
              className="overflow-hidden border-[#222] bg-[#1A1A1A]"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Skeleton className="h-16 w-16 rounded bg-[#333]" />
                </div>
                <Skeleton className="mx-auto mb-4 h-6 w-3/4 bg-[#333]" />
                <Skeleton className="h-24 w-full bg-[#333]" />
              </CardContent>
              <CardFooter className="flex justify-center gap-4 border-t border-[#222] p-4">
                <Skeleton className="h-10 w-28 bg-[#333]" />
                <Skeleton className="h-10 w-28 bg-[#333]" />
              </CardFooter>
            </Card>
          ))
        : services?.data?.map((service: Service) => (
          <Card
            key={service._id}
            className="overflow-hidden border-[#222] bg-[#1A1A1A] text-white"
          >
            <CardContent className="p-6">
              <Button
                onClick={() => setDialogOpen(true)}
              >
                <Trash className="h-7 w-7" aria-hidden="true" />
              </Button>
              <DeleteServiceDialog
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                serviceId={service._id}
              />
              <div className="mb-4 flex justify-center">
                <Image
                  src={service.image}
                  alt={service.name}
                  height={1000}
                  width={1000}
                  className="w-[300px] aspect-[5/3] object-cover"
                />
              </div>
              <h3 className="mb-4 text-center text-xl font-bold">
                {service.name}
              </h3>
              <p className="text-sm text-gray-400">{service.description}</p>
            </CardContent>
            <CardFooter className="flex justify-center gap-4 border-t border-[#222] p-4">
              <EditServiceDialog service={service} />
              <Link href={`/ceo/services/${service._id}`}>
                <Button>Edit Subscription</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
