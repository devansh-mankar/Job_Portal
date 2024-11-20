import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Popover } from "@radix-ui/react-popover";

import { LogOutIcon, User2 } from "lucide-react";

import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ShimmerButton from "../ui/shimmer-button";
import { useSelector } from "react-redux";
import { Button } from "@headlessui/react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant.js";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  return (
    <nav className="block w-full max-w-screen-lg px-4 py-2 mx-auto bg-white bg-opacity-90 sticky top-3 shadow-2xl lg:px-8 lg:py-3 backdrop-blur-lg backdrop-saturate-150 z-[9999]">
      <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
        <Link
          to="/"
          className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold"
        >
          Job<span className="text-cyan-500">Portal</span>
        </Link>
        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {user && user.role === "recruiter" ? (
              <>
                <li className="flex items-center p-1 text-md gap-x-2 text-slate-500">
                  <Link
                    to="/admin/companies"
                    className="flex items-center cursor-pointer hover:text-slate-950"
                  >
                    Comapnies
                  </Link>
                </li>
                <li className="flex items-center p-1 text-md gap-x-2 text-slate-500">
                  <Link
                    to="/admin/jobs"
                    className="flex items-center cursor-pointer hover:text-slate-950"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center p-1 text-md gap-x-2 text-slate-500">
                  <Link
                    to="/jobs"
                    className="flex items-center cursor-pointer hover:text-slate-950"
                  >
                    Jobs
                  </Link>
                </li>
                <li className="flex items-center p-1 text-md gap-x-2 text-slate-500">
                  <Link
                    to="/browse"
                    className="flex items-center  hover:text-slate-950"
                  >
                    Browse
                  </Link>
                </li>
                <li className="flex items-center p-1 text-md gap-x-2 text-slate-500">
                  <Link
                    to="#"
                    className="flex items-center  hover:text-slate-950"
                  >
                    About
                  </Link>
                </li>
                <li className="flex items-center p-1 text-md gap-x-2 text-slate-500">
                  <Link
                    to="#"
                    className="flex items-center  hover:text-slate-950"
                  >
                    Mentorship
                  </Link>
                </li>
              </>
            )}

            <li className="flex items-center p-1 text-md gap-x-2 text-slate-500">
              {!user ? (
                <div className="flex flex-row gap-2">
                  <Link to="/login">
                    <ShimmerButton className="h-9 w-20 hover:shadow-xl hover:cursor-pointer">
                      Login
                    </ShimmerButton>
                  </Link>
                  <Link to="/signup">
                    <ShimmerButton className="h-9 w-20 hover:shadow-xl hover:cursor-pointer">
                      SignUp
                    </ShimmerButton>
                  </Link>
                </div>
              ) : (
                <PopOver></PopOver>
              )}
            </li>
          </ul>
        </div>
        <button
          className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
}

export function PopOver() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="hover:cursor-pointer">
          <AvatarImage
            src={user?.profile?.profilePhoto}
            alt="@shadcn"
            className="h-8 w-8 rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-10 mt-4 z-[10000] shadow-md">
        <div className="grid  grid-col-1 gap-4 divide-y">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">{user?.fullName}</h4>
            <p className="text-sm text-muted-foreground">
              {user?.profile?.bio}
            </p>
          </div>
          <div className="divide-y-2  space-y-4 p-2 text-center text-slate-400">
            {user && user.role === "candidate" && (
              <div className="flex flex-row hover:cursor-pointer hover:text-slate-950 gap-2 items-center">
                <Button className="flex items-center gap-2">
                  <User2 />
                  <Link to="/profile" className="text-inherit">
                    View Profile
                  </Link>
                </Button>
              </div>
            )}

            <div className="flex flex-row p-2 hover:cursor-pointer hover:text-slate-950 gap-2">
              <LogOutIcon />
              <Button onClick={handleLogout}> Logout</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
