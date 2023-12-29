import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import User from "@/models/user";
import { mongooseConnect } from "@/lib/mongoose";

export async function POST(request: Request) {
  await mongooseConnect();
  const { name, email, password } = await request.json();
  console.log({ name, email, password });

  if (!name || !email || !password) {
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
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log("user created");
    return NextResponse.json({ message: "User Created", User });
  } catch (e) {
    return NextResponse.json({ message: "Something went wrong", e });
  }
}
