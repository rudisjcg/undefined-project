import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import Item from "@/models/items";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req);

  return {
    props: {
      session,
    },
  };
};