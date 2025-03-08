import db from "@/db/drizzle"
import { units } from "@/db/schema"
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server";

export const GET = async (
    req: Request,
    { params } : { params: Promise<{ unitId: number }> },
) => {
    if(!getIsAdmin()){
        return new NextResponse("Unauthorized", { status: 403});
    }
    const cId = (await params).unitId;
    const data = await db.query.units.findFirst({
        where: eq(units.id, cId),
    });


    return NextResponse.json(data);
}

export const PUT = async (
    req: Request,
    { params } : { params: Promise<{ unitId: number }> },
) => {
    if(!getIsAdmin()){
        return new NextResponse("Unauthorized", { status: 403});
    }

    const cId = (await params).unitId;
    const body = await req.json();
    const data = await db.update(units).set({
        ...body,
    }).where(eq(units.id, cId)).returning();


    return NextResponse.json(data[0]);
}

export const DELETE = async (
    req: Request,
    { params } : { params: Promise<{ unitId: number }> },
) => {
    if(!getIsAdmin()){
        return new NextResponse("Unauthorized", { status: 403});
    }

    const cId = (await params).unitId;
    const data = await db.delete(units).where(eq(units.id, cId)).returning();

    return NextResponse.json(data[0]);
}