import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import Item from "@/models/items";
import { authOptions } from "./../auth/[...nextauth]/route";

export async function GET(session: any) {
  await mongooseConnect();
  const data = await getServerSession(session);

  try {
    const items = await Item.find({
      email: (data as { user: { email: string } })?.user?.email,
    });
    return NextResponse.json({ items });
  } catch (error) {
    console.log(error);
  }
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await getServerSession(
        context.req,
        context.res,
        authOptions
      ),
    },
  }
}
