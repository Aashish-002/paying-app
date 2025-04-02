import mongoose from "mongoose";

const PayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  paid: { type: Boolean, default: false }
});

export default mongoose.models.Payer || mongoose.model("Payer", PayerSchema);