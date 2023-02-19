import CreateWorkspace from "@/components/CreateWorkspace";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import {
    ArticleIcon,
    HomeIcon,
    LogoIcon,
    LogoutIcon,
    UsersIcon,
    VideosIcon,
    ListIcon,
    AddIcon,
  } from "../../components/icons";
export default function CreateWorkspacePage() {
    const workapceMenuItems = [
        { id: 1, label: "Manage Workspaces", icon: ListIcon, link: "/workspace" },
        { id: 2, label: "Create Workspace", icon: AddIcon, link: "/workspace/create" },
      ];
  return (
    <>
         <Navbar></Navbar>
         <div className="flex">
         <Sidebar menuItems={workapceMenuItems}></Sidebar>
         <div className="h-[calc(100vh-4.1rem)] w-full">
         {/* <BreadCrumb paths={paths}></BreadCrumb> */}
         <p className="px-6 text-gray-800 font-semibold text-2xl mt-10">Create Workspace</p>
         <p className="px-6 text-gray-600 text-xl mt-10 mb-10">Provide necessary informations to create workspace</p>
         <CreateWorkspace></CreateWorkspace>
         </div>
         
        </div>
        </>
  );
}
