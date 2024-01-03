import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";
import { IncomingMessage, request } from "http";
import { NextApiRequest } from "next";
var toArray = require('stream-to-array')


export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  await mongooseConnect();
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const bucketName = process.env.AWS_BUCKET_NAME;
  const fileName = process.env.AWS_FILE_NAME;
  const formData = await req.formData();
  console.log(formData)
  const file = formData.get('file');

  if (!accessKeyId || !secretAccessKey) {
    throw new Error('AWS credentials Error');
  }

  const client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId,
      secretAccessKey
    },
  });

  try {
    const links = [];
    if (file instanceof Blob) {
      const ext = file.name.split(".").pop();
      const newFileName = Date.now() + "." + ext;

      // Convert Blob to stream
      const fileStream = file.stream();
      const reader = fileStream.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        chunks.push(value);
      }

      const buffer = Buffer.concat(chunks);
      console.log(buffer)

      await client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        Body: buffer, // use the file stream instead of reading from file system
        ACL: "public-read",
        ContentType: file.type || undefined, // use the type property of the File object
      }));


      const link = `https://${fileName}.s3.amazonaws.com/${newFileName}`;
      links.push(link);
    }


    return NextResponse.json({ links });

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", error });
  }
}