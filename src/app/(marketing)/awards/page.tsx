import { Home } from "@/features/home/Home";
import { partners } from "@/data/content";

// Keep the marketing homepage statically renderable. Dynamic data is fetched
// by Home on the client so backend cold starts cannot block the first render.
export default function HomePage() {
  return <Home partners={partners} />;
}
