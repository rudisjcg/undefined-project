import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import multiparty from "multiparty";
import { IncomingMessage } from "http"; // Import the IncomingMessage type

export async function POST(req: IncomingMessage) {
  // Change the type of req to IncomingMessage
  await mongooseConnect();
  const form = new multiparty.Form();

  const { fields, files } = await new Promise<any>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  return NextResponse.json({ message: "route works" });
}
