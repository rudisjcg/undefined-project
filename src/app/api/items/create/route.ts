import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { GetServerSideProps, NextApiResponse } from "next";
import Item from "@/models/items";
import { cookies } from "next/headers";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request, res: NextApiResponse, session: any) {
  await mongooseConnect();
  const data = await getServerSession(session);
  const { title, description, price, category, images } = await req.json();

  try {
    await Item.create({
      email: (data as { user: { email: string } })?.user?.email,
      title,
      price,
      description,
      category,
      images,
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: "item Created", Item });
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req);

  return {
    props: {
      session,
    },
  };
};