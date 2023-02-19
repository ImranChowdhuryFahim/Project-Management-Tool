import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import  Router  from "next/router";

export interface workspace{
    title: string,
    description: string,
    owner?: string,
    members: string[],
    key: string,
}

export interface payload {
    title?: string,
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

    console.log(config)
  return (
    <>
      <div className="flex justify-between m-5">
        <div></div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link href={config.name==='Project'? (`/workspace/${config.workspaceKey}/create-project`):(config.url)}> Create {config.name}</Link> </button>
      </div>
      <div className="overflow-hidden rounded-lg  m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 border-b border-b-gray-400">
          <thead className="bg-gray-50 border-b border-b-gray-400">
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
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {data.map((row, index) => {
              return (
                <>
                  <tr
                    key={index}
                    className="hover:bg-gray-50"
                    onClick={() => {
                      if(config.name==='Workspace')
                      {
                        Router.push(`/workspace/${row.workspace?.key}/projects`);
                      }
                      if(config.name==='Project')
                      {
                        Router.push(`/workspace/${row.workspaceKey}/project/${row.key}/board`);
                      }
                    }}
                  >
                    <th className="flex gap-3 px-6 py-4 items-center font-normal text-gray-900">
                      <div className="relative h-10 w-10">
                        <img
                          className="h-full w-full "
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
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <a x-data="{ tooltip: 'Delete' }" href="#">
                          <TrashIcon className="w-6 h-6" />
                        </a>
                        <a x-data="{ tooltip: 'Edit' }" href="#">
                          <PencilIcon className="w-6 h-6" />
                        </a>
                      </div>
                    </td>
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
