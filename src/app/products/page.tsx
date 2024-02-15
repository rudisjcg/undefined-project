"use client";
import { useEffect, useState } from "react";
import ProductsBox from "./Products";
import { RevealWrapper } from "next-reveal";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";

export default function ProductsPage() {
  const [listItems, setItems] = useState([]);
  const { isLoading, startLoading, finishLoading } = useLoading();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.data === null) {
      router.push("/");
      return;
    }
    async function getItemsPerUser() {
      startLoading();
      const response = await fetch("/api/items");
      const data = await response.json();
      setItems(data?.items);
      finishLoading();
    }
    getItemsPerUser();
  }, []);

  return (
    <>
      <>
        <div className="flex justify-around items-center">
          <h1>Products</h1>
          <Link href={"/create"}>Create</Link>
        </div>
        <div>
          <RevealWrapper>
            <ProductsBox items={listItems} loading={isLoading} />
          </RevealWrapper>
        </div>
      </>
    </>
  );
}
