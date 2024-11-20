import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice";
import { RetroGridbg } from "./RetroGrid"; // Import the RetroGridbg component
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

export default function AdminJobs() {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <RetroGridbg /> {/* This adds the retro grid background */}
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-6xl mx-auto my-16">
          <div className="flex items-center justify-between">
            <Input
              className="w-full m-2 shadow-lg border-green-400 focus:outline-none border-2"
              placeholder="filter by Name,Role"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              variant="outline"
              onClick={() => navigate("/admin/jobs/create")}
            >
              New Job
            </Button>
          </div>
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
}
