"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConversionChart() {
  return (
    <Card className="border-[#222] bg-[#1A1A1A] text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">Conversion Ratio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">Registered Users</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Subscribed Users</span>
          </div>
        </div>

        <div className="flex h-[200px] items-end justify-around gap-4">
          {/* This would be a real chart in production */}
          {["JAN", "FEB", "MAR", "APR", "MAY"].map((month, i) => (
            <div key={month} className="flex flex-col items-center gap-1">
              <div className="flex gap-1">
                <div
                  className="w-4 bg-blue-500"
                  style={{ height: `${[15, 30, 20, 25, 15][i]}px` }}
                ></div>
                <div
                  className="w-4 bg-red-500"
                  style={{ height: `${[10, 20, 15, 25, 10][i]}px` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400">{month}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
