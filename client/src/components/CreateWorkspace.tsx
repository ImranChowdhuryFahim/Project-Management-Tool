import { useState } from "react";

export default function CreateWorkspace() {
  const [title,setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [key,setKey] = useState('')

  const handleCreate = ()=>{
    console.log(title,key,description)
  }
  return (
    <>
      <form className="w-2/4 px-6">
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            onChange={(e)=>setTitle(e.target.value)}
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
            Key
          </label>
          <input
            onChange={(e)=>{setKey(e.target.value.toUpperCase())}}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="unique key"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            
            onChange={(e)=>setDescription(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          onClick={()=>{handleCreate()}}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
      </form>
    </>
  );
}
