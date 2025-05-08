"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAgree = () => {
    setIsLoading(true)
    // Simulate processing
    setTimeout(() => {
      router.push("/auth/register")
    }, 500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-4xl rounded-lg border border-gray-800 bg-black p-8">
        <h1 className="mb-6 text-2xl font-bold text-white">Terms and Conditions</h1>

        <div className="max-h-[60vh] overflow-y-auto rounded-md border border-gray-800 bg-gray-900 p-6 text-gray-300">
          <p className="mb-4">
            These Terms and Conditions govern your use of the website and services provided by ORSO. By accessing or
            using our Services, you agree to comply with and be bound by these Terms. If you do not agree to these
            Terms, you may not access or use our Services.
          </p>

          <ol className="list-decimal space-y-4 pl-6">
            <li>
              <strong>Acceptance of Terms</strong> By using this website and the associated Services, you agree to be
              bound by these Terms and our Privacy Policy, which can be found at [Privacy Policy URL]. If you do not
              agree to these Terms, you must stop using the website and our Services.
            </li>

            <li>
              <strong>Services Provided</strong> We offer cybersecurity services designed to help protect businesses and
              individuals from online threats. These services may include, but are not limited to, network security,
              data encryption, threat detection, vulnerability assessments, and incident response.
            </li>

            <li>
              <strong>User Responsibilities</strong> You agree to:
              <ul className="list-disc pl-6 pt-2">
                <li>
                  Use our Services only for lawful purposes and in accordance with applicable local, state, and
                  international laws.
                </li>
                <li>
                  Not use our Services to engage in activities that might compromise the security of others, including
                  hacking, phishing, or distributing malware.
                </li>
                <li>Provide accurate and up-to-date information when using our Services.</li>
              </ul>
            </li>

            <li>
              <strong>Account Registration</strong> To access certain features of our Services, you may be required to
              create an account. You agree to provide accurate and complete information during registration and to keep
              this information up to date. You are responsible for maintaining the confidentiality of your account
              credentials and for all activities that occur under your account.
            </li>

            <li>
              <strong>Intellectual Property Rights</strong> All content on this website, including text, images, logos,
              designs, and code, is the property of [Your Company Name] or its licensors and is protected by copyright,
              trademark, and other intellectual property laws. You may not copy, distribute, or otherwise use the
              content without prior written consent from [Your Company Name].
            </li>

            <li>
              <strong>Service Availability and Limitations</strong> We strive to provide uninterrupted access to our
              Services. However, we do not guarantee that our Services will be available at all times, and we are not
              responsible for any downtime or technical issues. We reserve the right to suspend or terminate our
              Services at any time for maintenance, upgrades, or other reasons.
            </li>

            <li>
              <strong>Privacy and Data Security</strong> Your use of our Services is subject to our Privacy Policy. We
              take the security of your data seriously and employ reasonable measures to protect it. However, no
              security system is 100% secure, and we cannot guarantee the security of your data while it is transmitted
              over the internet.
            </li>

            <li>
              <strong>Limitation of Liability</strong> To the fullest extent permitted by law, [Your Company Name] shall
              not be liable for any direct, indirect, incidental, special, or consequential damages arising from your
              use of the Services or inability to access or use the Services, even if we have been advised of the
              possibility of such damages.
            </li>

            <li>
              <strong>Indemnity</strong> You agree to indemnify, defend, and hold harmless [Your Company Name], its
              affiliates, officers, employees, and agents from and against any claims, damages, liabilities, costs, and
              expenses (including legal fees) arising from your use of the Services or any violation of these Terms.
            </li>

            <li>
              <strong>Termination</strong> We reserve the right to suspend or terminate your access to our Services at
              any time for any reason, including if you violate these Terms. Upon termination, you must stop using our
              Services and delete any materials or content obtained through the Services.
            </li>

            <li>
              <strong>Changes to Terms</strong> We may update or revise these Terms at any time. We will notify you of
              any material changes by posting an updated version on this page. You are encouraged to review these Terms
              periodically to stay informed of any updates.
            </li>

            <li>
              <strong>Governing Law</strong> These Terms are governed by and construed in accordance with the laws of
              [Your Country or State], without regard to its conflict of law principles. Any disputes arising under
              these Terms shall be subject to the exclusive jurisdiction of the courts located in [Your Jurisdiction].
            </li>

            <li>
              <strong>Contact Information</strong> If you have any questions or concerns about these Terms, please
              contact us at [contact information].
            </li>
          </ol>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleAgree}
            disabled={isLoading}
            className="rounded-md bg-red-600 px-6 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {isLoading ? "Processing..." : "Agree"}
          </Button>
        </div>
      </div>
    </div>
  )
}
