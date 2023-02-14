import { reqInstance } from "@/pages/board/[boardID]";
import { useMemo, useState } from "react";

export default function AddProject({ workspaceKey }: { workspaceKey: string }) {
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
      `http://localhost:4000/api/workspace/${workspaceKey}/project`,
      {
        title,
        key,
        description,
      }
    );

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
          className="bg-white appearance-none border-2 mt-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
          className="bg-white appearance-none border-2 mt-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />

        <div className="flex flex-row mt-2">
          <button
            className="mr-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 w-1/2 border border-red-500 hover:border-transparent rounded"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 w-1/2 border border-blue-500 hover:border-transparent rounded"
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 w-full border border-gray-400 rounded shadow"
          onClick={() => setShow(true)}
        >
          Create a new project
        </button>
      </div>
    );
  }
}
