import { Nest } from "owasp-nest";

export async function GET(request: Request) {
  try {
    const nest = new Nest({
      apiKey: process.env.NEST_API_KEY ?? "",
    });

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "50";
    const offset = searchParams.get("offset") || "0";

    const result = await nest.community.listOrganizations({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return Response.json(result);
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return Response.json(
      { error: "Failed to fetch organizations" },
      { status: 500 }
    );
  }
}
