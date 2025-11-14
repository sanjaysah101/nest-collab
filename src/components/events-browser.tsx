"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Calendar, ExternalLink, Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Event {
  end_date: string | null;
  key: string;
  name: string;
  start_date: string;
  url: string | null;
  description?: string;
}

interface PagedEvent {
  current_page: number;
  has_next: boolean;
  has_previous: boolean;
  items: Event[];
  total_count: number;
  total_pages: number;
}

export default function EventsBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPastEvents, setShowPastEvents] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["events", currentPage],
    queryFn: () =>
      fetch(`/api/events?page=${currentPage}&page_size=20`).then((r) => r.json()),
  });

  const events: Event[] = (data as PagedEvent | undefined)?.items || [];
  const totalPages = (data as PagedEvent | undefined)?.total_pages ?? 1;

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    const eventDate = new Date(event.start_date);
    const isPast = eventDate < new Date();
    const matchesTimeFilter = showPastEvents || !isPast;
    return matchesSearch && matchesTimeFilter;
  });

  const formatDateRange = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    if (!end || start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString("en-US", { 
        month: "long", 
        day: "numeric", 
        year: "numeric" 
      });
    }
    
    return `${start.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric" 
    })} - ${end.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    })}`;
  };

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">OWASP Events</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Discover upcoming OWASP events, conferences, and meetups around the world.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
            <Input
              placeholder="Search events by name..."
              className="h-11 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Time Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowPastEvents(false)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                !showPastEvents
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setShowPastEvents(true)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                showPastEvents
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              All Events
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
            <p className="text-destructive mb-4">Failed to load events. Please try again later.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-muted-foreground text-sm">
              Found {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} (Page {currentPage} of{" "}
              {totalPages})
            </p>
          </div>
        )}

        {/* Events Grid */}
        {!isLoading && (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredEvents.map((event) => (
              <Card
                key={event.key}
                className="hover:border-primary/50 group flex flex-col p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-4">
                  <h3 className="text-foreground group-hover:text-primary mb-2 text-lg font-semibold transition-colors">
                    {event.name}
                  </h3>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDateRange(event.start_date, event.end_date)}</span>
                  </div>
                </div>

                {event.description && (
                  <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">{event.description}</p>
                )}

                {/* Metadata and Button */}
                <div className="border-border mt-auto flex items-center justify-between border-t pt-4">
                  <div className="text-muted-foreground text-xs">
                    {new Date(event.start_date) > new Date() ? (
                      <span className="text-primary font-medium">Upcoming</span>
                    ) : (
                      <span>Past Event</span>
                    )}
                  </div>
                  {event.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="hover:text-primary"
                    >
                      <a href={event.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Details
                      </a>
                    </Button>
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
        {!isLoading && filteredEvents.length === 0 && events.length > 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No events found. Try adjusting your search or filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setShowPastEvents(false);
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