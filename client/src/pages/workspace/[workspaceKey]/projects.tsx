import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import Sidebar from "@/components/Sidebar";
import Router from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { BASE_URL } from "@/constants";
import BreadCrumb from "@/components/BreadCrumb";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { ListIcon, AddIcon,AddUserIcon } from "../../../components/icons";
export default function Projects() {
  const router = useRouter();
  const { workspaceKey } = router.query;
  const paths = ["Workspace", "Projects"]
  const headers = ["Name", "Key", "Team Lead", "Total Members", ""];
  const token = useSelector((state: RootState) => state.auth.token);
  const [projects, setProjects] = useState([]);
  const config = {
    headers: headers,
    name: "Project",
    workspaceKey: workspaceKey as string,
    url: `workspace/${workspaceKey}/create-project`,
  };
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

  const fetchProjects =async ()=>{
    axios.get(BASE_URL+`api/workspace/${workspaceKey}/projects`,{
        headers: {
          'auth-token':  token 
        },
       }).then((response)=>{
        console.log(response.data)
        setProjects(response.data.projects)
       })
  }

  useEffect(()=>{
    if(token)
    {
        fetchProjects();
    }

  },[token])
  return (
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
          <p className="px-6 text-gray-600 text-xl mt-10">List of projects</p>
          {workspaceKey!==null && <Table config={config} data={projects}></Table>}
        </div>
      </div>
    </>
  );
}
