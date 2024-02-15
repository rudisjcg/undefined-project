import Product from "@/components/Product";
import { ItemsArray } from "@/interfaces";
import { RevealWrapper } from "next-reveal";
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
  return (
    <>
      <ProductsBoxWrapper>
        {loading ? (
          <BarLoader />
        ) : (
          items &&
          items?.map((item: any, index: any) => (
            <RevealWrapper delay={index * 100} key={item?._id}>
              <Product item={item} />
            </RevealWrapper>
          ))
        )}
      </ProductsBoxWrapper>
    </>
  );
}
