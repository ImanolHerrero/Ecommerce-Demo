import Newest from "@/src/components/Newest/Newest";
import Hero05 from "@/src/components/hero-05/hero-05";

export default async function IndexPage() {
  return (
    <div className="bg-white px-14">
      <Hero05 />
      <Newest />
    </div>
  );
}
