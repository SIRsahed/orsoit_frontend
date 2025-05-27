"use client";

import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Camera, Save, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { broadcastSessionUpdate } from "@/lib/session-utills";

export default function AccountPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    about: "",
    abator: "", // Using the same field name as in your API
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const fetchUserData = useCallback(async () => {
    if (!session?.user?.id || !session?.user?.accessToken) return;

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${baseUrl}/single/user/${session.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          about: data.about || "",
          abator: data.abator || session.user.image || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [session, setUserData]);

  useEffect(() => {
    if (session?.user) {
      const nameParts = (session.user.name || "").split(" ");
      setUserData({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: session.user.email || "",
        phoneNumber: "",
        address: "",
        about: "",
        abator: session.user.image || "",
      });

      fetchUserData();
    }
  }, [session, fetchUserData]);

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id || !session?.user?.accessToken) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("phoneNumber", userData.phoneNumber);
      formData.append("address", userData.address);
      formData.append("about", userData.about);
      formData.append("userId", session.user.id);

      if (avatarFile) {
        formData.append("abator", avatarFile);
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${baseUrl}/auth/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update profile");
      }

      const data = await response.json();

      // ✅ Safely update only allowed session fields
      await update({
        name: `${userData.firstName} ${userData.lastName}`,
        image: data.abator || session.user.image,
      });

      // ✅ Broadcast session update for syncing across tabs or components
      broadcastSessionUpdate();

      toast.success("Your profile has been updated successfully.");
      setIsEditing(false);
      router.refresh(); // For server components
      window.location.reload(); // Optional: force full sync across client
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id || !session?.user?.accessToken) return;

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${baseUrl}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify({
          userId: session.user.id,
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        }),
      });

      if (response.ok) {
        toast.success("Your password has been updated successfully.");

        setPasswords({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update password",
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setAvatarPreview(null);
      setAvatarFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto p-4">
        {/* Profile Header */}
        <div className="mb-6 rounded-lg bg-zinc-900 p-6">
          <div className="mb-4 flex items-start gap-4">
            <div
              className="relative cursor-pointer"
              onClick={handleAvatarClick}
            >
              <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-red-600">
                <Image
                  src={
                    avatarPreview ||
                    userData.abator ||
                    "/placeholder.svg?height=80&width=80&query=user" ||
                    "/placeholder.svg" ||
                    "/placeholder.svg" ||
                    "/placeholder.svg" ||
                    "/placeholder.svg"
                  }
                  alt="Profile picture"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="flex-1">
              <h1 className="flex items-center gap-2 text-xl font-bold">
                {userData.firstName} {userData.lastName}
                <span className="text-sm font-normal text-gray-400">
                  ({session?.user?.role || "User"})
                </span>
              </h1>
              <p className="text-sm text-gray-400">
                {userData.address || "No address specified"}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                {userData.about || "No bio available"}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-red-600 text-xs text-red-600 hover:bg-red-900 hover:text-white"
              onClick={toggleEdit}
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="mb-6 rounded-lg bg-zinc-900 p-6">
          <h2 className="mb-6 border-b border-zinc-800 pb-2 text-xl font-semibold">
            Account Settings
          </h2>
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Label
                  htmlFor="firstName"
                  className="mb-1 text-sm text-gray-300"
                >
                  First Name
                </Label>
                {isEditing ? (
                  <Input
                    id="firstName"
                    value={userData.firstName}
                    onChange={(e) =>
                      setUserData({ ...userData, firstName: e.target.value })
                    }
                    className="border-zinc-700 bg-zinc-800 text-white"
                  />
                ) : (
                  <div className="rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white">
                    {userData.firstName}
                  </div>
                )}
              </div>

              <div>
                <Label
                  htmlFor="lastName"
                  className="mb-1 text-sm text-gray-300"
                >
                  Last Name
                </Label>
                {isEditing ? (
                  <Input
                    id="lastName"
                    value={userData.lastName}
                    onChange={(e) =>
                      setUserData({ ...userData, lastName: e.target.value })
                    }
                    className="border-zinc-700 bg-zinc-800 text-white"
                  />
                ) : (
                  <div className="rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white">
                    {userData.lastName}
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="mb-1 text-sm text-gray-300">
                Email address
              </Label>
              <div className="rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white">
                {userData.email}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Email cannot be changed
              </p>
            </div>

            <div>
              <Label
                htmlFor="phoneNumber"
                className="mb-1 text-sm text-gray-300"
              >
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={(e) =>
                    setUserData({ ...userData, phoneNumber: e.target.value })
                  }
                  className="border-zinc-700 bg-zinc-800 text-white"
                />
              ) : (
                <div className="rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white">
                  {userData.phoneNumber || "Not specified"}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="address" className="mb-1 text-sm text-gray-300">
                Address
              </Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={userData.address}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                  className="border-zinc-700 bg-zinc-800 text-white"
                />
              ) : (
                <div className="rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white">
                  {userData.address || "Not specified"}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="about" className="mb-1 text-sm text-gray-300">
                About
              </Label>
              {isEditing ? (
                <Textarea
                  id="about"
                  value={userData.about}
                  onChange={(e) =>
                    setUserData({ ...userData, about: e.target.value })
                  }
                  className="min-h-[100px] border-zinc-700 bg-zinc-800 text-white"
                />
              ) : (
                <div className="min-h-[100px] rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white">
                  {userData.about || "No information provided"}
                </div>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-start">
                <Button
                  type="submit"
                  className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-700"
                  disabled={loading}
                >
                  <Save size={16} />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </form>
        </div>

        {/* Change Password */}
        <div className="rounded-lg bg-zinc-900 p-6">
          <h2 className="mb-6 border-b border-zinc-800 pb-2 text-xl font-semibold">
            Change Password
          </h2>
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div>
              <Label
                htmlFor="oldPassword"
                className="mb-1 text-sm text-gray-300"
              >
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showPassword.current ? "text" : "password"}
                  value={passwords.oldPassword}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      oldPassword: e.target.value,
                    })
                  }
                  className="border-zinc-700 bg-zinc-800 pr-10 text-white"
                  placeholder="Enter your current password"
                  disabled={!isEditing}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-400"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      current: !showPassword.current,
                    })
                  }
                  tabIndex={-1}
                >
                  {showPassword.current ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {isEditing && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label
                    htmlFor="newPassword"
                    className="mb-1 text-sm text-gray-300"
                  >
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword.new ? "text" : "password"}
                      value={passwords.newPassword}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          newPassword: e.target.value,
                        })
                      }
                      className="border-zinc-700 bg-zinc-800 pr-10 text-white"
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-400"
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          new: !showPassword.new,
                        })
                      }
                      tabIndex={-1}
                    >
                      {showPassword.new ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="mb-1 text-sm text-gray-300"
                  >
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPassword.confirm ? "text" : "password"}
                      value={passwords.confirmPassword}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="border-zinc-700 bg-zinc-800 pr-10 text-white"
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-400"
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          confirm: !showPassword.confirm,
                        })
                      }
                      tabIndex={-1}
                    >
                      {showPassword.confirm ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="flex justify-start">
                <Button
                  type="submit"
                  className="bg-red-600 text-white hover:bg-red-700"
                  disabled={
                    loading ||
                    !passwords.oldPassword ||
                    !passwords.newPassword ||
                    !passwords.confirmPassword
                  }
                >
                  Update Password
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
