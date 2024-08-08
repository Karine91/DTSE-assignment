// export const dynamic = "force-dynamic"; // defaults to auto
import { client } from "@/lib/api-client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const data = await client(`price${request.nextUrl.search}`);
    console.log(data);
    return Response.json({ data, success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Price fetching error", success: false });
  }
}
