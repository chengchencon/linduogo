import db from "@/db/drizzle"
import { challenges } from "@/db/schema"
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server";

export const GET = async (
    req: Request,
    { params } : { params: Promise<{ challengeId: number }> },
) => {
    if(!getIsAdmin()){
        return new NextResponse("Unauthorized", { status: 403});
    }

    const cId = (await params).challengeId;
    const data = await db.query.challenges.findFirst({
        where: eq(challenges.id, cId),
    });


    return NextResponse.json(data);
}

export const PUT = async (
    req: Request,
    { params } : { params: Promise<{ challengeId: number }> },
) => {
    if(!getIsAdmin()){
        return new NextResponse("Unauthorized", { status: 403});
    }

    const cId = (await params).challengeId;
    const body = await req.json();
    const data = await db.update(challenges).set({
        ...body,
    }).where(eq(challenges.id, cId)).returning();


    return NextResponse.json(data[0]);
}

export const DELETE = async (
    req: Request,
    { params } : { params: Promise<{ challengeId: number }> },
) => {

    const cId = (await params).challengeId;
    if(!getIsAdmin()){
        return new NextResponse("Unauthorized", { status: 403});
    }

    const data = await db.delete(challenges).where(eq(challenges.id, cId)).returning();

    return NextResponse.json(data[0]);
}