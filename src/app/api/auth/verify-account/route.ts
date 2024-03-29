import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../[...nextauth]/option";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import { emailTemplates } from "@/utils";
import { Message } from "@/interfaces";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function GET(request: NextRequest, response: NextResponse) {
    const data = await getServerSession(authOptions);

    const userFind = await User.findOne({ email: data?.user?.email });

    if (!userFind) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const tokenData = {
        email: userFind?.email,
        id: userFind?._id,
    };

    const token = jwt.sign({ data: tokenData }, `${process.env.JWT_SECRET}`, {
        expiresIn: "2h",
    });

    const verifyUrl = `http://localhost:3000/account?verifyAccountToken=${token}`;

    if (data && data?.user?.email && verifyUrl && userFind && token) {
        const msg: Message = {
            to: data?.user?.email, // Change to your recipient
            from: "xxforzexx@hotmail.com",
            templateId: emailTemplates.forgetPassword,
            dynamic_template_data: {
                link: verifyUrl,
                tittle: `Hi, ${data?.user?.name} -` + " it seens you want to verify your account!",
            },
        }

        const emailLogic = await sgMail
            .send(msg)
            .then(() => {
                return NextResponse.json({ message: "Email sent", status: true });
            })
            .catch((error) => {
                return NextResponse.json({ message: "Email not sent", status: false });
            })
        if (emailLogic.ok) {
            return NextResponse.json({ message: "Email sent", status: true });
        } else {

            return NextResponse.json({ message: "Email not sent", status: false });
        }
    }

}