"use client";

import Layout from "@/components/Layout";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ItemPage() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.replace("/products/item/", "");

  useEffect(() => {
    if (id === "") {
      router.push("/products");
    }

    async function getActualItem() {
      const response = await axios.get(`/api/items/${id}`);
      console.log(response);
    }

    getActualItem();
  }, [id]);

  return (
    <>
      <Layout>
        <h1>Item</h1>
        {id}
      </Layout>
    </>
  );
}
