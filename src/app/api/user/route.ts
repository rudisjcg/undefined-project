import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/option";
import User from "@/models/user";

export async function GET() {
    await mongooseConnect();
    const data = await getServerSession(authOptions);
    const { name, email } = data?.user ?? { name: null, email: null };
    console.log(data);

    const response = User.findOne({ email });
    console.log(response);

    try {
        return NextResponse.json({});
    } catch (error) {
        console.log(error);
    }
}
