"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: "success" | "warning";
  title: string;
  message: string;
  date: string;
  time: string;
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Subscription renewal successful",
      message: "Your subscription has been successfully renewed",
      date: "Feb 25, 2025",
      time: "10:15 AM",
    },
    {
      id: "2",
      type: "success",
      title: "Subscription renewal successful",
      message: "Your subscription has been successfully renewed",
      date: "Feb 25, 2025",
      time: "10:15 AM",
    },
    {
      id: "3",
      type: "success",
      title: "Subscription renewal successful",
      message: "Your subscription has been successfully renewed",
      date: "Feb 25, 2025",
      time: "10:15 AM",
    },
    {
      id: "4",
      type: "warning",
      title: "Payment method expired",
      message:
        "Your payment method has expired. Please update it to avoid interruptions.",
      date: "Feb 25, 2025",
      time: "10:15 AM",
    },
    {
      id: "5",
      type: "success",
      title: "Subscription renewal successful",
      message: "Your subscription has been successfully renewed",
      date: "Feb 25, 2025",
      time: "10:15 AM",
    },
    {
      id: "6",
      type: "success",
      title: "Subscription renewal successful",
      message: "Your subscription has been successfully renewed",
      date: "Feb 25, 2025",
      time: "10:15 AM",
    },
    {
      id: "7",
      type: "warning",
      title: "Payment method expired",
      message:
        "Your payment method has expired. Please update it to avoid interruptions.",
      date: "Feb 25, 2025",
      time: "10:15 AM",
    },
    {
      id: "8",
      type: "success",
      title: "Subscription renewal successful",
      message: "Your subscription has been successfully renewed",
      date: "Feb 25, 2025",
      time: "10:15 AM",
    },
    {
      id: "9",
      type: "warning",
      title: "Payment method expired",
      message:
        "Your payment method has expired. Please update it to avoid interruptions.",
      date: "Feb 25, 2025",
      time: "10:15 AM",
    },
    {
      id: "10",
      type: "warning",
      title: "Payment method expired",
      message:
        "Your payment method has expired. Please update it to avoid interruptions.",
      date: "Feb 25, 2025",
      time: "10:15 AM",
    },
    {
      id: "11",
      type: "success",
      title: "Subscription renewal successful",
      message: "Your subscription has been successfully renewed",
      date: "Feb 25, 2025",
      time: "10:15 AM",
    },
  ]);

  const handleDelete = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  return (
    <div className="w-full">
      <Table>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow
              key={notification.id}
              className="border-t hover:bg-gray-900"
            >
              <TableCell className="p-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700">
                      <Bell className="h-4 w-4 text-yellow-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <h3 className="text-base font-medium text-red-500">
                        {notification.title}
                      </h3>
                      <span className="text-sm text-gray-500 sm:text-right">
                        {notification.date} • {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {notification.message}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <Button
                      variant="ghost"
                      className="text-red-500 hover:bg-transparent hover:text-red-700"
                      onClick={() => handleDelete(notification.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
