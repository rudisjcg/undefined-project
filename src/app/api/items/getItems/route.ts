import { mongooseConnect } from "@/lib/mongoose";
import Item from "@/models/items";
import { NextResponse } from "next/server";

export async function GET() {
  await mongooseConnect();

  try {
    const items = await Item.find({});
    console.log(items);
    return NextResponse.json({ items });
  } catch (error) {
    console.log(error);
  }
}
