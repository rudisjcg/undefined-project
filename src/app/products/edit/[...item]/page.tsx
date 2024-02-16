"use client";
import CreateProduct from "@/components/Create";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState({});
  const pathname = usePathname();
  const id = pathname.replace("/products/edit/", "");
  const { data: session } = useSession();

  useEffect(() => {
    if (!id && !session) {
      return;
    }

    axios
      .post(`/api/items/getItem`, {
        itemId: id,
      })
      .then((res: any) => {
        setProductInfo(res?.data?.item);
      });
  }, [id]);

  return (
    <>
      <span>Edit Product</span>
      {productInfo && <CreateProduct {...productInfo} />}
    </>
  );
}
