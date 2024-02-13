import { mongooseConnect } from "@/lib/mongoose";
import Item from "@/models/items";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
    const connect = await mongooseConnect();
    const { itemId } = await req.json();

    if (!itemId && !connect) {
        return NextResponse.json({ message: "itemId is required" }, { status: 400 });
    }

    try {
        const item = await Item.findById(itemId);
        return NextResponse.json({ item });
    } catch {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
