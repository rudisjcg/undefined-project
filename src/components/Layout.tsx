"use client";
import Nav from "./Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex">
        <Nav />
        <main className="p-10 w-full flex flex-col gap-20">{children}</main>
      </div>
    </>
  );
}
