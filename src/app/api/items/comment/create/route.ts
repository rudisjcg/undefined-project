import authOptions from "@/app/api/auth/[...nextauth]/option";
import { mongooseConnect } from "@/lib/mongoose";
import Comment from "@/models/comment";
import Item from "@/models/items";
import { ratingItemByComments } from "@/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: NextResponse) {

    await mongooseConnect();
    const data = await getServerSession(authOptions);
    const { comment, rating, itemId, images } = await req.json();

    if (!data) {
        return NextResponse.json({ message: "You are not logged in" });
    }

    try {
        const commentToSave = await Comment.create({
            comment,
            rating,
            itemId,
            images,
        });




        const itemFoundToAddComment = await Item.findOneAndUpdate({
            _id: itemId
        }, {
            $push: {
                comments: commentToSave._id
            }
        });

        console.log(itemFoundToAddComment._doc)
        return NextResponse.json({ message: "Comment created", success: true });
    } catch {
        return NextResponse.json({ message: "You are not logged in", success: false });
    }



}