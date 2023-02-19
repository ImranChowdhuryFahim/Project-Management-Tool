import { useRouter } from "next/router"
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ListIcon, AddIcon,AddUserIcon } from "../../../../../../components/icons";
import BreadCrumb from "@/components/BreadCrumb";
import Board from "@/components/Board/Board";
export default function BoardPage()
{
    const router = useRouter();
    const {workspaceKey,projectKey} = router.query;
    const paths= ["Workspace","Project","Board"]
    const MenuItems = [
        {
          id: 1,
          label: "Manage Board",
          icon: ListIcon,
          link: `/workspace/${workspaceKey}/project/${projectKey}/board`,
        },
      ];

    return(
        <>
        <Navbar></Navbar>
        <div className="flex">
          {workspaceKey !== null ? (
            <Sidebar menuItems={MenuItems}></Sidebar>
          ) : (
            <></>
          )}
  
          <div className="h-[calc(100vh-4.1rem)] w-full">
            <BreadCrumb paths={paths}></BreadCrumb>
            <Board></Board>
          </div>
        </div>
        </>
    )
}