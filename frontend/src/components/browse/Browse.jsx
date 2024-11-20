import { FooterWithSocialLinks } from "../shared/Footer";
import Navbar from "../shared/Navbar";
import GlobeCard from "./Globe";
import CardWithLink from "../jobs/jobCard";

const randomJobs = [1, 2, 3, 4, 5, 6];

export default function Browse() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center mt-10">
        <GlobeCard />
      </div>
      <div className="m-10 px-4">
        <h1 className="font-bold text-xl text-cyan-500 mb-4">
          Search Results ({randomJobs.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {randomJobs.map((index) => (
            <CardWithLink
              title="Job Title"
              description="This is a brief description of the job."
              link="/job-link"
              key={index}
              className=" hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
      <FooterWithSocialLinks />
    </div>
  );
}
