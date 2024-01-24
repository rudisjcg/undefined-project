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

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (response?.error) {
      setIsError(true);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="login_form">
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
          <div className="flex gap-3 justify-center items-center">
            <LoadingButton
              color="primary"
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              type="submit"
            >
              <span>Login</span>
            </LoadingButton>
            {isError && (
              <div className="border p-2 rounded-lg bg-red-500 text-white font-bold">
                <h2>Email or password is wrong</h2>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
