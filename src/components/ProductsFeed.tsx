import ProductsBox from "@/app/products/Products";

export default function ProductsFeed({ products }: { products: any[] }) {
  console.log(products);
  return (
    <>
      <ProductsBox items={products} />
    </>
  );
}
