"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ArrowRight, Code2, Globe, Shield, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Hero() {
  const [stats, setStats] = useState({
    projects: 0,
    members: 0,
    chapters: 0,
  });

  useEffect(() => {
    // Fetch real stats from API
    Promise.all([
      fetch("/api/projects?page=1&page_size=1").then((r) => r.json()),
      fetch("/api/community/members?page=1&page_size=1").then((r) => r.json()),
      fetch("/api/chapters?page=1&page_size=1").then((r) => r.json()),
    ])
      .then(([projects, members, chapters]) => {
        setStats({
          projects: projects.totalCount || 0,
          members: members.total_count || 0,
          chapters: chapters.total_count || 0,
        });
      })
      .catch(() => {
        // Fallback to default values
        setStats({ projects: 100, members: 1000, chapters: 200 });
      });
  }, []);

  return (
    <section className="relative flex min-h-[700px] items-center overflow-hidden">
      {/* Animated Background */}
      <div className="from-primary/10 via-background to-background absolute inset-0 bg-linear-to-br" />
      <div className="bg-primary/5 absolute top-20 right-10 h-72 w-72 animate-pulse rounded-full blur-3xl" />
      <div className="bg-accent/5 animation-delay-1000 absolute bottom-10 left-10 h-96 w-96 animate-pulse rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="animate-fade-in flex w-fit items-center gap-2">
              <Shield className="text-primary h-5 w-5" />
              <span className="text-primary bg-primary/10 rounded-full px-3 py-1 text-sm font-medium">
                🏆 OWASP Nest API Hackathon
              </span>
            </div>

            <div className="animate-fade-in animation-delay-200 space-y-4">
              <h1 className="text-foreground text-4xl leading-tight font-bold text-balance md:text-5xl lg:text-6xl">
                Connect, Collaborate, and{" "}
                <span className="from-primary to-accent bg-linear-to-r bg-clip-text text-transparent">
                  Secure the Web
                </span>
              </h1>

              <p className="text-muted-foreground max-w-lg text-lg text-pretty">
                Join thousands of OWASP researchers and developers to discover security projects, find collaboration
                opportunities, and build a safer digital future together.
              </p>
            </div>

            <div className="animate-fade-in animation-delay-400 flex flex-col gap-4 pt-4 sm:flex-row">
              <Button asChild size="lg" className="group gap-2 shadow-lg">
                <Link href="/projects">
                  Explore Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="shadow-sm">
                <Link href="/members">Find Contributors</Link>
              </Button>
            </div>

            {/* Real-time Stats */}
            <div className="animate-fade-in border-border animation-delay-600 flex flex-wrap gap-8 border-t pt-8">
              <div className="group cursor-default">
                <div className="text-foreground group-hover:text-primary flex items-baseline gap-2 text-3xl font-bold transition-colors">
                  {stats.projects.toLocaleString()}
                  <span className="text-primary text-lg">+</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                  <Code2 className="h-3 w-3" />
                  Security Projects
                </div>
              </div>
              <div className="group cursor-default">
                <div className="text-foreground group-hover:text-primary flex items-baseline gap-2 text-3xl font-bold transition-colors">
                  {stats.members.toLocaleString()}
                  <span className="text-primary text-lg">+</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                  <Users className="h-3 w-3" />
                  Community Members
                </div>
              </div>
              <div className="group cursor-default">
                <div className="text-foreground group-hover:text-primary flex items-baseline gap-2 text-3xl font-bold transition-colors">
                  {stats.chapters.toLocaleString()}
                  <span className="text-primary text-lg">+</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                  <Globe className="h-3 w-3" />
                  Global Chapters
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="animate-fade-in animation-delay-800 relative hidden lg:block">
            <div className="bg-card border-border group hover:shadow-primary/10 relative rounded-2xl border p-8 shadow-2xl transition-all">
              {/* Decorative elements */}
              <div className="from-primary/20 absolute top-0 right-0 h-32 w-32 bg-linear-to-br to-transparent blur-2xl" />
              <div className="from-accent/20 absolute bottom-0 left-0 h-32 w-32 bg-linear-to-tr to-transparent blur-2xl" />

              <div className="relative space-y-6">
                {/* Simulated code/project card */}
                <div className="space-y-3">
                  <div className="bg-primary/20 h-4 w-3/4 animate-pulse rounded-full" />
                  <div className="bg-primary/15 animation-delay-200 h-4 w-full animate-pulse rounded-full" />
                  <div className="bg-primary/10 animation-delay-400 h-4 w-5/6 animate-pulse rounded-full" />
                </div>

                <div className="border-border space-y-3 border-t pt-6">
                  <div className="bg-muted animation-delay-600 h-3 w-1/2 animate-pulse rounded-full" />
                  <div className="bg-muted animation-delay-800 h-3 w-2/3 animate-pulse rounded-full" />
                  <div className="bg-muted animation-delay-1000 h-3 w-1/2 animate-pulse rounded-full" />
                </div>

                <div className="flex gap-2 pt-4">
                  <div className="bg-primary/30 h-8 w-20 rounded-lg" />
                  <div className="bg-accent/30 h-8 w-16 rounded-lg" />
                  <div className="bg-muted h-8 w-24 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
