import { mongooseConnect } from "@/lib/mongoose";
import Item from "@/models/items";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const connect = await mongooseConnect();
    const rawParams = req.url.split('?')[1];
    console.log(rawParams);


}
