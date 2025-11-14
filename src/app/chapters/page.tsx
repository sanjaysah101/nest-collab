import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

import ChaptersBrowser from "../../components/chapters-browser";

export default async function ChaptersPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <ChaptersBrowser />
      <Footer />
    </div>
  );
}