import Navbar from "@/components/Navbar"
import Table from "@/components/Table"
import Sidebar from "@/components/Sidebar"
import { useEffect,useState } from "react"
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store'
import { BASE_URL } from "@/constants"

import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ListIcon,
  AddIcon,
} from "../../components/icons";

import { ListBulletIcon } from "@heroicons/react/20/solid"

export default function Workspace()
{
    const headers = ["Name", "Key", "Role", "Total Members", ""];
    const token = useSelector((state:RootState)=>state.auth.token);
    const [workspaces,setWorkspaces] = useState([]);
    const config = {headers: headers, name: "Workspace", url:'workspace/create'}
    const workapceMenuItems = [
        { id: 1, label: "Manage Workspaces", icon: ListIcon, link: "/workspace" },
        { id: 2, label: "Create Workspace", icon: AddIcon, link: "/workspace/create" },
      ];
    const getWorspaces = async()=>{
        axios.get(BASE_URL+"api/user/workspaces",{
            headers: {
              'auth-token':  token 
            },
           }).then((response)=>{
            setWorkspaces(response.data.workspaces)
           })

        
    }
    useEffect(()=>{
        if(token)
        {
            getWorspaces();
        }

    },[token])
    return(

        <>
         <Navbar></Navbar>
         <div className="flex">
         <Sidebar menuItems={workapceMenuItems}></Sidebar>
         <div className="h-[calc(100vh-4.1rem)] w-full">
         {/* <BreadCrumb paths={paths}></BreadCrumb> */}
         <p className="px-6 text-gray-800 font-semibold text-2xl mt-10">Workspaces</p>
         <p className="px-6 text-gray-600 text-xl mt-10">List of Workspaces</p>
         <Table config={config} data={workspaces}></Table>
         </div>
         
        </div>
        </>
    )
}