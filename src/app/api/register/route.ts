import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import User from '@/models/user';
import { mongooseConnect } from "@/lib/mongoose"

export async function POST(request: Request) {
  await mongooseConnect();
  const { name, email, password } = await request.json();
  console.log({ name, email, password });

  try {
    // validate email and password
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);


    await User.create({
      name,
      email,
      password: hashedPassword,
    })

  } catch (e) {
    return NextResponse.json({ message: 'Something went wrong', e });
  }

  return NextResponse.json({ message: 'User Created' });
}