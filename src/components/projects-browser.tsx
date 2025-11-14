"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
import { PagedProject, Project, ProjectLevel } from "owasp-nest/models";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ProjectsBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState<
    (typeof ProjectLevel)[keyof typeof ProjectLevel] | null
  >(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["projects", currentPage, selectedLevel],
    queryFn: () =>
      fetch(
        `/api/projects?page=${currentPage}&page_size=20${selectedLevel ? `&level=${selectedLevel}` : ""}`,
      ).then((r) => r.json()),
  });

  console.log({ data, error, isLoading });

  const projects: Project[] = (data as PagedProject | undefined)?.items || [];
  const totalPages = (data as PagedProject | undefined)?.totalPages ?? 1;

  const allTags = projects.length > 0 ? Array.from(new Set(projects.flatMap((p) => (p.key ? [p.key] : [])))) : [];

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || (project.key?.includes(selectedTag) ?? false);
    return matchesSearch && matchesTag;
  });

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">OWASP Projects</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Explore and contribute to leading OWASP security projects. Find opportunities to apply your expertise.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
            <Input
              placeholder="Search projects by name or description..."
              className="h-11 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedTag === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              All Projects
            </button>
            {allTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedLevel(null)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedLevel === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              All Levels
            </button>
            {Object.values(ProjectLevel).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedLevel === level
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-destructive/10 border-destructive/20 rounded-lg border p-6 text-center">
            <p className="text-destructive mb-4">Failed to load projects. Please try again later.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-muted-foreground text-sm">
              Found {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} (Page {currentPage} of{" "}
              {totalPages})
            </p>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <Card
                key={project.key}
                className="hover:border-primary/50 group flex flex-col p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors">
                    {project.name}
                  </h3>
                </div>

                <div className="text-muted-foreground mb-4 text-sm">
                  <span className="mr-2">Level: {project.level}</span>
                </div>

                {/* Project Key */}
                {project.key && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">{project.key}</span>
                  </div>
                )}

                {/* Metadata and Button */}
                <div className="border-border flex items-center justify-between border-t pt-4">
                  <div className="text-muted-foreground text-sm">
                    {project.updatedAt && <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
            <span className="text-muted-foreground px-4 py-2 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProjects.length === 0 && projects.length > 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No projects found. Try adjusting your search or filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag(null);
                  setSelectedLevel(null);
                }}
              >
                Reset Filters
              </Button>
          </div>
        )}
      </div>
    </section>
  );
}
