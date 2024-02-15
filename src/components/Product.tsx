import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import BasicButton from "./UI/ButtonBasic";
import Link from "next/link";

const ProductT = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  width: 250px;
  max-height: 250px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  overflow: hidden;
`;

const ImageProduct = styled.img`
  width: 100%;
  height: 150px;
  object-fit: inherit;
  border-end-start-radius: 10px;
  border-end-end-radius: 10px;
  overflow: hidden;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s ease;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default function Product(item: any) {
  const images = item?.item?.images;
  const pathname = usePathname();
  const router = useRouter();
  const buttonLogic = () => {
    if (pathname === "/products") {
      router.push(`/products/item/${item?.item?._id}`);
    } else {
      openModal();
    }
  };

  function openModal() {
    console.log("open modal");
  }

  const editItem = () => {
    router.push(`/products/edit/${item?.item?._id}`);
  };

  function deleteItem() {}

  return (
    <>
      {pathname === "/products" ? (
        <ProductT>
          <div className="w-full text-center">
            <h1 className="mb-2">{item?.item?.title}</h1>
          </div>
          <ImageWrapper>
            <ImageProduct src={images[0]} alt="image" />
          </ImageWrapper>
          <article className="w-full flex justify-around items-center mt-4">
            <Link
              href={`/products/edit/${item?.item?._id}`}
              className="buttonBassic"
            >
              Edit
            </Link>
            <button onClick={deleteItem} className="buttonBassic">
              Delete
            </button>
          </article>
        </ProductT>
      ) : (
        <button onClick={buttonLogic}>
          <ProductT>
            <div className="w-full text-center">
              <h1 className="mb-2">{item?.item?.title}</h1>
            </div>
            <ImageWrapper>
              <ImageProduct src={images[0]} alt="image" />
            </ImageWrapper>
          </ProductT>
        </button>
      )}
    </>
  );
}
