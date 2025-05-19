"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import { useSession } from "next-auth/react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const session = useSession()
  const users = session.data?.user
  console.log(users)

  const [user, setUser] = useState({
    name: session.data?.user?.name || "Not available",
    username: session.data?.user?.role ? `(${session.data.user.role})` : "",
    location: "Not specified",
    bio: "No bio available",
    email: session.data?.user?.email || "Not available",
    phone: "+1 (555) 123-4567", // Keep default as this isn't in your session data
    address: "Not specified", // Keep default as this isn't in your session data
    about: `${session.data?.user?.name || "User"} - ${session.data?.user?.role || "Role not specified"}`,
  })

  // Store original user data to revert changes if canceled
  const [originalUser, setOriginalUser] = useState({ ...user })

  // Update user data when session changes
  useEffect(() => {
    if (session.data?.user) {
      setUser((prevUser) => ({
        ...prevUser,
        name: session.data.user.name || prevUser.name,
        username: session.data.user.role ? `(${session.data.user.role})` : prevUser.username,
        email: session.data.user.email || prevUser.email,
        about: `${session.data.user.name || "User"} - ${session.data.user.role || "Role not specified"}`,
      }))
      setOriginalUser((prevUser) => ({
        ...prevUser,
        name: session.data.user.name || prevUser.name,
        username: session.data.user.role ? `(${session.data.user.role})` : prevUser.username,
        email: session.data.user.email || prevUser.email,
        about: `${session.data.user.name || "User"} - ${session.data.user.role || "Role not specified"}`,
      }))
    }
  }, [session.data])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Save logic would go here
    console.log("Profile saved", user)
    setOriginalUser({ ...user }) // Update original data after saving
    setIsEditing(false)
  }

 

  const toggleEdit = () => {
    if (!isEditing) {
      setOriginalUser({ ...user }) // Store current state before editing
    }
    setIsEditing(!isEditing)
  }

  return (
    <div className="min-h-screen  text-white">
      <div className="p-4 ">
        {/* Profile Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="relative">
            <Image
              src="/red-background-profile.png"
              alt="Profile picture"
              width={80}
              height={80}
              className="rounded-full border-2 border-red-600"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold flex items-center gap-2">
              {user.name} <span className="text-gray-400 font-normal text-sm">{user.username}</span>
            </h1>
            <p className="text-sm text-gray-400">{user.location}</p>
            <p className="text-sm text-gray-400 mt-1">{user.bio}</p>
          </div>
          <Button variant="outline" size="sm" className="text-xs" onClick={toggleEdit}>
            {isEditing ? "Cancel Edit" : "Edit Profile"}
          </Button>
        </div>

        {/* Account Settings */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm mb-1">
                Full Name
              </label>
              {isEditing ? (
                <Input
                  id="fullName"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="bg-transparent border-[#C5C5C5]"
                />
              ) : (
                <div className="p-2 border border-[#C5C5C5] rounded-md bg-transparent text-white">{user.name}</div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                Email address
              </label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="bg-transparent border-[#C5C5C5]"
                />
              ) : (
                <div className="p-2 border border-[#C5C5C5] rounded-md bg-transparent text-white">{user.email}</div>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm mb-1">
                Phone Number
              </label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="bg-transparent border-[#C5C5C5]"
                />
              ) : (
                <div className="p-2 border border-[#C5C5C5] rounded-md bg-transparent text-white">{user.phone}</div>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm mb-1">
                Address
              </label>
              {isEditing ? (
                <Input
                  id="address"
                  value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                  className="bg-transparent border-[#C5C5C5]"
                />
              ) : (
                <div className="p-2 border border-[#C5C5C5] rounded-md bg-transparent text-white">{user.address}</div>
              )}
            </div>

            <div>
              <label htmlFor="about" className="block text-sm mb-1">
                About
              </label>
              {isEditing ? (
                <Textarea
                  id="about"
                  value={user.about}
                  onChange={(e) => setUser({ ...user, about: e.target.value })}
                  className="bg-transparent border-[#C5C5C5] min-h-[80px]"
                />
              ) : (
                <div className="p-2 border border-[#C5C5C5] rounded-md bg-transparent text-white min-h-[80px]">
                  {user.about}
                </div>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-start gap-2 mt-4">
                <Button type="submit" className="bg-red-600 hover:bg-red-700 flex items-center gap-1">
                  <Save size={16} /> Save Changes
                </Button>
              </div>
            )}
          </form>
        </div>

        {/* Change Password */}
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm mb-1">
                  Current Password
                </label>
                {isEditing ? (
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter your current password"
                    className="bg-transparent border-[#C5C5C5]"
                  />
                ) : (
                  <div className="p-2 border border-[#C5C5C5] rounded-md bg-transparent text-white">••••••••</div>
                )}
              </div>

              {isEditing && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm mb-1">
                      New Password
                    </label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                      className="bg-transparent border-[#C5C5C5]"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm mb-1">
                      Confirm New Password
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      className="bg-transparent border-[#C5C5C5]"
                    />
                  </div>
                </div>
              )}

              {isEditing && (
                <div className="flex justify-start mt-4">
                  <Button type="button" className="bg-red-600 hover:bg-red-700">
                    Update Password
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
