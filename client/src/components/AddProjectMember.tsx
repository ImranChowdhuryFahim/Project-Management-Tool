import { use, useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { BASE_API_URL } from "@/constants";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCurrentProject } from "@/slices/projectSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddProjectMember({
  workspaceKey,
}: {
  workspaceKey: string;
}) {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { projectKey } = router.query;
  type Payload = { message: string };
  type ServerError = { message: string };
  const token = useSelector((state: RootState) => state.auth.token);

  const currentWorkspace = useSelector(
    (state: RootState) => state.workspace.currentWorkspace
  );
  const socket = useSelector((state: RootState) => state.socket.socket);
  const currentProject = useSelector(
    (state: RootState) => state.project.currentProject
  );
  const members =
    useSelector(
      (state: RootState) => state.workspace.currentWorkspace?.members
    ) ?? [];

  const handleCreate = async (e: any) => {
    e.preventDefault();
    console.log(userId, role, workspaceKey);

    setLoading(true);
    try {
      const res = await axios.put<Payload>(
        BASE_API_URL + `/api/project/${currentProject?._id}/member`,
        { userId, role },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      if (res.status == 200 || res.status == 201) {
        setShowSnackbar(true);
        const pr = await axios.get(
          BASE_API_URL + `/api/workspace/${workspaceKey}/project/${projectKey}`,
          {
            headers: {
              "auth-token": token,
            },
          })
          console.log(p.data.project)
        dispatch(setCurrentProject(pr.data.project))
        setLoading(false);
        if(socket){
          socket.emit("notification", {
            userId,
            body: `You have been added to ${currentProject?.title} project`,
          });
        }

        setRole("");
        setUserId("");
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

  return (
    <>
      <form className="w-2/4 px-6">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
            <select
              value={userId}
              title="User"
              onChange={(e) => setUserId(e.target.value)}
              className="block px-4 py-2 mt-2 text-sm text-gray-900 border border-gray-200 rounded w-72 bg-gray-50 focus:outline-none focus:bg-white focus:border-blue-500"
            >
              <option value=""></option>
              {members.map((m) => (
                <option key={m.member._id} value={m.member._id}>
                  {m.member.displayName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mb-6">
          <label
            htmlFor="key"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role
            <select
              name="user-role"
              onChange={(e) => {
                setRole(e.target.value);
              }}
              className="block px-4 py-2 mt-2 text-sm text-gray-900 border border-gray-200 rounded w-72 bg-gray-50 focus:outline-none focus:bg-white focus:border-blue-500"
              value={role}
            >
              <option value=""></option>
              <option value="Developer">Developer</option>
              <option value="Quality Assurance">Quality Assurance</option>
              <option value="Business Analyst">Business Analyst</option>
            </select>
          </label>
        </div>

        <button
          onClick={(e) => {
            handleCreate(e);
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Member
        </button>
      </form>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={handleClose}
        action={action}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Member Added Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
