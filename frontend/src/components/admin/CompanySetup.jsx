import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { RetroGridbg } from "./RetroGrid";
import { useState } from "react";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Loader2 } from "lucide-react";
import useGetCompanyById from "@/hooks/useGetCompanyById";

export default function CompanySetup() {
  const params = useParams();

  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const singleCompany = useSelector((state) => state.company.singleCompany);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];

    setInput({ ...input, file });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    // Submit logic goes here

    const formData = new FormData();
    formData.append("companyName", input.companyName);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      console.log(input.file);
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(singleCompany);
    setInput({
      companyName: singleCompany?.companyName || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <RetroGridbg />
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-4xl mx-auto">
          <div className="my-20 flex flex-row items-center justify-center gap-5">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="shadow-xl"
            >
              <ArrowLeft />
              Back
            </Button>
            <h1 className="font-semibold text-cyan-500">Company Setup</h1>
          </div>

          {/* Input fields in a 2x2 grid */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Company Name</Label>
                <Input
                  type="text"
                  name="companyName"
                  placeholder="Enter the company name"
                  value={input.companyName}
                  onChange={changeEventHandler}
                  className="border-green-500 focus:ring focus:ring-green-400"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="Enter a description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="border-green-500 focus:ring focus:ring-green-400"
                />
              </div>
              <div>
                <Label>Website</Label>
                <Input
                  type="text"
                  name="website"
                  placeholder="Enter the website URL"
                  value={input.website}
                  onChange={changeEventHandler}
                  className="border-green-500 focus:ring focus:ring-green-400"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  placeholder="Enter the location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="border-green-500 focus:ring focus:ring-green-400"
                />
              </div>
              <div>
                <Label>File</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="border-green-500 focus:ring focus:ring-green-400"
                />
              </div>
            </div>
            <div>
              {loading ? (
                <Button variant="outline" className=" my-5 w-full shadow-xl">
                  <Loader2 className="animate-spin" />
                  Almost there...
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="outline"
                  className=" my-5 w-full shadow-xl "
                >
                  Update Company
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
