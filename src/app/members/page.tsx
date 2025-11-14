import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

import MembersBrowser from "../../components/members-browser";

export default async function MembersPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <MembersBrowser />
      <Footer />
    </div>
  );
}