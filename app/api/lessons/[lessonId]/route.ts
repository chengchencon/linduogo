import db from "@/db/drizzle"
import { lessons } from "@/db/schema"
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server";

export const GET = async (
    req: Request,
    { params } : { params: Promise<{ lessonId: number }> },
) => {
    if(!getIsAdmin()){
        return new NextResponse("Unauthorized", { status: 403});
    }

    const cId = (await params).lessonId;
    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, cId),
    });


    return NextResponse.json(data);
}

export const PUT = async (
    req: Request,
    { params } : { params: Promise<{ lessonId: number }> },
) => {
    if(!getIsAdmin()){
        return new NextResponse("Unauthorized", { status: 403});
    }

    
    const cId = (await params).lessonId;
    const body = await req.json();
    const data = await db.update(lessons).set({
        ...body,
    }).where(eq(lessons.id, cId)).returning();


    return NextResponse.json(data[0]);
}

export const DELETE = async (
    req: Request,
    { params } : { params: Promise<{ lessonId: number }> },
) => {
    if(!getIsAdmin()){
        return new NextResponse("Unauthorized", { status: 403});
    }

    const cId = (await params).lessonId;
    const data = await db.delete(lessons).where(eq(lessons.id, cId)).returning();

    return NextResponse.json(data[0]);
}