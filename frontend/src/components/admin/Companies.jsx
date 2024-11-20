import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompanyTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompaniesByText } from "@/redux/companySlice";

export default function Companies() {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompaniesByText(input));
  }, [input, dispatch]);
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-16">
        <div className="flex items-center justify-between">
          <Input
            className="w-full m-2 shadow-lg border-green-400 focus:outline-none 
             border-2"
            placeholder="filter by Name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies/create")}
          >
            New Company
          </Button>
        </div>
        <CompanyTable />
      </div>
    </>
  );
}
