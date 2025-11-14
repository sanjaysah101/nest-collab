import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

import IssuesBrowser from "../../components/issues-browser";

export default async function IssuesPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <IssuesBrowser />
      <Footer />
    </div>
  );
}