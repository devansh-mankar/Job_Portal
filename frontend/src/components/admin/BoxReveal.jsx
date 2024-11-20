import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BoxReveal from "@/components/ui/box-reveal";

export default function BoxRevealDemo() {
  const [isReady, setIsReady] = useState(false);

  // Simulate an asynchronous operation
  useEffect(() => {
    const loadData = async () => {
      // Simulate data fetching or initialization
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsReady(true);
    };

    loadData();
  }, []);

  if (!isReady) {
    return <p>Loading...</p>; // Render a loading state while waiting
  }

  return (
    <div className="m-5 size-full max-w-lg items-center justify-center overflow-hidden pt-8 bg-white">
      <BoxReveal boxColor={"#000000"} duration={0.5}>
        <p className="text-5xl font-semibold text-black">
          Welcome, <span className="text-cyan-500">Recruiter!</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#000000"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem] text-black">
          Streamline your hiring process effortlessly.
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#000000"} duration={0.5}>
        <div className="mt-6 text-black">
          <p>
            -&gt; Register your company and build your team. <br />
            -&gt; Post job openings and attract top talent. <br />
            -&gt; Track and manage candidate applications in real-time.
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#000000"} duration={0.5}>
        <Button className="mt-[1.6rem] bg-[#000000] text-white">
          Get Started
        </Button>
      </BoxReveal>
    </div>
  );
}
