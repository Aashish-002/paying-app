import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // Ensure correct path to your database connection
import Payer from "../../../models/Payer"; // Ensure correct path to your Mongoose model

export async function PUT(req: Request, {params}: {params: Promise<{ id: string }> }) {
  await dbConnect(); 

  try {
    const id = params; 

    const payer = await Payer.findByIdAndUpdate(id, { paid: true }, { new: true });

    if (!payer) {
      return NextResponse.json({ error: "Payer not found" }, { status: 404 });
    }

    return NextResponse.json(payer, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating payer" }, { status: 500 });
  }
}

export async function DELETE(req: Request, {params}: {params: Promise<{ id: string }>}) {
  await dbConnect();

  try {
    const  id  = params; 

    const payer = await Payer.findByIdAndDelete(id);

    if (!payer) {
      return NextResponse.json({ error: "Payer not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Payer deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting payer" }, { status: 500 });
  }
}
