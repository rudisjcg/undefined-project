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
  const verifyAccountToken = params.get("verifyAccountToken");
  const [token, setToken] = useState(data || undefined);
  const authFetch = useAuthFetch();

  useEffect(() => {
    if (session?.data?.user && session?.data?.user?.email && token) {
      const verifyAccount = async () => {
        await authFetch({
          endpoint: "verify-account",
          redirectRoute: "/account",
          token: token,
        });
      };
      verifyAccount();
    }
    if (
      session?.data?.user &&
      session?.data?.user?.email &&
      verifyAccountToken
    ) {
      const verifyAccount = async () => {
        await authFetch({
          endpoint: "verify-account",
          redirectRoute: "/account",
          token: verifyAccountToken,
        });
        verifyAccount();
      };
    }
  }, [token, verifyAccountToken]);

  console.log(token, verifyAccountToken);

  if (!session?.data?.user) {
    router.push("/");
    return;
  }

  return (
    <>
      {session?.data?.user && session?.data?.user?.email && token ? (
        <VerifyAccount />
      ) : session?.data?.user &&
        session?.data?.user?.email &&
        verifyAccountToken ? (
        <VerifyAccount />
      ) : (
        <AccountDetails />
      )}
    </>
  );
}
