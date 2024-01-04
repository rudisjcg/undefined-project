import Product from "@/components/UI/Product";
import { RevealWrapper } from "next-reveal";
import styled from "styled-components";

const ProductsBoxWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    width: 100%;
    height: 100%;
    gap: 40px;
`;

export default function ProductsBox({ items }: { items: any }) {

    console.log(items)
    return (
        <>
            <ProductsBoxWrapper>
                {
                    items && items.map((item: any, index: any) => (
                        <RevealWrapper delay={index * 100} key={item?._id}>
                            <Product item={item} />
                        </RevealWrapper>
                    ))
                }
            </ProductsBoxWrapper>
        </>
    )
}