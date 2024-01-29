'use client'
import Layout from "@/components/Layout";
import AccountDetails from "./AccountPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const session = useSession();
  const router = useRouter();

  if (session.data === null) {
    router.push("/");
    return;
  }

  return (
    <Layout>
      <AccountDetails />
    </Layout>
  );
}
