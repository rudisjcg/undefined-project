"use client";
import React, { useEffect, useState } from "react";

const AccountDetails = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function getUserData() {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUserData(data);
    }
    getUserData();
  }, []);

  return (
    <article>
      <h2>Account Details</h2>
      <article></article>
    </article>
  );
};

export default AccountDetails;
