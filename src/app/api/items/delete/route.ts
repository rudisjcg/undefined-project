import { mongooseConnect } from "@/lib/mongoose";
import Item from "@/models/items";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, res: NextResponse) {
    const requestBody = req.nextUrl.searchParams;
    const id = requestBody.get('id');
    try {
        await mongooseConnect();
        const response = await Item.deleteOne({ _id: id });
        if (response) {
            return NextResponse.json({ status: "ok" });
        } else {
            return NextResponse.json({ status: "not found" });
        }
    }
    catch (error) {
        return NextResponse.json({ error });
    }
}