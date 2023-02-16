import IssueInfo from "@/component/Issue/Info";
import Priority from "@/component/Issue/Priority";
import AssigneeAvatar from "@/component/utils/AssigneeAvatar";
import { DeleteForever } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { reqInstance } from "..";

export default function IssueDetails() {
  const router = useRouter();
  const workspaceKey = "WR";
  const { projectKey, issueKey, columnId, projectId } = router.query;
  const [issueDetail, setIssueDetail]: any = useState({});

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
    <div className="p-20 bg-blue-100">
      <div className="bg-white p-6 rounded-lg shadow-lg mx-auto w-1/2">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            {issueDetail?.title}
          </h2>
        </div>
        <Chip label={issueDetail.key} size="small" className="mb-2" />
        <p className="text-gray-700">{issueDetail.description}</p>

        {issueDetail?.assignee?.length > 0 && (
          <p>
            Assigned to:
            {issueDetail.assignee.map((assignee: any) => (
              <AssigneeAvatar name={assignee} />
            ))}
          </p>
        )}

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
  );
}
