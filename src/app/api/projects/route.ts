import { ProjectLevel } from "owasp-nest/models";
import { type ListProjectsOrdering as ListOrderingType, ListProjectsOrdering } from "owasp-nest/models/operations";

import { nestClient } from "../../../lib/nest-client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const pageSize = Number(searchParams.get("page_size") || "20");
    const orderingParam = searchParams.get("ordering") || "-created_at";
    const allowedOrderingValues: ListOrderingType[] = [
      ListProjectsOrdering.CreatedAt,
      ListProjectsOrdering.MinusCreatedAt,
      ListProjectsOrdering.UpdatedAt,
      ListProjectsOrdering.MinusUpdatedAt,
    ];
    const ordering = allowedOrderingValues.includes(orderingParam as ListOrderingType)
      ? (orderingParam as ListOrderingType)
      : ListProjectsOrdering.MinusCreatedAt;
    const levelParam = searchParams.get("level") as string | null;
    const level: ProjectLevel | undefined =
      levelParam && Object.values(ProjectLevel).includes(levelParam as ProjectLevel)
        ? (levelParam as ProjectLevel)
        : undefined;

    const projects = await nestClient.projects.listProjects({
      page,
      pageSize,
      ordering,
      level,
    });
    // const data = await response.json();
    return Response.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return Response.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
