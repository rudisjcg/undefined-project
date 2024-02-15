"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AiFillMessage,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineInbox,
} from "react-icons/ai";

export default function Nav() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const logout: () => void = () => {
    signOut();
    router.push("/");
  };
  return (
    <>
      <aside className="sticky top-0 h-screen w-56 bg-gray-100 text-gray-800 p-4 flex flex-col justify-between">
        <Link href={"/"} className="flex items-center mb-4 space-x-1">
          <img
            className="w-8 h-8 rounded-full"
            src="https://dynamoweb.s3.amazonaws.com/1704313256807.jpeg"
            alt="logo"
          />
          <span className="text-lg font-medium">Dynamite</span>
        </Link>
        <nav className="space-y-2">
          <Link
            href={"/"}
            className={`NavLinks ${
              pathname === "/" ? "bg-gray-400 text-white" : ""
            }`}
          >
            <AiOutlineHome />
            <span className="text-sm font-medium">Home</span>
          </Link>
          {session && (
            <>
              <Link
                href={"/chats"}
                className={`NavLinks ${
                  pathname === "/chats" ? "bg-gray-400 text-white" : ""
                }`}
              >
                <AiFillMessage className="w-4 h-4" />
                <span className="text-sm font-medium">Messages</span>
              </Link>

              <Link
                href={"/account"}
                className={`NavLinks ${
                  pathname === "/account" ? "bg-gray-400 text-white" : ""
                }`}
              >
                <AiOutlineUser className="w-4 h-4" />
                <span className="text-sm font-medium">Account</span>
              </Link>
            </>
          )}
          <Link
            href={"/products"}
            className={`NavLinks ${
              pathname === "/products" ? "bg-gray-400 text-white" : ""
            }`}
          >
            <AiOutlineInbox className="w-4 h-4" />
            <span className="text-sm font-medium">Products</span>
          </Link>
        </nav>
        <div>
          {session ? (
            <button
              onClick={logout}
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <span className="text-sm font-medium">Logout</span>
            </button>
          ) : (
            <Link
              href={"/login"}
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <span className="text-sm font-medium">Login</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
