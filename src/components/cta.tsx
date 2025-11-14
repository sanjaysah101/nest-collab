import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="bg-primary/5 border-primary/20 mx-auto max-w-3xl space-y-8 rounded-2xl border p-12 text-center">
        <h2 className="text-foreground text-3xl font-bold md:text-4xl">Ready to Make a Difference?</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Start exploring projects, connecting with security experts, and contributing to the world&aps;s leading
          open-source security initiatives.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="/projects">
              Start Exploring
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contributors">Browse Community</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
