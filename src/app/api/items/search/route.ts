import { Query } from "@/interfaces";
import { mongooseConnect } from "@/lib/mongoose";
import Item from "@/models/items";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const requestBody = req.nextUrl.searchParams; // To read request data
    const search = requestBody.get('phrase');

    const productsQuery: Query = {};

    if (search) {
        try {
            await mongooseConnect();

            productsQuery['$or'] = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];

            return NextResponse.json(
                await Item.find(productsQuery, null, {
                    sort: { createdAt: -1 },
                })
            );
        } catch (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
    }


}
