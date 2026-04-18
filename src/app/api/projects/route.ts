import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Feedback from "@/models/Feedback";
import Project from "@/models/Project";

// export const runtime = "nodejs";

// POST /api/feedback
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { type, title, summary, description, tags, thumbnail, media } =
      body || {};
    if (!type || !title || !summary || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "type, title, summary, and description are required.",
        },
        { status: 400 }
      );
    }

    if (!["Mobile", "Web"].includes(type)) {
      return NextResponse.json(
        {
          success: false,
          message: "type must be either Mobile or Web.",
        },
        { status: 400 }
      );
    }

    await dbConnect();
    const doc = await Project.create({
      type,
      title,
      summary,
      description,
      tags,
      thumbnail,
      media,
    });

    return NextResponse.json({
      success: true,
      message: "Project submitted successfully.",
      data: { id: doc._id },
    });
  } catch (err) {
    console.error("POST /api/projects error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to submit project." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const list = await Project.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(list);
  } catch (err) {
    console.error("GET /api/projects error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects." },
      { status: 500 }
    );
  }
}
