import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Payer from "../../models/Payer";

export async function GET() {
  await dbConnect();
  const payers = await Payer.find({});
  return NextResponse.json(payers);
}

export async function POST(req: Request) {
  await dbConnect();
  const { name, amount } = await req.json();
  const payer = new Payer({ name, amount, paid: false });
  await payer.save();
  return NextResponse.json(payer, { status: 201 });
}