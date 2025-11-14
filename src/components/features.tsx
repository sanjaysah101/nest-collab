import Link from "next/link";

import { BookOpen, Calendar, Code2, GitBranch, Globe, Search, Shield, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Code2,
    title: "Project Discovery",
    description: "Browse 100+ OWASP security projects with advanced filtering by maturity level and technology.",
    link: "/projects",
    stat: "100+",
    statLabel: "Projects",
  },
  {
    icon: Users,
    title: "Community Members",
    description: "Connect with 1000+ security researchers, developers, and experts from around the world.",
    link: "/members",
    stat: "1000+",
    statLabel: "Members",
  },
  {
    icon: Globe,
    title: "Global Chapters",
    description: "Discover 200+ OWASP chapters worldwide and join your local security community.",
    link: "/chapters",
    stat: "200+",
    statLabel: "Chapters",
  },
  {
    icon: Calendar,
    title: "Events & Conferences",
    description: "Never miss an OWASP event, conference, or meetup with our comprehensive events calendar.",
    link: "/events",
    stat: "Year-round",
    statLabel: "Events",
  },
  {
    icon: GitBranch,
    title: "Open Source Repos",
    description: "Explore OWASP repositories with GitHub stats, contributors, and contribution opportunities.",
    link: "/repositories",
    stat: "Active",
    statLabel: "Repositories",
  },
  {
    icon: Search,
    title: "Issue Tracker",
    description: "Find open issues to contribute to across all OWASP projects and start making an impact.",
    link: "/issues",
    stat: "Open",
    statLabel: "Issues",
  },
  {
    icon: BookOpen,
    title: "Resource Library",
    description: "Curated collection of OWASP tools, guides, and learning resources for secure development.",
    link: "/resources",
    stat: "15+",
    statLabel: "Resources",
  },
  {
    icon: Shield,
    title: "Sponsor Showcase",
    description: "Recognize organizations supporting OWASP's mission to improve software security.",
    link: "/sponsors",
    stat: "Platinum+",
    statLabel: "Sponsors",
  },
];

export default function Features() {
  return (
    <section className="bg-secondary/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-4 py-1 text-sm font-medium">
            Comprehensive Platform
          </div>
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">Everything You Need to Collaborate</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            NestCollab integrates all OWASP Nest API endpoints to provide a unified discovery and collaboration
            experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                href={feature.link}
                className="bg-card border-border hover:border-primary/50 group block rounded-xl border p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="bg-primary/10 group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-lg transition-colors">
                    <Icon className="text-primary h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-foreground text-lg font-bold">{feature.stat}</div>
                    <div className="text-muted-foreground text-xs">{feature.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-foreground group-hover:text-primary mb-2 text-lg font-semibold transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">{feature.description}</p>
                <span className="text-primary group-hover:gap-2 inline-flex items-center gap-1 text-sm font-medium transition-all">
                  Explore
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/projects">
              Start Exploring
              <Search className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
