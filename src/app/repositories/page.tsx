import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

import RepositoriesBrowser from "../../components/repositories-browser";

export default async function RepositoriesPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <RepositoriesBrowser />
      <Footer />
    </div>
  );
}