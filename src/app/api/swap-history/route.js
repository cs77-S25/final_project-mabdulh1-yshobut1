// src/app/api/swap-history/route.js

import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("uid");

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing user ID" }), { status: 400 });
  }

  try {
    const swapsRef = collection(db, "swaps");
    const q = query(swapsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const swaps = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(swaps), { status: 200 });
  } catch (err) {
    console.error("Swap fetch error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
