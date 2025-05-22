"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import NewsletterSection from "@/components/shared/NewsletterSection";

const HIDDEN_ROUTES = [
  "/ceo",
  "/admin",
  "/sales",
  "/customer-dashboard",
  "/admin",
];

export default function LayoutVisibilityWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const shouldHideLayout = HIDDEN_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <NewsletterSection />}
      {!shouldHideLayout && <Footer />}
    </>
  );
}
