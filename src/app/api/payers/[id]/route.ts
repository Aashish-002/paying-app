import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Payer from "../../../models/Payer";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;
    await Payer.findByIdAndUpdate(id, { paid: true });
    return NextResponse.json({ success: true });
  }
  
  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    if (!params?.id) return NextResponse.json({ error: "ID is required" }, { status: 400 });
    await Payer.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  }