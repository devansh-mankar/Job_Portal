import { useTheme } from "next-themes";
import { Badge } from "./ui/badge";
import { MapPin } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import PropTypes from "prop-types";

export default function JobCard({ job }) {
  const { theme } = useTheme();
  return (
    <div className="flex h-[500px] w-full flex-col text-left gap-4 lg:h-[250px] lg:flex-row">
      <MagicCard
        className="cursor-pointer p-6 shadow-2xl flex flex-col justify-between h-full"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        {/* Top Section: Company Name and Job Title */}
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-bold text-green-500">
            {job?.company?.companyName}
          </h1>
          <p className="flex items-center mt-1">
            <span className="mr-1">
              <MapPin className="w-5 h-5" />
            </span>
            {job?.location},India
          </p>
          <h2 className="text-xl font-semibold mt-2">{job?.title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {job?.description} Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Dolorum, odio! Eos quod cupiditate autem?
          </p>
        </div>

        {/* Bottom Section: Centered Badges */}
        <div className="flex justify-center space-x-3 mt-4">
          <Badge
            className="h-6 font-bold bg-red-200 rounded-full"
            variant="ghost"
          >
            Positions
          </Badge>
          <Badge
            className="h-6 font-bold bg-violet-200 rounded-full"
            variant="ghost"
          >
            {job?.jobType}
          </Badge>
          <Badge
            className="h-6 font-bold bg-green-200 rounded-full"
            variant="ghost"
          >
            {job?.ctc}LPA
          </Badge>
        </div>
      </MagicCard>
    </div>
  );
}

// Add PropTypes to validate 'job' prop structure
JobCard.propTypes = {
  job: PropTypes.shape({
    company: PropTypes.shape({
      companyName: PropTypes.string,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    jobType: PropTypes.string,
    ctc: PropTypes.string,
  }).isRequired,
};
