"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sessionState, setSessionState] = useState<any>(null);

  // Listen for session update events
  useEffect(() => {
    // Function to handle session update events
    const handleSessionUpdate = (event: CustomEvent) => {
      setSessionState(event.detail.session);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener("session-update" as any, handleSessionUpdate);

    // Clean up event listener
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.removeEventListener("session-update" as any, handleSessionUpdate);
    };
  }, []);

  return <SessionProvider session={sessionState}>{children}</SessionProvider>;
}
