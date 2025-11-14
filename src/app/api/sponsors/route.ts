import { getNestHeaders, nestApiUrl } from "@/lib/nest-client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("page_size") || "20";
    const ordering = searchParams.get("ordering") || "name";
    const sponsorType = searchParams.get("sponsor_type") || "";
    const isMember = searchParams.get("is_member") || "";

    const url = new URL(nestApiUrl("/sponsors/"));
    url.searchParams.append("page", page);
    url.searchParams.append("page_size", pageSize);
    url.searchParams.append("ordering", ordering);
    if (sponsorType) url.searchParams.append("sponsor_type", sponsorType);
    if (isMember) url.searchParams.append("is_member", isMember);

    const response = await fetch(url.toString(), {
      headers: getNestHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return Response.json({ error: "Failed to fetch sponsors" }, { status: 500 });
  }
}