import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const application = [
  {
    date: "10-11-24",
    jobRole: "Frontend Developer",
    status: "pending",
    company: "Linkedin",
  },
  {
    date: "10-11-24",
    jobRole: "Frontend Developer",
    status: "pending",
    company: "PayPal",
  },
  {
    date: "10-11-24",
    jobRole: "Frontend Developer",
    status: "pending",
    company: "Google",
  },
  {
    date: "10-11-24",
    jobRole: "Frontend Developer",
    status: "pending",
    company: "Amazon",
  },
  {
    date: "10-11-24",
    jobRole: "Frontend Developer",
    status: "pending",
    company: "PayPal",
  },
  {
    date: "10-11-24",
    jobRole: "Frontend Developer",
    status: "pending",
    company: "Tesla",
  },
  {
    date: "10-11-24",
    jobRole: "Frontend Developer",
    status: "pending",
    company: "Barclays",
  },
];

export default function TableJobs() {
  return (
    <Table>
      <TableCaption>A list of your applied Jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Job role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {application.map((date) => (
          <TableRow key={date.date}>
            <TableCell className="font-medium">{date.date}</TableCell>
            <TableCell>{date.jobRole}</TableCell>
            <TableCell>{date.company}</TableCell>
            <TableCell className="text-right">{date.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
