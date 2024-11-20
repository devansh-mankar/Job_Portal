import { FooterWithSocialLinks } from "../shared/Footer";
import Navbar from "../shared/Navbar";
import SidebarFilter from "./sidebar";

export default function Jobs() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <SidebarFilter />
      </div>
      <FooterWithSocialLinks />
    </div>
  );
}
