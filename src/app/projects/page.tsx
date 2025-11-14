import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

import ProjectsBrowser from "../../components/projects-browser";

export default async function page() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <ProjectsBrowser />
      <Footer />
    </div>
  );
}
