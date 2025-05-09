import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Custom Services | Orso Solutions",
  description: "Custom services management",
}

export default function CustomServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#1A0A0A] p-4 flex items-center justify-between border-b border-[#222]">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold">Custom Services</h2>
        <p className="text-gray-400 mt-4">This page is under construction.</p>
      </main>
    </div>
  )
}
