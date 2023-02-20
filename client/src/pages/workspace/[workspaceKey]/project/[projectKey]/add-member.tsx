import CreateWorkspace from "@/components/CreateWorkspace";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import {
  ListIcon,
  AddIcon,
  AddUserIcon,
} from "../../../../../components/icons";
import { useRouter } from "next/router";
import BreadCrumb from "@/components/BreadCrumb";
import AddWorkspaceMember from "@/components/AddWorkspaceMember";
import AddProjectMember from "@/components/AddProjectMember";

export default function AddProjectMemberPage() {
    const router = useRouter();
  const paths = ["Workspace","Project","Add Member"]
  const { workspaceKey,projectKey } = router.query;
  const MenuItems = [
    {
      id: 1,
      label: "Manage Board",
      icon: ListIcon,
      link: `/workspace/${workspaceKey}/project/${projectKey}/board`,
    },
    {
      id: 2,
      label: "Add Member",
      icon: AddUserIcon,
      link: `/workspace/${workspaceKey}/project/${projectKey}/add-member`,
    },
  ];
  return (
    <>
      <Navbar></Navbar>
      <div className="flex">
        <Sidebar menuItems={MenuItems}></Sidebar>
        <div className="h-[calc(100vh-4.1rem)] w-full">
          <BreadCrumb paths={paths}></BreadCrumb>
          <p className="px-6 mt-10 text-2xl font-semibold text-gray-800">
            Add Member
          </p>
          <p className="px-6 mt-10 mb-10 text-xl text-gray-600">
            Provide necessary informations to add member to project
          </p>
          <AddProjectMember workspaceKey={workspaceKey as string}></AddProjectMember>
        </div>
      </div>
    </>
  );
}
