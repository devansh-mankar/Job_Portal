import Navbar from "../shared/Navbar";
import BarChart from "./BarChart";
import DotPatternBg from "./Grid";

import CalendarD from "./calender";
import BoxRevealDemo from "./BoxReveal";
export default function AdminHome() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <DotPatternBg />
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <Navbar />
        <div className="p-6 text-center">
          <h1 className="m-3 text-3xl font-semibold">
            Hello, <span className="text-cyan-500">Recruiter!</span>
          </h1>
          <div className="relative">
            <div className="absolute top-0 right-0 m-2 shadow-lg">
              <CalendarD />
            </div>
            <div>
              <h3 className="font-semibold mb-5">
                &quot;Streamline your hiring process: Register companies, post
                job openings, and manage candidate applications—all in one
                place!&quot;
              </h3>
            </div>

            <div className="flex flex-col justify-center items-center w-full">
              <div className="m-5">
                <BoxRevealDemo />
              </div>
              <div className="w-2/5 shadow-lg">
                <BarChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
