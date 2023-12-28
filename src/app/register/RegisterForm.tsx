"use client";
import axios from "axios";
import React, { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userRegister = { name, email, password };

    if (!name || !email || !password) return alert("Please fill all fields");

    console.log(userRegister);
    try {
      const response = await axios.post("/api/register", {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={registerUser} className="login_form">
          <div className="flex flex-col gap-2">
            <label>Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="name"
              name="name"
              id="name"
              placeholder="example02"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="example@..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="myPass..."
            />
          </div>

          <button className="btn_Form" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
