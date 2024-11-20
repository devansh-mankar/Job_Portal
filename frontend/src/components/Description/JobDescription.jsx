import { useParams } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

export default function JobDescription() {
  const params = useParams();
  const jobId = params.id;
  const singleJob = useSelector((state) => state.job.singleJob);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const isInitiallyApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?._id || false
  );

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const handleJob = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getJob/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.application.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  // Job details array for easier rendering with bold labels
  const jobDetails = [
    { label: "Role", value: singleJob?.title || "Not specified" },
    { label: "Location", value: singleJob?.location },
    { label: "Experience", value: `${singleJob?.experienceLevel} Year+` },
    { label: "Salary", value: `${singleJob?.salary} LPA` },
    {
      label: "Date Posted",
      value:
        singleJob && singleJob.createdAt
          ? singleJob.createdAt.split("T")[0]
          : "Not specified",
    },
    {
      label: "Description",
      value: singleJob?.description,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex flex-row gap-2">
            <span className="text-gray-500">LOGO</span>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Badge className={"bg-cyan-100"} variant="ghost">
              {singleJob?.salary}LPA
            </Badge>
            <Badge className={"bg-red-300"} variant="ghost">
              {singleJob?.experienceLevel} years+
            </Badge>
            <Badge className={"bg-green-200"} variant="ghost">
              {singleJob?.jobType}
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : handleJob}
          className={`rounded-lg m-5 ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-300"
          }`}
          disabled={isApplied}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-200 font-medium py-4">
        {singleJob?.description}
      </h1>

      <Card className="w-full p-6 shadow-2xl my-10 ">
        <div>
          <ul>
            {jobDetails.map((detail, index) => (
              <li key={index}>
                <strong>{detail.label}:</strong> {detail.value}
              </li>
            ))}
          </ul>
        </div>
        <div className="my-5 space-x-2">
          <span>For more details visit the career page of the site.</span>
          <span className="hover:text-cyan-500 cursor-pointer">
            Career Site
          </span>
        </div>
      </Card>
    </div>
  );
}
