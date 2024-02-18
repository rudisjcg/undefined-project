import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/option";
import User from "@/models/user";
import { ResponseData } from "@/interfaces";
import Item from "@/models/items";
import Comment from "@/models/comment";

export async function GET() {
    await mongooseConnect();
    const data = await getServerSession(authOptions);
    const { name, email } = data?.user ?? { name: null, email: null };
    if (!data?.user) {
        return NextResponse.redirect("/api/auth/signin");
    }
    
    
    try {
        let userData: ResponseData = {
                name: null,
                email: null,
                role: null,
                id: null,
                avatar: null,
                phoneNumber: null,
                verified: null,
                postCreated: null,
                comments: null
        }
        const response = await User.findOne({ email });
        const items = await Item.find({ email });
        const comments = await Comment.find({  email });
        userData = {
            name: response?.name,
            email: response?.email,
            role: response?.role,
            id: response?._id,
            avatar: response?.avatar,
            phoneNumber: response?.phoneNumber,
            verified: response?.verified,
            postCreated: items?.length,
            comments: comments?.length
        };
        return NextResponse.json(userData);
    } catch (error) {
        return NextResponse.json(error);
    }
}
