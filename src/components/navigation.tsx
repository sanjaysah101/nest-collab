"use client";

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
            <div className="from-primary to-primary/70 flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br">
              <span className="text-primary-foreground text-sm font-bold">NC</span>
            </div>
            <span className="text-foreground group-hover:text-primary text-lg font-bold transition-colors">
              NestCollab
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/projects" className="text-foreground hover:text-primary text-sm font-medium transition-colors">
              Projects
            </Link>
            <Link
              href="/contributors"
              className="text-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Contributors
            </Link>
            <Link
              href="/discussions"
              className="text-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Discussions
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link href="/projects">Get Started</Link>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="hover:bg-secondary rounded-lg p-2 transition-colors md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
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
              href="/contributors"
              className="text-foreground hover:bg-secondary block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Contributors
            </Link>
            <Link
              href="/discussions"
              className="text-foreground hover:bg-secondary block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Discussions
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
