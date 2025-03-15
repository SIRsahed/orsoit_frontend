import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Image
              src="/orso_logo.png"
              alt="ORSO Solutions"
              className="h-12 w-auto"
              height={100}
              width={100}
            />
            <p className="text-sm text-gray-300">
              At Orso, we are dedicated to protecting your business in the
              ever-evolving digital landscape.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="bg-red-600 p-2 hover:bg-red-700">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="bg-red-600 p-2 hover:bg-red-700">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="bg-red-600 p-2 hover:bg-red-700">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="bg-red-600 p-2 hover:bg-red-700">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-red-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-red-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-red-400">
                  Terms & Condition
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/security" className="hover:text-red-400">
                  Network Security
                </Link>
              </li>
              <li>
                <Link href="/cloud" className="hover:text-red-400">
                  Cloud Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/data" className="hover:text-red-400">
                  Data Security
                </Link>
              </li>
              <li>
                <Link href="/vpn" className="hover:text-red-400">
                  Virtual Private Network
                </Link>
              </li>
              <li>
                <Link href="/testing" className="hover:text-red-400">
                  Penetration Testing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Phone: 006-00000</li>
              <li>Email: example@gmail.com</li>
              <li>
                Address: 13th Street. 47 W 13th St, New York, NY 10011, USA.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          2024 WWW Staging - all rights reserved by orsosolutions
        </div>
      </div>
    </footer>
  );
}
