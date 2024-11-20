"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";

export default function DotPatternbg() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
      <DotPattern
        width={30}
        height={30}
        cx={1.2}
        cy={1.2}
        cr={1.3}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
        )}
      />
    </div>
  );
}
