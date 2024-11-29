import { useNavigate } from "react-router-dom";

import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { useSelector } from "react-redux";

export default function ApplicantTable() {
  const navigate = useNavigate();
  const { applicants } = useSelector((store) => store.application);
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Applicants.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>

            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullName}</TableCell>

                <TableCell>
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <span className="p-2 text-blue-300 cursor-pointer hover:text-blue-500">
                    <button onClick={() => navigate("/admin/application/:id")}>
                      {" "}
                      View
                    </button>
                  </span>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
