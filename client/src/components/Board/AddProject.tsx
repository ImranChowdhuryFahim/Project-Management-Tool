import { BASE_API_URL } from "@/constants";
import { reqInstance } from ".";
import { useMemo, useState } from "react";

export default function AddProject({ workspaceKey, setProjects }: any) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const key = useMemo(() => {
    return title
      .split(" ")
      .reduce((acc, v) => acc + v[0], "")
      .toUpperCase();
  }, [title]);

  const handleAddProject = (e: any) => {
    e.preventDefault();

    reqInstance.post(
      `${BASE_API_URL}/api/workspace/${workspaceKey}/project`,
      {
        title,
        key,
        description,
      }
    );

    setProjects((projects: any) => [...projects, { title, key, description }]);

    setTitle("");
    setDescription("");
    setShow(false);
  };

  if (show) {
    return (
      <form onSubmit={handleAddProject}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
          className="w-full px-4 py-2 mt-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
          className="w-full px-4 py-2 mt-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
        />

        <div className="flex flex-row mt-2">
          <button
            className="w-1/2 py-1 mr-2 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <button
            className="w-1/2 py-1 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <div>
        <button
          className="w-full px-4 py-2 mt-2 font-bold text-white bg-blue-500 border border-gray-400 rounded shadow hover:bg-blue-700"
          onClick={() => setShow(true)}
        >
          Create a new project
        </button>
      </div>
    );
  }
}
