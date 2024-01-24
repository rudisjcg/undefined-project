"use client";
import Layout from "@/components/Layout";
import ProductsFeed from "@/components/ProductsFeed";

export default function Home() {
  return (
    <Layout>
      <h1>Feed</h1>
      <ProductsFeed />
    </Layout>
  );
}
