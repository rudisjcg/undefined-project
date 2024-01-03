"use client";
import Layout from "@/components/Layout";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { set } from "mongoose";
import { Items } from "@/models/items";
import ProductsBox from "./Products";
import { RevealWrapper } from "next-reveal";
import axios from "axios";
import { title } from "process";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  border_radius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </>
  );
}

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [listItems, setItems] = useState([]);
  const [images, setImages] = useState<string[]>([]);

  async function getItemsPerUser() {
    // Add your code logic here
    setLoading(true);
    const response = await fetch("/api/items");
    const data = await response.json();
    setItems(data?.items);
    setLoading(false);
  }

  useEffect(() => {
    getItemsPerUser();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose: () => void = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    if (
      !formData.get("title") ||
      !formData.get("price") ||
      !formData.get("description")
    ) {
      return alert("Please fill in all fields");
    }
    const response = await fetch(`/api/createItem`, {
      method: "POST",
      body: JSON.stringify({
        category: formData.get("category"),
        title: formData.get("title"),
        price: formData.get("price"),
        description: formData.get("description"),
      }),
    });

    if (response.ok) {
      setLoading(false);
      setOpen(false);
    }
  };

  async function uploadImages(ev: ChangeEvent<HTMLInputElement>) {
    const files = ev.target?.files;
    const test = ev.target;
    setLoading(true);
    console.log(files, test);

    if (files && files?.length > 0) {
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

  console.log(images);

  return (
    <>
      <Layout>
        <div className="flex justify-around items-center">
          <h1>Products</h1>
          <button onClick={handleOpen}>Create</button>
        </div>
        <div>
          <RevealWrapper>
            <ProductsBox items={listItems} />
          </RevealWrapper>
        </div>
      </Layout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 700 }}>
          <form className="item_form" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <h1>What are you going to sell?</h1>
              <select name="category" id="category">
                <option value="0">Select a category</option>
                <option value="producto">Category 1</option>
                <option value="servicio">Category 2</option>
                <option value="inmueble">Category 3</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">title</label>
              <input type="text" name="title" id="title" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price</label>
              <input type="number" name="price" id="price" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea name="description" id="description"></textarea>
            </div>
            {images.length > 0 && (
              <>
                {images.map((link) => (
                  <picture key={link}>
                    <img src={link} alt="image" />
                  </picture>
                ))}
              </>
            )}
            <div className="relative">
              <input
                onChange={(ev) => uploadImages(ev)}
                className="absolute w-full h-full opacity-0 cursor-pointer"
                id="fileUpload"
                type="file"
              />
              <div className="flex items-center space-x-2 bg-white border border-gray-200 p-2 rounded">
                <ArrowUpRightIcon className="w-4 h-4" />
                <span>Upload File</span>
              </div>
            </div>
            <button type="submit">Create</button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

function ArrowUpRightIcon(props: any) {
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
}
