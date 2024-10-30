// http://localhost:3000/api/image

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello, Next.js image!" });
}
