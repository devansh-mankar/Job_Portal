import { FooterWithSocialLinks } from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { Pen } from "lucide-react";
import { Mail, Contact, Download } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "@headlessui/react";
import AppliedJobs from "./AppliedJobTable";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant.js";

export default function Profile() {
  const user = useSelector((store) => store.auth.user);
  function handleDownload() {
    const pdfUrl = "../../../public/121MM0931_Devansh_Mankar.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Resum.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow mt-16 mx-10 ">
        <div className="relative w-full h-96 shadow-2xl p-10 bg-gray-100">
          <DialogPopUp />
          <div className="flex items-center">
            <span className="mr-2 text-gray-500">LOGO</span>{" "}
            {/* Logo placeholder */}
            <h2 className="text-xl font-bold">{user?.fullName}</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            repudiandae quibusdam consequuntur quis exercitationem.
          </p>

          <div className="my-10 flex flex-col space-y-2">
            <div className="flex flex-row gap-2">
              <Mail />
              <span>{user?.email}</span>
            </div>
            <div className="flex flex-row gap-2">
              <Contact />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>
          <h1>Skills:</h1>
          {user?.profile?.skills.length !== 0 ? (
            user?.profile?.skills.map((item, index) => (
              <Badge className="mr-1 rounded-lg h-6" key={index}>
                {item}
              </Badge>
            ))
          ) : (
            <span className="font-bold">NA</span>
          )}
          <div className="mt-6">
            <span>Devansh Mankar</span>
            <div className=" flex flex-row gap-1">
              <h2>{user?.profile?.resumeOriginalName}</h2>
              <Button onClick={handleDownload}>
                <Download className="h-6 w-5 hover:text-cyan-500" />
              </Button>
            </div>
          </div>
        </div>
        <div className="my-10 p-2">
          <h1 className="font-bold text-xl m-2">Applied Jobs</h1>
          <AppliedJobs />
        </div>
      </div>
      <FooterWithSocialLinks />
    </div>
  );
}

export function DialogPopUp() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to control dialog visibility
  const user = useSelector((store) => store.auth.user);

  const [input, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.join(", "),
    file: user?.profile?.resume,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("email", input.email);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/updateProfile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setIsOpen(false); // Close dialog on successful update
      }
    } catch (error) {
      toast.error("Update failed.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} className="z-[10000]">
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          <Pen className="hover:text-cyan-500 cursor-pointer absolute top-0 right-0 m-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            {[
              {
                label: "Name",
                id: "fullName",
                value: input.fullName,
              },
              {
                label: "Email",
                id: "email",
                value: input.email,
              },
              {
                label: "Phone",
                id: "phoneNumber",
                value: input.phoneNumber,
              },
              {
                label: "Bio",
                id: "bio",
                value: input.bio,
              },
              {
                label: "Skills",
                id: "skills",
                value: input.skills,
              },
            ].map(({ label, id, value, placeholder }) => (
              <div className="grid grid-cols-4 items-center gap-4" key={id}>
                <Label htmlFor={id} className="text-right">
                  {label}
                </Label>
                <Input
                  id={id}
                  name={id}
                  onChange={changeEventHandler}
                  value={value}
                  placeholder={placeholder}
                  className="col-span-3"
                />
              </div>
            ))}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume
              </Label>
              <Input
                id="resume"
                type="file"
                name="file"
                onChange={changeFileHandler}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-black text-white rounded-lg p-1 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
