import react from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { BarLoader } from "react-spinners";
import { ReactSortable } from "react-sortablejs";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const CreateProduct = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  console.log(images);
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
                <MenuItem value={"product"}>Product</MenuItem>
                <MenuItem value={"service"}>Service</MenuItem>
                <MenuItem value={"property"}>Property</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">title</label>
            <TextField
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
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <TextField
              id="outlined-multiline-flexible"
              label="Describe your product"
              multiline
              maxRows={4}
              onChange={(ev) => setDescription(ev.target.value)}
            />
          </div>
          <div>
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
          </div>
          <Button variant="contained" type="submit">
            Create
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
