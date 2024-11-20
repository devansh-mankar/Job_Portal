import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

export default function CardWithLink({ job }) {
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiffrence = currentTime - createdAt;
    return Math.floor(timeDiffrence / (1000 * 24 * 60 * 60));
  };
  return (
    <Card className="flex flex-col mt-6 h-[350px] w-full shadow-lg relative transition-transform duration-300 hover:shadow-2xl hover:scale-105">
      <span className="absolute top-4 left-4 text-xs text-gray-500">
        {daysAgoFunction(job?.createdAt) === 0
          ? "Today"
          : `${daysAgoFunction(job?.createdAt)}`}{" "}
        days ago
      </span>

      <Bookmark className="absolute top-4 right-4 h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />

      <CardBody className="flex-1 mt-8">
        <div className="flex flex-row gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-10 w-10 text-gray-900"
          >
            <path
              fillRule="evenodd"
              d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
              clipRule="evenodd"
            />
            <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
          </svg>
          <div className="flex flex-col">
            <h4 className="text-green-600">{job?.company?.companyName}</h4>
            <span>{job?.location}</span>
          </div>
        </div>

        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 text-blue-500"
        >
          {job?.title}
        </Typography>
        <Typography className="">
          {job?.description} Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Repudiandae asperiores sint perspiciatis fugiat dolorum?{" "}
        </Typography>
      </CardBody>

      <CardFooter className="flex justify-between items-center pt-2 mt-auto relative">
        <div className="flex gap-2 mb-1">
          <span className="bg-green-100 text-green-600 text-xs font-semibold py-1 px-2 rounded-full">
            {job?.salary} LPA
          </span>
          <span className="bg-blue-100 text-blue-600 text-xs font-semibold py-1 px-2 rounded-full">
            {job?.jobType}
          </span>
        </div>

        <div className="ml-auto">
          <Button
            size="sm"
            variant="text"
            className="flex items-center gap-2 hover:text-cyan-500"
          >
            <Link to={`/description/${job?._id}`}>Job Description</Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

CardWithLink.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    company: PropTypes.shape({
      companyName: PropTypes.string,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    jobType: PropTypes.string,
    salary: PropTypes.string,
    createdAt: PropTypes.string, // Add createdAt field here
  }).isRequired,
};