"use client"

import { useEffect } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const handleLogout = async () => {
      await signOut({ redirect: false })
      router.push("/")
    }

    handleLogout()
  }, [router])

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h2 className="text-2xl font-bold">Logging out...</h2>
    </div>
  )
}
