/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteService } from "@/lib/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";



export function DeleteServiceDialog({
    isOpen,
    onClose,
    serviceId
}: {
    isOpen: boolean;
    onClose: () => void;
    serviceId: string
}) {


    const queryClient = useQueryClient();



    const handleDeleteService = () => {
        deleteService(serviceId).then(() => toast.success("Service deleted successfully")).then(() => queryClient.invalidateQueries({ queryKey: ["services"] })).then(() => onClose());
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl border-0 bg-[#1A1A1A] p-0 text-white">
                <DialogHeader>
                    Delete Service
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
                            <CardTitle className="text-3xl font-bold mb-2">Are you sure you want to delete this service?</CardTitle>
                            <CardDescription className="text-[#E6E6E6] max-w-md text-center text-base">
                                <p>Once you delete this service, it cannot be recovered.</p>
                            </CardDescription>
                        </CardHeader>

                        {/* Ticket details */}
                        <CardContent className="relative z-10 space-y-6">
                            <div className="flex flex-col space-y-7">
                                <Button onClick={onClose} className="h-12 text-base font-bold">No</Button>
                                <Button variant="destructive" onClick={() => { onClose(); handleDeleteService() }} className="h-12 bg-[#323232] text-base font-bold border-2 border-red-500 border-b-0 hover:bg-[#323232]/60">Yes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
}
