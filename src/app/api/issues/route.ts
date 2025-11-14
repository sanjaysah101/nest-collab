import { getNestHeaders, nestApiUrl } from "@/lib/nest-client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("page_size") || "20";
    const ordering = searchParams.get("ordering") || "-created_at";
    const organization = searchParams.get("organization") || "";
    const repository = searchParams.get("repository") || "";
    const state = searchParams.get("state") || "";

    const url = new URL(nestApiUrl("/issues/"));
    url.searchParams.append("page", page);
    url.searchParams.append("page_size", pageSize);
    url.searchParams.append("ordering", ordering);
    if (organization) url.searchParams.append("organization", organization);
    if (repository) url.searchParams.append("repository", repository);
    if (state) url.searchParams.append("state", state);

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
    console.error("Error fetching issues:", error);
    return Response.json({ error: "Failed to fetch issues" }, { status: 500 });
  }
}