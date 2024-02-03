import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import User from "@/models/user";
import { mongooseConnect } from "@/lib/mongoose";
import Customer from "@/models/customer";

export async function POST(request: Request) {
  await mongooseConnect();
  const {
    firstName,
    lastName,
    email,
    gender,
    phone,
    password,
    verifyPassword,
  } = await request.json();

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !verifyPassword ||
    !gender ||
    !phone
  ) {
    return NextResponse.json(
      { message: "Please fill all fields" },
      { status: 400 }
    );
  }

  try {
    console.log("try to create user");
    // validate email and password
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }
    console.log("does not exist");
    const hashedPassword = await hash(password, 10);

    console.log("creating user");
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      name: firstName + " " + lastName,
      gender: gender,
      email: email,
      phoneNumber: phone.toString(),
      password: hashedPassword,
    });

    if (user) {
      const findUser = await User.findOne({ email });
      if (findUser) {
        await Customer.create({
          user: findUser._id,
        });
      }
    }

    console.log("user and subUser created");
    return NextResponse.json({ message: "User Created", status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Something went wrong", e });
  }
}
