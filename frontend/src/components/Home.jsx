import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import { FooterWithSocialLinks } from "./shared/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <GridPatternLinearGradient />
      <FooterWithSocialLinks />
    </div>
  );
}

export function GridPatternLinearGradient() {
  return (
    <div className="relative flex  min-h-screen size-full overflow-hidden rounded-lg border bg-background p-5 md:shadow-xl">
      <HeroSection />

      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
        )}
      />
    </div>
  );
}
