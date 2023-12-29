"use client";
import React, { FormEvent, useState } from "react";

export default function RegisterForm() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/register`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    console.log({ response });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="login_form">
          <div className="flex flex-col gap-2">
            <label>Name</label>
            <input type="name" name="name" id="name" placeholder="example02" />
          </div>
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="myPass..."
            />
          </div>

          <button className="btn_Form" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
