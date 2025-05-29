"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DebugSessionPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session Status:", status);
    console.log("Session Data:", session);
  }, [session, status]);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Session Debug</h1>
      <p>Status: {status}</p>
      <pre className="mt-2 rounded bg-gray-100 p-2">
        {JSON.stringify(session, null, 2)}
      </pre>
    </main>
  );
}
