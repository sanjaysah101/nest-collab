import Link from "next/link";

import { ArrowRight, BookOpen, Code2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="from-primary/10 via-primary/5 to-accent/10 border-primary/20 relative overflow-hidden rounded-2xl border bg-linear-to-br p-12">
          {/* Background decoration */}
          <div className="from-primary/20 absolute top-0 right-0 h-64 w-64 bg-linear-to-br to-transparent blur-3xl" />
          <div className="from-accent/20 absolute bottom-0 left-0 h-64 w-64 bg-linear-to-tr to-transparent blur-3xl" />

          <div className="relative space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-foreground text-3xl font-bold md:text-4xl">Ready to Join the OWASP Community?</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                Start exploring projects, connecting with security experts, and contributing to the world&apos;s leading
                open-source security initiatives today.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-2">
                <Code2 className="text-primary h-5 w-5" />
                <span className="text-foreground text-sm font-medium">100+ Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-primary h-5 w-5" />
                <span className="text-foreground text-sm font-medium">1000+ Members</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="text-primary h-5 w-5" />
                <span className="text-foreground text-sm font-medium">15+ Resources</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="group gap-2 shadow-lg">
                <Link href="/projects">
                  Start Exploring
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="shadow-sm">
                <Link href="/members">Browse Community</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="shadow-sm">
                <Link href="/resources">View Resources</Link>
              </Button>
            </div>

            {/* Additional Info */}
            <p className="text-muted-foreground text-sm">
              Built with ❤️ for the{" "}
              <a
                href="https://dorahacks.io/hackathon/owasp-nest-2025-hackathon/detail"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                OWASP Nest API Hackathon
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
