import { Search } from "lucide-react";
import { Button } from "@headlessui/react";
import InfiniteLogoScroll from "./InfiniteScroll/InfiniteScroll";

export default function Heading() {
  return (
    <div>
      <span className="text-md font-semibold">The No.1 Job hunt site.</span>
      <h1 className="text-4xl font-bold">
        Search, Apply & <br /> Get Your{"  "}
        <span className="text-cyan-500">Dream Job.</span>
      </h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit
        sint deleniti molestiae dolore quidem?
      </p>
      <div className="flex w-[40%] h-15 shadow-2xl border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
        <input
          type="text"
          placeholder="find your dream jobs"
          className="outline-none border-none w-full"
        />
        <Button className="rounded-r-full h-10 w-10 p-2 bg-cyan-500 hover:cursor-pointer">
          <Search className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-10 mb-8">
        <h2 className="font-bold text-cyan-500">
          Together with Industry-Leading Partners.
        </h2>
        <InfiniteLogoScroll />
      </div>
    </div>
  );
}
