"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { AlertCircle, CheckCircle2, ExternalLink, Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Issue {
  created_at: string;
  state: "open" | "closed";
  title: string;
  updated_at: string;
  url: string;
  body?: string;
}

interface PagedIssue {
  current_page: number;
  has_next: boolean;
  has_previous: boolean;
  items: Issue[];
  total_count: number;
  total_pages: number;
}

export default function IssuesBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<"open" | "closed" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["issues", currentPage, selectedState],
    queryFn: () =>
      fetch(
        `/api/issues?page=${currentPage}&page_size=20${selectedState ? `&state=${selectedState}` : ""}`,
      ).then((r) => r.json()),
  });

  const issues: Issue[] = (data as PagedIssue | undefined)?.items || [];
  const totalPages = (data as PagedIssue | undefined)?.total_pages ?? 1;

  // Filter issues
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">OWASP Issues</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Find issues to contribute to across OWASP projects. Help improve security tools and resources.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
            <Input
              placeholder="Search issues by title..."
              className="h-11 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* State Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedState(null)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedState === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              All Issues
            </button>
            <button
              onClick={() => setSelectedState("open")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedState === "open"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              Open
            </button>
            <button
              onClick={() => setSelectedState("closed")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedState === "closed"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              Closed
            </button>
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
            <p className="text-destructive mb-4">Failed to load issues. Please try again later.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-muted-foreground text-sm">
              Found {filteredIssues.length} issue{filteredIssues.length !== 1 ? "s" : ""} (Page {currentPage} of{" "}
              {totalPages})
            </p>
          </div>
        )}

        {/* Issues List */}
        {!isLoading && (
          <div className="space-y-4">
            {filteredIssues.map((issue) => (
              <Card
                key={issue.url}
                className="hover:border-primary/50 group flex flex-col p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {issue.state === "open" ? (
                      <AlertCircle className="text-primary h-6 w-6" />
                    ) : (
                      <CheckCircle2 className="text-muted-foreground h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground group-hover:text-primary mb-2 text-lg font-semibold transition-colors">
                      {issue.title}
                    </h3>
                    {issue.body && (
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{issue.body}</p>
                    )}
                    <div className="flex items-center gap-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          issue.state === "open"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {issue.state}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        Updated: {new Date(issue.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hover:text-primary flex-shrink-0"
                  >
                    <a href={issue.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
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
        {!isLoading && filteredIssues.length === 0 && issues.length > 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No issues found. Try adjusting your search or filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedState(null);
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