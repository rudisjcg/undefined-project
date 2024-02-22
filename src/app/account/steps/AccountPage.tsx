"use client";
import Input from "@/components/Input";
import Skeletons from "@/components/Skeletons";
import BasicButton from "@/components/UI/ButtonBasic";
import { CheckMark } from "@/components/UI/CheckMark";
import { useLoading } from "@/hooks/useLoading";
import { ResponseData } from "@/interfaces";
import { Button } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AccountDetails = () => {
  const [userData, setUserData] = useState<ResponseData>({});
  const { data: session } = useSession();
  const { isLoading, startLoading, finishLoading } = useLoading();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [emailSend, setEmailSend] = useState(false);

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
    setEmailSend(true);

    const res = await axios.get("/api/auth/verify-account");
    console.log(res);
    //send email to the user for verification
    setTimeout(() => {
      setEmailSend(false);
    }, 5000);
  }
  async function ChangePassword() {
    setEmailSend(true);

    const res = await axios.get("/api/auth/forget-password");
    //send email to the user for verification
    setTimeout(() => {
      setEmailSend(false);
    }, 5000);
  }
  async function DeleteAccount() {}
  async function changeEmail() {}
  async function changeNotImportantData() {}

  return (
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
              <BasicButton onClick={changeEmail}>Change email</BasicButton>
            </div>
            <div className="grid grid-flow-row">
              <label>Delete Account</label>
              <BasicButton onClick={DeleteAccount} color="red">
                Delete Account
              </BasicButton>
            </div>
          </article>
        )}

        {session?.user?.email && emailSend && (
          <>
            <span>Email send to your account for further instructions</span>
          </>
        )}
      </article>
    </article>
  );
};

export default AccountDetails;
