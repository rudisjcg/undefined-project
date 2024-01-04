"use client";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import ProductsBox from "./Products";
import { RevealWrapper } from "next-reveal";
import Link from "next/link";


export default function ProductsPage() {
  const [listItems, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getItemsPerUser() {
    // Add your code logic here
    setLoading(true);
    const response = await fetch("/api/items");
    const data = await response.json();
    setItems(data?.items);
    setLoading(false);
  }

  useEffect(() => {
    getItemsPerUser();
  }, []);



  return (
    <>
      <Layout>
        <div className="flex justify-around items-center">
          <h1>Products</h1>
          <Link href={'/products/new'}>Create</Link>
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


