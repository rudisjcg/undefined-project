"use client";
import AccountDetails from "./AccountPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const session = useSession();
  const router = useRouter();

  if (!session?.data?.user) {
    router.push("/");
    return;
  }

  return (
    <>
      <AccountDetails />
    </>
  );
}
