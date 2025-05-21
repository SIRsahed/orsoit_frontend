"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleUser, updateProfile } from "@/lib/api";
import { useSession } from "next-auth/react";

const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Phone number must be at least 6 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  about: z.string().optional(),
  userId: z.string(),
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function AccountSettingsForm() {
  const [profileImage, setProfileImage] = useState<string>(
    "/placeholder.svg?height=200&width=200",
  );


  const [loading, setLoading] = useState(false);

  const session = useSession()

  const userId = String(session?.data?.user?.id)

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const { data: userDetails } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => fetchSingleUser(userId)
  })


  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      about: "",
      userId: userId
    },
  });


  useEffect(() => {
    if (userDetails) {
      profileForm.reset({
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
        email: userDetails.email || "",
        phone: userDetails.phoneNumber || "",
        address: userDetails.address || "",
        about: userDetails.about || "",
        userId: userId
      });
    }
  }, [userDetails, profileForm, userId]);

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    setLoading(true)
    updateProfile(data)
    toast.success("Your profile has been updated successfully.");
    console.log(data);
    setLoading(false)
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    toast.success("Your password has been updated successfully.");
    console.log(data);
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">Account Settings</h1>

      <Form {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit(onProfileSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-8 text-primary md:grid-cols-3">
            <div className="col-span-2 space-y-6">
              <FormField
                control={profileForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-gray-700 bg-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-gray-700 bg-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-gray-700 bg-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(+33)7 75 55 65 33"
                        {...field}
                        className="border-gray-700 bg-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="New York City,USA street 5,home 258/B"
                        {...field}
                        className="border-gray-700 bg-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I am a consulter for a small hotel business. I currently working with team based work."
                        {...field}
                        className="min-h-[100px] border-gray-700 bg-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-red-800 bg-red-700">
                <Image
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile"
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800"
                >
                  Upload Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>

      <Separator className="my-8 bg-gray-700" />

      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
          className="space-y-6"
        >
          <div className="max-w-2xl space-y-6">
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter your current password"
                        type={showCurrentPassword ? "text" : "password"}
                        {...field}
                        className="border-gray-700 bg-black pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your new password"
                          type={showNewPassword ? "text" : "password"}
                          {...field}
                          className="border-gray-700 bg-black pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your confirm new password"
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                          className="border-gray-700 bg-black pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
