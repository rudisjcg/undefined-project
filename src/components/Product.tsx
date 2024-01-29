import styled from "styled-components";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ImageProduct = styled.img`
  width: 100%;
  height: 150px;
  object-fit: inherit;
  border-end-start-radius: 10px;
  border-end-end-radius: 10px;
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

  const [modal, setModal] = useState(false);
  console.log(pathname)

  //href={`/product/item/${item?.item?._id}`}

  const buttonLogic = () => {

    if (pathname === '/products') {
      router.push(`/product/item/${item?.item?._id}`)
    } else {
      openModal()
    }

    // router.push(`/product/item/${item?.item?._id}`)
  }

  function openModal() {
    setModal(true)
    console.log('open modal')
  }

  return (
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
  );
}
