"use client";
import axios from "axios";
import AccountDetails from "./AccountPage";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verify } from "crypto";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import VerifyAccount from "./steps/VerifyAccount";

export default function AccountPage() {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const data = params.get("token");
  const [token, setToken] = useState(data || undefined);
  const authFetch = useAuthFetch();

  useEffect(() => {
    async function verifyAccount() {
      await authFetch({
        endpoint: "verify-account",
        redirectRoute: "/account",
        token: token,
      });
    }
    if (session?.data?.user && session?.data?.user?.email && token) {
      verifyAccount();
    }
  }, [token]);

  console.log(token);

  if (!session?.data?.user) {
    router.push("/");
    return;
  }

  return (
    <>
      {session?.data?.user && session?.data?.user?.email && token ? (
        <VerifyAccount />
      ) : (
        <AccountDetails />
      )}
    </>
  );
}
