import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextApiResponse } from "next";
import Item from "@/models/items";
import authOptions from "../../auth/[...nextauth]/option";

export async function POST(req: Request, res: NextApiResponse) {
  await mongooseConnect();
  const data = await getServerSession(authOptions);
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
