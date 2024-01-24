import React from "react";
import LoginForm from "./LoginForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function loginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session, status);
  if (session) {
    router.push("/");
  }

  return (
    <>
      <LoginForm />
    </>
  );
}
