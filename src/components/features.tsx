import { BookOpen, MessageSquare, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Find Your Team",
    description: "Discover security researchers and developers actively contributing to OWASP projects.",
  },
  {
    icon: Zap,
    title: "Project Discovery",
    description: "Browse thousands of security initiatives and find the perfect project to contribute to.",
  },
  {
    icon: BookOpen,
    title: "Resource Library",
    description: "Access shared tools, techniques, and documentation from the security community.",
  },
  {
    icon: MessageSquare,
    title: "Active Discussions",
    description: "Engage in real-time conversations and collaborate on security challenges.",
  },
];

export default function Features() {
  return (
    <section className="bg-secondary/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">Collaborate with Purpose</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            NestCollab provides everything you need to connect with the global security community and make an impact.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card border-border hover:border-primary/50 group rounded-xl border p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-colors">
                  <Icon className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
