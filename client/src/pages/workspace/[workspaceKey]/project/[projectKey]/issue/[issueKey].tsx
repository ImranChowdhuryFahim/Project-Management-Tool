import IssueInfo from "@/components/Issue/Info";
import Priority from "@/components/Issue/Priority";
import AssigneeAvatar from "@/components/utils/AssigneeAvatar";
import { DeleteForever } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { reqInstance } from "@/components/Board";
import Navbar from "@/components/Navbar";
import { BASE_API_URL } from "@/constants";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function IssueDetails() {
  const router = useRouter();
  const { workspaceKey, projectKey, issueKey, columnId } = router.query;
  const projectId = "324";
  const [issueDetail, setIssueDetail]: any = useState({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  console.log("%c query: ", "color: yellow", router.query);
  console.log("%c issueDetail", "color: chartreuse", issueDetail);

  const handleDelete = async () => {
    const res = await reqInstance.delete(
      `${BASE_API_URL}/api/board/${projectId}/column/${columnId}/issue/${issueDetail._id}`
    );
    console.log("%c handle delete: ", "color: red", res);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackbar(false);
  };

  const handleUpdate = async () => {
    const { status } = await reqInstance.put(
      `${BASE_API_URL}/api/issue/${issueDetail._id}`,
      {
        title,
        description,
        dueDate,
        priority,
        isDone: false,
      }
    );
    if (status === 200) setShowSnackbar(true);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  useEffect(() => {
    reqInstance
      .get(
        `${BASE_API_URL}/api/workspace/${workspaceKey}/project/${projectKey}/board/issue/${issueKey}`
      )
      .then((res: any) => {
        setIssueDetail(res.data.issue);
        setTitle(res.data.issue?.title);
        setDescription(res.data.issue?.description);
        setDueDate(
          new Date(res.data.issue?.dueDate ?? "").toISOString().substring(0, 10)
        );
        setPriority(res.data.issue?.priority ?? "");
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-20 bg-blue-100">
        <div className="w-1/2 p-6 mx-auto bg-white rounded-lg shadow-lg">
          <div className="flex justify-between h-10 my-2">
            {editTitle ? (
              <>
                <input
                  placeholder="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={(e) => setEditTitle(false)}
                  className="w-full px-4 py-3 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                />
                <DoneIcon onClick={() => setEditTitle(false)} />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800 ">{title}</h2>
                <EditIcon onClick={() => setEditTitle(true)} />
              </>
            )}
          </div>
          <Chip label={issueDetail.key} size="small" />
          <div className="flex justify-between my-2">
            {editDescription ? (
              <>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  rows={3}
                  onBlur={() => setEditDescription(false)}
                  className="w-full px-4 py-3 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                />
                <DoneIcon onClick={() => setEditDescription(false)} />
              </>
            ) : (
              <>
                <p className="text-left text-gray-700">{description}</p>
                <EditIcon onClick={() => setEditDescription(true)} />
              </>
            )}
          </div>
          <div className="flex justify-start my-2">
            <div className="flex justify-start ">
              <label className="py-2 mr-2">Due Date: </label>
              <input
                title="Due Date"
                type="date"
                value={dueDate}
                className="block w-40 px-4 py-2 text-sm text-gray-900 border border-gray-200 rounded bg-gray-50 focus:outline-none focus:bg-white focus:border-blue-500"
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="flex justify-start ml-2">
              <label className="py-2 mr-2">Priority: </label>
              <select
                title="Set priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="block w-40 px-4 py-2 text-sm text-gray-900 border border-gray-200 rounded bg-gray-50 focus:outline-none focus:bg-white focus:border-blue-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>
          <div className="flex justify-start mt-4">
            <button
              onClick={handleUpdate}
              type="submit"
              className="inline-block px-10 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Update Issue
            </button>
            <button
              onClick={handleDelete}
              type="submit"
              className="hidden px-10 py-2.5 ml-4 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Delete Issue
            </button>
          </div>
          <Snackbar
            open={showSnackbar}
            autoHideDuration={2000}
            onClose={handleClose}
            action={action}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Issue Updated!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
}
