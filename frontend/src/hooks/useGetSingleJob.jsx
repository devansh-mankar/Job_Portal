import { setAllJobs, setSingleJob } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useGetSingleJob(jobId) {
  const dispatch = useDispatch();
  // Add dispatch to the dependency array
}
