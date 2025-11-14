import { Nest } from "owasp-nest";

export async function GET(request: Request) {
  try {
    const nest = new Nest({
      apiKey: process.env.NEST_API_KEY ?? "",
    });

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
    const sort = searchParams.get("sort") || "relevance";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Fetch from OWASP Nest API
    const result = await nest.projects.listProjects({
      limit: limit + 10, // Fetch extra for filtering
      offset: (page - 1) * limit,
    });

    // Filter by query and tags
    let filtered = result.data || [];

    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (p: any) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.description?.toLowerCase().includes(lowerQuery)
      );
    }

    if (tags.length > 0) {
      filtered = filtered.filter((p: any) =>
        tags.some((tag: string) => p.topics?.includes(tag))
      );
    }

    // Apply sorting
    if (sort === "popularity") {
      filtered.sort((a: any, b: any) => (b.stars || 0) - (a.stars || 0));
    } else if (sort === "recent") {
      filtered.sort((a: any, b: any) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    }

    const paginatedResults = filtered.slice(0, limit);

    return Response.json({
      data: paginatedResults,
      total: filtered.length,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error searching projects:", error);
    return Response.json(
      { error: "Failed to search projects" },
      { status: 500 }
    );
  }
}
