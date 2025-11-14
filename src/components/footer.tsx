import Link from "next/link";

import { Github, Heart, Trophy } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-border bg-secondary/30 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="from-primary to-primary/70 flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br">
                <span className="text-primary-foreground text-sm font-bold">NC</span>
              </div>
              <span className="text-foreground font-bold">NestCollab</span>
            </Link>
            <p className="text-muted-foreground mb-4 text-sm">
              Connecting security researchers and developers worldwide through the OWASP Nest API.
            </p>
            <div className="bg-primary/10 text-primary flex w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-medium">
              <Trophy className="h-3 w-3" />
              Hackathon Project
            </div>
          </div>

          {/* Discover */}
          <div>
            <h4 className="text-foreground mb-4 font-semibold">Discover</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/members" className="text-muted-foreground hover:text-primary transition-colors">
                  Members
                </Link>
              </li>
              <li>
                <Link href="/chapters" className="text-muted-foreground hover:text-primary transition-colors">
                  Chapters
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contribute */}
          <div>
            <h4 className="text-foreground mb-4 font-semibold">Contribute</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/issues" className="text-muted-foreground hover:text-primary transition-colors">
                  Open Issues
                </Link>
              </li>
              <li>
                <Link href="/repositories" className="text-muted-foreground hover:text-primary transition-colors">
                  Repositories
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/sponsors" className="text-muted-foreground hover:text-primary transition-colors">
                  Sponsors
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-foreground mb-4 font-semibold">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://owasp.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  OWASP Foundation
                </a>
              </li>
              <li>
                <a
                  href="https://nest.owasp.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  OWASP Nest API
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sanjaysah101/nest-collab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://owasp.org/membership/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Become a Member
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-border flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-muted-foreground flex items-center gap-1 text-sm">
            © 2025 NestCollab. Built with <Heart className="text-primary h-3 w-3 fill-current" /> for the OWASP
            community.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="https://github.com/sanjaysah101/nest-collab/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              MIT License
            </a>
            <a
              href="https://owasp.org/www-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              OWASP Policies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
