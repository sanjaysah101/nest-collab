import { getNestHeaders, nestApiUrl } from "@/lib/nest-client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("page_size") || "20";
    const ordering = searchParams.get("ordering") || "-published_at";
    const organization = searchParams.get("organization") || "";
    const repository = searchParams.get("repository") || "";

    const url = new URL(nestApiUrl("/releases/"));
    url.searchParams.append("page", page);
    url.searchParams.append("page_size", pageSize);
    url.searchParams.append("ordering", ordering);
    if (organization) url.searchParams.append("organization", organization);
    if (repository) url.searchParams.append("repository", repository);

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
    console.error("Error fetching releases:", error);
    return Response.json({ error: "Failed to fetch releases" }, { status: 500 });
  }
}