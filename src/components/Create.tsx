import react, { useEffect } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { BarLoader } from "react-spinners";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { EditProductsProps } from "@/interfaces";

const CreateProduct = ({
  title: existingTitle,
  price: existingPrice,
  description: existingDescription,
  category: existingCategory,
  images: existingImages,
  ...existingData
}: EditProductsProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(existingPrice || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [images, setImages] = useState<string[]>(existingImages || []);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/").pop();
  console.log(id);

  useEffect(() => {
    if (id && existingData) {
      setTitle(existingTitle);
      setPrice(existingPrice);
      setDescription(existingDescription);
      setCategory(existingCategory);
      setImages(existingImages);
    }
  }, [
    existingTitle,
    existingPrice,
    existingDescription,
    existingCategory,
    existingImages,
  ]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      title,
      price,
      description,
      category,
      images,
    };

    console.log(data);

    if (id && existingData) {
      const response = await axios.put(`/api/items/update`, { ...data, id });
      if (response.data.status === "ok") {
        setLoading(false);
        router.push("/products");
      } else {
        setLoading(false);
        console.error("Error updating item");
      }
    } else {
      const response = await fetch(`/api/items/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        setLoading(false);
        router.push("/products");
      }
    }
  };

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

  function updateImagesOrder(images: any) {
    setImages(images);
  }

  return (
    <>
      <div className="w-full">
        <form className="item_form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <h1>What are you going to sell?</h1>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="product"
                onChange={(ev) => setCategory(ev.target.value)}
              >
                <MenuItem value={"producto"}>Product</MenuItem>
                <MenuItem value={"servicio"}>Service</MenuItem>
                <MenuItem value={"inmueble"}>Property</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">title</label>
            <TextField
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              id="outlined-basic"
              label="name"
              variant="outlined"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Price</label>
            <TextField
              onChange={(ev) => setPrice(ev.target.value)}
              id="outlined-basic"
              label="price"
              variant="outlined"
              value={price}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <TextField
              id="outlined-multiline-flexible"
              label="Describe your product"
              multiline
              value={description}
              rows={5}
              onChange={(ev) => setDescription(ev.target.value)}
            />
          </div>
          <div>
            {images && !!images?.length && (
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
          </div>
          <Button variant="contained" type="submit">
            {id && existingData ? "Update" : "Create"}
          </Button>
        </form>
      </div>
    </>
  );
};

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

export default CreateProduct;
