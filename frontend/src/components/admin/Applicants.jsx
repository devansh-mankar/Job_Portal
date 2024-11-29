import { useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import ApplicantTable from "./ApplicantTable";
import { useEffect } from "react";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { useSelector } from "react-redux";

export default function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        console.log(applicants);
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto m-10">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length}
        </h1>
        <ApplicantTable />
      </div>
    </div>
  );
}
