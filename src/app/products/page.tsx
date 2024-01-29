"use client";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import ProductsBox from "./Products";
import { RevealWrapper } from "next-reveal";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [listItems, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const router = useRouter();



  useEffect(() => {
    if (session.data === null) {
      router.push("/");
      return;
    }
    async function getItemsPerUser() {
      setLoading(true);
      const response = await fetch("/api/items");
      const data = await response.json();
      setItems(data?.items);
      setLoading(false);
    }
    getItemsPerUser();
  }, []);

  return (
    <>
      <Layout>
        <div className="flex justify-around items-center">
          <h1>Products</h1>
          <Link href={"/create"}>Create</Link>
        </div>
        <div>
          <RevealWrapper>
            <ProductsBox items={listItems} />
          </RevealWrapper>
        </div>
      </Layout>
    </>
  );
}
