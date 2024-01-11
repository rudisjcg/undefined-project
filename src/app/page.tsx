'use client'
import Layout from "@/components/Layout";
import ProductsFeed from "@/components/ProductsFeed";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([] || null);


  async function getProducts() {
    const { data } = await axios.get("/api/items");
    console.log(data);
    setProducts(data?.items);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <h1>Feed</h1>
      <ProductsFeed
        products={products}
      />
    </Layout>
  );
}
