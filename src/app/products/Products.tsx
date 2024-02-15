import Product from "@/components/Product";
import { ItemsArray } from "@/interfaces";
import { RevealWrapper } from "next-reveal";
import { usePathname } from "next/navigation";
import { BarLoader } from "react-spinners";
import styled from "styled-components";

const ProductsBoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 40px;
`;

export default function ProductsBox({
  items,
  loading,
}: {
  items: ItemsArray;
  loading: boolean;
}) {
  const params = usePathname();
  return (
    <>
      <ProductsBoxWrapper>
        {loading && <BarLoader />}
        {params === "/products" &&
          items &&
          items?.map((item: any, index: any) => (
            <RevealWrapper delay={index * 100} key={item?._id}>
              <Product item={item} />
            </RevealWrapper>
          ))}

        {params === "/" &&
          items &&
          items?.map((item: any, index: any) => (
            <RevealWrapper delay={index * 100} key={item?._id}>
              <Product item={item} />
            </RevealWrapper>
          ))}
      </ProductsBoxWrapper>
    </>
  );
}
