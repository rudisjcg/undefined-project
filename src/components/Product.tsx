import { useState } from "react";
import styled from "styled-components";

const ProductT = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 750px;
  max-height: 250px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ImageProduct = styled.img`
  width: 250px;
  height: 250px;
  object-fit: fill;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Product(item: any) {
  const [images, setImages] = useState("");

  console.log(item);

  function prevImages() {}
  function nextImages() {
    console.log("next");
    const images = item?.item?.images;

    console.log(images);
  }
  nextImages();

  return (
    <>
      <ProductT>
        <div className="w-full">
          <h1>{item?.item?.title}</h1>
          <p>{item?.item?.description} </p>
          <div>
            <button>Comments</button>
            <button>Likes</button>
            <button>Add to cart</button>
          </div>
        </div>
        <div>
          <ImageWrapper>
            {item?.item?.images?.map((image: any) => (
              <ImageProduct src={image} alt="image" />
            ))}
          </ImageWrapper>
        </div>
      </ProductT>
    </>
  );
}
