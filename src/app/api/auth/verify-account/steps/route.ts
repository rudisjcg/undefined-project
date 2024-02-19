import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, response: NextResponse) {

    console.log(request.body)


    return NextResponse.json({ message: "Account verify", status: true });


}