import JobCard from "./Card";
import { useSelector } from "react-redux";

export default function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="">
      <h1 className="font-bold text-cyan-500 text-4xl">
        Recent Openings and Announcements
      </h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 ">
        {allJobs.length <= 0 ? (
          <span>NO JOBS AVALAIBle</span>
        ) : (
          allJobs.slice().map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}
