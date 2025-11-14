"use client";

import { useState } from "react";

import {
  BookOpen,
  Code2,
  FileText,
  GraduationCap,
  Lightbulb,
  Search,
  Shield,
  Wrench,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const categories = [
  { id: "all", label: "All Resources", icon: BookOpen },
  { id: "tools", label: "Security Tools", icon: Wrench },
  { id: "guides", label: "Guides & Docs", icon: FileText },
  { id: "learning", label: "Learning Paths", icon: GraduationCap },
  { id: "videos", label: "Video Tutorials", icon: Video },
  { id: "best-practices", label: "Best Practices", icon: Lightbulb },
];

const resources = [
  {
    category: "tools",
    title: "OWASP ZAP",
    description: "World's most widely used web app scanner. Free and open source.",
    url: "https://www.zaproxy.org/",
    tags: ["Scanner", "Testing", "Flagship"],
    icon: Shield,
  },
  {
    category: "tools",
    title: "OWASP Dependency-Check",
    description: "Software Composition Analysis (SCA) tool detecting publicly disclosed vulnerabilities.",
    url: "https://owasp.org/www-project-dependency-check/",
    tags: ["SCA", "Dependencies", "Flagship"],
    icon: Code2,
  },
  {
    category: "tools",
    title: "OWASP ModSecurity Core Rule Set",
    description: "Set of generic attack detection rules for use with ModSecurity or compatible web application firewalls.",
    url: "https://coreruleset.org/",
    tags: ["WAF", "Protection", "Flagship"],
    icon: Shield,
  },
  {
    category: "guides",
    title: "OWASP Top 10",
    description: "Standard awareness document for developers and web application security.",
    url: "https://owasp.org/www-project-top-ten/",
    tags: ["Security", "Awareness", "Essential"],
    icon: FileText,
  },
  {
    category: "guides",
    title: "OWASP Cheat Sheet Series",
    description: "Concise collection of high value information on specific application security topics.",
    url: "https://cheatsheetseries.owasp.org/",
    tags: ["Reference", "Quick Guide", "Essential"],
    icon: FileText,
  },
  {
    category: "guides",
    title: "OWASP Testing Guide",
    description: "Comprehensive guide to testing the security of web applications and web services.",
    url: "https://owasp.org/www-project-web-security-testing-guide/",
    tags: ["Testing", "Methodology", "Flagship"],
    icon: FileText,
  },
  {
    category: "learning",
    title: "OWASP WebGoat",
    description: "Deliberately insecure application for learning web application security lessons.",
    url: "https://owasp.org/www-project-webgoat/",
    tags: ["Training", "Hands-on", "Beginner"],
    icon: GraduationCap,
  },
  {
    category: "learning",
    title: "OWASP Juice Shop",
    description: "Probably the most modern and sophisticated insecure web application.",
    url: "https://owasp.org/www-project-juice-shop/",
    tags: ["Training", "CTF", "Flagship"],
    icon: GraduationCap,
  },
  {
    category: "learning",
    title: "OWASP Security Knowledge Framework",
    description: "Expert guidance on building secure applications by design.",
    url: "https://www.securityknowledgeframework.org/",
    tags: ["Training", "Framework", "Lab"],
    icon: GraduationCap,
  },
  {
    category: "best-practices",
    title: "OWASP ASVS",
    description: "Application Security Verification Standard - basis for testing technical security controls.",
    url: "https://owasp.org/www-project-application-security-verification-standard/",
    tags: ["Standards", "Verification", "Flagship"],
    icon: Lightbulb,
  },
  {
    category: "best-practices",
    title: "OWASP SAMM",
    description: "Software Assurance Maturity Model - framework to help organizations formulate and implement security strategy.",
    url: "https://owaspsamm.org/",
    tags: ["Maturity", "Strategy", "Flagship"],
    icon: Lightbulb,
  },
  {
    category: "best-practices",
    title: "OWASP Proactive Controls",
    description: "Top 10 security techniques that should be included in every software development project.",
    url: "https://owasp.org/www-project-proactive-controls/",
    tags: ["Development", "Controls", "Essential"],
    icon: Lightbulb,
  },
  {
    category: "videos",
    title: "OWASP DevSlop",
    description: "Collection of DevSecOps-focused videos and resources.",
    url: "https://www.youtube.com/channel/UCSmjcWvgVBqF3x_7e5rfe3A",
    tags: ["DevSecOps", "Video", "Tutorial"],
    icon: Video,
  },
  {
    category: "guides",
    title: "OWASP API Security Top 10",
    description: "Awareness document focused on strategies and solutions to understand and mitigate API security risks.",
    url: "https://owasp.org/www-project-api-security/",
    tags: ["API", "Security", "Essential"],
    icon: FileText,
  },
  {
    category: "tools",
    title: "OWASP Amass",
    description: "In-depth attack surface mapping and asset discovery.",
    url: "https://owasp.org/www-project-amass/",
    tags: ["Reconnaissance", "Discovery", "Flagship"],
    icon: Wrench,
  },
];

export default function ResourcesLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">OWASP Resource Library</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Curated collection of OWASP tools, guides, and learning resources to help you build secure applications.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 space-y-6">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
            <Input
              placeholder="Search resources, tools, guides..."
              className="h-11 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground text-sm">
            Found {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card
                key={index}
                className="hover:border-primary/50 group flex flex-col p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="bg-primary/10 group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-lg transition-colors">
                    <Icon className="text-primary h-6 w-6" />
                  </div>
                </div>

                <h3 className="text-foreground group-hover:text-primary mb-2 text-lg font-semibold transition-colors">
                  {resource.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-3 flex-1 text-sm">{resource.description}</p>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {resource.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hover:text-primary mt-auto w-full justify-start"
                >
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    Learn More →
                  </a>
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="py-12 text-center">
            <BookOpen className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground mb-4">No resources found. Try adjusting your search or filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Contribution CTA */}
        <div className="bg-primary/5 border-primary/20 mt-12 rounded-xl border p-8 text-center">
          <h3 className="text-foreground mb-2 text-xl font-semibold">Want to contribute?</h3>
          <p className="text-muted-foreground mb-6">
            Join the OWASP community and help improve these resources or create new ones.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild>
              <a href="https://owasp.org/membership/" target="_blank" rel="noopener noreferrer">
                Become a Member
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="/projects">Browse Projects</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}