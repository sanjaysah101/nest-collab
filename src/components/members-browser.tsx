"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Building2, Loader2, MapPin, Search, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Member {
  avatar_url: string;
  created_at: string;
  login: string;
  name: string;
  updated_at: string;
  url: string;
  bio?: string;
  company?: string;
  location?: string;
}

interface PagedMember {
  current_page: number;
  has_next: boolean;
  has_previous: boolean;
  items: Member[];
  total_count: number;
  total_pages: number;
}

export default function MembersBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["members", currentPage],
    queryFn: () =>
      fetch(`/api/community/members?page=${currentPage}&page_size=20`).then((r) => r.json()),
  });

  const members: Member[] = (data as PagedMember | undefined)?.items || [];
  const totalPages = (data as PagedMember | undefined)?.total_pages ?? 1;

  // Filter members
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">OWASP Community Members</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Connect with security researchers and developers in the OWASP community.
          </p>
        </div>

        {/* Search */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
            <Input
              placeholder="Search members by name, username, company, or location..."
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
            <p className="text-destructive mb-4">Failed to load members. Please try again later.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-muted-foreground text-sm">
              Found {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""} (Page {currentPage} of{" "}
              {totalPages})
            </p>
          </div>
        )}

        {/* Members Grid */}
        {!isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <Card
                key={member.login}
                className="hover:border-primary/50 group flex flex-col p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-4 flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.avatar_url} alt={member.name} />
                    <AvatarFallback>
                      <Users className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-foreground group-hover:text-primary mb-1 text-lg font-semibold transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">@{member.login}</p>
                  </div>
                </div>

                {member.bio && (
                  <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{member.bio}</p>
                )}

                <div className="space-y-2">
                  {member.company && (
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4" />
                      <span>{member.company}</span>
                    </div>
                  )}
                  {member.location && (
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{member.location}</span>
                    </div>
                  )}
                </div>

                {/* Metadata */}
                <div className="border-border mt-auto flex items-center justify-between border-t pt-4">
                  <div className="text-muted-foreground text-xs">
                    Joined: {new Date(member.created_at).toLocaleDateString()}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hover:text-primary"
                  >
                    <a href={member.url} target="_blank" rel="noopener noreferrer">
                      View Profile
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
        {!isLoading && filteredMembers.length === 0 && members.length > 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No members found. Try adjusting your search.</p>
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