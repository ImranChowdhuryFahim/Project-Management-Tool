import { Project, setCurrentProject } from "@/slices/projectSlice";
import { setCurrentWorkspace, Workspace } from "@/slices/workspaceSlice";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import  Router  from "next/router";
import { use } from "react";
import { useDispatch } from "react-redux";

export interface workspace{
    title: string,
    description: string,
    owner?: string,
    members: string[],
    key: string,
}

export interface payload {
    title?: string,
    _id?:string,
    description?: string,
    role?: string,
    workspace?: workspace,
    key?: string,
    teamLead?:user,
    members?: any[]
    workspaceKey?: string,
}

export interface userWorkspace{
    role: string,
    workspace: workspace,
}

export interface user{
    displayName: string
}

export interface config{
    name: string,
    url: string,
    headers: string[],
    workspaceKey?: string,
}
export default function Table({data,config}:{config:config, data:payload[] }) {
  const dispatch = useDispatch();

    console.log(config)
  return (
    <>
      <div className="flex justify-between m-5">
        <div></div>
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"><Link href={config.name==='Project'? (`/workspace/${config.workspaceKey}/create-project`):(config.url)}> Create {config.name}</Link> </button>
      </div>
      <div className="m-5 overflow-hidden rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 bg-white border-b border-collapse border-b-gray-400">
          <thead className="border-b bg-gray-50 border-b-gray-400">
            <tr>
              {config.headers.map((header, index) => {
                return (
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                    key={index}
                  >
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="border-t border-gray-100 divide-y divide-gray-100">
            {data.map((row, index) => {
              return (
                <>
                  <tr
                    key={index}
                    className="hover:bg-gray-50"
                    onClick={() => {
                      if(config.name==='Workspace')
                      {
                        dispatch(setCurrentWorkspace(row.workspace as Workspace));
                        Router.push(`/workspace/${row.workspace?.key}/projects`);
                      }
                      if(config.name==='Project')
                      {
                        dispatch(setCurrentProject(row))
                        Router.push(`/workspace/${row.workspaceKey}/project/${row.key}/board`);
                      }
                    }}
                  >
                    <th className="flex items-center gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative w-10 h-10">
                        <img
                          className="w-full h-full "
                          src="	https://test1704.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10406?size=small"
                          alt=""
                        />
                      </div>
                      <div className="font-medium text-gray-700 ">
                        {row.workspace?.title || row.title}
                      </div>
                    </th>
                    <td className="px-6 py-4">{row.workspace?.key || row.key}</td>
                    <td className="px-6 py-4">{row.role || row.teamLead?.displayName}</td> 
                    <td className="px-6 py-4">{row.workspace?.members.length || row.members?.length}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
