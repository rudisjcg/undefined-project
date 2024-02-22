"use client";
import Input from "@/components/Input";
import Skeletons from "@/components/Skeletons";
import BasicButton from "@/components/UI/ButtonBasic";
import { CheckMark } from "@/components/UI/CheckMark";
import NotificationContext from "@/context/NotificationContext";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { ResponseData } from "@/interfaces";
import { modalStyle } from "@/utils";
import { Box, Button, Modal } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const AccountDetails = () => {
  const [userData, setUserData] = useState<ResponseData>({});
  const { data: session } = useSession();
  const { isLoading, startLoading, finishLoading } = useLoading();
  const router = useRouter();
  const { showNotification } = useContext(NotificationContext);
  const authFetch = useAuthFetch();
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
  const handleOpen = () => setOpenDeleteAccountModal(true);
  const handleClose = () => setOpenDeleteAccountModal(false);

  useEffect(() => {
    if (!session) {
      router.push("/");
      return;
    }

    async function getUserData() {
      startLoading();
      const res = await axios.get("/api/user");
      setUserData(res?.data);
      setTimeout(() => {
        finishLoading();
      }, 2000);
    }
    getUserData();
  }, []);

  //functionalities that have to be develop
  async function VerifiedAccount() {
    const response = await authFetch({
      endpoint: "verify-account",
    });
    showNotification({
      msj: response?.data?.message,
      open: true,
      status: "success",
    });
  }
  async function ChangePassword() {
    const response = await authFetch({
      endpoint: "forget-password",
    });
    showNotification({
      msj: response?.data?.message,
      open: true,
      status: "success",
    });
  }
  function DeleteAccount() {
    setOpenDeleteAccountModal(true);
  }
  async function changeEmail() {
    const response = await authFetch({
      endpoint: "change-email",
    });
    showNotification({
      msj: response?.data?.message,
      open: true,
      status: "success",
    });
  }
  async function changeNotImportantData() {}

  return (
    <>
      <article className="w-full">
        <article className="flex justify-center items-center gap-4 ">
          {isLoading ? (
            <Skeletons type={"account-header"} />
          ) : (
            <>
              <span className="font-bold text-2xl">Account Details </span>
              {userData?.verified ? (
                <span className="text-green-500">
                  <CheckMark size="25px" color="green" />
                </span>
              ) : (
                <>
                  <span className="text-red-500">
                    Your account is not verified
                  </span>
                  <BasicButton onClick={VerifiedAccount}>verify</BasicButton>
                </>
              )}
            </>
          )}
        </article>
        <article className="flex flex-col gap-4 justify-center w-full">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-10 mt-20">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                <Skeletons key={index} type="account" />
              ))}
            </div>
          ) : (
            <article className="grid grid-cols-2 gap-10 mt-20">
              <div>
                <label>Name:</label>
                <Input type="text" value={userData?.name} disabled />
              </div>
              <div>
                <label>Email:</label>
                <Input type="text" value={userData?.email} disabled />
              </div>
              <div>
                <label>Phone Number:</label>
                <Input type="text" value={userData?.phoneNumber} disabled />
              </div>
              <div>
                <label>Role:</label>
                <Input type="text" value={userData?.role} disabled />
              </div>
              <div>
                <label>Verified: </label>
                <Input type="text" value={userData?.verified} disabled />
              </div>
              <div className="grid grid-flow-row">
                <label>Password</label>
                <BasicButton onClick={ChangePassword}>
                  Change Password
                </BasicButton>
              </div>
              <div className="grid grid-flow-row">
                <label>Change Email</label>
                <BasicButton onClick={changeEmail} disabled>
                  Change email
                </BasicButton>
              </div>
              <div className="grid grid-flow-row">
                <label>Delete Account</label>
                <BasicButton onClick={handleOpen} color="red">
                  Delete Account
                </BasicButton>
              </div>
            </article>
          )}
        </article>
      </article>
      <Modal
        open={openDeleteAccountModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <article className="flex flex-col items-center justify-center">
            <span className="text-lg">
              are you sure you want to delete your account?
            </span>
            <article>
              <Button color="error" onClick={DeleteAccount}>
                Delete
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </article>
          </article>
        </Box>
      </Modal>
    </>
  );
};

export default AccountDetails;
