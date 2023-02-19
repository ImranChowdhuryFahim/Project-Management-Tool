import { useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { BASE_API_URL } from "@/constants";

export default function AddWorkspaceMember({workspaceKey}:{workspaceKey: string}) {
  const [email,setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading,setLoading] = useState(false);
  type Payload = {message: string};
  type ServerError = {message: string};
  const token = useSelector((state:RootState)=>state.auth.token);
  const socket = useSelector((state:RootState)=> state.socket.socket);

  const handleCreate = async()=>{
    console.log(email,role,workspaceKey)

    setLoading(true);
    try {
      const res = await axios.put<Payload>(
        BASE_API_URL + `/api/workspace/${workspaceKey}/member`,
        { email, role },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      if (res.status == 200 || res.status == 201) {
        setLoading(false);
        if(socket) socket.emit('notification', {email: email,role:role, type:'AddWorkspaceMember'})
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
            User Email
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
            placeholder="unique key"
            required
          />
        </div>

        <button
          onClick={()=>{handleCreate()}}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Member
        </button>
      </form>
    </>
  );
}
