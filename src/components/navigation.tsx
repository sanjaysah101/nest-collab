"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ThemeToggle } from "./theme";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background border-border sticky top-0 z-50 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <Image
              src="/favicon_io/nest-collab-logo.jpg"
              alt="NestCollab Logo"
              className="h-8 w-8 rounded-lg object-cover"
              width={32}
              height={32}
            />
            <span className="text-foreground group-hover:text-primary text-lg font-bold transition-colors">
              NestCollab
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-5 md:flex">
            <Link href="/projects" className="text-foreground hover:text-primary text-sm font-medium transition-colors">
              Projects
            </Link>
            <Link href="/members" className="text-foreground hover:text-primary text-sm font-medium transition-colors">
              Members
            </Link>
            <Link
              href="/resources"
              className="text-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Resources
            </Link>
            <Link href="/issues" className="text-foreground hover:text-primary text-sm font-medium transition-colors">
              Issues
            </Link>
            <Link href="/events" className="text-foreground hover:text-primary text-sm font-medium transition-colors">
              Events
            </Link>
            <Link href="/sponsors" className="text-foreground hover:text-primary text-sm font-medium transition-colors">
              Sponsors
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link href="/projects">Get Started</Link>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="hover:bg-secondary rounded-lg p-2 transition-colors" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="space-y-2 pb-4 md:hidden">
            <Link
              href="/projects"
              className="text-foreground hover:bg-secondary block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/members"
              className="text-foreground hover:bg-secondary block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Members
            </Link>
            <Link
              href="/resources"
              className="text-foreground hover:bg-secondary block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/issues"
              className="text-foreground hover:bg-secondary block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Issues
            </Link>
            <Link
              href="/events"
              className="text-foreground hover:bg-secondary block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Events
            </Link>
            <Link
              href="/chapters"
              className="text-foreground hover:bg-secondary block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Chapters
            </Link>
            <Link
              href="/repositories"
              className="text-foreground hover:bg-secondary block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Repositories
            </Link>
            <Link
              href="/sponsors"
              className="text-foreground hover:bg-secondary block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Sponsors
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
