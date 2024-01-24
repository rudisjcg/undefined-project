import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import Item from "@/models/items";
import authOptions from "../auth/[...nextauth]/option";

export async function GET() {
  await mongooseConnect();
  const data = await getServerSession(authOptions);

  try {
    const items = await Item.find({
      email: (data as { user: { email: string } })?.user?.email,
    });
    return NextResponse.json({ items });
  } catch (error) {
    console.log(error);
  }
}