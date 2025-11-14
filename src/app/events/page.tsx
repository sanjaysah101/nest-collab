import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

import EventsBrowser from "../../components/events-browser";

export default async function EventsPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <EventsBrowser />
      <Footer />
    </div>
  );
}