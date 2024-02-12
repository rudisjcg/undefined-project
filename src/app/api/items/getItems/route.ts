import { mongooseConnect } from "@/lib/mongoose";
import Item from "@/models/items";
import { NextResponse } from "next/server";

export async function GET() {
  await mongooseConnect();

  try {
    const items = await Item.find({});
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
