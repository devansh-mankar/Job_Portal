import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import { RetroGridbg } from "./RetroGrid";
import { useState } from "react";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setSingleCompany } from "@/redux/companySlice.js";

export default function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  async function handleRegister() {
    if (!companyName) {
      return toast.error("Company Name is required");
    }
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);

        const companyId = res?.data?.company?._id;

        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background pattern */}
      <div className="absolute  inset-0 z-0">
        <RetroGridbg />
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-4xl mx-auto">
          <div className="my-16">
            <h1 className="font-bold text-2xl"> Company Name</h1>
            <p className="text-gray-500">
              What&apos;s the name of the company..?
            </p>
          </div>
          <Label>Company Name</Label>
          <Input
            type="text"
            className="my-2 shadow-lg border-green-500 border-2"
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter Company Name"
          />
          <div className="flex items-center gap-2 my-10">
            <Button
              variant="destructive"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button onClick={handleRegister}>Continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
