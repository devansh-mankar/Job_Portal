import { setCompanies } from "@/redux/companySlice";

import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useGetAllCompanies() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/getCompany`, {
          withCredentials: true,
        });

        if (res.data.success) {
          // Corrected "res.date.success" to "res.data.success"
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompanies();
  }, [dispatch]); // Add dispatch to the dependency array
}
