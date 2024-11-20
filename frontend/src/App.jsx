("use client");

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import AdminJobs from "./components/admin/AdminJobs";
import Browse from "./components/browse/Browse";
import Profile from "./components/Profile/Profile";
import JobDescription from "./components/Description/jobDescription";
import AdminHome from "./components/admin/AdminHome";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CompanyCreate";
import Jobs from "./components/jobs/Jobs";
import CompanySetup from "./components/admin/CompanySetup";
import PostJob from "./components/admin/PostJob";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },

  {
    path: "/admin/companies",
    element: <Companies />,
  },
  {
    path: "/adminHome",
    element: <AdminHome />,
  },
  {
    path: "/admin/companies/create",
    element: <CreateCompany />,
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup />,
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />,
  },
  {
    path: "/admin/jobs/create",
    element: <PostJob />,
  },
]);

export default function App() {
  return (
    <>
      <Toaster />

      <RouterProvider router={appRouter} />
    </>
  );
}
