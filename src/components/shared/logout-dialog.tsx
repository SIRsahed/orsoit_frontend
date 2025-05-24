/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { signOut } from "next-auth/react";



export function LogoutDialog({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl border-0 bg-[#1A1A1A] p-0 text-white">
                <DialogHeader>
                    Log Out
                </DialogHeader>
                <div className="fixed inset-0 bg-[#1A1A1A] flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-2xl px-16 pb-10 bg-[#1A1A1A] border-gray-800 text-white relative overflow-hidden">
                        {/* Close button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 text-gray-400 hover:text-white hover:bg-transparent z-10"
                        >
                            <span className="sr-only">Close</span>
                        </Button>

                        {/* Background circuit pattern */}
                        <div className="absolute w-3/5 right-0 top-14 overflow-hidden pointer-events-none">
                            <Image
                                src="/images/modal_bg.png"
                                alt="Modal background"
                                width={600}
                                height={400}
                                className="object-cover w-full aspect-square" />
                        </div>

                        {/* Logo and header */}
                        <CardHeader className="flex flex-col items-center text-center pt-10 pb-6 relative z-10">
                            <div className="mb-5">
                                <Image
                                    src="/orso_logo.png"
                                    alt="Logo"
                                    width={300}
                                    height={300}
                                    className="w-44 aspect-auto object-cover"
                                />
                            </div>
                            <CardTitle className="text-3xl font-bold mb-2">Are you sure you want to log out?</CardTitle>
                            <CardDescription className="text-[#E6E6E6] max-w-md text-center text-base">
                                <p>Don&apos;t be the next target! Stay ahead with the latest security tips, updates, and expert insights.</p>
                            </CardDescription>
                        </CardHeader>

                        {/* Ticket details */}
                        <CardContent className="relative z-10 space-y-6">
                            <div className="flex flex-col space-y-7">
                                <Button onClick={onClose} className="h-12 text-base font-bold">No</Button>
                                <Button variant="destructive" onClick={() => { onClose(); signOut() }} className="h-12 bg-[#323232] text-base font-bold border-2 border-red-500 border-b-0 hover:bg-[#323232]/60">Yes</Button>
                            </div>
                            <p className="text-center text-base">🔒 Your security is our priority!</p>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
}
