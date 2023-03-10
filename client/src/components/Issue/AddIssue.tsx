import { BASE_API_URL } from "@/constants";
import { reqInstance } from "../Board";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";

const dummyMember = [
  { member: { displayName: "Rasheduzzaman" }, _id: "abraca" },
  { member: { displayName: "Irfan" }, _id: "fsjl" },
];

export default function AddIssue({ projectKey, columnId, setBoard }: any) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [dueDate, setDueDate] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  const projectId = useSelector(
    (state: RootState) => state.project.currentProject?._id
  );
  const members =
    useSelector((state: RootState) => state.project.currentProject?.members) ??
    [];

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setPriority("LOW");
    setDueDate("");
    setShow(false);
    setAssigneeId("");
  };

  console.log("%c assigneeId", "color: chartreuse", assigneeId);

  const handleAdd = async (e: any) => {
    e.preventDefault();

    const res = await reqInstance.post(
      `${BASE_API_URL}/api/workspace/WR/project/${projectKey}/board/column/${columnId}/issue`,
      {
        title,
        description,
        priority,
        dueDate,
      }
    );

    if (assigneeId) {
      const assign = await reqInstance.put(
        `${BASE_API_URL}/api/project/${projectId}/issue/${res.data.issueId}/assign-developer`,
        {
          userId: assigneeId,
        }
      );
      console.log("%c assigneeId handle: ", "color: firebrick", assign);
    }
    setBoard((board: any) => {
      const index = board.columns.findIndex((c: any) => c._id === columnId);
      board.columns[index]?.issues?.push({
        title,
        description,
        priority,
        dueDate,
        assigneeId: [assigneeId],
        _id: res.data.issueId,
        key: res.data.issueKey,
      });

      console.log("%c new issues: ", board.columns[index]?.issues);
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
            placeholder="Title"
          />
          <input
            className="w-full px-4 py-2 mt-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <div className="flex justify-between">
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
          <select
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            title="assigneeId"
            placeholder="Assign To"
            className="block w-full px-4 py-2 mt-2 text-sm text-gray-900 border border-gray-200 rounded bg-gray-50 focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option value=""></option>
            {members.map((member) => (
              <option value={member.member._id} key={member.member._id}>
                {member.member.displayName}
              </option>
            ))}
          </select>
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
