import ProductsBox from "@/app/products/Products";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import SearchItem from "./SearchItem";
import debounce from "lodash/debounce";
import { useLoading } from "@/hooks/useLoading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductsFeed({ name }: { name: string }) {
  const [products, setProducts] = useState([] || null);
  const [phrase, setPhrase] = useState("");
  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);
  const { isLoading, startLoading, finishLoading } = useLoading();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (phrase.length > 5) {
      debouncedSearch(phrase);
    } else {
      getProducts();
    }
  }, [phrase]);

  async function getProducts() {
    startLoading();
    const { data } = await axios.get("/api/items/getItems");
    setProducts(data?.items);
    finishLoading();
  }

  function handleKeyDown(e: any) {
    console.log(e.target.value);
    if (e.key === "Enter" && phrase.length > 0) {
      debouncedSearch(e.target.value);
    }
  }

  function handleSearch(term: string) {
    startLoading();
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("phrase", term);
    } else {
      params.delete("phrase");
    }

    replace(`${pathname}?${params.toString()}`);
    searchProducts(term);
  }

  async function searchProducts(phrase: string) {
    axios
      .get("/api/items/search?phrase=" + encodeURIComponent(phrase))
      .then((res) => {
        setProducts(res.data);
        finishLoading();
        console.log("Termino loading handleSearch");
      });
  }

  return (
    <>
      <article className="flex gap-20 justify-center items-center">
        <span className="text-lg font-bold">{name}</span>
        <SearchItem
          values={phrase}
          placeholder="Search for products"
          onChange={(e) => setPhrase(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </article>
      <ProductsBox items={products} loading={isLoading} />
    </>
  );
}
