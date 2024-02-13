"use client";

import Layout from "@/components/Layout";
import { ItemData } from "@/interfaces";
import { Checkbox, Input, Rating, TextField } from "@mui/material";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BarLoader } from "react-spinners";

export default function ItemPage() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.replace("/products/item/", "");
  const [itemId, setItemId] = useState(id);
  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [rating, setRating] = useState<number | null>(5);
  const [comment, setComment] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (id === "") {
      return;
    }

    async function getActualItem() {
      const response = await axios.post(`/api/items/getItem`, {
        itemId: itemId,
      });
      if (response.statusText !== "OK") {
        console.error(response.statusText);
        return;
      } else {
        setItemData(response.data);
      }
    }

    getActualItem();
  }, []);

  async function uploadImages(ev: ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const files = inputFileRef.current?.files;
    if (files) {
      const data = new FormData();
      for (const file of Array.from(files)) {
        data.append("file", file);
      }

      try {
        const response = await axios.post("/api/uploadimg", data);
        setImages((oldImages) => {
          return [...oldImages, ...response.data.links];
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error uploading files:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  async function submitComment(ev: any) {
    ev.preventDefault();
    const data = {
      rating,
      comment,
      images,
      itemId,
    };
    const response = await axios.post(`/api/items/comment/create`, data);
    console.log(response);
    setLoading(false);
  }

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-10">
          <div className="flex justify-between border-b-2">
            <label>
              {itemData?.item?.category} - {itemData?.item?.title}
            </label>
            <label>$24.99</label>
          </div>
          <div>
            {itemData?.item?.images.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image}
                  alt={`Image of ${itemData?.item?.title}`}
                  className="w-[200px] h-[200px] object-cover"
                />
              );
            })}
          </div>

          <form onSubmit={submitComment}>
            <Rating
              name="simple-controlled"
              value={rating}
              precision={0.5}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            {!!images.length && (
              <div className="flex gap-4 flex-wrap">
                {images.map((link) => (
                  <div key={link}>
                    <img className="img_form" src={link} alt="image" />
                  </div>
                ))}
              </div>
            )}
            {loading && <BarLoader color="#36d7b7" />}
            <div className="relative">
              <input
                onChange={uploadImages}
                ref={inputFileRef}
                className="absolute w-full h-full opacity-0 cursor-pointer"
                id="fileUpload"
                type="file"
              />
              <div className="flex items-center w-[150px] space-x-2 bg-white border border-gray-200 p-2 mt-2 rounded">
                <ArrowUpRightIcon className="w-4 h-4" />
                <span>Upload File</span>
              </div>
            </div>
            <TextField
              id="outlined-multiline-flexible"
              label="Multiline"
              multiline
              rows={4}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </Layout>
    </>
  );
}

const ArrowUpRightIcon = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
};
