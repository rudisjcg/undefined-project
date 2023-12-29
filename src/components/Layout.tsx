'use client'
import { useSession } from "next-auth/react";
import Nav from "./Nav";


export default function Layout({ children }: { children: React.ReactNode }) {

    const { data: session, } = useSession();



    return (
        <>
            <div className="flex">
                <Nav />
                <main className="p-10 w-full flex flex-col gap-20">{children}</main>
            </div>
        </>
    )
}