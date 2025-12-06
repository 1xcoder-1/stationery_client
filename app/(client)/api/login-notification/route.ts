import { sendLoginNotification } from "@/actions/sendLoginNotification";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.userId || !body.name || !body.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send login notification
    const result = await sendLoginNotification({
      userId: body.userId,
      name: body.name,
      email: body.email,
      loginTime: body.loginTime ? new Date(body.loginTime) : new Date(),
      ipAddress: body.ipAddress,
      userAgent: body.userAgent,
    });

    if (result.success) {
      return NextResponse.json(
        { message: "Login notification sent successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to send login notification" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in login notification API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}