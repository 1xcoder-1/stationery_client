import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Perform the mutation using the Sanity client
    const result = await client.mutate(body.mutations);
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error performing Sanity mutation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to perform mutation" },
      { status: 500 }
    );
  }
}