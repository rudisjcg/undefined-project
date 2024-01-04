import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import Item from "@/models/items";
import { getSession } from "next-auth/react";
import { cookies } from "next/headers";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request, res: NextApiResponse, session: any) {
  await mongooseConnect();
  const data = await getServerSession(session);
  const { title, description, price, category, images } = await req.json();
  const cookieStore = cookies();

  console.log({ title, description, price, category, images })

  console.log(data)



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
