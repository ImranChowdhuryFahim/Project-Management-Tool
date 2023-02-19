import { Chip, Typography, Tooltip } from "@mui/material";
import AssigneeAvatar from "../utils/AssigneeAvatar";
import Priority from "./Priority";

export default function IssueInfo({
  priority,
  storyPoint,
  assignee,
  dueDate,
  issueKey,
}: {
  priority: string;
  storyPoint: number;
  assignee: string;
  dueDate: Date;
  issueKey: string;
}) {
  const isDueToday =
    new Date(dueDate).toDateString() === new Date().toDateString();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <Priority priority={priority} />
        <AssigneeAvatar name={assignee} />
      </div>
      <div className="flex justify-end">
        {isDueToday ? (
          <Chip
            label="Due Today"
            size="small"
            color="error"
            className="mr-2 rounded"
          />
        ) : null}
        <Chip label={issueKey} size="small" />
      </div>
    </div>
  );
}
