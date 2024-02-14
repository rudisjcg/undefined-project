import ProductsBox from "@/app/products/Products";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import SearchItem from "./SearchItem";
import debounce from "lodash/debounce";
import { useLoading } from "@/hooks/useLoading";
import { set } from "lodash";

export default function ProductsFeed() {
  const [products, setProducts] = useState([] || null);
  const [phrase, setPhrase] = useState("");
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);
  const { isLoading, startLoading, finishLoading } = useLoading();

  useEffect(() => {
    if (phrase.length > 0) {
      startLoading();
      debouncedSearch(phrase);
    } else {
      getProducts();
    }
  }, [phrase]);

  async function getProducts() {
    const { data } = await axios.get("/api/items/getItems");
    setProducts(data?.items);
  }
  async function searchProducts(phrase: string) {
    axios
      .get("/api/items/search?phrase=" + encodeURIComponent(phrase))
      .then((res) => {
        setProducts(res.data.items);
        startLoading();
      });
  }

  return (
    <>
      <SearchItem
        values={phrase}
        placeholder="Search for products"
        onChange={(e) => setPhrase(e.target.value)}
      />
      <ProductsBox items={products} />
    </>
  );
}
