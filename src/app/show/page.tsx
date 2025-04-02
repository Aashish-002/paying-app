'use client'
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface Payer {
  _id: string;
  name: string;
  amount: number;
  paid: boolean;
}

export default function PublicView() {
  const [payers, setPayers] = useState<Payer[]>([]);

  useEffect(() => {
    fetchPayers();
  }, []);

  const fetchPayers = async () => {
    const res = await fetch("/api/payers");
    const data: Payer[] = await res.json();
    setPayers(data);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Public Payment Tracker</h1>
      {payers.map((payer) => (
        <Card key={payer._id} className="p-2 mb-2">
          <span className={payer.paid ? "line-through text-gray-500" : ""}>{payer.name} - ${payer.amount}</span>
        </Card>
      ))}
    </div>
  );
}
