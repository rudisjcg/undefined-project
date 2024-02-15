"use client";
import { usePathname } from "next/navigation";
import Nav from "./Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = usePathname();
  return (
    <>
      <div className="flex">
        {params === "/login" || params === "/register" ? null : <Nav />}
        <main
          className={`${
            params === "/login" || params === "/register"
              ? "w-full flex flex-col"
              : "p-10 w-full flex flex-col gap-10"
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
}
