'use client';
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

export default function NewProduct() {

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

        const data = { title, price, description, category, images }

        const response = await fetch(`/api/items/create`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(response)

        if (response.ok) {
            setLoading(false);
            router.push("/products");
        }
    };

    async function uploadImages(ev: ChangeEvent<HTMLInputElement>) {
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

    return (
        <Layout>
            <h1>New Product</h1>
            <div className="w-full">
                <form className="item_form" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <h1>What are you going to sell?</h1>
                        <select onChange={ev => setCategory(ev.target.value)} name="category" id="category">
                            <option value="0">Select a category</option>
                            <option value="producto">Category 1</option>
                            <option value="servicio">Category 2</option>
                            <option value="inmueble">Category 3</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">title</label>
                        <input onChange={ev => setTitle(ev.target.value)} type="text" name="title" id="title" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="price">Price</label>
                        <input onChange={ev => setPrice(ev.target.value)} type="number" name="price" id="price" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Description</label>
                        <input onChange={ev => setDescription(ev.target.value)} name="description" id="description" />
                    </div>
                    {images.length > 0 && (
                        <>
                            {images.map((link) => (
                                <img className="w-[150px] h-[150px]" src={link} alt="image" />

                            ))}
                        </>
                    )}
                    <div className="relative">
                        <input
                            onChange={uploadImages}
                            ref={inputFileRef}
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
            </div>
        </Layout>
    )
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