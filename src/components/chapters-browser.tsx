"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Loader2, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Chapter {
  created_at: string;
  key: string;
  name: string;
  updated_at: string;
  country?: string;
  region?: string;
}

interface PagedChapter {
  current_page: number;
  has_next: boolean;
  has_previous: boolean;
  items: Chapter[];
  total_count: number;
  total_pages: number;
}

export default function ChaptersBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["chapters", currentPage, selectedCountry],
    queryFn: () =>
      fetch(
        `/api/chapters?page=${currentPage}&page_size=20${selectedCountry ? `&country=${selectedCountry}` : ""}`,
      ).then((r) => r.json()),
  });

  const chapters: Chapter[] = (data as PagedChapter | undefined)?.items || [];
  const totalPages = (data as PagedChapter | undefined)?.total_pages ?? 1;

  const allCountries = chapters.length > 0 
    ? Array.from(new Set(chapters.map((c) => c.country).filter(Boolean))) 
    : [];

  // Filter chapters
  const filteredChapters = chapters.filter((chapter) => {
    const matchesSearch = chapter.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = !selectedCountry || chapter.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">OWASP Chapters</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Discover OWASP chapters around the world. Connect with local security communities.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
            <Input
              placeholder="Search chapters by name..."
              className="h-11 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Country Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCountry(null)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedCountry === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              All Countries
            </button>
            {allCountries.slice(0, 10).map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country as string)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCountry === country
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {country}
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
            <p className="text-destructive mb-4">Failed to load chapters. Please try again later.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-muted-foreground text-sm">
              Found {filteredChapters.length} chapter{filteredChapters.length !== 1 ? "s" : ""} (Page {currentPage} of{" "}
              {totalPages})
            </p>
          </div>
        )}

        {/* Chapters Grid */}
        {!isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredChapters.map((chapter) => (
              <Card
                key={chapter.key}
                className="hover:border-primary/50 group flex flex-col p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-4">
                  <h3 className="text-foreground group-hover:text-primary mb-2 text-lg font-semibold transition-colors">
                    {chapter.name}
                  </h3>
                  {chapter.country && (
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{chapter.country}</span>
                      {chapter.region && <span className="text-muted-foreground/60">• {chapter.region}</span>}
                    </div>
                  )}
                </div>

                {/* Metadata */}
                <div className="border-border mt-auto flex items-center justify-between border-t pt-4">
                  <div className="text-muted-foreground text-xs">
                    Updated: {new Date(chapter.updated_at).toLocaleDateString()}
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
        {!isLoading && filteredChapters.length === 0 && chapters.length > 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No chapters found. Try adjusting your search or filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCountry(null);
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