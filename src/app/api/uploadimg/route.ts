import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export default async function POST(req: Request) {
  await mongooseConnect();

  NextResponse.json({ message: "route works" });
}
