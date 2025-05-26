/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface TickeDetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    ticketData: {
        _id: string;
        subject: string;
        name: string;
        service: string;
        issueDetails: string
        urgency: string
        file: string
    };
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFileType(fileUrl: any) {
    if (!fileUrl) return "none";

    const extension = fileUrl.split('.').pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
        return "image";
    } else if (extension === "pdf") {
        return "pdf";
    } else {
        return extension; // fallback to showing the extension
    }
}


export function TicketDetailsDialog({
    isOpen,
    onClose,
    ticketData,
}: TickeDetailsDialogProps) {

    
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl border-0 bg-[#1A1A1A] p-0 text-white">
                <DialogHeader>
                    Ticket Details
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
                            <CardTitle className="text-4xl font-bold mb-2">Ticket Details</CardTitle>
                            <CardDescription className="text-[#E6E6E6] max-w-md text-center text-base">
                                Don&apos;t be the next target! Stay ahead with the latest security tips, updates, and expert insights.
                            </CardDescription>
                        </CardHeader>

                        {/* Ticket details */}
                        <CardContent className="relative z-10">
                            <div className="bg-[#000000]/50 rounded-lg p-6">
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <span className="font-bold text-white text-xl pr-2">Subject :</span>
                                        <span className="text-gray-300">{ticketData.subject}</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <span className="font-bold text-white text-xl pr-2">Name:</span>
                                        <span className="text-gray-300">{ticketData.name}</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <span className="font-bold text-white text-xl pr-2">Service:</span>
                                        <span className="text-gray-300">{ticketData.service}</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <span className="font-bold text-white text-xl pr-2">Urgency:</span>
                                        <span className="text-gray-300 capitalize">{ticketData.urgency}</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-start">
                                        <span className="font-bold text-white text-xl pr-2">Issue Details:</span>
                                        <span className="text-gray-300">{ticketData.issueDetails}</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <span className="font-bold text-white text-xl pr-2">Attachments:</span>
                                        <span className="text-gray-300 uppercase">{getFileType(ticketData.file)}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
}
