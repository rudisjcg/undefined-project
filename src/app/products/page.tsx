"use client";
import { useEffect, useState } from "react";
import ProductsBox from "./Products";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";
import CreateProduct from "@/components/Create";

export default function ProductsPage() {
  const [listItems, setItems] = useState([]);
  const { isLoading, startLoading, finishLoading } = useLoading();
  const [createItem, setCreateItem] = useState(false);
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
          <button onClick={() => setCreateItem(!createItem)}>
            {createItem ? "Cancel" : "Create"}
          </button>
        </div>
        <div>
          <RevealWrapper>
            {createItem ? (
              <CreateProduct />
            ) : (
              <ProductsBox items={listItems} loading={isLoading} />
            )}
          </RevealWrapper>
        </div>
      </>
    </>
  );
}
