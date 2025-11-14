import Link from "next/link";

import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-border bg-secondary/30 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="from-primary to-primary/70 flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br">
                <span className="text-primary-foreground text-sm font-bold">NC</span>
              </div>
              <span className="text-foreground font-bold">NestCollab</span>
            </div>
            <p className="text-muted-foreground text-sm">Connecting security researchers and developers worldwide.</p>
          </div>

          <div>
            <h4 className="text-foreground mb-4 font-semibold">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contributors" className="text-muted-foreground hover:text-primary transition-colors">
                  Contributors
                </Link>
              </li>
              <li>
                <Link href="/discussions" className="text-muted-foreground hover:text-primary transition-colors">
                  Discussions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground mb-4 font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://nest.owasp.dev/api/v0/docs"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  API Docs
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground mb-4 font-semibold">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Join Us
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://github.com/sanjaysah101/nest-collab"
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <Github size={16} />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border flex items-center justify-between border-t pt-8">
          <p className="text-muted-foreground text-sm">© 2025 NestCollab. Part of the OWASP community.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
