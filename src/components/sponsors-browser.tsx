"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Sponsor {
  image_url: string;
  key: string;
  name: string;
  sponsor_type: string;
  url: string;
  description?: string;
  is_member?: boolean;
  member_type?: string;
}

interface PagedSponsor {
  current_page: number;
  has_next: boolean;
  has_previous: boolean;
  items: Sponsor[];
  total_count: number;
  total_pages: number;
}

export default function SponsorsBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["sponsors", currentPage, selectedType],
    queryFn: () =>
      fetch(
        `/api/sponsors?page=${currentPage}&page_size=20${selectedType ? `&sponsor_type=${selectedType}` : ""}`,
      ).then((r) => r.json()),
  });

  const sponsors: Sponsor[] = (data as PagedSponsor | undefined)?.items || [];
  const totalPages = (data as PagedSponsor | undefined)?.total_pages ?? 1;

  const allTypes = sponsors.length > 0 
    ? Array.from(new Set(sponsors.map((s) => s.sponsor_type))) 
    : [];

  // Filter sponsors
  const filteredSponsors = sponsors.filter((sponsor) => {
    const matchesSearch = sponsor.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">OWASP Sponsors</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Meet the organizations supporting OWASP's mission to improve software security.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
            <Input
              placeholder="Search sponsors by name..."
              className="h-11 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType(null)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedType === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              All Sponsors
            </button>
            {allTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {type}
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
            <p className="text-destructive mb-4">Failed to load sponsors. Please try again later.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-muted-foreground text-sm">
              Found {filteredSponsors.length} sponsor{filteredSponsors.length !== 1 ? "s" : ""} (Page {currentPage} of{" "}
              {totalPages})
            </p>
          </div>
        )}

        {/* Sponsors Grid */}
        {!isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSponsors.map((sponsor) => (
              <Card
                key={sponsor.key}
                className="hover:border-primary/50 group flex flex-col p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center justify-center">
                  <img
                    src={sponsor.image_url}
                    alt={sponsor.name}
                    className="h-24 w-auto object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-foreground group-hover:text-primary mb-2 text-lg font-semibold transition-colors">
                    {sponsor.name}
                  </h3>
                  <span className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-3 py-1 text-xs">
                    {sponsor.sponsor_type}
                  </span>
                  {sponsor.description && (
                    <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">{sponsor.description}</p>
                  )}
                </div>

                {/* Metadata and Button */}
                <div className="border-border mt-auto flex items-center justify-center border-t pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hover:text-primary"
                  >
                    <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Website
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
        {!isLoading && filteredSponsors.length === 0 && sponsors.length > 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No sponsors found. Try adjusting your search or filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedType(null);
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