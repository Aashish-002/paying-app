import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // Ensure correct path
import Payer from "../../../models/Payer"; // Ensure correct path

export async function PUT(req: Request, {params}: {params: Promise<{ id: string }> }) {
  await dbConnect();

  try {
    const id  =params;

    console.log("Updating payer with ID:", id); // Log the ID

    const payer = await Payer.findByIdAndUpdate(id, { paid: true }, { new: true });

    if (!payer) {
      return NextResponse.json({ error: "Payer not found" }, { status: 404 });
    }

    return NextResponse.json(payer, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error); // Log detailed error
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, {params}: {params: Promise<{ id: string }>}) {
  await dbConnect();

  try {
    const  id  = params;

    console.log("Deleting payer with ID:", id); // Log the ID

    const payer = await Payer.findByIdAndDelete(id);

    if (!payer) {
      return NextResponse.json({ error: "Payer not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Payer deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error); // Log detailed error
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
