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
    <div className="relative z-10 h-[390px] w-[370px]">
      <Image
        src={"/curved_div.png"}
        alt="ORSO Solutions"
        height={400}
        width={400}
        className="h-full w-full object-contain"
      />

      {/* Content positioned absolutely on top of the image */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pt-10">
        <div className="space-y-6 text-center">
          <div className="mx-auto flex items-center justify-center">
            <Image
              src={image}
              alt={title}
              height={500}
              width={500}
              className="w-60 aspect-[5/3] object-cover"
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
