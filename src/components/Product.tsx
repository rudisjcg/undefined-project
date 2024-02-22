import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import BasicButton from "./UI/ButtonBasic";
import Link from "next/link";
import { Box, Button, Modal, Typography } from "@mui/material";
import { modalStyle } from "@/utils";
import axios from "axios";
import NotificationContext from "@/context/NotificationContext";

const ProductT = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  width: 250px;
  max-height: 250px;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  &:hover {
    transform: translateY(-10px);
    filter: drop-shadow(0 0 2px black);
  }
`;

const ImageProduct = styled.img`
  width: 100%;
  height: 150px;
  object-fit: inherit;
  border-end-start-radius: 10px;
  border-end-end-radius: 10px;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default function Product(item: any) {
  const images = item?.item?.images;
  const _id = item?.item?._id;
  const pathname = usePathname();
  const router = useRouter();
  const { showNotification } = useContext(NotificationContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function deleteActualItem() {
    await axios.delete(`/api/items/delete/?id=${_id}`).then((res) => {
      handleClose();

      if (res.data.status === "ok") {
        showNotification({
          msj: "Item deleted successfully",
          open: true,
          status: "success",
        });

        setTimeout(() => {
          {
          }
          router.refresh();
        }, 1000);
      } else {
        showNotification({
          msj: "Error deleting item",
          open: true,
          status: "error",
        });
      }
    });
  }

  return (
    <>
      {pathname === "/products" ? (
        <ProductT>
          <div className="w-full text-center">
            <span className="mb-2">{item?.item?.title}</span>
          </div>
          <ImageWrapper>
            <Link href={`/products/item/${item?.item?._id}`} className="w-full">
              <ImageProduct src={images[0]} alt="image" />
            </Link>
          </ImageWrapper>
          <article className="w-full flex justify-around items-center mt-4">
            <Link
              href={`/products/edit/${item?.item?._id}`}
              className="buttonBassic"
            >
              Edit
            </Link>
            <button onClick={() => handleOpen()} className="buttonBassic">
              Delete
            </button>
          </article>
        </ProductT>
      ) : (
        <Link href={`/products/item/${item?.item?._id}`}>
          <ProductT>
            <div className="w-full text-center">
              <h1 className="mb-2">{item?.item?.title}</h1>
            </div>
            <ImageWrapper>
              <ImageProduct src={images[0]} alt="image" />
            </ImageWrapper>
          </ProductT>
        </Link>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <article className="flex flex-col items-center justify-center">
            <span className="text-lg">
              are you sure you want to delete this item? {item?.item?.title}
            </span>
            <article>
              <Button color="error" onClick={deleteActualItem}>
                Delete
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </article>
          </article>
        </Box>
      </Modal>
    </>
  );
}
