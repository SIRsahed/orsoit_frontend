"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { updateCoupon, fetchServices } from "@/lib/api";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  discount: z.coerce
    .number()
    .min(1, "Discount must be at least 1")
    .max(100, "Discount cannot exceed 100"),
  code: z.string().min(3, "Code must be at least 3 characters"),
  applicableServices: z
    .array(z.string())
    .min(1, "At least one service must be selected"),
  activeFrom: z.date(),
  expireIn: z.date(),
});

type FormValues = z.infer<typeof formSchema>;

type Coupon = {
  _id: string;
  userID: string;
  title: string;
  discount: number;
  code: string;
  applicableServices: string[];
  activeFrom: string;
  expireIn: string;
  createdAt: string;
  updatedAt: string;
};

export default function EditCouponDialog({
  open,
  onOpenChange,
  coupon,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coupon: Coupon;
}) {
  const queryClient = useQueryClient();
  const [activeFromOpen, setActiveFromOpen] = useState(false);
  const [expireInOpen, setExpireInOpen] = useState(false);

  const { data: servicesData } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: coupon.title,
      discount: coupon.discount,
      code: coupon.code,
      applicableServices: coupon.applicableServices,
      activeFrom: new Date(coupon.activeFrom),
      expireIn: new Date(coupon.expireIn),
    },
  });

  // Update form when coupon changes
  useEffect(() => {
    form.reset({
      title: coupon.title,
      discount: coupon.discount,
      code: coupon.code,
      applicableServices: coupon.applicableServices,
      activeFrom: new Date(coupon.activeFrom),
      expireIn: new Date(coupon.expireIn),
    });
  }, [coupon, form]);

  const mutation = useMutation({
    mutationFn: (values: Partial<FormValues>) =>
      updateCoupon(coupon._id, {
        title: values.title,
        discount: values.discount,
        code: values.code,
        applicableServices: values.applicableServices,
        activeFrom: values.activeFrom?.toISOString(),
        expireIn: values.expireIn?.toISOString(),
      }),
    onSuccess: () => {
      toast.success("Coupon updated successfully");
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error("Failed to update coupon");
      console.error(error);
    },
  });

  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-[#222] bg-[#1A1A1A] text-white">
        <DialogHeader>
          <DialogTitle>Edit Coupon</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title Name"
                      className="border-[#333] bg-[#0F0F0F]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Discount"
                      className="border-[#333] bg-[#0F0F0F]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter code"
                      className="border-[#333] bg-[#0F0F0F]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicableServices"
              render={() => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <div className="space-y-2">
                    {servicesData?.data?.map((service: any) => (
                      <div
                        key={service._id}
                        className="flex items-center space-x-2"
                      >
                        <FormField
                          control={form.control}
                          name="applicableServices"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(service._id)}
                                  onCheckedChange={(checked) => {
                                    const updatedServices = checked
                                      ? [...field.value, service._id]
                                      : field.value.filter(
                                          (value: string) =>
                                            value !== service._id,
                                        );
                                    field.onChange(updatedServices);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="cursor-pointer text-sm font-normal">
                                {service.name}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activeFrom"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Active From</FormLabel>
                  <Popover
                    open={activeFromOpen}
                    onOpenChange={setActiveFromOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full border-[#333] bg-[#0F0F0F] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto border-[#333] bg-[#1A1A1A] p-0"
                      align="start"
                    >
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          if (date) setActiveFromOpen(false);
                        }}
                        initialFocus
                        className="bg-[#1A1A1A]"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expireIn"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expire In</FormLabel>
                  <Popover open={expireInOpen} onOpenChange={setExpireInOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full border-[#333] bg-[#0F0F0F] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto border-[#333] bg-[#1A1A1A] p-0"
                      align="start"
                    >
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          if (date) setExpireInOpen(false);
                        }}
                        disabled={(date) =>
                          date < new Date(form.getValues("activeFrom"))
                        }
                        initialFocus
                        className="bg-[#1A1A1A]"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
