import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

import SponsorsBrowser from "../../components/sponsors-browser";

export default async function SponsorsPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <SponsorsBrowser />
      <Footer />
    </div>
  );
}