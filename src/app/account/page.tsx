"use client";
import AccountDetails from "./AccountPage";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import VerifyAccount from "./steps/VerifyAccount";
import axios from "axios";
import NotificationContext from "@/context/NotificationContext";
import ChangePassword from "./steps/ChangePassword";

export default function AccountPage() {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const data = params.get("token");
  const verifyAccountToken = params.get("verifyAccountToken");
  const [token, setToken] = useState(data || undefined);
  const [verifyToken, setVerifyToken] = useState(
    verifyAccountToken || undefined
  );
  const [accountStep, setAccountStep] = useState("account-info" || "");
  const authFetch = useAuthFetch();
  const { showNotification } = useContext(NotificationContext);
  useEffect(() => {
    if (session?.data?.user && session?.data?.user?.email && verifyToken) {
      const verifyAccount2nd = async () => {
        console.log("2nd verify step");

        const res = await axios.post("/api/auth/verify-token", {
          token: verifyToken,
        });
        console.log(res);
        if (res?.data?.status) {
          params.delete("verifyAccountToken");
          showNotification({
            msj: res?.data?.message,
            open: true,
            status: "success",
          });
        }
      };
      verifyAccount2nd();
    }
  }, [verifyToken]);

  if (!session?.data?.user) {
    router.push("/");
    return;
  }

  return (
    <>
      {session?.data?.user && session?.data?.user?.email && token ? (
        <ChangePassword />
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
