
import { mongooseConnect } from "@/lib/mongoose";
import Item from "@/models/items";
import { NextResponse } from "next/server";

export async function PUT(req: Request, res: NextResponse) {
    await mongooseConnect();
    const { _id, title, price, description, images, category } = await req.json();



    if (_id) {
        const response = await Item.updateOne({ _id }, { title, price, description, category, images });
        if (response) {
            return NextResponse.json({ message: "Item updated successfully", status: "ok" });
        } else {
            return NextResponse.json({ message: "Item not updated", status: "error" });
        }
    }


}
