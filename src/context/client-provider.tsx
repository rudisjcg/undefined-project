"use client";

import { SessionProvider } from "next-auth/react";

export default function SessionAccProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
