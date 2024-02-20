import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../[...nextauth]/option";
import User from "@/models/user";
import jwt from "jsonwebtoken";


export async function POST(request: NextRequest, response: NextResponse) {

    const user = await getServerSession(authOptions);

    const data = await request.json();
    const { token } = data;

    const userFind = await User.findOne({ email: user?.user?.email });
    if (!userFind) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const tokenVerify = jwt.verify(token, `${process.env.JWT_SECRET}`);

    if (tokenVerify) {
        const userUpdate = await User.findByIdAndUpdate(userFind?._id, { verified: true });
    } else {
        return NextResponse.json({ message: "Token not valid", status: false });
    }

    return NextResponse.json({ message: "Account verify", status: true });


}