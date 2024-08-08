import { NextRequest } from "next/server";

import { client } from "@/lib/api-client";

export async function GET(request: NextRequest) {
  try {
    const data = await client(`price${request.nextUrl.search}`, {
      next: { revalidate: 3600 },
    });
    return Response.json({ data, success: true });
  } catch (error: any) {
    console.log("Error | Fetching bidding zone price: ", error.message);
    return Response.json({ error: "Price fetching error", success: false });
  }
}
