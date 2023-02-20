import { use, useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { BASE_API_URL } from "@/constants";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCurrentProject } from "@/slices/projectSlice";

export default function AddProjectMember({workspaceKey}:{workspaceKey: string}) {
  const [email,setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading,setLoading] = useState(false);
  const router = useRouter()
  const dispatch = useDispatch()
  const {projectKey} = router.query;
  type Payload = {message: string};
  type ServerError = {message: string};
  const token = useSelector((state:RootState)=>state.auth.token);
  const currentWorkspace = useSelector((state:RootState)=>state.workspace.currentWorkspace)
  const socket = useSelector((state:RootState)=> state.socket.socket);
  const currentProject = useSelector((state:RootState)=>state.project.currentProject);

  const handleCreate = async(e)=>{
    e.preventDefault() 
    console.log(email,role,workspaceKey)

    setLoading(true);
    try {
      const res = await axios.put<Payload>(
        BASE_API_URL + `/api/project/${currentProject?._id}/member`,
        { email, role },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      if (res.status == 200 || res.status == 201) {

        const pr= await axios.get(BASE_API_URL+`/api/workspace/${workspaceKey}/project/${projectKey}`,{
            headers: {
              "auth-token": token,
            },
          })
        dispatch(setCurrentProject(pr.data.project))
        setLoading(false);
        if(socket){
          socket.emit('notification', {email,body:`You have been added to ${currentProject?.title} project`})
        }
        alert(res.data.message);
        
        setEmail("");
        setRole("");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          alert(serverError.response.data.message);
        }
      }
    }
  }
  return (
    <>
      <form className="w-2/4 px-6">
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            User Id
          </label>
          <input
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="workspace title"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="key"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role
          </label>
          <input
            onChange={(e)=>{setRole(e.target.value.toUpperCase())}}
            value={role}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="role"
            required
          />
        </div>

        <button
          onClick={(e)=>{handleCreate(e)}}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Member
        </button>
      </form>
    </>
  );
}
