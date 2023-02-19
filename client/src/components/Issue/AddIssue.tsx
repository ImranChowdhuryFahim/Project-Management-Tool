import { reqInstance } from "../Board";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddIssue({ projectId, columnId, setBoard }: any) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [storyPoint, setStoryPoint] = useState(0);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [dueDate, setDueDate] = useState("");

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setStoryPoint(0);
    setPriority("LOW");
    setDueDate("");
    setShow(false);
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();

    const res = await reqInstance.post(
      `http://localhost:4000/api/workspace/WR/project/${projectId}/board/column/${columnId}/issue`,
      {
        title,
        description,
        priority,
        dueDate: "2023-02-16",
      }
    );

    setBoard((board: any) => {
      const index = board.columns.findIndex((c: any) => c._id === columnId);
      board.columns[index]?.issues?.push({
        title,
        description,
        priority,
        dueDate: "2023-02-20",
        _id: res.data.issueId,
        key: res.data.issueKey,
      });

      return { ...board };
    });

    clearInputs();
  };

  return (
    <div>
      {show ? (
        <form className="flex flex-col my-2" onSubmit={handleAdd}>
          <input
            className="w-full px-4 py-2 mt-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
          <input
            className="w-full px-4 py-2 mt-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
          />

          <div className="flex justify-between">
            <input
              className="w-full px-4 py-2 mt-2 mr-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
              value={storyPoint}
              onChange={(e) => setStoryPoint(+e.target.value)}
              type="number"
              placeholder="Story Point"
            />
            <select
              title="Set priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-sm text-gray-900 border border-gray-200 rounded bg-gray-50 focus:outline-none focus:bg-white focus:border-blue-500"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <input
            className="block w-full px-4 py-2 mt-2 text-sm text-gray-900 border border-gray-200 rounded bg-gray-50 focus:outline-none focus:bg-white focus:border-blue-500"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Due Date"
          />
          <div className="flex flex-row mt-2">
            <button
              className="w-1/2 py-1 mr-2 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent"
              onClick={clearInputs}
              type="reset"
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
      ) : (
        <button
          className="w-full px-4 py-2 my-2 font-bold text-white bg-blue-500 border border-gray-400 rounded shadow hover:bg-blue-700"
          onClick={() => setShow(true)}
          type="button"
        >
          Add an issue
        </button>
      )}
    </div>
  );
}
