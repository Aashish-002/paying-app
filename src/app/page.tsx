"use client"
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface Payer {
  _id: string;
  name: string;
  amount: number;
  paid: boolean;
}

export default function Home() {
  const [payers, setPayers] = useState<Payer[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState("");
  const [pass, setPass] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetchPayers();
  }, []);

  useEffect(() => {
  
  }, [userId, pass]);

  function check(){
    if (
      userId === 'aashish@admin' &&
      pass === '@admin@#1243'
    ) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }

  const fetchPayers = async () => {
    const res = await fetch("/api/payers");
    const data: Payer[] = await res.json();
    setPayers(data);
  };

  const addPayer = async () => {
    if (!name || !amount) return;
    await fetch("/api/payers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, amount: parseFloat(amount), paid: false })
    });
    setName("");
    setAmount("");
    fetchPayers();
  };

  const markAsPaid = async (id: string) => {
    await fetch(`/api/payers/${id}`, { method: "PUT" });
    fetchPayers();
  };
  
  const deletePayer = async (id: string) => {
    await fetch(`/api/payers/${id}`, { method: "DELETE" });
    fetchPayers();
  };

  const totalPaid = payers.filter(p => p.paid).reduce((acc, p) => acc + p.amount, 0);
  const totalPending = payers.filter(p => !p.paid).reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="p-4 max-w-lg mx-auto">
      {!admin ? (
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <Input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Admin ID" />
          <Input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" type="password" />
          <Button onClick={check}>Submit</Button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Admin - Payment Tracker</h1>
          <div className="flex gap-2 mb-4">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" />
            <Button onClick={addPayer}>Add</Button>
          </div>
          <Card className="mb-4 p-4">
            <p className="text-green-500">Total Paid: ₹{totalPaid}</p>
            <p className="text-red-500">Total Pending: ₹{totalPending}</p>
          </Card>
          {payers.map((payer) => (
            <motion.div key={payer._id} className="mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-2 flex justify-between items-center">
                <span className={payer.paid ? "line-through text-gray-500" : ""}>{payer.name} - ₹{payer.amount}</span>
                {!payer.paid && <Button onClick={() => markAsPaid(payer._id)}>Mark as Paid</Button>}
                {!payer.paid && <Button className="bg-red-800" onClick={() => deletePayer(payer._id)}>Delete</Button>}
              </Card>
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
}
