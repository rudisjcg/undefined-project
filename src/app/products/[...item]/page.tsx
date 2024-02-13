"use client";

import Layout from "@/components/Layout";
import { ItemData } from "@/interfaces";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ItemPage() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.replace("/products/item/", "");
  const [itemId, setItemId] = useState(id);
  const [itemData, setItemData] = useState<ItemData | null>(null);

  useEffect(() => {
    if (id === "") {
      return;
    }

    async function getActualItem() {
      const response = await axios.post(`/api/items/getItem`, {
        itemId: itemId,
      });
      if (response.statusText !== "OK") {
        console.error(response.statusText);
        return;
      } else {
        setItemData(response.data);
      }
    }

    getActualItem();
  }, []);

  return (
    <>
      <Layout>
        <span>
          {itemData?.item?.category} - {itemData?.item?.title}
        </span>
        {id}
      </Layout>
    </>
  );
}
