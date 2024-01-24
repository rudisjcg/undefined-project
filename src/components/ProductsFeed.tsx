import ProductsBox from "@/app/products/Products";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductsFeed() {
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
    <>
      <ProductsBox items={products} />
    </>
  );
}
