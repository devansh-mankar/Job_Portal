import { setSingleCompany } from "@/redux/companySlice";

import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useGetCompanyById(companyId) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/getCompany/${companyId}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        if (res.data.success) {
          // Corrected "res.date.success" to "res.data.success"
          dispatch(setSingleCompany(res.data.company));
          console.log(res.data.company);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]); // Add dispatch to the dependency array
}
