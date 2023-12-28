import React from "react";

export default function LoginForm() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form className="login_form">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
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
