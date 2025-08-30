import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Feedback from "@/models/Feedback";

// export const runtime = "nodejs";

// POST /api/feedback
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, mobile, email, projectName, feedback, rating } = body || {};
    if (!name || !feedback) {
      return NextResponse.json(
        { success: false, message: "name, email and message are required." },
        { status: 400 }
      );
    }

    await dbConnect();
    const doc = await Feedback.create({
      name,
      mobile,
      email,
      projectName,
      feedback,
      rating,
    });

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully.",
      data: { id: doc._id },
    });
  } catch (err) {
    console.error("POST /api/feedback error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to submit feedback." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const list = await Feedback.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(list);
  } catch (err) {
    console.error("GET /api/feedback error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch feedback." },
      { status: 500 }
    );
  }
}
