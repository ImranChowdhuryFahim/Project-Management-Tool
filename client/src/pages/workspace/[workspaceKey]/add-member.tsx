import CreateWorkspace from "@/components/CreateWorkspace";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import {
  ListIcon,
  AddIcon,
  AddUserIcon,
} from "../../../components/icons";
import { useRouter } from "next/router";
import BreadCrumb from "@/components/BreadCrumb";
import AddWorkspaceMember from "@/components/AddWorkspaceMember";

export default function AddWorkspaceMemberPage() {
    const router = useRouter();
  const paths = ["Workspace","Add Member"]
  const { workspaceKey } = router.query;
  const MenuItems = [
    {
      id: 1,
      label: "Manage projects",
      icon: ListIcon,
      link: `/workspace/${workspaceKey}/projects`,
    },
    {
      id: 2,
      label: "Create project",
      icon: AddIcon,
      link: `/workspace/${workspaceKey}/create-project`,
    },
    {
      id: 3,
      label: "Add Member",
      icon: AddUserIcon,
      link: `/workspace/${workspaceKey}/add-member`,
    },
  ];
  return (
    <>
      <Navbar></Navbar>
      <div className="flex">
        <Sidebar menuItems={MenuItems}></Sidebar>
        <div className="h-[calc(100vh-4.1rem)] w-full">
          <BreadCrumb paths={paths}></BreadCrumb>
          <p className="px-6 text-gray-800 font-semibold text-2xl mt-10">
            Add Member
          </p>
          <p className="px-6 text-gray-600 text-xl mt-10 mb-10">
            Provide necessary informations to add member to workspace
          </p>
          <AddWorkspaceMember workspaceKey={workspaceKey as string}></AddWorkspaceMember>
        </div>
      </div>
    </>
  );
}
