import Link from "next/link";

import { ArrowRight, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden">
      {/* Background */}
      <div className="from-primary/10 via-background to-background absolute inset-0 bg-linear-to-br" />
      <div className="bg-primary/5 absolute top-20 right-10 h-72 w-72 rounded-full blur-3xl" />
      <div className="bg-accent/5 absolute bottom-10 left-10 h-96 w-96 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex w-fit items-center gap-2">
              <Shield className="text-primary h-5 w-5" />
              <span className="text-primary bg-primary/10 rounded-full px-3 py-1 text-sm font-medium">
                Secure Community
              </span>
            </div>

            <h1 className="text-foreground text-4xl leading-tight font-bold text-balance md:text-5xl">
              Connect, Collaborate, and Secure the Web
            </h1>

            <p className="text-muted-foreground max-w-lg text-lg text-pretty">
              Join OWASP researchers and developers to discover security projects, find collaboration opportunities, and
              build a safer digital future together.
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/projects">
                  Explore Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contributors">Find Contributors</Link>
              </Button>
            </div>

            <div className="border-border flex flex-col gap-8 border-t pt-8 sm:flex-row">
              <div>
                <div className="text-foreground text-2xl font-bold">1000+</div>
                <div className="text-muted-foreground text-sm">Active Projects</div>
              </div>
              <div>
                <div className="text-foreground text-2xl font-bold">5000+</div>
                <div className="text-muted-foreground text-sm">Security Experts</div>
              </div>
              <div>
                <div className="text-foreground text-2xl font-bold">100K+</div>
                <div className="text-muted-foreground text-sm">Community Members</div>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="bg-card border-border rounded-xl border p-8 shadow-lg">
              <div className="space-y-4">
                <div className="bg-primary/20 h-3 w-3/4 rounded-full" />
                <div className="bg-primary/20 h-3 w-full rounded-full" />
                <div className="bg-primary/20 h-3 w-5/6 rounded-full" />
                <div className="space-y-3 pt-6">
                  <div className="bg-muted h-2 w-1/2 rounded-full" />
                  <div className="bg-muted h-2 w-2/3 rounded-full" />
                  <div className="bg-muted h-2 w-1/2 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
