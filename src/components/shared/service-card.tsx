"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
  plans?: {
    basic: {
      price: number;
      shortDescription: string;
      features: string[];
    };
    standard: {
      price: number;
      shortDescription: string;
      features: string[];
    };
    premium: {
      price: number;
      shortDescription: string;
      features: string[];
    };
  };
}

export function ServiceCard({
  title,
  description,
  image,
  id
}: ServiceCardProps) {

  return (
    <div className="z-10 pt-7 pb-2 w-full"
      style={{
        backgroundImage: `url(/curved_div.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content positioned absolutely on top of the image */}
      <div className="flex flex-col items-center justify-center p-8 pt-10">
        <div className="space-y-6 text-center">
          <div className="mx-auto flex items-center justify-center">
            <Image
              src={image}
              alt={title}
              height={500}
              width={500}
              className="w-32 aspect-[5/3] object-contain"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-primary">{title}</h3>
            <p className="cardSubTitle max-w-[280px]">{description}</p>
          </div>
          <div>
            <Link href={`/service/${id}`}>
              <Button
                className="bg-primary text-white transition-colors hover:bg-red-600"
                size="lg"
              >
                See Plans
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
