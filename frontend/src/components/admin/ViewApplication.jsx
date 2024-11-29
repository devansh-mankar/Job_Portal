import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import { BorderBeam } from "../ui/border-beam";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import ShinyButton from "../ui/shiny-button";
import { Contact2, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

//const shortListingStatus = ["Accepted", "Rejected"];

export default function ViewApplication() {
  const { applicants } = useSelector((store) => store.application);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="w-2/5 h-[500px] bg-gray-100 shadow-2xl relative">
          <BorderBeam />
          {applicants &&
            applicants?.applications?.map((item) => (
              <div key={item._id}>
                <h2 className="text-center mt-5 text-md font-semibold">
                  {item?.applicant?.fullName}
                </h2>

                {/* Centered Section */}
                <div className="flex flex-col items-center justify-center m-10 h-[300px]">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium leading-none">Title</h4>
                    <p className="text-sm text-muted-foreground">
                      Description: {item?.applicant?.profile?.bio}
                    </p>
                  </div>
                  <Separator className="my-4 w-full" />
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{item?.applicant?.email}</span>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex items-center space-x-2">
                      <Contact2 className="w-4 h-4" />
                      <span>{item?.applicant?.phoneNumber}</span>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="text-sm m-5">
                    <h4 className="font-medium mb-2 flex items-center justify-center">
                      Skills:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item?.applicant?.profile?.skills?.length > 0 ? (
                        item.applicant.profile.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span>No Skills Provided</span>
                      )}
                    </div>
                  </div>

                  {/* Dialog for Resume */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <ShinyButton className="bg-green-100 mt-5">
                        {item?.applicant?.profile?.resumeOriginalName
                          ? "View Resume"
                          : "Resume Not Available"}
                      </ShinyButton>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                      <DialogHeader>
                        <DialogTitle>Resume</DialogTitle>
                        <DialogDescription>
                          View the applicant&apos;s resume below.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="w-full h-[500px] border overflow-hidden">
                        {item?.applicant?.profile?.resume ? (
                          <iframe
                            src={item.applicant.profile.resume}
                            className="w-full h-full"
                            title="Resume"
                            frameBorder="0"
                            allow="autoplay"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p>No Resume Available</p>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        {item?.applicant?.profile?.resume && (
                          <a
                            href={item.applicant.profile.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            Download Resume
                          </a>
                        )}
                        <Button type="button">Close</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}

          <Button className="absolute bottom-5 left-5 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Accept
          </Button>

          <Button className="absolute bottom-5 right-5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
