import IssueInfo from "@/components/Issue/Info";
import Priority from "@/components/Issue/Priority";
import AssigneeAvatar from "@/components/utils/AssigneeAvatar";
import { DeleteForever } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { reqInstance } from "@/components/Board";
import Navbar from "@/components/Navbar";

export default function IssueDetails() {
  const router = useRouter();
  const { workspaceKey, projectKey, issueKey, columnId, projectId } = router.query;
  const [issueDetail, setIssueDetail]: any = useState({});

  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState(false);


  console.log("%c query: ", "color: yellow", router.query);
  console.log("%c issueDetail", "color: chartreuse", issueDetail);

  const handleDelete = () => {
    reqInstance.delete(
      `http://localhost:4000/api/board/${projectId}/column/${columnId}/issue/${issueDetail._id}`
    );
  };

  useEffect(() => {
    reqInstance
      .get(
        `http://localhost:4000/api/workspace/${workspaceKey}/project/${projectKey}/board/issue/${issueKey}`
      )
      .then((res: any) => setIssueDetail(res.data.issue));
  }, []);

  return (
    <>
    <Navbar />
    <div className="p-20 bg-blue-100">
      <div className="w-1/2 p-6 mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-between">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            {issueDetail?.title}
          </h2>
        </div>
        <Chip label={issueDetail.key} size="small" className="mb-2" />
        <p className="text-gray-700">{issueDetail.description}</p>

        <div className="flex-col">
          <p>
            Due Date:{" "}
            <Chip
              size="small"
              label={new Date(issueDetail.dueDate).toDateString()}
            />
          </p>
          <p>Priority: {issueDetail.priority}</p>
        </div>
      </div>
    </div>
    </>
  );
}
