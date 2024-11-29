import Navbar from "../shared/Navbar";
import { RetroGridbg } from "./RetroGrid";
import { BorderBeam } from "../ui/border-beam";
import HyperText from "../ui/hyper-text";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

export default function PostJob() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experience: "",
    location: "",
    jobType: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((state) => state.company);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company?.companyName?.toLowerCase() === value?.toLowerCase()
    );
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    if (
      !input.title ||
      !input.description ||
      !input.requirements ||
      !input.salary ||
      !input.experience || // Keep this field consistent
      !input.location ||
      !input.jobType ||
      !input.position ||
      !input.companyId
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${JOB_API_ENDPOINT}/post`,
        {
          ...input,
          // Explicitly map experience to experienceLevel
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <RetroGridbg /> {/* This adds the retro grid background */}
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <Navbar />

        <div className="flex flex-col items-center justify-center min-h-screen">
          <HyperText className="text-xl mb-10 flex" text="Post A New Job" />
          <div className="w-2/4 h-[500px]  shadow-2xl text-white  relative overflow-hidden">
            <form onSubmit={submitHandler}>
              <div className="grid grid-cols-2 gap-4 mt-10 m-5">
                <div>
                  <Label className="text-slate-400 gap-1">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Enter the job title"
                    value={input.title}
                    onChange={changeEventHandler}
                    className="border-green-500 focus:ring focus:ring-green-400 text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-slate-400 gap-1">Description</Label>
                  <Input
                    type="text"
                    name="description"
                    placeholder="Enter a description"
                    value={input.description}
                    onChange={changeEventHandler}
                    className="border-green-500 focus:ring focus:ring-green-400 text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-slate-400">Requirements</Label>
                  <Input
                    type="text"
                    name="requirements"
                    placeholder="Enter the requirements"
                    value={input.requirements}
                    onChange={changeEventHandler}
                    className="border-green-500 focus:ring  focus:ring-green-400 text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-slate-400">Salary</Label>
                  <Input
                    type="text"
                    name="salary"
                    placeholder="Enter the location"
                    value={input.salary}
                    onChange={changeEventHandler}
                    className="border-green-500 focus:ring focus:ring-green-400 text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-slate-400">Location</Label>
                  <Input
                    type="text"
                    name="location"
                    placeholder="Enter the location"
                    value={input.location}
                    onChange={changeEventHandler}
                    className="border-green-500 focus:ring focus:ring-green-400 text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-slate-400">Job Type</Label>
                  <Input
                    type="text"
                    name="jobType"
                    placeholder="Enter the Type of Job"
                    value={input.jobType}
                    onChange={changeEventHandler}
                    className="border-green-500 focus:ring focus:ring-green-400 text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-slate-400">Experience</Label>
                  <Input
                    type="text"
                    name="experience"
                    placeholder="Enter the years of experience"
                    value={input.experience}
                    onChange={changeEventHandler}
                    className="border-green-500 focus:ring focus:ring-green-400 text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-slate-400">Position</Label>
                  <Input
                    type="number"
                    name="position"
                    placeholder="Enter the job position"
                    value={input.position}
                    onChange={changeEventHandler}
                    className="border-green-500 focus:ring focus:ring-green-400 text-gray-400"
                  />
                </div>
                {companies.length > 0 && (
                  <Select
                    onValueChange={selectChangeHandler}
                    className="border-green-500 focus:ring focus:ring-green-400"
                  >
                    <SelectTrigger className="w-[400px] text-slate-400">
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company?.companyName?.toLowerCase()}
                          >
                            {company.companyName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div className="flex items-center justify-center">
                {loading ? (
                  <Button variant="outline" className=" my-5 w-1/3 shadow-xl">
                    <Loader2 className="animate-spin" />
                    Almost there...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="outline"
                    className=" my-5 w-1/3 shadow-xl "
                  >
                    Post the Job
                  </Button>
                )}
              </div>
              <div>
                {" "}
                {companies.length === 0 && (
                  <p className="text-xs text-red-600 font-bold text-center">
                    *Please register a company first,before posting a job!
                  </p>
                )}
              </div>
            </form>

            <BorderBeam size={250} duration={12} delay={9} />
          </div>
        </div>
      </div>
    </div>
  );
}
