import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { getServerSession } from "next-auth";
import authOptions from "../[...nextauth]/option";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import { emailTemplates } from "@/utils";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function GET(request: NextRequest, response: NextResponse) {
    const data = await getServerSession(authOptions);

    console.log(data)

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
    console.log(token)
    const forgetURL = `http://localhost:3000/change-password?token=${token}`;
    

    const msg = {
        to: "rudisjcg@gmail.com", // Change to your recipient
        from: "xxforzexx@hotmail.com",
        templateId: emailTemplates.forgetPassword,
        dynamic_template_data: {
            link: forgetURL,
            tittle: `Hi, ${data?.user?.name} -` + " it seens you forget your password!",
        },
    }

    sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
    return NextResponse.json({ message: "Email sent", status: true });
  })
  .catch((error) => {
    console.error(error)
    return NextResponse.json({ message: "Email not sent", status: false });
  })
    
}