import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Home, Lock } from "lucide-react"

export default function ForbiddenPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Error Icon */}
                <div className="relative">
                    <div className="w-32 h-32 mx-auto bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                            <Lock className="w-10 h-10 text-red-500" />
                        </div>
                    </div>
                    <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-red-500/5 animate-pulse"></div>
                </div>

                {/* Error Code */}
                <div className="space-y-2">
                    <h1 className="text-6xl font-bold text-red-500">403</h1>
                    <h2 className="text-2xl font-semibold text-white">Access Forbidden</h2>
                </div>

                {/* Error Message */}
                <div className="space-y-4">
                    <p className="text-gray-400 text-lg">You are not authorized to access this page.</p>
                    <p className="text-gray-500 text-sm">
                        This area requires special permissions. If you believe this is an error, please contact your system
                        administrator.
                    </p>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-red-500/80">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm font-medium">SECURITY PROTECTED</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Link href="/" className="block">
                        <Button
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                            size="lg"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Go to Home Page
                        </Button>
                    </Link>

                    <Link href="/auth/login" className="block">
                        <Button
                            variant="outline"
                            className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 py-3 px-6 rounded-lg transition-all duration-200"
                            size="lg"
                        >
                            Sign In
                        </Button>
                    </Link>
                </div>

                {/* Footer */}
                <div className="pt-8 border-t border-gray-800">
                    <p className="text-gray-600 text-xs">Error Code: 403 | Unauthorized Access Attempt</p>
                </div>
            </div>

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/3 rounded-full blur-3xl"></div>
            </div>
        </div>
    )
}
