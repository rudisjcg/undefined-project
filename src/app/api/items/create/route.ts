import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import Item from "@/models/items";

export async function POST(request: Request, session: any) {
    await mongooseConnect();
    const data = await getServerSession(session);
    const { title, description, price, category } = await request.json();
    console.log({ title, price, description, category });

    console.log(data);

    try {
        await Item.create({
            email: (data as { user: { email: string } })?.user?.email,
            title,
            price,
            description,
            category,
        });

    } catch (error) {
        console.log(error);
    }

    return NextResponse.json({ message: "item Created", Item });

};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req);

    return {
        props: {
            session,
        },
    };
};
