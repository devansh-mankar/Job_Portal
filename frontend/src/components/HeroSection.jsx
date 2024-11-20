import ActiveUsers from "./usage/ActiveUsers";
import LatestJobs from "./LatestJobs";

import { AccordionCustomAnimation } from "./accordian";
import Mentorship from "./Mentorship";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Heading from "./Heading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HeroSection() {
  useGetAllJobs();
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/adminHome");
    }
  });
  return (
    <div className="mt-10 w-full px-8 text-center">
      <div className="flex flex-col gap-5 my-8">
        <Heading />
        <ActiveUsers />
        <LatestJobs />
        <Mentorship />
        <AccordionCustomAnimation />
      </div>
    </div>
  );
}
