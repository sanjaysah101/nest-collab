import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

import ResourcesLibrary from "../../components/resources-library";

export default async function ResourcesPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <ResourcesLibrary />
      <Footer />
    </div>
  );
}