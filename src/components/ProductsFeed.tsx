import ProductsBox from "@/app/products/Products";


export default function ProductsFeed({
    products
}: { products: any[] }) {
    console.log(products)
    return <div>
        {
            products && products.map((product: any, index: any) => (
                <ProductsBox items={products} />
            ))
        }
    </div>;
}