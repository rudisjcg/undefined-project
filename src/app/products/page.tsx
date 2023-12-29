'use client'
import Layout from "@/components/Layout";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { FormEvent, useEffect, useState } from "react";
import { set } from "mongoose";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    border_radius: '10px',
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

    async function getItemsPerUser() {
        const response = await fetch("/api/items");
        const data = await response.json();
        console.log(data);
    }

    useEffect(() => {
        getItemsPerUser();
    }, [])


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose: () => void = () => {
        setOpen(false);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.currentTarget);
        console.log(formData.get("category"));
        console.log(formData.get("title"));
        console.log(formData.get("price"));
        console.log(formData.get("description"));

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



        setLoading(false)
        setOpen(false)
    }

    return (
        <>
            <Layout>
                <h1>Products</h1>
                <button onClick={handleOpen}>Create</button>

            </Layout>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 700 }}>
                    <form onSubmit={handleSubmit}>
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
                            <textarea name="description" id="description" cols={30} rows={10}></textarea>
                        </div>
                        <button type="submit">Create</button>
                    </form>
                    <ChildModal />
                </Box>
            </Modal>
        </>
    )
}