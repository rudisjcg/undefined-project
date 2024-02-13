"use client";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { MuiTelInput } from "mui-tel-input";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const handleChange = (newValue: any) => {
    setPhone(newValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      firstName,
      lastName,
      email,
      password,
      phone,
      gender,
      verifyPassword,
    };
    console.log(data);
    const passwordDontMatch = "Passwords do not match";
    const passwordTooShort = "Password must be at least 8 characters long";
    const emailInvalid = "Email is invalid";
    const emailAlreadyExists = "Email already exists";

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      verifyPassword === ""
    ) {
      setIsError(true);
      setLoading(false);
      setMessage("Please fill in all fields");
      return;
    }

    if (password !== verifyPassword) {
      setIsError(true);
      setLoading(false);
      setMessage(passwordDontMatch);
      return;
    }

    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });



    if (response.ok) {
      setLoading(false);
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
      <div className="flex justify-center items-center h-screen loginFormComponent">
        <form onSubmit={handleSubmit} className="login_form">
          <div className="flex flex-col gap-2 w-full">
            <label>name</label>
            <article className="flex justify-between gap-2">
              <TextField
                onChange={(ev) => setFirstName(ev.target.value)}
                id="outlined-basic"
                label="First name"
                variant="outlined"
                placeholder="diggle"
              />
              <TextField
                onChange={(ev) => setLastName(ev.target.value)}
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                placeholder="jhon"
              />
            </article>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Email</label>
            <article className="flex gap-2 w-full">
              <TextField
                onChange={(ev) => setEmail(ev.target.value)}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                placeholder="example@..."
                className="w-full"
              />

              <FormControl className="w-[200px]">
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Gender"
                  onChange={(ev) => setGender(ev.target.value)}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </article>
          </div>
          <article className="flex flex-col gap-2 w-full">
            <label>Phone Number</label>
            <article className="flex gap-2 w-full">
              <MuiTelInput value={phone} onChange={handleChange} />
            </article>
          </article>
          <article className="flex gap-2">
            <div className="flex flex-col gap-2">
              <label>Password</label>
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
            <div className="flex flex-col gap-2">
              <label>Verify Password</label>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Verify
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(ev) => setVerifyPassword(ev.target.value)}
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
          </article>

          <article className="flex gap-3 justify-center items-center">
            <LoadingButton
              color="primary"
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              type="submit"
            >
              <span>Register</span>
            </LoadingButton>
            <span>
              You have an account?{" "}
              <Link
                className="text-blue-500 underline font-bold"
                href={"/login"}
              >
                click here
              </Link>
            </span>
            {isError && (
              <article className="border p-2 rounded-lg bg-red-500 text-white font-bold">
                <span>{message}</span>
              </article>
            )}
          </article>
        </form>
      </div>
    </>
  );
}
