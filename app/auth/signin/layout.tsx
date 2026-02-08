"use client";

// React
import * as React from "react";

// NextJs
import { useRouter } from "next/navigation";

// NextAuth
import { useSession } from "next-auth/react";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (session?.user?.email) {
      router.replace("/panel");
    }
  }, [session?.user?.email, router]);

  if (status === "loading" || session?.user?.email) {
    return null;
  }

  return <>{children}</>;
}
