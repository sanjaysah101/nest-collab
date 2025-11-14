"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { GitFork, Loader2, Search, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Repository {
  created_at: string;
  name: string;
  updated_at: string;
  commits_count?: number;
  contributors_count?: number;
  description?: string | null;
  forks_count?: number;
  open_issues_count?: number;
  stars_count?: number;
}

interface PagedRepository {
  current_page: number;
  has_next: boolean;
  has_previous: boolean;
  items: Repository[];
  total_count: number;
  total_pages: number;
}

export default function RepositoriesBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["repositories", currentPage],
    queryFn: () =>
      fetch(`/api/repositories?page=${currentPage}&page_size=20`).then((r) => r.json()),
  });

  const repositories: Repository[] = (data as PagedRepository | undefined)?.items || [];
  const totalPages = (data as PagedRepository | undefined)?.total_pages ?? 1;

  // Filter repositories
  const filteredRepositories = repositories.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">OWASP Repositories</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Explore OWASP repositories and contribute to open-source security projects.
          </p>
        </div>

        {/* Search */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
            <Input
              placeholder="Search repositories by name or description..."
              className="h-11 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
            <p className="text-destructive mb-4">Failed to load repositories. Please try again later.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-muted-foreground text-sm">
              Found {filteredRepositories.length} repositor{filteredRepositories.length !== 1 ? "ies" : "y"} (Page{" "}
              {currentPage} of {totalPages})
            </p>
          </div>
        )}

        {/* Repositories Grid */}
        {!isLoading && (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredRepositories.map((repo) => (
              <Card
                key={repo.name}
                className="hover:border-primary/50 group flex flex-col p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-4">
                  <h3 className="text-foreground group-hover:text-primary mb-2 text-lg font-semibold transition-colors">
                    {repo.name}
                  </h3>
                  {repo.description && (
                    <p className="text-muted-foreground line-clamp-2 text-sm">{repo.description}</p>
                  )}
                </div>

                {/* Stats */}
                <div className="mb-4 flex flex-wrap gap-4">
                  {repo.stars_count !== undefined && (
                    <div className="text-muted-foreground flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4" />
                      <span>{repo.stars_count}</span>
                    </div>
                  )}
                  {repo.forks_count !== undefined && (
                    <div className="text-muted-foreground flex items-center gap-1 text-sm">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks_count}</span>
                    </div>
                  )}
                  {repo.contributors_count !== undefined && (
                    <div className="text-muted-foreground flex items-center gap-1 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{repo.contributors_count}</span>
                    </div>
                  )}
                </div>

                {/* Metadata */}
                <div className="border-border mt-auto flex items-center justify-between border-t pt-4">
                  <div className="text-muted-foreground text-xs">
                    Updated: {new Date(repo.updated_at).toLocaleDateString()}
                  </div>
                  {repo.open_issues_count !== undefined && repo.open_issues_count > 0 && (
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                      {repo.open_issues_count} open issues
                    </span>
                  )}
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
        {!isLoading && filteredRepositories.length === 0 && repositories.length > 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No repositories found. Try adjusting your search.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
              }}
            >
              Reset Search
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}