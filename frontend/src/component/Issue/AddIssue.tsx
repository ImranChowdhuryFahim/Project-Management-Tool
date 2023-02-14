import { reqInstance } from "@/pages/board/[boardID]";
import { useState } from "react";

export default function AddIssue({ projectId, columnId }: any) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = (e: any) => {
    e.preventDefault();

    reqInstance.post(
      `http://localhost:4000/api/workspace/WR/project/${projectId}/board/column/${columnId}/issue`,
      {
        title,
        description: "des",
        dueDate: "2023-02-16",
      }
    );

    setTitle("");
    setDescription("");
    setShow(false);
  };

  return (
    <div>
      {show ? (
        <form className="flex flex-col mt-2" onSubmit={handleAdd}>
          <input
            className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
          <input
            className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
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
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-1 px-4 w-full border border-gray-400 rounded shadow"
          onClick={() => setShow(true)}
        >
          Add an issue
        </button>
      )}
    </div>
  );
}
