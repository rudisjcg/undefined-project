import authOptions from "@/app/api/auth/[...nextauth]/option";
import { mongooseConnect } from "@/lib/mongoose";
import Comment from "@/models/comment";
import Item from "@/models/items";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: NextResponse) {

    await mongooseConnect();
    const data = await getServerSession(authOptions);
    const { comment, rating, itemId, images } = await req.json();
    const findItem = await Item.findById(itemId);

    // if (data === null) {
    //     return NextResponse.json({ message: "You are not logged in" });
    // }

    console.log(comment, rating, itemId, images)
    console.log(findItem)



}