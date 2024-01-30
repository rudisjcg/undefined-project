"use client";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { Form } from "@/components/Form";
import { useLoading } from "@/hooks/useLoading";
import { useAuthFetch } from "@/hooks/useAuthFetch";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const { finishLoading, isLoading, startLoading } = useLoading();
  const authFetch = useAuthFetch();

  const register = async (formData: any) => {
    console.log(formData);
    startLoading();
    await authFetch({
      endpoint: "login",
      redirectRoute: "/",
      formData,
    });
    finishLoading();
  };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const response = await signIn("credentials", {
  //     email: email,
  //     password: password,
  //     redirect: false,
  //   });

  //   if (response?.error) {
  //     setIsError(true);
  //     setLoading(false);
  //   } else {
  //     router.push("/");
  //     router.refresh();
  //   }
  // };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen loginFormComponent">
        {/* <form onSubmit={handleSubmit} className="login_form">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email">Email</label>
            <TextField
              onChange={(ev) => setEmail(ev.target.value)}
              id="outlined-basic"
              label="email"
              variant="outlined"
              placeholder="example@..."
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password">Password</label>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(ev) => setPassword(ev.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <article className="flex flex-col gap-3 justify-center items-center w-full">
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              type="submit"
              className=" text-white w-full"
            >
              <span>Login</span>
            </LoadingButton>
            <span>
              You haven't created an account?{" "}
              <Link
                className="text-blue-500 underline font-bold"
                href={"/register"}
              >
                click here
              </Link>
            </span>
            {isError && (
              <article className="border p-2 rounded-lg bg-red-500 text-white font-bold">
                <h2>Email or password is wrong</h2>
              </article>
            )}
          </article>
          <div className="w-full border-gray-400 border" />
          <div className="w-full flex flex-col gap-2 items-center">
            <button className="button_login">
              <FacebookIcon className="h-5 w-5 mr-2" />
              Sign in with Facebook
            </button>
            <button className="button_login">
              <ComputerIcon className="h-5 w-5 mr-2" />
              Sign in with Microsoft
            </button>
            <button className="button_login">
              <ChromeIcon className="h-5 w-5 mr-2" />
              Sign in with Google
            </button>
          </div>
        </form> */}

        <Form
          title="Login"
          onSubmit={register}
          description="Create your account"
        >
          <p className="promo">Promo code?</p>
          <p className="promo1">Promo code?</p>
          <p className="promo2">Promo code?</p>
          <div className="my-[10px] flex flex-col gap-4 w-full">
            <Form.Input
              label="Correo"
              name="email"
              placeholder="Ingresa tu correo..."
            />
            <Form.Input
              placeholder="Ingresa tu contraseña..."
              label="Contraseña"
              name="password"
              type="password"
            />
            <Form.Input
              placeholder="Repite tu contraseña..."
              label="Contraseña"
              name="confirmPassword"
              type="password"
            />
          </div>
          <Form.SubmitButton buttonText="Crear cuenta" isLoading={isLoading} />
        </Form>
      </div>
    </>
  );
}

function ChromeIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function ComputerIcon(props: any) {
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
      <rect width="14" height="8" x="5" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h2" />
      <path d="M12 18h6" />
    </svg>
  );
}

function FacebookIcon(props: any) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
